package com.bidricrafts.studio

import android.Manifest
import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.os.Handler
import android.os.Looper
import android.print.PrintAttributes
import android.print.PrintManager
import android.provider.MediaStore
import android.provider.Settings
import android.view.View
import android.webkit.CookieManager
import android.webkit.URLUtil
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import java.io.File

/**
 * The app: Bidri Studio (yourdomain.in/studio) full screen, plus what a website can't do on its own —
 * notifications, the phone's share sheet, printing, downloads, camera for piece photos.
 */
class MainActivity : ComponentActivity() {

    companion object {
        const val EXTRA_URL = "url"
        private const val FOREGROUND_CHECK_MS = 60_000L
    }

    private lateinit var web: WebView
    private lateinit var swipe: SwipeRefreshLayout
    private lateinit var progress: ProgressBar
    private lateinit var offline: View
    private val prefs by lazy { Prefs(this) }
    private val site by lazy { Uri.parse(BuildConfig.SITE_URL) }
    private val handler = Handler(Looper.getMainLooper())

    @Volatile private var currentUrl: String = ""
    private var mainFrameFailed = false

    private var fileCallback: ValueCallback<Array<Uri>>? = null
    private var cameraUri: Uri? = null

    private val pickFile = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { res ->
        val picked = WebChromeClient.FileChooserParams.parseResult(res.resultCode, res.data)
        val result = when {
            picked != null && picked.isNotEmpty() -> picked
            res.resultCode == RESULT_OK && cameraUri != null && hasContent(cameraUri!!) -> arrayOf(cameraUri!!)
            else -> null
        }
        fileCallback?.onReceiveValue(result)
        fileCallback = null
    }

    private val notifPermission = registerForActivityResult(ActivityResultContracts.RequestPermission()) {
        web.evaluateJavascript("document.dispatchEvent(new Event('visibilitychange'))", null)
    }

    private val foregroundCheck = object : Runnable {
        override fun run() {
            EventsWorker.checkNow(this@MainActivity)
            handler.postDelayed(this, FOREGROUND_CHECK_MS)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        setContentView(R.layout.activity_main)

        val root = findViewById<View>(R.id.root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { v, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            val ime = insets.getInsets(WindowInsetsCompat.Type.ime())
            v.setPadding(bars.left, bars.top, bars.right, maxOf(bars.bottom, ime.bottom))
            WindowInsetsCompat.CONSUMED
        }
        WindowCompat.getInsetsController(window, root).apply {
            isAppearanceLightStatusBars = true
            isAppearanceLightNavigationBars = true
        }

        web = findViewById(R.id.web)
        swipe = findViewById(R.id.swipe)
        progress = findViewById(R.id.progress)
        offline = findViewById(R.id.offline)

        Notifier.createChannels(this)
        setUpWebView()

        swipe.setColorSchemeColors(ContextCompat.getColor(this, R.color.burgundy))
        swipe.setOnRefreshListener { web.reload() }
        swipe.setOnChildScrollUpCallback { _, _ -> web.scrollY > 0 }
        findViewById<View>(R.id.retry).setOnClickListener { offline.visibility = View.GONE; web.reload() }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (web.canGoBack()) web.goBack() else finish()
            }
        })

        if (savedInstanceState != null) web.restoreState(savedInstanceState)
        else web.loadUrl(startUrl(intent))

        EventsWorker.schedule(this)
        askNotifications(force = false)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setUpWebView() {
        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            setSupportZoom(false)
            builtInZoomControls = false
            mediaPlaybackRequiresUserGesture = true
            userAgentString = "$userAgentString BidriStudioApp/${BuildConfig.VERSION_NAME}"
        }
        CookieManager.getInstance().apply {
            setAcceptCookie(true)
            setAcceptThirdPartyCookies(web, false)
        }
        web.addJavascriptInterface(Bridge(this), "BidriApp")

        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                if (isStudio(uri)) {
                    if (uri.getQueryParameter("action") == "logout") forgetDevice()
                    return false
                }
                openOutside(uri)
                return true
            }

            override fun onPageStarted(view: WebView, url: String, favicon: android.graphics.Bitmap?) {
                currentUrl = url
                mainFrameFailed = false
                progress.visibility = View.VISIBLE
            }

            override fun onPageFinished(view: WebView, url: String) {
                currentUrl = url
                progress.visibility = View.GONE
                swipe.isRefreshing = false
                offline.visibility = if (mainFrameFailed) View.VISIBLE else View.GONE
                CookieManager.getInstance().flush() // Stay logged in after the app is closed.
            }

            override fun onReceivedError(view: WebView, request: WebResourceRequest, error: WebResourceError) {
                if (request.isForMainFrame) {
                    mainFrameFailed = true
                    offline.visibility = View.VISIBLE
                    swipe.isRefreshing = false
                    progress.visibility = View.GONE
                }
            }
        }

        web.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(view: WebView, callback: ValueCallback<Array<Uri>>, params: FileChooserParams): Boolean {
                fileCallback?.onReceiveValue(null)
                fileCallback = callback
                return openFilePicker(params)
            }
        }

        web.setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
            download(url, userAgent, contentDisposition, mimeType)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        intent.getStringExtra(EXTRA_URL)?.let { if (isStudio(Uri.parse(it))) web.loadUrl(it) }
    }

    override fun onResume() {
        super.onResume()
        web.onResume()
        handler.post(foregroundCheck)
    }

    override fun onPause() {
        handler.removeCallbacks(foregroundCheck)
        web.onPause()
        CookieManager.getInstance().flush()
        super.onPause()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    /* ------------------------------------------------------------ Pages */

    private fun startUrl(intent: Intent?): String {
        val fromNotification = intent?.getStringExtra(EXTRA_URL)
        return if (fromNotification != null && isStudio(Uri.parse(fromNotification))) fromNotification
        else BuildConfig.SITE_URL + "/studio"
    }

    /** Studio and its login stay in the app. Everything else (the shop, WhatsApp, maps…) opens outside. */
    private fun isStudio(uri: Uri): Boolean {
        if (uri.scheme != "https" || !sameSite(uri.host)) return false
        val path = uri.path ?: ""
        return path.startsWith("/wp-admin") || path.startsWith("/wp-login.php") || path == "/studio" || path.startsWith("/studio/")
    }

    private fun sameSite(host: String?): Boolean {
        val h = host?.lowercase()?.removePrefix("www.") ?: return false
        return h == site.host?.lowercase()?.removePrefix("www.")
    }

    /** True while the page on screen is the shop's own Studio (checked by the JavaScript bridge). */
    fun isTrustedPage(): Boolean = currentUrl.isNotEmpty() && isStudio(Uri.parse(currentUrl))

    private fun openOutside(uri: Uri) {
        val intent = when (uri.scheme) {
            "tel" -> Intent(Intent.ACTION_DIAL, uri)
            "intent" -> try { Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME).apply { addCategory(Intent.CATEGORY_BROWSABLE); component = null; selector = null } } catch (_: Exception) { null }
            else -> Intent(Intent.ACTION_VIEW, uri)
        } ?: return
        try {
            startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        } catch (_: ActivityNotFoundException) {
            Toast.makeText(this, R.string.no_app, Toast.LENGTH_SHORT).show()
        }
    }

    /* ------------------------------------------------------------ Notifications */

    fun askNotifications(force: Boolean) {
        if (Build.VERSION.SDK_INT >= 33 &&
            ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            if (!prefs.askedPermission || shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)) {
                prefs.askedPermission = true
                notifPermission.launch(Manifest.permission.POST_NOTIFICATIONS)
                return
            }
        }
        if (force && !Notifier.allowed(this)) {
            // Asked before and refused: the switch is in the phone's settings now.
            startActivity(Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, packageName))
        }
    }

    /** Logging out of Studio also stops notifications on this phone. */
    private fun forgetDevice() {
        val device = prefs.device ?: return
        prefs.device = null
        Thread { Api.forget(device) }.start()
    }

    /* ------------------------------------------------------------ Share, print, files */

    fun shareText(text: String) {
        val send = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text)
        startActivity(Intent.createChooser(send, getString(R.string.share)))
    }

    fun printPage() {
        val pm = getSystemService(PrintManager::class.java)
        val title = web.title ?: getString(R.string.app_name)
        pm.print(title, web.createPrintDocumentAdapter(title), PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.ISO_A4).build())
    }

    /** Photo for a piece: the gallery or files, or take one with the camera. */
    private fun openFilePicker(params: WebChromeClient.FileChooserParams): Boolean {
        val pick = try { params.createIntent() } catch (_: Exception) { Intent(Intent.ACTION_GET_CONTENT).setType("image/*") }
        val extras = mutableListOf<Intent>()
        cameraUri = null
        val wantsImages = params.acceptTypes.isEmpty() || params.acceptTypes.any { it.isBlank() || it.startsWith("image") }
        if (wantsImages) {
            try {
                val dir = File(cacheDir, "camera").apply { mkdirs() }
                val file = File.createTempFile("piece-", ".jpg", dir)
                val uri = FileProvider.getUriForFile(this, "$packageName.files", file)
                cameraUri = uri
                extras += Intent(MediaStore.ACTION_IMAGE_CAPTURE).putExtra(MediaStore.EXTRA_OUTPUT, uri)
                    .addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION or Intent.FLAG_GRANT_READ_URI_PERMISSION)
            } catch (_: Exception) { }
        }
        val chooser = Intent.createChooser(pick, getString(R.string.add_photo)).putExtra(Intent.EXTRA_INITIAL_INTENTS, extras.toTypedArray())
        return try {
            pickFile.launch(chooser)
            true
        } catch (_: ActivityNotFoundException) {
            fileCallback?.onReceiveValue(null)
            fileCallback = null
            false
        }
    }

    private fun hasContent(uri: Uri): Boolean = try {
        contentResolver.openAssetFileDescriptor(uri, "r")?.use { it.length > 0 } ?: false
    } catch (_: Exception) { false }

    /** Order spreadsheets and other files, with the login cookie so the shop allows it. */
    private fun download(url: String, userAgent: String, contentDisposition: String?, mimeType: String?) {
        val uri = Uri.parse(url)
        if (!sameSite(uri.host)) { openOutside(uri); return }
        val name = URLUtil.guessFileName(url, contentDisposition, mimeType)
        val req = DownloadManager.Request(uri)
            .addRequestHeader("Cookie", CookieManager.getInstance().getCookie(url) ?: "")
            .addRequestHeader("User-Agent", userAgent)
            .setTitle(name)
            .setMimeType(mimeType)
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
        if (Build.VERSION.SDK_INT >= 29) req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, name)
        else req.setDestinationInExternalFilesDir(this, Environment.DIRECTORY_DOWNLOADS, name)
        getSystemService(DownloadManager::class.java).enqueue(req)
        Toast.makeText(this, R.string.downloading, Toast.LENGTH_SHORT).show()
    }
}
