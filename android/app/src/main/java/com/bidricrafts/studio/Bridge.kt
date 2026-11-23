package com.bidricrafts.studio

import android.os.Build
import android.webkit.JavascriptInterface

/**
 * window.BidriApp — what the Studio page (studio.js) can ask the phone to do.
 * Every call is ignored unless the page showing is the shop's own Studio.
 */
class Bridge(private val activity: MainActivity) {
    private val prefs = Prefs(activity)

    @JavascriptInterface
    fun hasDevice(): Boolean = activity.isTrustedPage() && prefs.device != null

    @JavascriptInterface
    fun deviceName(): String {
        val maker = Build.MANUFACTURER.replaceFirstChar { it.uppercase() }
        return if (Build.MODEL.startsWith(maker, ignoreCase = true)) Build.MODEL else "$maker ${Build.MODEL}"
    }

    /** Studio hands over this phone's notification key, and the newest event so old ones aren't shown. */
    @JavascriptInterface
    fun connect(device: String, latest: String) {
        if (!activity.isTrustedPage() || !Regex("^\\d+\\.[A-Za-z0-9]{40}$").matches(device)) return
        prefs.device = device
        prefs.lastId = latest.toLongOrNull() ?: 0L
        activity.runOnUiThread { EventsWorker.schedule(activity) }
    }

    @JavascriptInterface
    fun notificationsAllowed(): Boolean = Notifier.allowed(activity)

    @JavascriptInterface
    fun askNotifications() {
        if (activity.isTrustedPage()) activity.runOnUiThread { activity.askNotifications(force = true) }
    }

    @JavascriptInterface
    fun share(text: String) {
        if (activity.isTrustedPage()) activity.runOnUiThread { activity.shareText(text) }
    }

    @JavascriptInterface
    fun print() {
        if (activity.isTrustedPage()) activity.runOnUiThread { activity.printPage() }
    }
}
