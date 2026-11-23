<?php
/**
 * Bidri Crafts — store content importer. Run by setup.sh via:
 *   wp eval-file lib/import.php <setup-dir>
 *
 * Safe to re-run: categories are matched by slug, products by SKU, pages by slug.
 * Existing products are NOT overwritten (so prices/stock the owner changed in wp-admin are kept)
 * unless BIDRI_FORCE=1 is set in the environment.
 */

defined( 'ABSPATH' ) || exit;

$dir   = rtrim( $args[0] ?? __DIR__ . '/..', '/' );
$force = '1' === getenv( 'BIDRI_FORCE' );

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

function bidri_csv( string $file ): array {
	$rows = array();
	$fh   = fopen( $file, 'r' );
	$head = fgetcsv( $fh, 0, ',', '"', '\\' );
	while ( ( $r = fgetcsv( $fh, 0, ',', '"', '\\' ) ) !== false ) {
		if ( count( $r ) === count( $head ) ) {
			$rows[] = array_combine( $head, $r );
		}
	}
	fclose( $fh );
	return $rows;
}

/** Import an image file into the media library once (matched by file name). */
function bidri_media( string $path, string $alt = '', int $parent = 0 ): int {
	if ( ! file_exists( $path ) ) {
		WP_CLI::warning( "Missing image: $path" );
		return 0;
	}
	$name     = pathinfo( $path, PATHINFO_FILENAME );
	// Matched by the source file name we store on import, so re-runs never upload duplicates.
	$existing = get_posts( array(
		'post_type'      => 'attachment',
		'post_status'    => 'inherit',
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'meta_key'       => '_bidri_source',
		'meta_value'     => basename( $path ),
	) );
	if ( $existing ) {
		return (int) $existing[0];
	}
	// Browser demo (WordPress Playground): skip image processing, which can exhaust its memory.
	// The photos are already web-sized WebP, so they are registered as-is.
	if ( defined( 'BIDRI_LIGHT_MEDIA' ) && BIDRI_LIGHT_MEDIA ) {
		$up   = wp_upload_dir();
		$dest = trailingslashit( $up['path'] ) . wp_unique_filename( $up['path'], basename( $path ) );
		copy( $path, $dest );
		$size = getimagesize( $dest );
		$id   = wp_insert_attachment( array(
			'post_mime_type' => $size['mime'] ?? 'image/webp',
			'post_title'     => $name,
			'post_status'    => 'inherit',
			'guid'           => trailingslashit( $up['url'] ) . basename( $dest ),
		), $dest, $parent );
		update_post_meta( $id, '_wp_attachment_metadata', array(
			'width'  => $size[0] ?? 1024,
			'height' => $size[1] ?? 1024,
			'file'   => _wp_relative_upload_path( $dest ),
			'sizes'  => array(),
		) );
		if ( $alt ) {
			update_post_meta( $id, '_wp_attachment_image_alt', $alt );
		}
		update_post_meta( $id, '_bidri_source', basename( $path ) );
		return (int) $id;
	}

	$tmp = wp_tempnam( basename( $path ) );
	copy( $path, $tmp );
	$id = media_handle_sideload( array( 'name' => basename( $path ), 'tmp_name' => $tmp ), $parent, $alt ?: null );
	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( 'Image import failed for ' . basename( $path ) . ': ' . $id->get_error_message() );
		return 0;
	}
	if ( $alt ) {
		update_post_meta( $id, '_wp_attachment_image_alt', $alt );
	}
	update_post_meta( $id, '_bidri_source', basename( $path ) );
	return (int) $id;
}

/* ---------------------------------------------------------------- categories */
$cat_ids = array();
foreach ( bidri_csv( "$dir/data/categories.csv" ) as $c ) {
	$term = get_term_by( 'slug', $c['slug'], 'product_cat' );
	if ( $term ) {
		$id = $term->term_id;
		wp_update_term( $id, 'product_cat', array( 'name' => $c['name'], 'description' => $c['description'] ) );
	} else {
		$res = wp_insert_term( $c['name'], 'product_cat', array( 'slug' => $c['slug'], 'description' => $c['description'] ) );
		if ( is_wp_error( $res ) ) {
			WP_CLI::warning( $res->get_error_message() );
			continue;
		}
		$id = $res['term_id'];
	}
	update_term_meta( $id, 'order', (int) $c['menu_order'] );
	$cat_ids[ $c['slug'] ] = $id;
}
WP_CLI::log( 'Categories: ' . count( $cat_ids ) );

/* ---------------------------------------------------------------- products */
$created = 0;
$skipped = 0;
$order   = 0;
foreach ( bidri_csv( "$dir/data/products.csv" ) as $r ) {
	++$order;
	$existing_id = wc_get_product_id_by_sku( $r['sku'] );
	if ( $existing_id && ! $force ) {
		++$skipped;
		continue;
	}
	$p = $existing_id ? wc_get_product( $existing_id ) : new WC_Product_Simple();
	$p->set_name( $r['name'] );
	$p->set_slug( $r['slug'] );
	$p->set_sku( $r['sku'] );
	$p->set_status( 'publish' );
	$p->set_catalog_visibility( 'visible' );
	$p->set_menu_order( $order ); // Shop "Default sorting" follows products.csv order.
	$p->set_featured( '1' === $r['featured'] );
	$p->set_regular_price( $r['price'] );
	$p->set_short_description( $r['short_description'] );
	$p->set_description( '<p>' . esc_html( $r['care'] ) . '</p>' );
	$p->set_manage_stock( true );
	$p->set_stock_quantity( (int) $r['stock'] );
	$p->set_backorders( 'no' );
	$p->set_sold_individually( false );
	$p->set_tax_status( 'taxable' );
	if ( $r['weight_g'] ) {
		$p->set_weight( round( (int) $r['weight_g'] / 1000, 3 ) ); // kg — used by Shiprocket for rates.
	}
	if ( isset( $cat_ids[ $r['category'] ] ) ) {
		$p->set_category_ids( array( $cat_ids[ $r['category'] ] ) );
	}

	$attrs = array();
	$specs = array(
		'Material' => 'Zinc-copper alloy',
		'Inlay'    => 'Pure silver, 99.9%',
		'Size'     => $r['size'],
		'Weight'   => $r['weight_g'] ? number_format( (int) $r['weight_g'] ) . ' g' : '',
	);
	$pos = 0;
	foreach ( $specs as $label => $value ) {
		if ( '' === $value ) {
			continue;
		}
		$a = new WC_Product_Attribute();
		$a->set_name( $label );
		$a->set_options( array( $value ) );
		$a->set_position( $pos++ );
		$a->set_visible( true );
		$a->set_variation( false );
		$attrs[] = $a;
	}
	$p->set_attributes( $attrs );
	$id = $p->save();

	$img = bidri_media( "$dir/images/products/{$r['image']}", $r['image_alt'], $id );
	if ( $img ) {
		$p->set_image_id( $img );
		$p->save();
	}
	++$created;
}
WP_CLI::log( "Products: $created created/updated, $skipped already existed (left untouched)." );

/* ---------------------------------------------------------------- pages */
$pages = array(
	// slug => [title, template]
	'our-craft'      => array( 'Our Craft', 'page-no-title' ),
	'contact'        => array( 'Contact', '' ),
	'shipping'       => array( 'Shipping', '' ),
	'returns'        => array( 'Returns & replacements', '' ),
	'care-guide'     => array( 'Care guide', '' ),
	'gi-registry'    => array( 'GI Registry · Tag No. 12', '' ),
	'privacy-policy' => array( 'Privacy Policy', '' ),
	'terms'          => array( 'Terms of Service', '' ),
);
$page_ids = array();
foreach ( $pages as $slug => $meta ) {
	$file = "$dir/content/$slug.html";
	if ( ! file_exists( $file ) ) {
		continue;
	}
	$found = get_page_by_path( $slug );
	if ( $found && ! $force ) {
		$page_ids[ $slug ] = $found->ID;
		continue;
	}
	$data = array(
		'post_type'    => 'page',
		'post_status'  => 'publish',
		'post_title'   => $meta[0],
		'post_name'    => $slug,
		'post_content' => file_get_contents( $file ),
	);
	if ( $found ) {
		$data['ID'] = $found->ID;
	}
	$id = wp_insert_post( wp_slash( $data ), true );
	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( $id->get_error_message() );
		continue;
	}
	if ( $meta[1] ) {
		update_post_meta( $id, '_wp_page_template', $meta[1] );
	}
	$page_ids[ $slug ] = $id;
}
if ( isset( $page_ids['privacy-policy'] ) ) {
	update_option( 'wp_page_for_privacy_policy', $page_ids['privacy-policy'] );
	// Remove WordPress's own unused privacy draft, if any.
	foreach ( get_posts( array( 'post_type' => 'page', 'post_status' => 'draft', 'name' => 'privacy-policy-2', 'fields' => 'ids' ) ) as $draft ) {
		wp_delete_post( $draft, true );
	}
}
if ( isset( $page_ids['terms'] ) ) {
	update_option( 'woocommerce_terms_page_id', $page_ids['terms'] );
}
// WooCommerce page titles that match the design.
$cart_id = wc_get_page_id( 'cart' );
if ( $cart_id > 0 ) {
	$cart = get_post( $cart_id )->post_content;
	// "Cart totals" → "Order Summary" (as in the design).
	$cart = str_replace(
		'<!-- wp:woocommerce/cart-order-summary-heading-block -->',
		'<!-- wp:woocommerce/cart-order-summary-heading-block {"content":"Order Summary"} -->',
		$cart
	);
	// Empty bag: our own message + one outlined button, instead of Woo's default patterns.
	// Only touches WooCommerce's untouched default, so the owner's own edits are never overwritten.
	if ( str_contains( $cart, 'woocommerce/cart-empty-message' ) ) $cart = preg_replace(
		'#(<!-- wp:woocommerce/empty-cart-block -->\s*<div class="wp-block-woocommerce-empty-cart-block">).*?(</div>\s*<!-- /wp:woocommerce/empty-cart-block -->)#s',
		'$1<!-- wp:heading {"textAlign":"center","level":2,"className":"wc-block-cart__empty-cart__title"} -->
<h2 class="wp-block-heading has-text-align-center wc-block-cart__empty-cart__title">Your bag is empty</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Every piece is handmade in Bidar and ships free, insured, with its GI certificate.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/shop/">Explore Bidriware</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->$2',
		$cart,
		1
	);
	if ( $cart !== get_post( $cart_id )->post_content || 'Your Bag' !== get_the_title( $cart_id ) ) {
		wp_update_post( wp_slash( array( 'ID' => $cart_id, 'post_title' => 'Your Bag', 'post_content' => $cart ) ) );
	}
}
$shop_id = wc_get_page_id( 'shop' );
if ( $shop_id > 0 ) {
	wp_update_post( array( 'ID' => $shop_id, 'post_title' => 'All Bidriware' ) );
}
WP_CLI::log( 'Pages: ' . count( $page_ids ) );

/* ---------------------------------------------------------------- shipping: India → free */
$zone_id = 0;
foreach ( WC_Shipping_Zones::get_zones() as $z ) {
	if ( 'India' === $z['zone_name'] ) {
		$zone_id = (int) $z['id'];
	}
}
if ( ! $zone_id ) {
	$zone = new WC_Shipping_Zone();
	$zone->set_zone_name( 'India' );
	$zone->set_zone_order( 1 );
	$zone->add_location( 'IN', 'country' );
	$zone->save();
	$instance = $zone->add_shipping_method( 'free_shipping' );
	update_option( "woocommerce_free_shipping_{$instance}_settings", array(
		'title'            => 'Free insured shipping (3–5 business days)',
		'requires'         => '',
		'min_amount'       => '0',
		'ignore_discounts' => 'no',
	) );
	WP_CLI::log( 'Shipping zone "India" with free shipping created.' );
}

/* ---------------------------------------------------------------- site icon */
if ( ! get_option( 'site_icon' ) ) {
	$theme_img = get_theme_root() . '/bidri-crafts/assets/images/favicon-512.png';
	$icon      = bidri_media( $theme_img, 'Bidri Crafts' );
	if ( $icon ) {
		update_option( 'site_icon', $icon );
	}
}

WP_CLI::success( 'Store content imported.' );
