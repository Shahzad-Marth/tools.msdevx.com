# Asset Links Setup — MS Tools

Digital Asset Links (DAL) verify that your Android app is authorized to open URLs from your website. This is a **mandatory requirement** for Trusted Web Activity (TWA).

---

## What It Does

When a user clicks a link to `tools.marth.systems` from any app on their Android device, the DAL tells the OS: "The Android app `com.mstools.dev` is allowed to open this domain." Without DAL, the link opens in a browser instead of your TWA.

---

## File Location

```
public/.well-known/assetlinks.json
```

Served at: `https://tools.marth.systems/.well-known/assetlinks.json`

**This file is already created in the project** with a placeholder SHA256 fingerprint. You only need to replace the placeholder and deploy.

---

## Template

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mstools.dev",
      "sha256_cert_fingerprints": [
        "REPLACE_WITH_YOUR_SHA256_FINGERPRINT"
      ]
    }
  }
]
```

---

## Step-by-Step Setup

### 1. Generate a Signing Keystore

If you haven't already created one:

```bash
keytool -genkey -v -keystore ms-tools.keystore -alias ms-tools \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storetype jks -dname "CN=MS Tools, OU=Dev, O=MS Tools, L=City, ST=State, C=US"
```

You will be prompted for passwords. **Save these permanently.** If lost, you cannot update the app on Play Store.

### 2. Extract the SHA256 Fingerprint

```bash
keytool -list -v -keystore ms-tools.keystore -alias ms-tools -storepass YOUR_STORE_PASS
```

Look for this section in the output:

```
Certificate fingerprints:
         SHA1: ...
         SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
```

### 3. Format the Fingerprint

The `keytool` output includes colons. For `assetlinks.json`, remove all colons and keep uppercase:

- Raw output: `AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99`
- In JSON: `AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899`

### 4. Update `assetlinks.json`

Edit `public/.well-known/assetlinks.json` and replace `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` with the formatted fingerprint.

```json
{
  "sha256_cert_fingerprints": [
    "AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899"
  ]
}
```

### 5. Deploy to Vercel

```bash
git add public/.well-known/assetlinks.json
git commit -m "Update digital asset links with production SHA256"
git push
```

Vercel auto-deploys the change.

### 6. Verify the File Is Live

```bash
curl -I https://tools.marth.systems/.well-known/assetlinks.json
```

Expected:
- Status: `200 OK`
- Content-Type: `application/json`

Content should print your updated JSON.

### 7. Test with Google's DAL Generator

Use the [Statement List Generator](https://developers.google.com/digital-asset-links/tools/generator):

- **Site domain:** `tools.marth.systems`
- **App package:** `com.mstools.dev`
- **Fingerprint:** your SHA256 fingerprint **(with colons, lowercase)**

Click "Test Statement" — it should return "✅ Relationship granted: delegate_permission/common.handle_all_urls"

### 8. Add Fingerprint to Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app > Release > App Integrity
3. Under "App Signing Key Certificate", add your SHA256 fingerprint
4. This links the Play Store signing key to your asset links

---

## How Bubblewrap Uses This

When you run `bubblewrap init`, it fetches your manifest from `https://tools.marth.systems/manifest.json` and the DAL from `https://tools.marth.systems/.well-known/assetlinks.json`. It validates the DAL during `bubblewrap build` and embeds the relationship into the Android app.

**The `assetlinks.json` must be deployed and accessible before you run `bubblewrap build`.**

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **404 on `/well-known/assetlinks.json`** | Deploy to Vercel — the file must be on the live server |
| **Content-Type is not `application/json`** | Vercel serves `.json` files with the correct MIME type automatically. If proxying, ensure correct headers |
| **JSON parse error** | Validate at [jsonlint.com](https://jsonlint.com/) — check for trailing commas, missing quotes, extra brackets |
| **DAL Generator says "Could not parse"** | Check for trailing commas in the JSON array. Ensure `sha256_cert_fingerprints` is an array with one string |
| **Fingerprint mismatch** | Use the exact same keystore for both `assetlinks.json` and signing the AAB. Re-run `keytool -list -v` and double-check for typos |
| **"No matching fingerprint" error** | Ensure you removed all colons and kept uppercase in `assetlinks.json`. The DAL generator accepts both formats, but `assetlinks.json` prefers no colons |
| **Still failing after all checks** | Use Chrome's Site Isolation test: `chrome://inspect/#devices` > check the TWA's URL bar — if it shows the full URL instead of domain only, DAL is broken |

---

## Multiple Environments (Optional)

If you have staging or preview deployments, you can add multiple entries:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mstools.dev",
      "sha256_cert_fingerprints": [
        "PRODUCTION_SHA256"
      ]
    }
  }
]
```

For development, create separate apps with different package names (e.g., `com.mstools.dev`) and separate `assetlinks.json` entries.
