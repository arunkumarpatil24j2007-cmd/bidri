<?php
/**
 * Everything that changes data. Each handler:
 *   1. checks the user's permission, 2. checks the form's nonce (blocks forged requests),
 *   3. validates input, 4. uses WooCommerce's own API (so stock, emails and Shiprocket sync behave normally),
 *   5. redirects back with a short message.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** Stop unless the request is a genuine Studio form from a permitted user. */
function bs_guard( string $action, string $cap ): void {
	if ( ! is_user_logged_in() || ! current_user_can( $cap ) ) {
		wp_die( esc_html__( 'You don’t have permission to do that.', 'bidri-studio' ), 403 );
	}
	if ( ! isset( $_POST['_bsnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_bsnonce'] ) ), 'bidri_studio_' . $action ) ) {
		wp_die( esc_html__( 'This page expired. Go back, refresh and try again.', 'bidri-studio' ), 403 );
	}
}

/** Redirect back into Studio with a message key. */
function bs_back( string $screen, array $args, string $msg ): void {
	wp_safe_redirect( bs_url( $screen, array_merge( $args, array( 'msg' => $msg ) ) ) );
	exit;
}

function bs_post_int( string $key ): int {
	return isset( $_POST[ $key ] ) ? (int) wp_unslash( $_POST[ $key ] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification -- checked in bs_guard().
}

function bs_post_text( string $key, bool $multiline = false ): string {
	$raw = isset( $_POST[ $key ] ) ? wp_unslash( $_POST[ $key ] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	return $multiline ? sanitize_textarea_field( $raw ) : sanitize_text_field( $raw );
}

/* ---------------------------------------------------------------- Orders */

add_action( 'admin_post_bidri_studio_ship', function () {
	bs_guard( 'ship', 'edit_shop_orders' );
	$order = wc_get_order( bs_post_int( 'order' ) );
	if ( ! $order || 'processing' !== $order->get_status() ) {
		bs_back( 'orders', array(), 'nochange' );
	}
	$order->update_status( 'completed', __( 'Marked shipped in Studio.', 'bidri-studio' ), true );
	bs_back( 'order', array( 'id' => $order->get_id() ), 'shipped' );
} );

add_action( 'admin_post_bidri_studio_unship', function () {
	bs_guard( 'unship', 'edit_shop_orders' );
	$order = wc_get_order( bs_post_int( 'order' ) );
	if ( ! $order || 'completed' !== $order->get_status() ) {
		bs_back( 'orders', array(), 'nochange' );
	}
	$order->update_status( 'processing', __( 'Moved back to "To ship" in Studio.', 'bidri-studio' ), true );
	bs_back( 'order', array( 'id' => $order->get_id() ), 'unshipped' );
} );

/* Only unpaid orders can be cancelled here; paid ones are refunded (money must go back). */
add_action( 'admin_post_bidri_studio_cancel', function () {
	bs_guard( 'cancel', 'edit_shop_orders' );
	$order = wc_get_order( bs_post_int( 'order' ) );
	if ( ! $order || ! in_array( $order->get_status(), array( 'pending', 'on-hold', 'failed' ), true ) ) {
		bs_back( 'orders', array(), 'nochange' );
	}
	$order->update_status( 'cancelled', __( 'Cancelled in Studio.', 'bidri-studio' ), true );
	bs_back( 'order', array( 'id' => $order->get_id() ), 'cancelled' );
} );

/* ---------------------------------------------------------------- Pieces */

/* +1 / −1 stock. Uses WooCommerce's atomic stock update (safe even during a sale). */
add_action( 'admin_post_bidri_studio_stock', function () {
	bs_guard( 'stock', 'edit_products' );
	$product = wc_get_product( bs_post_int( 'piece' ) );
	$delta   = bs_post_int( 'delta' ) > 0 ? 1 : -1;
	$back    = 'pieces' === bs_post_text( 'from' ) ? 'pieces' : 'piece';
	if ( ! $product ) {
		bs_back( 'pieces', array(), 'nochange' );
	}
	if ( ! $product->managing_stock() ) {
		$product->set_manage_stock( true );
		$product->set_stock_quantity( $product->is_in_stock() ? 1 : 0 );
		$product->save();
	}
	if ( $delta < 0 && (int) $product->get_stock_quantity() <= 0 ) {
		bs_back( $back, 'piece' === $back ? array( 'id' => $product->get_id() ) : array(), 'nochange' );
	}
	wc_update_product_stock( $product, 1, $delta > 0 ? 'increase' : 'decrease' );
	bs_back( $back, 'piece' === $back ? array( 'id' => $product->get_id() ) : array(), 'stock' );
} );

add_action( 'admin_post_bidri_studio_trash', function () {
	bs_guard( 'trash', 'delete_products' );
	$id = bs_post_int( 'piece' );
	if ( $id && 'product' === get_post_type( $id ) ) {
		wp_trash_post( $id );
	}
	bs_back( 'pieces', array(), 'removed' );
} );

add_action( 'admin_post_bidri_studio_save', function () {
	bs_guard( 'save', 'edit_products' );

	$id      = bs_post_int( 'piece' );
	$product = $id ? wc_get_product( $id ) : new WC_Product_Simple();
	if ( ! $product || ( $id && ! current_user_can( 'edit_product', $id ) ) ) {
		bs_back( 'pieces', array(), 'nochange' );
	}

	$name  = bs_post_text( 'name' );
	$price = preg_replace( '/[^\d]/', '', bs_post_text( 'price' ) ); // "₹38,500" → "38500"
	$stock = max( 0, bs_post_int( 'stock' ) );
	if ( '' === $name ) {
		bs_back( 'piece', $id ? array( 'id' => $id ) : array( 'new' => 1 ), 'needname' );
	}

	$product->set_name( $name );
	$product->set_regular_price( $price );
	$product->set_manage_stock( true );
	$product->set_stock_quantity( $stock );
	$product->set_backorders( 'no' );
	$product->set_short_description( bs_post_text( 'about', true ) );
	$product->set_featured( ! empty( $_POST['featured'] ) ); // phpcs:ignore WordPress.Security.NonceVerification
	$product->set_status( ! empty( $_POST['visible'] ) ? 'publish' : 'draft' ); // phpcs:ignore WordPress.Security.NonceVerification
	if ( ! $id ) {
		$product->set_catalog_visibility( 'visible' );
		$product->set_tax_status( 'taxable' );
	}

	$cat = bs_post_int( 'collection' );
	if ( $cat && term_exists( $cat, 'product_cat' ) ) {
		$product->set_category_ids( array( $cat ) );
	}

	$grams = max( 0, bs_post_int( 'weight' ) );
	$product->set_weight( $grams ? round( $grams / 1000, 3 ) : '' ); // kg, for Shiprocket.

	// Visible spec rows: keep any others, set Material/Inlay defaults on new pieces, update Size/Weight.
	$specs = array(
		'Size'   => bs_post_text( 'size' ),
		'Weight' => $grams ? number_format( $grams ) . ' g' : '',
	);
	$attrs = array();
	foreach ( $product->get_attributes() as $key => $a ) {
		$attrs[ wc_attribute_label( $a->get_name() ) ] = $a;
	}
	if ( ! $id ) {
		$specs = array( 'Material' => 'Zinc-copper alloy', 'Inlay' => 'Pure silver, 99.9%' ) + $specs;
	}
	foreach ( $specs as $label => $value ) {
		unset( $attrs[ $label ] );
		if ( '' !== $value ) {
			$a = new WC_Product_Attribute();
			$a->set_name( $label );
			$a->set_options( array( $value ) );
			$a->set_visible( true );
			$a->set_variation( false );
			$attrs[ $label ] = $a;
		}
	}
	$pos = 0;
	foreach ( array( 'Material', 'Inlay', 'Size', 'Weight' ) as $order_label ) {
		if ( isset( $attrs[ $order_label ] ) ) {
			$attrs[ $order_label ]->set_position( $pos++ );
		}
	}
	$product->set_attributes( array_values( $attrs ) );

	$id = $product->save();
	if ( ! $product->get_sku() ) {
		try {
			$product->set_sku( 'BC-' . $id );
			$product->save();
		} catch ( Exception $e ) { // SKU already used — leave empty.
			unset( $e );
		}
	}

	// Photo (optional). Only real images; WordPress makes the web-sized WebP copies.
	if ( ! empty( $_FILES['photo']['name'] ) && UPLOAD_ERR_OK === ( $_FILES['photo']['error'] ?? 1 ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$check = wp_check_filetype_and_ext( $_FILES['photo']['tmp_name'], sanitize_file_name( $_FILES['photo']['name'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( ! in_array( $check['type'], array( 'image/jpeg', 'image/png', 'image/webp' ), true ) ) {
			bs_back( 'piece', array( 'id' => $id ), 'badphoto' );
		}
		$img = media_handle_upload( 'photo', $id, array( 'post_title' => $name ), array( 'test_form' => false, 'mimes' => array( 'jpg|jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp' ) ) );
		if ( is_wp_error( $img ) ) {
			bs_back( 'piece', array( 'id' => $id ), 'badphoto' );
		}
		update_post_meta( $img, '_wp_attachment_image_alt', $name . ' — Bidriware with pure silver inlay' );
		$product->set_image_id( $img );
		$product->save();
	}

	bs_back( 'piece', array( 'id' => $id ), $id === bs_post_int( 'piece' ) ? 'saved' : 'added' );
} );
