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
	$nonce = $_POST['_bsnonce'] ?? $_GET['_bsnonce'] ?? ''; // phpcs:ignore WordPress.Security -- verified here. GET only for file downloads.
	if ( '' === $nonce || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $nonce ) ), 'bidri_studio_' . $action ) ) {
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
	bs_save_tracking( $order );
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

/* ---------------------------------------------------------------- Tracking & notes */

/** Courier + tracking number from the form, if given. Returns true when something changed. */
function bs_save_tracking( WC_Order $order ): bool {
	$courier  = bs_post_text( 'courier' );
	$tracking = bs_post_text( 'tracking' );
	if ( '' === $tracking ) {
		return false;
	}
	$order->update_meta_data( '_bs_courier', $courier );
	$order->update_meta_data( '_bs_tracking', $tracking );
	$order->save_meta_data();
	return true;
}

/* Tracking added after shipping: save it and email the customer. */
add_action( 'admin_post_bidri_studio_tracking', function () {
	bs_guard( 'tracking', 'edit_shop_orders' );
	$order = wc_get_order( bs_post_int( 'order' ) );
	if ( ! $order || ! bs_save_tracking( $order ) ) {
		bs_back( 'order', array( 'id' => bs_post_int( 'order' ) ), 'nochange' );
	}
	$order->add_order_note( bs_tracking_line( $order ), true ); // true = emailed to the customer.
	bs_back( 'order', array( 'id' => $order->get_id() ), 'tracking' );
} );

function bs_tracking_line( WC_Order $order ): string {
	$courier = (string) $order->get_meta( '_bs_courier' );
	/* translators: 1: courier name, 2: tracking number */
	return $courier ? sprintf( __( 'Your order is on its way with %1$s. Tracking number: %2$s', 'bidri-studio' ), $courier, $order->get_meta( '_bs_tracking' ) )
		/* translators: %s: tracking number */
		: sprintf( __( 'Your order is on its way. Tracking number: %s', 'bidri-studio' ), $order->get_meta( '_bs_tracking' ) );
}

/* The "shipped" email carries the tracking number when there is one. */
add_action( 'woocommerce_email_before_order_table', function ( $order, $sent_to_admin, $plain, $email = null ) {
	if ( $sent_to_admin || ! $email || 'customer_completed_order' !== $email->id || ! $order->get_meta( '_bs_tracking' ) ) {
		return;
	}
	echo $plain ? "\n" . esc_html( bs_tracking_line( $order ) ) . "\n" : '<p><strong>' . esc_html( bs_tracking_line( $order ) ) . '</strong></p>';
}, 20, 4 );

add_action( 'admin_post_bidri_studio_note', function () {
	bs_guard( 'note', 'edit_shop_orders' );
	$order = wc_get_order( bs_post_int( 'order' ) );
	$note  = bs_post_text( 'note', true );
	if ( ! $order || '' === $note ) {
		bs_back( 'order', array( 'id' => bs_post_int( 'order' ) ), 'nochange' );
	}
	$order->add_order_note( $note, false, true ); // Private: only the shop sees it.
	bs_back( 'order', array( 'id' => $order->get_id() ), 'noted' );
} );

/* ---------------------------------------------------------------- New order (phone / WhatsApp sales) */

add_action( 'admin_post_bidri_studio_neworder', function () {
	bs_guard( 'neworder', 'edit_shop_orders' );
	// phpcs:disable WordPress.Security.NonceVerification -- checked in bs_guard().
	$ids  = array_map( 'absint', (array) ( $_POST['piece'] ?? array() ) );
	$qtys = array_map( 'absint', (array) ( $_POST['qty'] ?? array() ) );
	// phpcs:enable
	$lines = array();
	foreach ( $ids as $i => $pid ) {
		$product = $pid ? wc_get_product( $pid ) : null;
		$qty     = max( 1, $qtys[ $i ] ?? 1 );
		if ( $product ) {
			$lines[ $pid ] = array( $product, ( $lines[ $pid ][1] ?? 0 ) + $qty );
		}
	}
	$name  = bs_post_text( 'name' );
	$phone = bs_post_text( 'phone' );
	if ( ! $lines || '' === $name || '' === $phone ) {
		bs_back( 'neworder', array(), 'needorder' );
	}
	foreach ( $lines as [ $product, $qty ] ) {
		if ( $product->managing_stock() && $qty > (int) $product->get_stock_quantity() ) {
			bs_back( 'neworder', array(), 'nostock' );
		}
	}

	$order = wc_create_order( array( 'created_via' => 'bidri-studio' ) );
	if ( is_wp_error( $order ) ) {
		bs_back( 'orders', array(), 'nochange' );
	}
	foreach ( $lines as [ $product, $qty ] ) {
		$order->add_product( $product, $qty );
	}
	$parts = preg_split( '/\s+/', $name, 2 );
	$state = strtoupper( bs_post_text( 'state' ) );
	$addr  = array(
		'first_name' => $parts[0],
		'last_name'  => $parts[1] ?? '',
		'phone'      => $phone,
		'email'      => sanitize_email( bs_post_text( 'email' ) ),
		'address_1'  => bs_post_text( 'address' ),
		'city'       => bs_post_text( 'city' ),
		'state'      => isset( WC()->countries->get_states( 'IN' )[ $state ] ) ? $state : '',
		'postcode'   => preg_replace( '/\D/', '', bs_post_text( 'pin' ) ),
		'country'    => 'IN',
	);
	$order->set_address( $addr, 'billing' );
	$order->set_address( $addr, 'shipping' );
	$order->calculate_totals();

	if ( 'direct' === bs_post_text( 'paid' ) ) {
		$order->update_meta_data( '_bs_paid_directly', 1 );
		$order->set_payment_method_title( __( 'Paid directly', 'bidri-studio' ) );
		$order->set_date_paid( time() );
		$order->save();
		$order->update_status( 'processing', __( 'Entered in Studio, paid directly to the shop.', 'bidri-studio' ) ); // Stock goes down, customer gets the confirmation email.
		bs_back( 'order', array( 'id' => $order->get_id() ), 'created' );
	}
	$order->save();
	$order->update_status( 'pending', __( 'Entered in Studio. Payment link to be sent to the customer.', 'bidri-studio' ) );
	bs_back( 'order', array( 'id' => $order->get_id() ), 'linkready' );
} );

/* ---------------------------------------------------------------- Discounts */

add_action( 'admin_post_bidri_studio_discount', function () {
	bs_guard( 'discount', 'edit_shop_coupons' );
	$code   = strtoupper( preg_replace( '/[^A-Za-z0-9-]/', '', bs_post_text( 'code' ) ) );
	$type   = 'fixed' === bs_post_text( 'type' ) ? 'fixed_cart' : 'percent';
	$amount = (float) preg_replace( '/[^\d.]/', '', bs_post_text( 'amount' ) );
	if ( '' === $code || $amount <= 0 || ( 'percent' === $type && $amount > 90 ) ) {
		bs_back( 'discount', array(), 'baddiscount' );
	}
	if ( wc_get_coupon_id_by_code( $code ) ) {
		bs_back( 'discount', array(), 'codeused' );
	}
	$c = new WC_Coupon();
	$c->set_code( $code );
	$c->set_discount_type( $type );
	$c->set_amount( $amount );
	$c->set_individual_use( true );
	$min = (float) preg_replace( '/[^\d.]/', '', bs_post_text( 'min' ) );
	if ( $min > 0 ) {
		$c->set_minimum_amount( $min );
	}
	$uses = bs_post_int( 'uses' );
	if ( $uses > 0 ) {
		$c->set_usage_limit( $uses );
	}
	if ( ! empty( $_POST['once'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		$c->set_usage_limit_per_user( 1 );
	}
	$ends = bs_post_text( 'ends' );
	if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $ends ) ) {
		$c->set_date_expires( ( new DateTimeImmutable( $ends . ' 23:59:59', wp_timezone() ) )->getTimestamp() );
	}
	$c->save();
	bs_back( 'discounts', array(), 'discounted' );
} );

/* Pause / resume a code. */
add_action( 'admin_post_bidri_studio_discount_toggle', function () {
	bs_guard( 'discount_toggle', 'edit_shop_coupons' );
	$id = bs_post_int( 'coupon' );
	if ( 'shop_coupon' === get_post_type( $id ) ) {
		wp_update_post( array( 'ID' => $id, 'post_status' => 'publish' === get_post_status( $id ) ? 'draft' : 'publish' ) );
	}
	bs_back( 'discounts', array(), 'saved' );
} );

/* ---------------------------------------------------------------- Notifications */

add_action( 'admin_post_bidri_studio_notify', function () {
	bs_guard( 'notify', 'manage_woocommerce' );
	$on    = (array) ( $_POST['on'] ?? array() ); // phpcs:ignore WordPress.Security.NonceVerification
	$prefs = array();
	foreach ( array_keys( bs_event_types() ) as $type ) {
		$prefs[ $type ] = isset( $on[ $type ] ) ? 1 : 0;
	}
	update_user_meta( get_current_user_id(), '_bs_notify', $prefs );
	bs_back( 'notify', array(), 'saved' );
} );

add_action( 'admin_post_bidri_studio_device_remove', function () {
	bs_guard( 'device_remove', 'manage_woocommerce' );
	$uid  = get_current_user_id();
	$list = bs_devices( $uid );
	unset( $list[ bs_post_text( 'key' ) ] );
	update_user_meta( $uid, '_bs_devices', $list );
	bs_back( 'notify', array(), 'saved' );
} );
