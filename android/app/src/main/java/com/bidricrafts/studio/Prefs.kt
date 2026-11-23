package com.bidricrafts.studio

import android.content.Context

/** The little the app remembers: its device key for notifications and the last alert it showed. */
class Prefs(context: Context) {
    private val sp = context.applicationContext.getSharedPreferences("studio", Context.MODE_PRIVATE)

    var device: String?
        get() = sp.getString("device", null)
        set(value) = sp.edit().putString("device", value).apply()

    var lastId: Long
        get() = sp.getLong("last_id", 0L)
        set(value) = sp.edit().putLong("last_id", value).apply()

    var askedPermission: Boolean
        get() = sp.getBoolean("asked_permission", false)
        set(value) = sp.edit().putBoolean("asked_permission", value).apply()
}
