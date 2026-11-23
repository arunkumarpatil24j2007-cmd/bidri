<?php
/**
 * Who sees what.
 *
 * - The store owner logs in with WooCommerce's "Shop manager" role. They land in Studio and see
 *   only Studio (+ their profile, for two-factor, and WooCommerce's order screen for refunds).
 * - Administrators (you/the developer) see Studio too, plus the normal WordPress admin.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** True for the shop owner account (Shop manager, not an administrator). */
function bs_is_owner( $user = null ): bool {
	$user = $user ?: wp_get_current_user();
	return $user instanceof WP_User && $user->exists()
		&& in_array( 'shop_manager', (array) $user->roles, true )
		&& ! user_can( $user, 'manage_options' );
}

function bs_can_use(): bool {
	return current_user_can( 'manage_woocommerce' ) && current_user_can( 'edit_products' );
}

function bs_is_studio_screen(): bool {
	return is_admin() && isset( $_GET['page'] ) && 'bidri-studio' === $_GET['page']; // phpcs:ignore WordPress.Security.NonceVerification
}

/* Menu entry. */
add_action( 'admin_menu', function () {
	add_menu_page(
		__( 'Studio', 'bidri-studio' ),
		__( 'Studio', 'bidri-studio' ),
		'manage_woocommerce',
		'bidri-studio',
		'bs_render',
		'dashicons-store',
		2
	);
	if ( bs_is_owner() ) {
		// Owner: nothing else in the menu.
		global $menu;
		foreach ( (array) $menu as $item ) {
			$slug = $item[2] ?? '';
			if ( ! in_array( $slug, array( 'bidri-studio', 'profile.php' ), true ) ) {
				remove_menu_page( $slug );
			}
		}
	}
}, 9999 );

/* Owner can only open Studio, their profile, and WooCommerce's order screen (for refunds). */
add_action( 'admin_init', function () {
	if ( ! bs_is_owner() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}
	global $pagenow;
	// phpcs:disable WordPress.Security.NonceVerification
	$page    = sanitize_key( $_GET['page'] ?? '' );
	$allowed = in_array( $pagenow, array( 'admin-post.php', 'profile.php', 'async-upload.php' ), true )
		|| 'bidri-studio' === $page
		|| ( 'admin.php' === $pagenow && 'wc-orders' === $page && 'edit' === ( $_GET['action'] ?? '' ) )
		|| ( 'post.php' === $pagenow && 'shop_order' === get_post_type( absint( $_GET['post'] ?? 0 ) ) );
	// phpcs:enable
	if ( ! $allowed ) {
		wp_safe_redirect( bs_url() );
		exit;
	}
} );

/* After login, the owner goes straight to Studio. */
add_filter( 'login_redirect', function ( $to, $requested, $user ) {
	return ( $user instanceof WP_User && bs_is_owner( $user ) ) ? bs_url() : $to;
}, 20, 3 );
add_filter( 'woocommerce_login_redirect', function ( $to, $user ) {
	return bs_is_owner( $user ) ? bs_url() : $to;
}, 20, 2 );

/* Owner's toolbar on the shop: just "Studio" and log out. */
add_action( 'admin_bar_menu', function ( WP_Admin_Bar $bar ) {
	if ( ! bs_is_owner() ) {
		$bar->add_node( array( 'id' => 'bidri-studio', 'title' => __( 'Studio', 'bidri-studio' ), 'href' => bs_url() ) );
		return;
	}
	foreach ( $bar->get_nodes() as $node ) {
		if ( ! in_array( $node->id, array( 'top-secondary', 'my-account', 'user-actions', 'logout' ), true ) ) {
			$bar->remove_node( $node->id );
		}
	}
	$bar->add_node( array( 'id' => 'bidri-studio', 'title' => __( 'Open Studio', 'bidri-studio' ), 'href' => bs_url() ) );
}, 9999 );

/* Studio screens: full-page, no WordPress chrome, no notices. */
add_filter( 'admin_body_class', function ( $classes ) {
	return bs_is_studio_screen() ? $classes . ' bs-screen' : $classes;
} );
add_action( 'in_admin_header', function () {
	if ( bs_is_studio_screen() ) {
		remove_all_actions( 'admin_notices' );
		remove_all_actions( 'all_admin_notices' );
		remove_all_actions( 'network_admin_notices' );
	}
}, 1000 );
add_filter( 'admin_title', function ( $title ) {
	return bs_is_studio_screen() ? 'Studio · ' . get_bloginfo( 'name' ) : $title;
} );

add_action( 'admin_enqueue_scripts', function () {
	if ( ! bs_is_studio_screen() ) {
		return;
	}
	$ver = BIDRI_STUDIO_VERSION . '.' . filemtime( BIDRI_STUDIO_DIR . '/assets/studio.css' );
	wp_enqueue_style( 'bidri-studio', BIDRI_STUDIO_URL . 'assets/studio.css', array(), $ver );
	wp_enqueue_script( 'bidri-studio', BIDRI_STUDIO_URL . 'assets/studio.js', array(), $ver, array( 'in_footer' => true, 'strategy' => 'defer' ) );
	wp_add_inline_script( 'bidri-studio', 'window.bsApp=' . wp_json_encode( array(
		'rest'  => esc_url_raw( rest_url( 'bidri-studio/v1/' ) ),
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'home'  => home_url( '/' ),
		'text'  => array(
			'on'      => __( 'Notifications are on for this phone.', 'bidri-studio' ),
			'off'     => __( 'Notifications are off for this phone.', 'bidri-studio' ),
			'copied'  => __( 'Link copied.', 'bidri-studio' ),
		),
	) ) . ';', 'before' );

	// Brand fonts from the Bidri Crafts theme, if it is installed.
	$fonts = get_theme_root_uri() . '/bidri-crafts/assets/fonts/';
	if ( is_dir( get_theme_root() . '/bidri-crafts/assets/fonts' ) ) {
		$css = '';
		foreach ( array( '500', '600', '700' ) as $w ) {
			$css .= "@font-face{font-family:'Cormorant Garamond';font-weight:$w;font-display:swap;src:url({$fonts}cormorant-garamond-latin-$w-normal.woff2) format('woff2');unicode-range:U+0000-00FF,U+2000-206F;}";
			$css .= "@font-face{font-family:'Cormorant Garamond';font-weight:$w;font-display:swap;src:url({$fonts}cormorant-garamond-latin-ext-$w-normal.woff2) format('woff2');unicode-range:U+0100-02BA,U+20A0-20C0;}";
		}
		foreach ( array( '400', '500', '600' ) as $w ) {
			$css .= "@font-face{font-family:'Jost';font-weight:$w;font-display:swap;src:url({$fonts}jost-latin-$w-normal.woff2) format('woff2');}";
		}
		wp_add_inline_style( 'bidri-studio', $css );
	}
} );

/* Phones: let Studio fill the screen like an app. */
add_action( 'admin_head', function () {
	if ( bs_is_studio_screen() ) {
		echo '<meta name="theme-color" content="#F4F1EC">' . "\n";
	}
} );

/* Branded login page: the owner sees this every day. */
add_action( 'login_enqueue_scripts', function () {
	$css   = BIDRI_STUDIO_URL . 'assets/';
	$fonts = get_theme_root_uri() . '/bidri-crafts/assets/fonts/';
	?>
	<style>
		@font-face{font-family:'Cormorant Garamond';font-weight:600;font-display:swap;src:url(<?php echo esc_url( $fonts . 'cormorant-garamond-latin-600-normal.woff2' ); ?>) format('woff2');}
		@font-face{font-family:'Jost';font-weight:400;font-display:swap;src:url(<?php echo esc_url( $fonts . 'jost-latin-400-normal.woff2' ); ?>) format('woff2');}
		@font-face{font-family:'Jost';font-weight:500;font-display:swap;src:url(<?php echo esc_url( $fonts . 'jost-latin-500-normal.woff2' ); ?>) format('woff2');}
		body.login{background:#F4F1EC;font-family:Jost,system-ui,sans-serif;color:#1C1B19}
		#login{width:min(360px,calc(100vw - 40px));padding-top:12vh}
		.login h1 a{background:none!important;width:auto!important;height:auto!important;text-indent:0!important;font:600 2rem/1 'Cormorant Garamond',Georgia,serif;letter-spacing:.05em;text-transform:uppercase;color:#1C1B19!important;display:flex!important;align-items:center;justify-content:center;gap:.6rem;margin-bottom:1.75rem!important;outline:none;box-shadow:none}
		.login h1 a::before{content:"";width:34px;height:34px;background:#1C1B19;-webkit-mask:url(<?php echo esc_url( $css . 'logo-mark.svg' ); ?>) center/contain no-repeat;mask:url(<?php echo esc_url( $css . 'logo-mark.svg' ); ?>) center/contain no-repeat}
		.login form{background:#FBFAF8;border:1px solid #E4DFD6;border-radius:20px;box-shadow:none;padding:1.75rem 1.5rem}
		.login label{font-size:.875rem;color:#5F5A52;font-weight:500}
		.login input[type=text],.login input[type=password],.login input[type=email]{border:1px solid #CFC8BC;border-radius:12px;min-height:48px;font-size:1rem;background:#fff;box-shadow:none;padding:.4rem .8rem}
		.login input[type=text]:focus,.login input[type=password]:focus{border-color:#1C1B19;box-shadow:0 0 0 1px #1C1B19}
		.login .button-primary{float:none;width:100%;min-height:50px;margin-top:1rem;border:0;border-radius:999px;font:500 1rem Jost,sans-serif;color:#FFF7F8;background:linear-gradient(135deg,#93183A 0%,#6D001A 40%,#4F0012 70%,#7C0B27 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 28px -10px rgba(109,0,26,.6);text-shadow:none}
		.login .button-primary:hover,.login .button-primary:focus{background:linear-gradient(135deg,#93183A 0%,#6D001A 40%,#4F0012 70%,#7C0B27 100%);background-position:100% 100%}
		.login .forgetmenot{float:none;margin-bottom:0}
		.login input[type=checkbox]{border-color:#CFC8BC;border-radius:4px}
		.login input[type=checkbox]:checked::before{filter:grayscale(1) brightness(.2)}
		.login .button.wp-hide-pw .dashicons{color:#5F5A52}
		.login #nav,.login #backtoblog{text-align:center;padding:0}
		.login #nav a,.login #backtoblog a,.login .privacy-policy-page-link a{color:#5F5A52!important;font-size:.875rem}
		.login .message,.login .notice,.login #login_error{border-left:0;border-radius:14px;box-shadow:none;background:#FBFAF8;border:1px solid #E4DFD6}
		.login #login_error{border-color:#6D001A}
		.language-switcher{display:none}
	</style>
	<?php
} );
add_filter( 'login_headerurl', fn() => home_url( '/' ) );
add_filter( 'login_headertext', fn() => get_bloginfo( 'name' ) );
add_filter( 'login_display_language_dropdown', '__return_false' );
