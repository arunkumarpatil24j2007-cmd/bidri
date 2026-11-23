package com.bidricrafts.studio

import android.content.Context
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import java.util.concurrent.TimeUnit

/**
 * Asks the shop "anything new?" — every 15 minutes in the background (Android's shortest
 * background interval), every minute while the app is open, and right when it opens.
 * Only when there is internet.
 */
class EventsWorker(context: Context, params: WorkerParameters) : Worker(context, params) {

    override fun doWork(): Result {
        val prefs = Prefs(applicationContext)
        val device = prefs.device ?: return Result.success()
        return try {
            val res = Api.events(device, prefs.lastId)
            val events = res.getJSONArray("events")
            for (i in 0 until events.length()) Notifier.show(applicationContext, events.getJSONObject(i))
            prefs.lastId = maxOf(prefs.lastId, res.optLong("next", prefs.lastId))
            Result.success()
        } catch (_: Api.Unauthorized) {
            prefs.device = null // Password changed or phone removed in Studio: reconnects next time Studio opens.
            Result.success()
        } catch (_: Exception) {
            Result.retry()
        }
    }

    companion object {
        private val online = Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()

        fun schedule(context: Context) {
            WorkManager.getInstance(context).enqueueUniquePeriodicWork(
                "studio-events",
                ExistingPeriodicWorkPolicy.KEEP,
                PeriodicWorkRequestBuilder<EventsWorker>(15, TimeUnit.MINUTES).setConstraints(online).build(),
            )
        }

        fun checkNow(context: Context) {
            WorkManager.getInstance(context).enqueueUniqueWork(
                "studio-events-now",
                ExistingWorkPolicy.KEEP,
                OneTimeWorkRequestBuilder<EventsWorker>().setConstraints(online).build(),
            )
        }
    }
}
