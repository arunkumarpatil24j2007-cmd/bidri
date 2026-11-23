<?php
/**
 * Studio as a phone app: "Add to Home Screen" gives a Studio icon that opens full-screen,
 * without the browser's address bar. No app store, nothing to install or pay for.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** The app's settings file (web app manifest), built from this site's own addresses. */
function bs_app_manifest(): array {
	$icons = BIDRI_STUDIO_URL . 'assets/app/';
	return array(
		'name'             => 'Studio · ' . wp_strip_all_tags( get_bloginfo( 'name' ) ),
		'short_name'       => 'Studio',
		'id'               => bs_url(),
		'start_url'        => bs_url(),
		'scope'            => home_url( '/' ), // Login page stays inside the app too.
		'display'          => 'standalone',
		'orientation'      => 'portrait',
		'background_color' => '#F4F1EC',
		'theme_color'      => '#F4F1EC',
		'icons'            => array(
			array( 'src' => $icons . 'icon-192.png', 'sizes' => '192x192', 'type' => 'image/png' ),
			array( 'src' => $icons . 'icon-512.png', 'sizes' => '512x512', 'type' => 'image/png' ),
		),
	);
}

/* Serve it at /?bidri-studio-app=1 (public, nothing private in it). */
add_action( 'init', function () {
	if ( ! isset( $_GET['bidri-studio-app'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return;
	}
	nocache_headers();
	header( 'Content-Type: application/manifest+json; charset=utf-8' );
	echo wp_json_encode( bs_app_manifest(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	exit;
}, 0 );

function bs_app_head_tags(): void {
	$icons = BIDRI_STUDIO_URL . 'assets/app/';
	printf( '<link rel="manifest" href="%s">' . "\n", esc_url( home_url( '/?bidri-studio-app=1' ) ) );
	printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( $icons . 'icon-180.png' ) );
	echo '<meta name="mobile-web-app-capable" content="yes">' . "\n";
	echo '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
	echo '<meta name="apple-mobile-web-app-title" content="Studio">' . "\n";
	echo '<meta name="apple-mobile-web-app-status-bar-style" content="default">' . "\n";
}
add_action( 'admin_head', function () {
	if ( bs_is_studio_screen() ) {
		bs_app_head_tags();
		remove_action( 'admin_head', 'wp_site_icon' ); // One home-screen icon: Studio's.
	}
}, 0 );
add_action( 'login_head', 'bs_app_head_tags' ); // So "Add to Home Screen" also works from the login page.
remove_action( 'login_head', 'wp_site_icon', 99 ); // …with the Studio icon, not the shop's.

/* Let the bottom tab bar sit above the iPhone home bar. */
add_filter( 'admin_viewport_meta', function ( $content ) {
	return bs_is_studio_screen() ? $content . ',viewport-fit=cover' : $content;
} );
