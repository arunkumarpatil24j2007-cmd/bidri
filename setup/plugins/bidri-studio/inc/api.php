<?php
/**
 * The phone app's link to the shop.
 *
 *  POST /wp-json/bidri-studio/v1/device          Studio (logged in) gives the app a device key.
 *  POST /wp-json/bidri-studio/v1/events          The app, with its key, asks "anything new since #N?".
 *  POST /wp-json/bidri-studio/v1/device/forget   The app gives its key back (log out).
 *
 * The key lets the app read notifications only. It can't open Studio or change anything,
 * so it is safe for it to keep working in the background. Only a hash of it is stored.
 * Changing the password removes every key.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

const BIDRI_STUDIO_MAX_DEVICES = 5;

function bs_devices( int $user_id ): array {
	$d = get_user_meta( $user_id, '_bs_devices', true );
	return is_array( $d ) ? $d : array();
}

/** Never cached (Hostinger's LiteSpeed cache, browsers, proxies). */
function bs_nocache( WP_REST_Response $res ): WP_REST_Response {
	do_action( 'litespeed_control_set_nocache', 'bidri studio api' ); // phpcs:ignore WordPress.NamingConventions.ValidHookName
	$res->header( 'Cache-Control', 'no-store, private' );
	return $res;
}

/** User ID for a device key, or 0. */
function bs_device_user( WP_REST_Request $req ): int {
	$key = (string) $req->get_param( 'device' );
	if ( ! preg_match( '/^(\d+)\.([A-Za-z0-9]{40})$/', $key, $m ) ) {
		return 0;
	}
	$uid  = (int) $m[1];
	$hash = hash( 'sha256', $m[2] );
	$list = bs_devices( $uid );
	foreach ( $list as $stored => $info ) {
		if ( hash_equals( (string) $stored, $hash ) ) {
			$user = get_userdata( $uid );
			if ( ! $user || ! user_can( $user, 'manage_woocommerce' ) ) {
				return 0;
			}
			if ( time() - (int) ( $info['seen'] ?? 0 ) > HOUR_IN_SECONDS ) {
				$list[ $stored ]['seen'] = time();
				update_user_meta( $uid, '_bs_devices', $list );
			}
			return $uid;
		}
	}
	return 0;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'bidri-studio/v1', '/device', array(
		'methods'             => 'POST',
		'permission_callback' => 'bs_can_use', // Logged-in Studio user (cookie + REST nonce).
		'callback'            => function ( WP_REST_Request $req ) {
			$uid    = get_current_user_id();
			$secret = wp_generate_password( 40, false, false );
			$list   = bs_devices( $uid );
			$name   = sanitize_text_field( mb_substr( (string) $req->get_param( 'name' ), 0, 60 ) );
			$list[ hash( 'sha256', $secret ) ] = array( 'name' => $name ?: __( 'Phone', 'bidri-studio' ), 'added' => time(), 'seen' => time() );
			uasort( $list, fn( $a, $b ) => $b['added'] <=> $a['added'] );
			update_user_meta( $uid, '_bs_devices', array_slice( $list, 0, BIDRI_STUDIO_MAX_DEVICES, true ) );
			return bs_nocache( new WP_REST_Response( array( 'device' => $uid . '.' . $secret, 'latest' => bs_latest_event_id() ) ) );
		},
	) );

	register_rest_route( 'bidri-studio/v1', '/events', array(
		'methods'             => 'POST',
		'permission_callback' => '__return_true', // Checked below with the device key.
		'callback'            => function ( WP_REST_Request $req ) {
			$uid = bs_device_user( $req );
			if ( ! $uid ) {
				return new WP_Error( 'bidri_device', 'Not connected', array( 'status' => 401 ) );
			}
			global $wpdb;
			$after  = absint( $req->get_param( 'after' ) );
			$latest = bs_latest_event_id();
			$events = array();
			$next   = $latest;
			$types  = array_keys( array_filter( bs_notify_prefs( $uid ) ) );
			if ( $after && $after < $latest && $types ) {
				$in   = implode( ',', array_fill( 0, count( $types ), '%s' ) );
				$rows = $wpdb->get_results( $wpdb->prepare( 'SELECT id, type, title, body, url FROM ' . bs_events_table() . " WHERE id > %d AND type IN ($in) ORDER BY id ASC LIMIT 20", array_merge( array( $after ), $types ) ), ARRAY_A ); // phpcs:ignore WordPress.DB
				foreach ( $rows as $r ) {
					$events[] = array( 'id' => (int) $r['id'], 'type' => $r['type'], 'title' => $r['title'], 'body' => $r['body'], 'url' => $r['url'] );
				}
				if ( 20 === count( $rows ) ) {
					$next = (int) end( $rows )['id'];
				}
			}
			return bs_nocache( new WP_REST_Response( array( 'next' => $next, 'events' => $events ) ) );
		},
	) );

	register_rest_route( 'bidri-studio/v1', '/device/forget', array(
		'methods'             => 'POST',
		'permission_callback' => '__return_true',
		'callback'            => function ( WP_REST_Request $req ) {
			$uid = bs_device_user( $req );
			if ( $uid && preg_match( '/^\d+\.([A-Za-z0-9]{40})$/', (string) $req->get_param( 'device' ), $m ) ) {
				$list = bs_devices( $uid );
				unset( $list[ hash( 'sha256', $m[1] ) ] );
				update_user_meta( $uid, '_bs_devices', $list );
			}
			return bs_nocache( new WP_REST_Response( array( 'ok' => true ) ) );
		},
	) );
} );

/* A new password signs every phone out of notifications. */
add_action( 'after_password_reset', fn( $user ) => delete_user_meta( $user->ID, '_bs_devices' ) );
add_action( 'profile_update', function ( $uid, $old ) {
	$now = get_userdata( $uid );
	if ( $now && $old instanceof WP_User && $old->user_pass !== $now->user_pass ) {
		delete_user_meta( $uid, '_bs_devices' );
	}
}, 10, 2 );
