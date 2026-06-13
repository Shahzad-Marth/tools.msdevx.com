# TWA (Trusted Web Activity) Setup — MS Tools

## Prerequisites

- Java 17+ ✓ (already installed)
- Node.js ✓
- Google Play Console account ($25 one-time registration)
- An Android device or emulator for testing

---

## Step 1: Create App in Google Play Console

1. Go to https://play.google.com/console
2. Pay the $25 registration fee (one-time, per account, not per app)
3. Click **Create app**
   - Name: **MS Tools**
   - Default language: **English (en)**
   - App or game: **App**
   - Choose Free or Paid: **Free**
4. After creation, go to **Setup → App Integrity**
5. Under **App Signing Key Certificate**, copy the **SHA-256 fingerprint**

---

## Step 2: Host the Digital Asset Links File

1. Run this command with your SHA-256:

```bash
node -e "
const fs = require('fs');
const sha256 = 'YOUR_SHA256_FINGERPRINT';
const dal = [{
  relation: ['delegate_permission/common.handle_all_urls'],
  target: {
    namespace: 'android_app',
    package_name: 'com.mstools.dev',
    sha256_cert_fingerprints: [sha256]
  }
}];
fs.writeFileSync('public/.well-known/assetlinks.json', JSON.stringify(dal, null, 2));
console.log('assetlinks.json updated');
"
```

2. Deploy to production so it's live at:
   `https://tools.marth.systems/.well-known/assetlinks.json`

3. Verify it's reachable by visiting that URL in a browser.

---

## Step 3: Build the Android App Bundle

```bash
npx @bubblewrap/cli build --skipPwaValidation
```

This will:
- Download Android SDK (if not already installed)
- Generate the TWA Android project
- Build an **AAB** (Android App Bundle) in `app-release-signed/`

---

## Step 4: Submit to Play Console

1. Go to **Production → Overview**
2. Click **Create new release**
3. Upload the AAB file from `app-release-signed/app-release-signed.aab`
4. Fill in the store listing info (use `playstore/listing-text.md` as reference)
5. Upload assets from `playstore/` folder
6. Complete the **Content Rating** questionnaire
7. Submit for review

---

## Resources

| File | Purpose |
|------|---------|
| `twa-manifest.json` | Bubblewrap configuration |
| `public/.well-known/assetlinks.json` | DAL verification (need SHA-256) |
| `playstore/` | All store listing assets |
| `playstore-upload.zip` | Zipped assets for easy upload |
