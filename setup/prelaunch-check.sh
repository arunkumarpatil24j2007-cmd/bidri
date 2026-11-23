#!/usr/bin/env bash
# Pre-launch check. Run on the server from the WordPress folder:
#   bash ~/bidri-setup/prelaunch-check.sh
# Every line must say OK before you switch the store to Live.
WP="wp ${WP_PATH:+--path=$WP_PATH}"
fail=0
ok()   { printf '  \033[32mOK\033[0m    %s\n' "$1"; }
bad()  { printf '  \033[31mFIX\033[0m   %s\n' "$1"; fail=1; }
check() { if eval "$2" >/dev/null 2>&1; then ok "$1"; else bad "$1"; fi; }

echo "Bidri Crafts — pre-launch check"
check "HTTPS site address"                    "$WP option get home | grep -q '^https://'"
check "Theme bidri-crafts active"             "$WP theme is-active bidri-crafts"
check "WhatsApp number set"                   "$WP eval 'exit(bidri_detail(\"whatsapp\")?0:1);'"
check "Phone set"                             "$WP eval 'exit(bidri_detail(\"phone\")?0:1);'"
check "Customer email set"                    "$WP eval 'exit(bidri_detail(\"email\")?0:1);'"
check "Razorpay enabled"                      "$WP eval '\$s=get_option(\"woocommerce_razorpay_settings\"); exit((\$s[\"enabled\"]??\"\")===\"yes\"?0:1);'"
check "Razorpay uses LIVE keys (rzp_live_)"   "$WP eval '\$s=get_option(\"woocommerce_razorpay_settings\"); exit(str_starts_with(\$s[\"key_id\"]??\"\",\"rzp_live_\")?0:1);'"
check "Cash on delivery / bank / cheque off"  "$WP eval 'foreach([\"cod\",\"bacs\",\"cheque\"] as \$g){\$s=get_option(\"woocommerce_{\$g}_settings\"); if((\$s[\"enabled\"]??\"no\")===\"yes\") exit(1);} exit(0);'"
check "Emails sent through SMTP (WP Mail SMTP)" "$WP eval '\$o=get_option(\"wp_mail_smtp\"); exit(!empty(\$o[\"mail\"][\"mailer\"]) && \$o[\"mail\"][\"mailer\"]!==\"mail\"?0:1);'"
check "Sender email on your own domain"       "$WP eval '\$d=parse_url(home_url(),PHP_URL_HOST); \$d=preg_replace(\"/^www\\./\",\"\",\$d); exit(str_ends_with(get_option(\"woocommerce_email_from_address\"),\"@\".\$d)?0:1);'"
check "Two-factor plugin active"              "$WP plugin is-active two-factor"
check "Backups plugin active (or host daily backups confirmed)" "$WP plugin is-active updraftplus"
check "File editing disabled in wp-config"    "$WP config get DISALLOW_FILE_EDIT | grep -qi 1"
check "No admin user called 'admin'"          "! $WP user get admin"
check "No [YOUR …] placeholders in the database" "! $WP db search '\\[(YOUR|CLIENT|A line|Artisan name)' --regex --all-tables --format=count | grep -qv '^0$'"
check "No published product without a photo"  "$WP eval 'foreach(wc_get_products([\"status\"=>\"publish\",\"limit\"=>-1]) as \$p){ if(!\$p->get_image_id()) exit(1);} exit(0);'"
check "Privacy & Terms pages published"       "$WP eval 'exit(get_post_status(get_option(\"wp_page_for_privacy_policy\"))===\"publish\" && get_post_status(get_option(\"woocommerce_terms_page_id\"))===\"publish\"?0:1);'"
echo
if [ "$fail" = 0 ]; then
  echo "All good. Remaining manual checks (docs/07): real UPI test payment, email arrives, Shiprocket order sync."
  echo "Then: WooCommerce → Settings → Site visibility → Live."
else
  echo "Fix the lines marked FIX, then run this again."
fi
