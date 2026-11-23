<?php
/**
 * Never sell the same piece twice.
 *
 * Found in testing (WooCommerce 11.3, MariaDB): when several customers check out the same
 * last piece in the same instant, more orders can be accepted than there is stock
 * (15 simultaneous checkouts on 3 pieces → 5 orders; a one-of-one piece sold twice).
 *
 * Fix: checkouts take turns. Each checkout request holds an exclusive database lock while
 * WooCommerce checks stock, reserves it and creates the order (~0.1–0.3 s), so the next
 * customer always sees up-to-date stock. Locks are released automatically if anything fails.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** Lock name, unique to this site even on a shared database server. */
function bs_checkout_lock_name(): string {
	global $wpdb;
	return 'bc_checkout_' . substr( md5( DB_NAME . '|' . $wpdb->prefix ), 0, 16 );
}

function bs_is_checkout_request( WP_REST_Request $request ): bool {
	return 'POST' === $request->get_method()
		&& (bool) preg_match( '#^/wc/store(/v\d+)?/checkout/?$#', $request->get_route() );
}

add_filter( 'rest_pre_dispatch', function ( $result, $server, WP_REST_Request $request ) {
	if ( null !== $result || ! bs_is_checkout_request( $request ) ) {
		return $result;
	}
	global $wpdb;
	// Wait up to 20 s for our turn (normally a few milliseconds).
	$got = (int) $wpdb->get_var( $wpdb->prepare( 'SELECT GET_LOCK(%s, %d)', bs_checkout_lock_name(), 20 ) );
	if ( 1 !== $got ) {
		return new WP_Error(
			'bidri_checkout_busy',
			__( 'The shop is very busy right now. Please press Place order again.', 'bidri-studio' ),
			array( 'status' => 503 )
		);
	}
	$GLOBALS['bs_checkout_locked'] = true;
	return $result;
}, 1, 3 );

function bs_release_checkout_lock(): void {
	if ( empty( $GLOBALS['bs_checkout_locked'] ) ) {
		return;
	}
	global $wpdb;
	$wpdb->get_var( $wpdb->prepare( 'SELECT RELEASE_LOCK(%s)', bs_checkout_lock_name() ) );
	$GLOBALS['bs_checkout_locked'] = false;
}
add_filter( 'rest_post_dispatch', function ( $response ) {
	bs_release_checkout_lock();
	return $response;
}, 999 );
add_action( 'shutdown', 'bs_release_checkout_lock' ); // Safety net (also freed when the DB connection closes).
