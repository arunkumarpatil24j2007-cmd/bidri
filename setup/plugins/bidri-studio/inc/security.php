<?php
/**
 * Site hardening that needs no settings. Each line says what it stops.
 * (Lives in this plugin, not the theme, so it keeps working if the theme is ever changed.)
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/* Usernames are half a password: don't publish them. */
add_filter( 'rest_endpoints', function ( $endpoints ) {
	if ( ! is_user_logged_in() ) {
		unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	}
	return $endpoints;
} );
// Runs before WordPress's own redirect (which would reveal /author/<username>/).
add_action( 'template_redirect', function () {
	if ( ! is_user_logged_in() && ( is_author() || isset( $_GET['author'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		wp_safe_redirect( home_url( '/' ), 301 );
		exit;
	}
}, 1 );
add_filter( 'redirect_canonical', function ( $redirect ) {
	return ( ! is_user_logged_in() && $redirect && str_contains( $redirect, '/author/' ) ) ? false : $redirect;
} );
add_filter( 'oembed_response_data', function ( $data ) {
	unset( $data['author_name'], $data['author_url'] );
	return $data;
} );

/* Login: same message whether the username or the password was wrong. */
add_filter( 'login_errors', fn() => __( 'Those details didn’t work. Please try again.', 'bidri-studio' ) );

/* No XML-RPC, no pingbacks, no application passwords (Shiprocket uses WooCommerce API keys instead). */
add_filter( 'xmlrpc_enabled', '__return_false' );
add_filter( 'xmlrpc_methods', fn() => array() );
if ( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST ) { // Refuse xmlrpc.php outright.
	status_header( 403 );
	exit;
}
add_filter( 'wp_headers', function ( $headers ) {
	unset( $headers['X-Pingback'] );
	return $headers;
} );
add_filter( 'wp_is_application_passwords_available', '__return_false' );

/* Browser security headers. */
function bs_security_headers(): void {
	if ( headers_sent() ) {
		return;
	}
	header( 'X-Content-Type-Options: nosniff' );
	header( 'Referrer-Policy: strict-origin-when-cross-origin' );
	header( 'X-Frame-Options: SAMEORIGIN' );
	header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), usb=()' );
	if ( is_ssl() ) {
		header( 'Strict-Transport-Security: max-age=31536000' );
	}
}
add_action( 'send_headers', 'bs_security_headers' );
add_action( 'admin_init', 'bs_security_headers' );
add_action( 'login_init', 'bs_security_headers' );

/*
 * Checkout rate limit: stops bots hammering the checkout (e.g. testing stolen cards).
 * 10 checkout attempts per minute per visitor is far above what a real customer needs.
 */
add_filter( 'woocommerce_store_api_rate_limit_options', function () {
	return array(
		'enabled'       => true,
		'proxy_support' => false,
		'limit'         => 10,
		'seconds'       => 60,
	);
} );
