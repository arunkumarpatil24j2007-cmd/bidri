package com.bidricrafts.studio

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/** The shop's small notification API (see the Studio plugin, inc/api.php). */
object Api {
    class Unauthorized : Exception()

    private fun post(path: String, body: JSONObject): JSONObject {
        val conn = URL(BuildConfig.SITE_URL + "/wp-json/bidri-studio/v1/" + path).openConnection() as HttpURLConnection
        try {
            conn.requestMethod = "POST"
            conn.connectTimeout = 15_000
            conn.readTimeout = 20_000
            conn.doOutput = true
            conn.useCaches = false
            conn.setRequestProperty("Content-Type", "application/json")
            conn.setRequestProperty("Accept", "application/json")
            conn.setRequestProperty("User-Agent", "BidriStudioApp/" + BuildConfig.VERSION_NAME)
            conn.outputStream.use { it.write(body.toString().toByteArray()) }
            val code = conn.responseCode
            if (code == 401) throw Unauthorized()
            if (code !in 200..299) throw java.io.IOException("HTTP $code")
            return JSONObject(conn.inputStream.bufferedReader().use { it.readText() })
        } finally {
            conn.disconnect()
        }
    }

    fun events(device: String, after: Long): JSONObject =
        post("events", JSONObject().put("device", device).put("after", after))

    fun forget(device: String) {
        try { post("device/forget", JSONObject().put("device", device)) } catch (_: Exception) { }
    }
}
