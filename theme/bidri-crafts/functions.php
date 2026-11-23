<?php
/**
 * Bidri Crafts block theme — functions.
 *
 * Keep this file small. Every block of code here must have a reason a non-developer could read.
 * Prefer theme.json and WooCommerce blocks over PHP.
 *
 * @package bidri-crafts
 */

defined( 'ABSPATH' ) || exit;

define( 'BIDRI_VERSION', '1.0.0' );

require_once __DIR__ . '/inc/store-details.php'; // Settings → Bidri Crafts (WhatsApp, phone, email…).
require_once __DIR__ . '/inc/shortcodes.php';    // Small dynamic bits used inside templates.
require_once __DIR__ . '/inc/woocommerce.php';   // Shop wording + checkout field tweaks.
require_once __DIR__ . '/inc/slider.php';        // Homepage banner slider (+ slide date scheduling).

/* -------------------------------------------------------------------------
 * 1. Theme setup
 * ---------------------------------------------------------------------- */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );
} );

/* -------------------------------------------------------------------------
 * 2. Front-end stylesheet (block themes do not load style.css automatically)
 * ---------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
	$file = get_stylesheet_directory() . '/style.css';
	wp_enqueue_style(
		'bidri-crafts',
		get_stylesheet_uri(),
		array(),
		file_exists( $file ) ? (string) filemtime( $file ) : BIDRI_VERSION
	);
}, 20 );

/* -------------------------------------------------------------------------
 * 3. Button style "Silk" — the ONE primary action per page (see docs/03).
 * ---------------------------------------------------------------------- */
add_action( 'init', function () {
	register_block_style( 'core/button', array(
		'name'  => 'silk',
		'label' => __( 'Silk (primary action)', 'bidri-crafts' ),
	) );
	register_block_style( 'core/paragraph', array(
		'name'  => 'eyebrow',
		'label' => __( 'Eyebrow', 'bidri-crafts' ),
	) );
	register_block_pattern_category( 'bidri-crafts', array( 'label' => __( 'Bidri Crafts', 'bidri-crafts' ) ) );
} );

/* -------------------------------------------------------------------------
 * 4. Fonts: preload the two files needed for first paint.
 *    The @font-face rules themselves come from theme.json.
 * ---------------------------------------------------------------------- */
add_action( 'wp_head', function () {
	$base = get_stylesheet_directory_uri() . '/assets/fonts/';
	foreach ( array( 'cormorant-garamond-latin-600-normal.woff2', 'jost-latin-400-normal.woff2' ) as $font ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( $base . $font )
		);
	}
}, 1 );

/* -------------------------------------------------------------------------
 * 5. Images: light by default.
 *    - Cap the stored original at 1600 px.
 *    - Generate WebP sub-sizes for JPEG/PNG uploads.
 *    - WebP quality 80.
 *    (Photos should still be compressed BEFORE upload with scripts/optimize-images.py.)
 * ---------------------------------------------------------------------- */
add_filter( 'big_image_size_threshold', fn() => 1600 );

add_filter( 'image_editor_output_format', function ( $formats ) {
	$formats['image/jpeg'] = 'image/webp';
	$formats['image/png']  = 'image/webp';
	return $formats;
} );

add_filter( 'wp_editor_set_quality', function ( $quality, $mime_type ) {
	return ( 'image/webp' === $mime_type ) ? 80 : $quality;
}, 10, 2 );

/* The homepage hero is the largest thing on screen: load it first, never lazily. */
add_filter( 'wp_get_attachment_image_attributes', function ( $attr ) {
	if ( isset( $attr['class'] ) && str_contains( $attr['class'], 'bc-hero-img' ) ) {
		$attr['fetchpriority'] = 'high';
		$attr['loading']       = 'eager';
	}
	return $attr;
} );
add_filter( 'render_block_core/image', function ( $html, $block ) {
	if ( str_contains( $block['attrs']['className'] ?? '', 'bc-hero-img' ) ) {
		$html = str_replace( ' loading="lazy"', '', $html );
		if ( ! str_contains( $html, 'fetchpriority' ) ) {
			$html = str_replace( '<img ', '<img fetchpriority="high" ', $html );
		}
	}
	return $html;
}, 10, 2 );

/* -------------------------------------------------------------------------
 * 6. Remove small things we do not use (less weight, fewer attack surfaces).
 * ---------------------------------------------------------------------- */
add_action( 'init', function () {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
} );
add_filter( 'xmlrpc_enabled', '__return_false' );

/* -------------------------------------------------------------------------
 * 7. Social share image + description (skipped if an SEO plugin is installed).
 * ---------------------------------------------------------------------- */
add_action( 'wp_head', function () {
	if ( defined( 'WPSEO_VERSION' ) || defined( 'THE_SEO_FRAMEWORK_VERSION' ) || defined( 'RANK_MATH_VERSION' ) ) {
		return;
	}
	$img   = get_stylesheet_directory_uri() . '/assets/images/og-image-1200x630.jpg';
	$title = wp_get_document_title();
	$desc  = get_bloginfo( 'description' );
	if ( is_singular( 'product' ) ) {
		$product = wc_get_product( get_the_ID() );
		if ( $product ) {
			$desc = wp_strip_all_tags( $product->get_short_description() ) ?: $desc;
			$id   = $product->get_image_id();
			if ( $id ) {
				$img = wp_get_attachment_image_url( $id, 'large' ) ?: $img;
			}
		}
	}
	printf( '<meta name="description" content="%s">' . "\n", esc_attr( $desc ) );
	printf( '<meta property="og:title" content="%s">' . "\n", esc_attr( $title ) );
	printf( '<meta property="og:description" content="%s">' . "\n", esc_attr( $desc ) );
	printf( '<meta property="og:image" content="%s">' . "\n", esc_url( $img ) );
	printf( '<meta property="og:site_name" content="%s">' . "\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( '<meta property="og:type" content="%s">' . "\n", is_singular( 'product' ) ? 'product' : 'website' );
	echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
}, 5 );

/* Favicon fallback until a Site Icon is set in Settings → General. */
add_action( 'wp_head', function () {
	if ( has_site_icon() ) {
		return;
	}
	$base = get_stylesheet_directory_uri() . '/assets/images/';
	printf( '<link rel="icon" href="%s" type="image/svg+xml">' . "\n", esc_url( $base . 'favicon.svg' ) );
	printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( $base . 'favicon-180.png' ) );
}, 2 );

/* iPhones need a PNG home-screen icon; uploads are converted to WebP, so use the theme's PNG. */
add_filter( 'site_icon_meta_tags', function ( $tags ) {
	foreach ( $tags as $i => $tag ) {
		if ( str_contains( $tag, 'apple-touch-icon' ) && str_contains( $tag, '.webp' ) ) {
			$tags[ $i ] = sprintf( '<link rel="apple-touch-icon" href="%s" />', esc_url( get_stylesheet_directory_uri() . '/assets/images/favicon-180.png' ) );
		}
	}
	return $tags;
} );

/* -------------------------------------------------------------------------
 * 8. Skip-to-content link for keyboard users.
 * ---------------------------------------------------------------------- */
add_action( 'wp_body_open', function () {
	echo '<a class="bc-skip-link screen-reader-text" href="#main">' . esc_html__( 'Skip to content', 'bidri-crafts' ) . '</a>';
} );
