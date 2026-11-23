# Studio — Android app

A small app around Bidri Studio (`bidricrafts.in/studio`). Every Studio screen works in it, because it *is* Studio.
What the app adds:

- **Notifications**: new paid orders, exchange requests, a piece down to 1 or sold out.
  The phone asks the shop every 15 minutes in the background (Android's shortest background interval),
  every minute while the app is open, and straight away when it opens. Internet needed; no Firebase, no fees.
- Pull down to refresh, the phone's share sheet (payment links), printing (packing slips), downloads (order spreadsheets),
  camera or gallery for piece photos, an offline screen with **Try again**.
- Links outside Studio (the shop, WhatsApp, phone calls, email) open in the phone's own apps.

The shop side lives in the Studio plugin: `setup/plugins/bidri-studio/inc/api.php` (device keys, events feed) and `inc/events.php`.

## Build

Needs JDK 17+ and the Android SDK (platform 36). From this folder:

```bash
./gradlew assembleRelease
```

The signed APK is `app/build/outputs/apk/release/app-release.apk`. Copy it to
`setup/plugins/bidri-studio/assets/app/bidri-studio.apk`. The shop then serves it at `yourdomain.in/studio/app`.

## Signing key (keep it safe)

Release builds are signed with `bidri-studio-release.jks`, configured in `keystore.properties`:

```
storeFile=bidri-studio-release.jks
storePassword=…
keyAlias=bidri-studio
keyPassword=…
```

Both files are **not** in git. Keep a copy somewhere safe (password manager + a backup drive).
Every future update must be signed with the same key, or phones will refuse to install it over the old app.

## Updating the app

1. Change the code, raise `versionCode` (and `versionName`) in `app/build.gradle.kts`.
2. Build, copy the APK into the plugin as above, upload the plugin to the site.
3. The owner opens `yourdomain.in/studio/app` on the phone and installs it over the old one (nothing is lost).

## Test site

To point a build at another site (e.g. staging), change `SITE_URL` in `app/build.gradle.kts`. It must be `https`.
