# Running the shop — everyday tasks

Everything here is done in WordPress at `https://yourdomain.in/wp-admin`.

## Studio — your shop panel
Open **`yourdomain.in/studio`** and log in with **your own owner account** (the long address `/wp-admin` works too). You land in **Studio**; that's all you need
day to day. It works on your phone too (tabs at the bottom, like an app).

**Put Studio on your phone's home screen (once):** open `yourdomain.in/studio` and log in, tick
**Remember me**, then:
- **iPhone (Safari):** Share button → **Add to Home Screen** → Add.
- **Android (Chrome):** ⋮ menu → **Add to Home screen** (or **Install app**) → Install.

A **Studio** icon appears next to your other apps. It opens full-screen, straight into Studio. Nothing to download
from an app store. If it ever asks you to log in again, that's normal. It happens every couple of weeks for safety.

| Tab | What it's for |
|---|---|
| **Today** | Sales today, orders to ship, pieces running low. |
| **Orders** | Every order. *To ship* · *Shipped* · *All*, and search by order number, name or phone. **Download** at the bottom gives a spreadsheet (this month / this year / everything) for your accountant or your own records. |
| **Pieces** | Every piece with its price and stock. Tap **−** / **+** to change stock. **Add a piece** to list a new one. |
| **Sales** | Revenue, orders and average order for 7 days / 30 days / 12 months, and your best pieces. |

## When an order comes in
1. You get a "New order" email, and it appears under **Studio → Orders → To ship**.
2. Open it: you see the pieces, the address, the phone (tap to call or WhatsApp) and any **gift note**.
3. Pack it **with its GI certificate**. Record a short video while packing (useful for damage claims).
4. Ship it from **Shiprocket** (the order is already there), then press **Mark as shipped** in Studio.
   The customer is emailed automatically. (Shiprocket can also mark it shipped for you once delivered.)
5. Pressed it by mistake? Open the order and tap **Not shipped yet? Move back**.

## Add a new piece
**Studio → Pieces → Add a piece.** Photo, name, price (the full price including tax), how many you have, collection,
one or two sentences about it, size and weight. **Show in shop** makes it visible; **Show in Bestsellers** puts it on
the homepage. Press **Add piece**. Phone photos are fine — the site makes web-sized copies automatically.

## Change a price or stock
**Studio → Pieces** → tap **−** / **+** for stock, or tap the piece to change its price, photo or text → **Save**.

## Mark a piece sold / back in stock
Set stock to 0 and it shows **Sold out** everywhere and can't be bought. Raise it and it's back on sale.

## The homepage banner (rotating slides for festivals & offers)
The banner shows **5 slides** that change every 6 seconds. Visitors can swipe, use the arrows/dots, or pause it.
It pauses by itself while someone's mouse is over it.

Edit it in **Appearance → Editor → Pages/Templates → Homepage**, then click the banner. Open **List View**
(the ☰ icon, top left) to see the slides as "Group" blocks inside "bc-slides".

- **Change a slide:** click its photo → **Replace** → upload. Click any text to retype it. Click the button → change its link.
- **Add a slide:** select a slide group → ⋮ menu → **Duplicate**, then edit the copy.
- **Remove a slide:** select it → ⋮ → **Delete**.
- **Reorder:** select a slide → move it up/down with the arrows in the toolbar.
- **Run a slide only on certain dates** (e.g. a sale): select the slide group → right panel → **Advanced →
  Additional CSS class(es)** → add `bc-from-2026-12-20 bc-until-2026-12-31` (either or both, keep the other words
  that are already there). Outside those dates the slide disappears on its own.
- **Speed:** select the outer slider group → Additional CSS classes → change `bc-every-6` to e.g. `bc-every-8` (seconds).
- **Dark or light slide:** dark slides (class `bc-hero--dark bc-on-dark`) suit a wide dark photo with the subject on the
  right; light slides (`bc-hero--light`) suit a product photo on a plain light background.
- Keep the **first slide always on** (no dates). Its title is the page's main heading for Google.
- Every slide's button stays burgundy; only one slide is visible at a time, so the "one burgundy button" rule holds.
- **Offers:** to run a discount, create it in **Marketing → Coupons** (e.g. code `DIWALI10`, start/end dates), then add a
  slide that announces it with the same dates. Don't announce an offer you haven't set up as a coupon.

## Change contact details
**Settings → Bidri Crafts.** One place, used everywhere on the site.

## Refund an order
**Studio → Orders → open it → Refund** (opens WooCommerce's order screen) → **Refund** → enter amount →
**Refund ₹… via Razorpay**. The money goes back to the customer automatically.
Unpaid orders (awaiting payment) can simply be cancelled from Studio; their pieces go back into stock.

## Photos — keep the site fast
Phone photos are 3–8 MB; the site needs about 100 KB. Before uploading, run (on your computer):
```bash
python3 scripts/optimize-images.py ~/Desktop/new-photos ~/Desktop/web-photos --square
```
Upload the files from `web-photos`. Photo tips: plain light warm-grey background, soft daylight from one side,
square framing with space around the piece. Per piece: front, inlay close-up, one in a room or held, the base.

## Updates (once a week, not during a festival rush)
1. Take a backup (**UpdraftPlus → Backup Now**).
2. **Dashboard → Updates** → update plugins. (WordPress applies small security updates itself.)
3. Open the shop, add something to the bag, go to checkout. If anything looks wrong, restore the backup and message your developer.

## The one design rule
Burgundy is reserved for the **single most important button on each page** (Explore, Add to bag, Proceed to checkout,
Place order). Don't make other buttons or text burgundy. That's what keeps the main action obvious.
