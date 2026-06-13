# TWA Setup Guide — MS Tools

## Overview

This guide walks through wrapping the MS Tools PWA into an Android Trusted Web Activity (TWA) APK/AAB for Google Play Store distribution using Bubblewrap.

**App identity:**
- App name: **MS Tools**
- Short name: **MS Tools**
- Package: `com.mstools.dev`
- Play Store developer: **MS DevX**

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Java JDK](https://adoptium.net/) 17+ (set `JAVA_HOME` environment variable)
- [Android SDK](https://developer.android.com/studio) (command-line tools or Android Studio)
  - Ensure `ANDROID_HOME` or `ANDROID_SDK_ROOT` is set
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)

---

## 1. Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
# verify
bubblewrap --version
```

## 2. Verify Prerequisites

```bash
bubblewrap doctor
```

All checks must pass. Common fixes:
- **Java not found** — install JDK 17+ and set `JAVA_HOME`
- **ADB not found** — install Android SDK command-line tools
- **Bundletool not found** — Bubblewrap will download it automatically

## 3. Generate a Signing Key

This key signs your APK/AAB. **Back it up permanently** — you cannot update the Play Store app with a different key.

```bash
keytool -genkey -v -keystore ms-tools.keystore -alias ms-tools \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storetype jks -dname "CN=MS Tools, OU=Dev, O=MS Tools, L=City, ST=State, C=US"
```

You will be prompted for:
- Keystore password (save this securely)
- Key password (can be same as keystore)

**Store these in a password manager — if lost, the app cannot be updated.**

## 4. Extract SHA256 Fingerprint

```bash
keytool -list -v -keystore ms-tools.keystore -alias ms-tools -storepass YOUR_STORE_PASS
```

Look for `SHA256:` in the output. Copy the hex string (remove colons, uppercase).

## 5. Update Digital Asset Links

Edit `public/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mstools.dev",
      "sha256_cert_fingerprints": [
        "YOUR_SHA256_FINGERPRINT_NO_COLONS"
      ]
    }
  }
]
```

Deploy to Vercel:

```bash
git add public/.well-known/assetlinks.json
git commit -m "Update assetlinks with SHA256 fingerprint"
git push
# Vercel auto-deploys
```

Verify it's live:
```
https://tools.marth.systems/.well-known/assetlinks.json
```

## 6. Initialize TWA Project

```bash
bubblewrap init --manifest=https://tools.marth.systems/manifest.json
```

This creates a `twa/` directory with the full Android project.

## 7. Customize TWA Settings

Edit `twa/twa-manifest.json`:

```json
{
  "packageId": "com.mstools.dev",
  "host": "tools.marth.systems",
  "name": "MS Tools",
  "launcherName": "MS Tools",
  "display": "standalone",
  "themeColor": "#1e40af",
  "backgroundColor": "#ffffff",
  "enableNotifications": false,
  "startUrl": "/",
  "iconUrl": "https://tools.marth.systems/web-app-manifest-512x512.png",
  "maskableIconUrl": "https://tools.marth.systems/web-app-manifest-512x512.png",
  "monochromeIconUrl": "",
  "splashScreenFadeOutDuration": 300,
  "signingKey": {
    "path": "../ms-tools.keystore",
    "alias": "ms-tools"
  },
  "appVersionName": "1.0.0",
  "appVersionCode": 1
}
```

Key settings explained:
- **`launcherName: "MS Tools"`** — short name shown on the Android home screen
- **`themeColor: "#1e40af"`** — matches the PWA manifest's `theme_color`
- **`backgroundColor: "#ffffff"`** — matches the PWA manifest's `background_color` for splash screen
- **`enableNotifications: false`** — the PWA does not use push notifications
- **`signingKey`** — points to the keystore you generated in step 3

## 8. Build the Signed AAB

```bash
cd twa
bubblewrap build
```

Output:
- `app-release-signed.aab` — Android App Bundle for Play Store
- `app-release-signed.apk` — standalone APK for sideloading

## 9. Validate the TWA

```bash
bubblewrap validate --aab=app-release-signed.aab
```

This checks:
- Digital Asset Links verification
- Manifest correctness
- Signing validity

## 10. Upload to Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Create a new app
3. Developer name: **MS DevX**
4. Upload `app-release-signed.aab`
5. Complete store listing (use `PLAYSTORE_GUIDE.md` for content)
6. Set up App Integrity with your SHA256 fingerprint
7. Complete content rating questionnaire
8. Submit for review

---

## Testing Without Play Store

For testing before Play Store submission, install the APK directly:

```bash
# on a device with USB debugging enabled
adb install twa/app-release-signed.apk

# or drag the APK onto an emulator
```

Test:
- Launch the app — it should open the PWA in fullscreen
- Navigate between pages
- Go offline — verify the offline page shows
- Check the splash screen appears briefly on cold launch

---

## Updating the App

When you push PWA updates to the live site:

1. Optionally bump `appVersionCode` in `twa/twa-manifest.json` (not strictly required for TWA — the web content updates automatically via the service worker)
2. Only rebuild and re-submit to Play Store if you changed:
   - `twa-manifest.json` settings
   - App icon/splash screen
   - The keystore
3. Web content updates are served live — no Play Store update needed for new tools or bug fixes

---

## Common Issues

### Digital Asset Links (DAL) Verification Fails
- Ensure `assetlinks.json` is served with `Content-Type: application/json` (Vercel handles this automatically)
- Verify the SHA256 fingerprint in `assetlinks.json` exactly matches the one from `keytool -list -v`
- Use Google's [Statement List Generator](https://developers.google.com/digital-asset-links/tools/generator) to test:
  - Site: `tools.marth.systems`
  - Package: `com.mstools.dev`
  - Fingerprint: your SHA256 (with colons, lowercase)
- **Must deploy `assetlinks.json` before building the TWA** — Bubblewrap fetches it during build

### Signing Key Lost
**Cannot be recovered.** If lost:
- You must create a new Play Store listing with a new package name
- Users will have to re-download the new app
- **Back up `ms-tools.keystore` and its passwords in multiple secure locations**

### Splash Screen Shows White
- `background_color` in `manifest.json` must match `backgroundColor` in `twa-manifest.json`
- Both are set to `#ffffff` — verify on the live manifest at `https://tools.marth.systems/manifest.json`

### Build Failures
- Run `bubblewrap doctor` first
- Ensure `JAVA_HOME` points to JDK 17+
- Ensure `ANDROID_HOME` points to a valid Android SDK installation
- Delete `twa/` and re-run `bubblewrap init` if the manifest changed

### App Shows Chrome UI (Not Fullscreen)
- Verify `display: "standalone"` in both `manifest.json` and `twa-manifest.json`
- Ensure `bubblewrap init` read the latest manifest from the live URL
- Re-run `bubblewrap build` after fixing
