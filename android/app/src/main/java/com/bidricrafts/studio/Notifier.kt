package com.bidricrafts.studio

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import org.json.JSONObject

/** One notification per shop event: new order, exchange request, running low. */
object Notifier {
    private val channels = listOf(
        Triple("order", R.string.channel_orders, NotificationManager.IMPORTANCE_HIGH),
        Triple("exchange", R.string.channel_exchanges, NotificationManager.IMPORTANCE_HIGH),
        Triple("stock", R.string.channel_stock, NotificationManager.IMPORTANCE_DEFAULT),
    )

    fun createChannels(context: Context) {
        val nm = context.getSystemService(NotificationManager::class.java)
        channels.forEach { (id, name, importance) ->
            nm.createNotificationChannel(NotificationChannel(id, context.getString(name), importance))
        }
    }

    fun allowed(context: Context): Boolean {
        if (Build.VERSION.SDK_INT >= 33 &&
            ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) return false
        return NotificationManagerCompat.from(context).areNotificationsEnabled()
    }

    fun show(context: Context, event: JSONObject) {
        if (!allowed(context)) return
        val id = event.optLong("id").toInt()
        val type = event.optString("type").takeIf { t -> channels.any { it.first == t } } ?: "order"
        val open = Intent(context, MainActivity::class.java)
            .setFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            .putExtra(MainActivity.EXTRA_URL, event.optString("url"))
        val tap = PendingIntent.getActivity(context, id, open, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val n = NotificationCompat.Builder(context, type)
            .setSmallIcon(R.drawable.ic_stat_studio)
            .setColor(ContextCompat.getColor(context, R.color.burgundy))
            .setContentTitle(event.optString("title"))
            .setContentText(event.optString("body"))
            .setStyle(NotificationCompat.BigTextStyle().bigText(event.optString("body")))
            .setCategory(if (type == "stock") NotificationCompat.CATEGORY_REMINDER else NotificationCompat.CATEGORY_MESSAGE)
            .setContentIntent(tap)
            .setAutoCancel(true)
            .build()
        try {
            NotificationManagerCompat.from(context).notify(id, n)
        } catch (_: SecurityException) { }
    }
}
