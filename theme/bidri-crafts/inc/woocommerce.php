<?php
/**
 * WooCommerce wording + small behaviour tweaks. Everything here is optional polish:
 * if this file were deleted the shop would still work.
 *
 * @package bidri-crafts
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}

/* "Add to cart" → "Add to bag"; out-of-stock pieces say "Sold out". */
add_filter( 'woocommerce_product_single_add_to_cart_text', fn() => __( 'Add to bag', 'bidri-crafts' ) );
add_filter( 'woocommerce_product_add_to_cart_text', function ( $text, $product ) {
	if ( ! $product->is_in_stock() ) {
		return __( 'Sold out', 'bidri-crafts' );
	}
	if ( '' === $product->get_price() ) {
		return __( 'Enquire', 'bidri-crafts' );
	}
	return $product->is_type( 'simple' ) ? __( 'Add to bag', 'bidri-crafts' ) : $text;
}, 10, 2 );

/* Accessible label for the card buttons: "Add Surahi Ewer to bag". */
add_filter( 'woocommerce_product_add_to_cart_description', function ( $text, $product ) {
	return $product->is_in_stock()
		? sprintf( __( 'Add %s to bag', 'bidri-crafts' ), $product->get_name() )
		: sprintf( __( '%s is sold out', 'bidri-crafts' ), $product->get_name() );
}, 10, 2 );

/* Price on request (e.g. a museum piece without a set price). */
add_filter( 'woocommerce_empty_price_html', fn() => '<span class="bc-price-on-request">' . esc_html__( 'Price on request', 'bidri-crafts' ) . '</span>' );

/* Stock line on the product page: "Sold out" rather than "Out of stock". */
add_filter( 'woocommerce_get_availability_text', function ( $text, $product ) {
	if ( ! $product->is_in_stock() ) {
		return __( 'Sold out', 'bidri-crafts' );
	}
	if ( $product->managing_stock() && 1 === (int) $product->get_stock_quantity() ) {
		return __( 'Only one piece available', 'bidri-crafts' );
	}
	return $product->managing_stock() ? '' : $text;
}, 10, 2 );

/* Fewer upsell nags in wp-admin for the shop owner. */
add_filter( 'woocommerce_allow_marketplace_suggestions', '__return_false' );
add_filter( 'woocommerce_show_admin_notice', function ( $show, $notice ) {
	return in_array( $notice, array( 'wc_admin', 'install' ), true ) ? false : $show;
}, 10, 2 );

/* Breadcrumb: "Home / Shop / Category / Product" with our separator. */
add_filter( 'woocommerce_breadcrumb_defaults', function ( $args ) {
	$args['delimiter'] = '<span class="bc-crumb-sep" aria-hidden="true"> / </span>';
	return $args;
} );

/* Legacy (classic) order-received page: reassurance line. The block template has its own copy. */
add_action( 'woocommerce_thankyou', function () {
	echo '<p class="bc-thankyou-note">' . esc_html__( 'Your GI Tag No. 12 authenticity certificate ships with your order.', 'bidri-crafts' ) . '</p>';
}, 5 );
