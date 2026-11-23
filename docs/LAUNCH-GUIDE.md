# Launch guide — from Hostinger account to taking real orders

Follow these steps in order. Steps marked **YOU** need your accounts, documents, or decisions.
Everything else is already built into the theme and the setup script.

---

## What it costs to run

| Item | Cost | Notes |
|---|---|---|
| Hostinger web hosting | Your plan (yearly) | Pick **Business** if you can. It has **daily backups** and more power for WooCommerce. Premium works too, but its backups are weekly, so keep UpdraftPlus on. |
| Domain | Already owned | Renew yearly with your registrar. |
| SSL certificate (https) | Free | Included with Hostinger. |
| WordPress, WooCommerce, theme, all plugins | **Free** | All from wordpress.org. No premium plugins, no monthly fees. |
| Razorpay | **Per transaction only** | No setup or monthly fee on the Standard plan. About 2% per payment plus GST. Check razorpay.com/pricing for current rates. |
| Shiprocket | **Per shipment only** | Free plan has no monthly fee. You prepay a wallet and each label is deducted from it. |
| Order emails (SMTP) | Free | Your Hostinger mailbox, or Brevo's free plan (300 emails/day). |
| Backups off-site | Free | UpdraftPlus → your Google Drive. |
| Uptime alerts | Free | UptimeRobot free plan. |

Nothing else needs a subscription. If any plugin or service asks for money later, you don't need it. Say no.

---

## 1. Hostinger — **YOU** (about 20 minutes)

1. Buy the hosting plan. In hPanel choose **Add website → WordPress**, and use your **existing domain**.
2. **Point your domain to Hostinger.** At your domain registrar, change the nameservers to the ones hPanel shows
   (Domains → your domain → DNS / Nameservers). This can take a few hours to take effect.
3. When the WordPress installer asks:
   - Admin username: **not** `admin` (for example your first name plus a number). Use a long password and keep it in a password manager.
   - Skip / decline Hostinger's AI site builder, onboarding theme and extra plugins.
4. hPanel → **Security → SSL**: install the free SSL and turn on **Force HTTPS**.
5. hPanel → **Advanced → PHP configuration**: choose **PHP 8.3**.
6. hPanel → **Advanced → SSH Access**: enable SSH and note the connection command and password.

## 2. Upload the theme and setup files (10 minutes)

On your computer, in this project folder, run `bash scripts/package.sh`. It creates two files in `dist/`:

- `bidri-crafts.zip`: in WordPress go to **Appearance → Themes → Add New → Upload Theme**, choose this zip, then **Install**. Don't activate yet; the script does that.
- `bidri-setup.zip`: in hPanel **File Manager**, open your **home folder** (the top level, *not* public_html), upload it, right-click → **Extract**. You will have a `bidri-setup` folder.

## 3. Run the setup script (5 minutes)

Open a terminal (Mac: Terminal app) and connect with the SSH command from step 1.6, then:

```bash
cd ~/domains/YOURDOMAIN.in/public_html     # your site's folder (hPanel shows the exact path)
bash ~/bidri-setup/setup.sh --live
```

It installs the free plugins and sets India / INR / free insured shipping / guest checkout. It also creates the
6 collections, 17 products with photos, all pages (Our Craft, Contact, Shipping, Returns, Care, GI Registry, Privacy,
Terms), and hardens security. With `--live`, the store stays in **Coming soon** mode, so visitors can't buy until you
say so. You (logged in) see the real site.

It is safe to run again. It never duplicates anything or overwrites prices you changed.

> No SSH? Send me the hPanel access and I can run it, or follow `docs/05-content-and-products.md` to import by hand.

## 4. Your contact details — **YOU** (2 minutes)

WordPress → **Settings → Bidri Crafts**: WhatsApp number, phone, email, support hours, and optionally GSTIN,
an artisan quote and the "days to make a platter" line. They appear across the whole site automatically.
Empty fields are simply hidden, so nothing half-finished ever shows.

## 4b. The owner's login for Studio — **YOU** (2 minutes)

(The owner can also install the **Studio Android app** from `yourdomain.in/studio/app`: notifications for orders,
exchange requests and low stock. See `OWNER-GUIDE.md`.)


WordPress → **Users → Add New User**: the owner's name and email, role **Shop manager**, a strong password.
The owner opens **`yourdomain.in/studio`** (put it on their phone's home screen; see `OWNER-GUIDE.md`). That account opens straight into **Studio** (Today · Orders · Pieces · Sales) and can't see or break anything else.
Keep your own Administrator account for setup and updates. Turn on two-factor for both (step 8).

## 5. Order emails that actually arrive — **YOU** (15 minutes)

Without this, order emails often land in spam or never arrive.

1. Create a mailbox on your domain, e.g. `orders@yourdomain.in` (hPanel → Emails). If your plan has no email,
   create a free account at **brevo.com** and verify your domain there.
2. WordPress → **WP Mail SMTP → Settings**:
   - From email: `orders@yourdomain.in`, From name: `Bidri Crafts`, tick **Force From Email**.
   - Mailer: **Other SMTP** with Hostinger's SMTP details (hPanel → Emails → Configure devices: host
     `smtp.hostinger.com`, port 465, SSL, your mailbox and password), **or** choose **Brevo** and paste its API key.
3. WP Mail SMTP → **Tools → Email Test**: send a test to your Gmail. It must arrive in the inbox, not spam.
4. hPanel → Emails → check that **SPF and DKIM** are set (Hostinger adds them automatically when DNS is on Hostinger).
5. WooCommerce → **Settings → Emails**: set "From address" to the same `orders@yourdomain.in`.
   For the header image, upload `theme/bidri-crafts/assets/images/favicon-512.png` (or a PNG logo; email programs ignore SVG).

## 6. Razorpay payments — **YOU** (KYC takes 1–3 days)

1. Sign up at **razorpay.com** → complete **KYC**: PAN, bank account, business details, website URL.
   Razorpay checks your website for Contact, Terms, Privacy, Refund/Cancellation and Shipping pages. **All of these already exist.**
   The Refund/Cancellation page is **Exchange policy** (`/returns/`): no cancellations or returns, exchanges within 7 days.
   Read them once (step 10) before you submit.
2. In the Razorpay dashboard switch to **Test mode** → **Account & Settings → API keys** → generate a **test** key.
3. WordPress → **WooCommerce → Settings → Payments → Razorpay** → paste Key ID + Key Secret → **Enable** → Save.
4. **Webhook** (marks orders as paid even if a customer closes the browser mid-payment): the plugin sets it up
   when you save keys. Confirm in Razorpay → **Webhooks** that there is one pointing to
   `https://YOURDOMAIN.in/wp-admin/admin-post.php?action=rzp_wc_webhook`. If not, add it with events
   `payment.authorized`, `payment.failed`, `order.paid`, `refund.created`, and put the same webhook secret in the plugin settings.
5. Place test orders on your site (Razorpay's test UPI ID / test cards are on razorpay.com/docs). Check:
   order shows **Processing**, stock goes down, you and the "customer" both get emails, gift note appears in the order.
   Also try cancelling a payment: the order should stay **Pending/Failed** and the bag keeps its items.
6. Refund one test order from WooCommerce → Orders → Refund → "Refund via Razorpay". It should show in the Razorpay dashboard.
   (Refunds are only for orders you can't fulfil; customers get exchanges, not refunds.)
7. After KYC approval: switch the dashboard to **Live mode**, generate **live** keys (`rzp_live_…`), paste them into the
   plugin, and check the webhook again in Live mode.

## 7. Shiprocket shipping — **YOU** (30 minutes)

Shiprocket connects directly to WooCommerce. **No plugin is needed.**

1. Sign up at **shiprocket.in** (free plan) → complete KYC → add your **pickup address** in Bidar → recharge the wallet.
2. WordPress → **WooCommerce → Settings → Advanced → REST API → Add key**: description "Shiprocket",
   your user, permissions **Read/Write** → Generate. Copy the **Consumer key** and **Consumer secret** (shown once).
3. Shiprocket → **Channels → Add new channel → WooCommerce** → paste your store URL (`https://yourdomain.in`), the key and
   the secret → turn on order sync and **status sync** (so delivered orders are marked Completed in WooCommerce).
4. Place a test order. Within about 15 minutes it appears in Shiprocket → Orders. Ship it there: choose courier → label →
   schedule pickup. Shiprocket sends the customer tracking updates.
5. **Insurance:** the site promises *free insured shipping*. Either turn on Shiprocket's **shipment protection**
   (a small per-shipment charge) for every order, or accept that you cover damage yourself through the
   7-day replacement promise. Decide which before launch.
6. The weight on each product (already filled in from your old site) is what Shiprocket uses for its rate
   estimate. Update it to the **packed** weight when you know it (Products → edit → Shipping).

## 8. Security & backups (10 minutes)

- **Users → Profile → Two-Factor Options**: turn on an authenticator app (Google Authenticator / Authy). Do this for every admin.
- **Backups**: on the Business plan, Hostinger takes daily backups (hPanel → Files → Backups). Also set up
  **UpdraftPlus → Settings**: database daily, files weekly, remote storage **Google Drive**, keep 14. Click "Backup now"
  once, then **restore it once on a test** so you know it works.
- **Cron** (makes order emails and stock holds run on time even when traffic is low): hPanel → Advanced → **Cron Jobs** →
  every 5 minutes: `wget -q -O - https://YOURDOMAIN.in/wp-cron.php?doing_wp_cron >/dev/null 2>&1`,
  then add `define('DISABLE_WP_CRON', true);` to wp-config.php (hPanel File Manager).
- **LiteSpeed Cache** (installed by `--live`): leave the defaults. **Do not** turn on CSS/JS "minify/combine" or "defer".
  They are the most common cause of broken checkouts. Cart, checkout and account pages are excluded automatically.
- Free uptime alerts: **uptimerobot.com** → monitor `https://yourdomain.in` → alerts to your email/phone.

## 9. GST — **YOU** (ask your accountant)

Prices are entered **inclusive of tax**, so customers pay exactly the listed price either way. Tax is switched **off**
until you confirm your GST registration, rate and HSN code. Once you have them: WooCommerce → Settings → General →
**Enable tax rates**, then Tax → Standard rates → add India with your rate. Add your GSTIN in Settings → Bidri Crafts so it shows in the footer.

## 10. Before you go live

1. Read every policy page (Shipping, Exchange policy, Privacy, Terms, Care guide) and change anything that
   isn't how you actually work. **In particular:** no cancellations or returns; exchanges within 7 days of delivery;
   "I'd like a different piece" exchanges are at the customer's cost for courier and any price difference; store credit
   for 12 months as the alternative. These are sensible defaults, not legal advice.
2. **Replace the product photos with real photos of your actual pieces** (see "Photos" in `docs/OWNER-GUIDE.md`).
   The current ones are carried over from the old site and are fine for building, but customers must see the real piece they will receive.
3. Run the checker. Every line must say OK:
   ```bash
   bash ~/bidri-setup/prelaunch-check.sh
   ```
4. On your phone (UPI app installed), make one **real ₹ payment** for a cheap piece and refund it.
5. **WooCommerce → Settings → Site visibility → Live.** You're open.
