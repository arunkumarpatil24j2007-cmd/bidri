<?php
/**
 * Two small conveniences for the owner.
 *
 *  - yourdomain.in/studio  → opens Studio (asks for the login first if needed).
 *  - yourdomain.in/studio/app → downloads the Studio Android app.
 *  - Download order history as a spreadsheet file (CSV: opens in Excel / Google Sheets / Numbers).
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/* Short address: /studio */
add_action( 'init', function () {
	if ( wp_doing_ajax() || wp_doing_cron() || 'GET' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
		return;
	}
	$path = wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ?? '' ) ), PHP_URL_PATH );
	$base = untrailingslashit( (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ) );
	$path = untrailingslashit( (string) $path );
	if ( $path === $base . '/studio/app' ) {
		bs_send_app_file();
	}
	if ( $path === $base . '/studio' ) {
		nocache_headers();
		wp_safe_redirect( bs_url() ); // Logged-out visitors are sent to the login page by WordPress, then back here.
		exit;
	}
}, 1 );

/* Spreadsheet-safe text: stops "=…" "+…" "-…" "@…" being run as a formula when opened. */
function bs_csv_cell( $value ): string {
	$value = (string) $value;
	return ( '' !== $value && str_contains( "=+-@\t\r", $value[0] ) ) ? "'" . $value : $value;
}

add_action( 'admin_post_bidri_studio_export', function () {
	bs_guard( 'export', 'edit_shop_orders' );

	$range = sanitize_key( $_REQUEST['range'] ?? 'month' ); // phpcs:ignore WordPress.Security.NonceVerification -- checked in bs_guard().
	$now   = current_datetime();
	$from  = array(
		'month' => $now->modify( 'first day of this month 00:00:00' ),
		'year'  => $now->modify( 'first day of january this year 00:00:00' ),
		'all'   => null,
	);
	if ( ! array_key_exists( $range, $from ) ) {
		$range = 'month';
	}
	$args = array(
		'type'    => 'shop_order',
		'status'  => array( 'wc-processing', 'wc-completed', 'wc-on-hold', 'wc-refunded', 'wc-cancelled', 'wc-pending', 'wc-failed' ),
		'limit'   => -1,
		'orderby' => 'date',
		'order'   => 'DESC',
		'return'  => 'objects',
	);
	if ( $from[ $range ] ) {
		$args['date_created'] = '>=' . $from[ $range ]->getTimestamp();
	}
	$orders = wc_get_orders( $args );

	nocache_headers();
	header( 'Content-Type: text/csv; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename="bidri-orders-' . $range . '-' . gmdate( 'Y-m-d' ) . '.csv"' );
	$out = fopen( 'php://output', 'w' );
	fwrite( $out, "\xEF\xBB\xBF" ); // So Excel reads ₹ and names correctly.
	fputcsv( $out, array( 'Order', 'Date', 'Status', 'Name', 'Phone', 'Email', 'Address', 'City', 'State', 'PIN', 'Pieces', 'Total (INR)', 'Payment' ) );
	foreach ( $orders as $o ) {
		$pieces = array();
		foreach ( $o->get_items() as $item ) {
			$pieces[] = $item->get_quantity() . ' × ' . $item->get_name();
		}
		fputcsv( $out, array_map( 'bs_csv_cell', array(
			$o->get_order_number(),
			$o->get_date_created() ? $o->get_date_created()->date_i18n( 'Y-m-d H:i' ) : '',
			wc_get_order_status_name( $o->get_status() ),
			$o->get_formatted_shipping_full_name() ?: $o->get_formatted_billing_full_name(),
			$o->get_billing_phone(),
			$o->get_billing_email(),
			trim( $o->get_shipping_address_1() . ' ' . $o->get_shipping_address_2() ) ?: trim( $o->get_billing_address_1() . ' ' . $o->get_billing_address_2() ),
			$o->get_shipping_city() ?: $o->get_billing_city(),
			$o->get_shipping_state() ?: $o->get_billing_state(),
			$o->get_shipping_postcode() ?: $o->get_billing_postcode(),
			implode( '; ', $pieces ),
			$o->get_total(),
			$o->get_payment_method_title(),
		) ) );
	}
	fclose( $out );
	exit;
} );

/* The Android app, served with the right file type so phones offer to install it. */
function bs_send_app_file(): void {
	$file = BIDRI_STUDIO_DIR . '/assets/app/bidri-studio.apk';
	if ( ! file_exists( $file ) ) {
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}
	do_action( 'litespeed_control_set_nocache', 'app download' ); // phpcs:ignore WordPress.NamingConventions.ValidHookName
	nocache_headers();
	header( 'Content-Type: application/vnd.android.package-archive' );
	header( 'Content-Disposition: attachment; filename="Bidri-Studio.apk"' );
	header( 'Content-Length: ' . filesize( $file ) );
	readfile( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	exit;
}
