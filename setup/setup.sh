#!/usr/bin/env bash
# Bidri Crafts — one-time store setup with WP-CLI.
#
#   Hostinger (SSH, from the site folder, e.g. ~/domains/YOURDOMAIN/public_html):
#       bash ~/bidri-setup/setup.sh --live
#   Local Docker:
#       docker compose run --rm cli bash /setup/setup.sh
#
# Safe to run again: it never duplicates products/pages and never overwrites products you edited.
#   --live    production: keeps the store in "Coming soon" mode until you launch, hardens wp-config,
#             installs LiteSpeed Cache (Hostinger servers are LiteSpeed).
#   --force   re-import products and pages from the files, overwriting edits (staging only!).
set -euo pipefail

SETUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIVE=0
for arg in "$@"; do
  case "$arg" in
    --live) LIVE=1 ;;
    --force) export BIDRI_FORCE=1 ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

WP="wp ${WP_PATH:+--path=$WP_PATH}"
say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

$WP core is-installed || { echo "WordPress is not installed here. Run this from the WordPress folder (or set WP_PATH)."; exit 1; }

say "Plugins (free, from wordpress.org only)"
# woocommerce        shop, cart, checkout, orders
# woo-razorpay       UPI / cards / netbanking (official Razorpay plugin)
# wp-mail-smtp       order emails that actually arrive
# updraftplus        off-site backups to Google Drive (free)
# two-factor         2FA for admin logins
# limit-login-attempts-reloaded   blocks password guessing
PLUGINS="woocommerce woo-razorpay wp-mail-smtp updraftplus two-factor limit-login-attempts-reloaded"
[ "$LIVE" = 1 ] && PLUGINS="$PLUGINS litespeed-cache"
for p in $PLUGINS; do
  if $WP plugin is-installed "$p"; then $WP plugin activate "$p" --quiet || true
  else $WP plugin install "$p" --activate --quiet; fi
  echo "  ✓ $p"
done
# Bidri Studio (our own owner panel): installed from this setup folder, updated on every run.
if [ -d "$SETUP_DIR/plugins/bidri-studio" ]; then
  PLUGIN_DIR="$($WP eval 'echo WP_PLUGIN_DIR;')"
  rm -rf "$PLUGIN_DIR/bidri-studio" && cp -R "$SETUP_DIR/plugins/bidri-studio" "$PLUGIN_DIR/bidri-studio"
fi
$WP plugin is-installed bidri-studio && $WP plugin activate bidri-studio --quiet && echo "  ✓ bidri-studio (owner panel)"
# Remove things we don't use (lighter, fewer things to update).
for p in hello akismet hostinger-ai-assistant hostinger-easy-onboarding; do
  $WP plugin is-installed "$p" && $WP plugin delete "$p" --quiet && echo "  – removed $p" || true
done

say "Theme"
$WP theme is-installed bidri-crafts || { echo "Upload the bidri-crafts theme first (Appearance → Themes → Add New → Upload)."; exit 1; }
$WP theme activate bidri-crafts
# Keep exactly one default theme as an emergency fallback.
for t in twentytwentythree twentytwentyfour; do $WP theme is-installed $t && $WP theme delete $t --quiet || true; done

say "Site basics"
$WP option update blogname "Bidri Crafts"
$WP option update blogdescription "Authentic GI-certified Bidriware, handmade in Bidar"
$WP option update timezone_string "Asia/Kolkata"
$WP option update date_format "j F Y"
$WP option update default_comment_status closed
$WP option update default_ping_status closed
$WP rewrite structure '/%postname%/' --quiet
$WP option update woocommerce_permalinks --format=json '{"product_base":"/product","category_base":"collection","tag_base":"product-tag","attribute_base":"","use_verbose_page_rules":false}'

say "WooCommerce: India, INR, tax-inclusive prices, guest checkout"
opt() { $WP option update "$1" "$2" --quiet || echo "  (could not set $1 — not critical)"; }
opt woocommerce_default_country "IN:KA"
opt woocommerce_store_address "Bidar"
opt woocommerce_store_city "Bidar"
opt woocommerce_store_postcode "585401"
opt woocommerce_currency "INR"
opt woocommerce_currency_pos "left"
opt woocommerce_price_thousand_sep ","
opt woocommerce_price_decimal_sep "."
opt woocommerce_price_num_decimals "0"
opt woocommerce_allowed_countries "specific"
$WP option update woocommerce_specific_allowed_countries --format=json '["IN"]' --quiet
opt woocommerce_ship_to_countries "specific"
$WP option update woocommerce_specific_ship_to_countries --format=json '["IN"]' --quiet
opt woocommerce_ship_to_destination "shipping"
# Tax: OFF until the GST rate/HSN is confirmed. Prices are entered INCLUSIVE of tax, so turning tax on
# later will not change what customers pay.
opt woocommerce_calc_taxes "no"
opt woocommerce_prices_include_tax "yes"
opt woocommerce_tax_display_shop "incl"
opt woocommerce_tax_display_cart "incl"
opt woocommerce_weight_unit "kg"
opt woocommerce_dimension_unit "cm"
opt woocommerce_manage_stock "yes"
opt woocommerce_hold_stock_minutes "60"
opt woocommerce_notify_low_stock_amount "1"
opt woocommerce_notify_no_stock_amount "0"
opt woocommerce_stock_format "no_amount"
opt woocommerce_enable_guest_checkout "yes"
opt woocommerce_enable_checkout_login_reminder "yes"
opt woocommerce_enable_signup_and_login_from_checkout "yes"
opt woocommerce_enable_myaccount_registration "no"
opt woocommerce_registration_generate_password "yes"
opt woocommerce_checkout_phone_field "required"
opt woocommerce_checkout_company_field "hidden"
opt woocommerce_checkout_address_2_field "optional"
opt woocommerce_enable_reviews "no"
opt woocommerce_cart_redirect_after_add "no"
opt woocommerce_enable_ajax_add_to_cart "yes"
opt woocommerce_single_image_width "800"
opt woocommerce_thumbnail_image_width "400"
opt woocommerce_thumbnail_cropping "1:1"
opt woocommerce_email_from_name "Bidri Crafts"
opt woocommerce_email_base_color "#1C1B19"
opt woocommerce_email_background_color "#F4F1EC"
opt woocommerce_email_body_background_color "#FBFAF8"
opt woocommerce_email_text_color "#1C1B19"
opt woocommerce_email_footer_text "Bidri Crafts · Handmade in Bidar · GI Tag No. 12"
opt woocommerce_allow_tracking "no"
opt woocommerce_show_marketplace_suggestions "no"
opt woocommerce_task_list_hidden "yes"
opt woocommerce_extended_task_list_hidden "yes"
$WP option update woocommerce_onboarding_profile --format=json '{"skipped":true}' --quiet
opt woocommerce_analytics_enabled "yes"
# Payment methods: only set on the FIRST run, so re-running never overwrites settings (or Razorpay keys)
# the owner has saved since. Razorpay is the only method; it is enabled once its keys are added.
for gw in bacs cheque cod; do
  $WP option get "woocommerce_${gw}_settings" >/dev/null 2>&1 \
    || $WP option update "woocommerce_${gw}_settings" --format=json '{"enabled":"no"}' --quiet
done
$WP option get woocommerce_razorpay_settings >/dev/null 2>&1 \
  || $WP option update woocommerce_razorpay_settings --format=json '{"enabled":"no","title":"UPI, cards & netbanking","description":"Pay securely with UPI, credit/debit cards or netbanking via Razorpay.","payment_action":"capture"}' --quiet

if [ "$LIVE" = 1 ]; then
  # Visitors see "Coming soon" until you finish the launch checklist. Admins see the real site.
  opt woocommerce_coming_soon "yes"
  opt woocommerce_store_pages_only "no"
else
  opt woocommerce_coming_soon "no"
fi

say "Categories, products, pages, shipping, site icon"
$WP eval-file "$SETUP_DIR/lib/import.php" "$SETUP_DIR"

say "Tidy up default content"
$WP post delete 1 --force --quiet 2>/dev/null || true   # "Hello world!"
$WP post delete 2 --force --quiet 2>/dev/null || true   # "Sample Page"

if [ "$LIVE" = 1 ]; then
  say "Hardening wp-config.php"
  $WP config set DISALLOW_FILE_EDIT true --raw --quiet
  $WP config set WP_POST_REVISIONS 10 --raw --quiet
  $WP config set WP_MEMORY_LIMIT 256M --quiet
  $WP config set WP_DEBUG false --raw --quiet
  WP_ROOT="$($WP eval 'echo untrailingslashit(ABSPATH);')"
  UPLOADS="$($WP eval 'echo wp_upload_dir()["basedir"];')"
  # Uploaded files can never run as code, and folders are never listed.
  printf '%s\n' '# Bidri Crafts: never run scripts from uploads' '<FilesMatch "\.(php|phtml|phar|php[0-9]?)$">' '  Require all denied' '</FilesMatch>' 'Options -Indexes' > "$UPLOADS/.htaccess"
  grep -q "Options -Indexes" "$WP_ROOT/.htaccess" 2>/dev/null || printf '\n# Bidri Crafts: no folder listings\nOptions -Indexes\n' >> "$WP_ROOT/.htaccess"
  # Files that only reveal the WordPress version (core updates may restore them; harmless).
  rm -f "$WP_ROOT/readme.html" "$WP_ROOT/license.txt" "$WP_ROOT/wp-config-sample.php"
  $WP option update users_can_register 0 --quiet
fi

$WP rewrite flush --quiet
$WP cache flush --quiet || true

say "Done."
cat <<EOF
Next steps (see docs/LAUNCH-GUIDE.md):
  1. Settings → Bidri Crafts: add WhatsApp, phone, email.
  2. WooCommerce → Settings → Payments → Razorpay: add API keys (test first), enable.
  3. WP Mail SMTP: connect your mailbox so order emails arrive.
  4. Shiprocket: connect this store as a WooCommerce channel.
  5. Run the launch checklist, then WooCommerce → Settings → Site visibility → Live.
EOF
