<?php
/**
 * Things the owner should hear about straight away: a new order, an exchange request,
 * a piece running low (fewer than 2 left).
 *
 * Each one is written as a row in a small table. The Studio app on the owner's phone
 * asks for new rows every few minutes and shows them as notifications.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** "Running low" means this many or fewer left (i.e. fewer than 2). */
const BIDRI_STUDIO_LOW = 1;

function bs_events_table(): string {
	global $wpdb;
	return $wpdb->prefix . 'bs_events';
}

function bs_install_events_table(): void {
	global $wpdb;
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta(
		'CREATE TABLE ' . bs_events_table() . " (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			type varchar(20) NOT NULL,
			ref bigint(20) unsigned NOT NULL DEFAULT 0,
			title varchar(200) NOT NULL,
			body varchar(400) NOT NULL DEFAULT '',
			url varchar(400) NOT NULL DEFAULT '',
			created datetime NOT NULL,
			PRIMARY KEY  (id),
			KEY created (created)
		) " . $wpdb->get_charset_collate() . ';'
	);
}

/** Kinds of notification, in the order shown in Settings. */
function bs_event_types(): array {
	return array(
		'order'    => __( 'New orders', 'bidri-studio' ),
		'exchange' => __( 'Exchange requests', 'bidri-studio' ),
		'stock'    => __( 'Running low', 'bidri-studio' ),
	);
}

/** Which kinds this user wants (all on unless switched off). */
function bs_notify_prefs( int $user_id ): array {
	$saved = get_user_meta( $user_id, '_bs_notify', true );
	$saved = is_array( $saved ) ? $saved : array();
	$out   = array();
	foreach ( array_keys( bs_event_types() ) as $type ) {
		$out[ $type ] = ! isset( $saved[ $type ] ) || (bool) $saved[ $type ];
	}
	return $out;
}

function bs_event( string $type, int $ref, string $title, string $body, string $url ): void {
	global $wpdb;
	$wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		bs_events_table(),
		array(
			'type'    => $type,
			'ref'     => $ref,
			'title'   => mb_substr( wp_strip_all_tags( $title ), 0, 200 ),
			'body'    => mb_substr( wp_strip_all_tags( $body ), 0, 400 ),
			'url'     => $url,
			'created' => gmdate( 'Y-m-d H:i:s' ),
		)
	);
	// Keep the table small: forget anything older than 60 days (checked now and then).
	if ( 1 === wp_rand( 1, 40 ) ) {
		$wpdb->query( $wpdb->prepare( 'DELETE FROM ' . bs_events_table() . ' WHERE created < %s', gmdate( 'Y-m-d H:i:s', time() - 60 * DAY_IN_SECONDS ) ) ); // phpcs:ignore WordPress.DB
	}
}

function bs_latest_event_id(): int {
	global $wpdb;
	return (int) $wpdb->get_var( 'SELECT MAX(id) FROM ' . bs_events_table() ); // phpcs:ignore WordPress.DB
}

/* ---------------------------------------------------------------- New order */

/** Once per order, when it is paid (or placed on hold). Not for orders the owner entered as already paid. */
function bs_order_event( $order ): void {
	$order = $order instanceof WC_Order ? $order : wc_get_order( $order );
	if ( ! $order || 'shop_order' !== $order->get_type() || $order->get_meta( '_bs_event_sent' ) || $order->get_meta( '_bs_paid_directly' ) ) {
		return;
	}
	if ( ! in_array( $order->get_status(), array( 'processing', 'on-hold', 'completed' ), true ) ) {
		return;
	}
	$order->update_meta_data( '_bs_event_sent', 1 );
	$order->save_meta_data();
	$n = $order->get_item_count();
	bs_event(
		'order',
		$order->get_id(),
		/* translators: %s: order total */
		sprintf( __( 'New order · %s', 'bidri-studio' ), bs_inr( $order->get_total() ) ),
		( $order->get_formatted_billing_full_name() ?: __( 'Guest', 'bidri-studio' ) ) . ' · ' . sprintf( _n( '%d piece', '%d pieces', $n, 'bidri-studio' ), $n ),
		bs_url( 'order', array( 'id' => $order->get_id() ) )
	);
}
add_action( 'woocommerce_order_status_processing', 'bs_order_event', 20 );
add_action( 'woocommerce_order_status_on-hold', 'bs_order_event', 20 );
add_action( 'woocommerce_payment_complete', 'bs_order_event', 20 );

/* ---------------------------------------------------------------- Running low */

/**
 * When a piece drops below 2: one notification at 1 left, one more at sold out.
 * Raising stock back to 2 or more resets it.
 */
function bs_stock_event( $product ): void {
	if ( ! $product instanceof WC_Product || ! $product->managing_stock() ) {
		return;
	}
	$id   = $product->get_id();
	$qty  = (int) $product->get_stock_quantity();
	$last = get_post_meta( $id, '_bs_low_sent', true );
	if ( $qty > BIDRI_STUDIO_LOW ) {
		if ( '' !== $last ) {
			delete_post_meta( $id, '_bs_low_sent' );
		}
		return;
	}
	if ( ( '' !== $last && $qty >= (int) $last ) || 'publish' !== get_post_status( $product->get_parent_id() ?: $id ) ) {
		return;
	}
	update_post_meta( $id, '_bs_low_sent', max( 0, $qty ) );
	bs_event(
		'stock',
		$id,
		/* translators: %s: piece name */
		$qty <= 0 ? sprintf( __( 'Sold out · %s', 'bidri-studio' ), $product->get_name() ) : sprintf( __( '1 left · %s', 'bidri-studio' ), $product->get_name() ),
		__( 'Add stock, or leave it sold out.', 'bidri-studio' ),
		bs_url( 'piece', array( 'id' => $id ) )
	);
}
add_action( 'woocommerce_product_set_stock', 'bs_stock_event' );
add_action( 'woocommerce_variation_set_stock', 'bs_stock_event' );

/* WooCommerce's own low-stock email uses the same line: fewer than 2. */
add_filter( 'pre_option_woocommerce_notify_low_stock_amount', fn() => BIDRI_STUDIO_LOW );
add_filter( 'pre_option_woocommerce_notify_no_stock_amount', fn() => 0 );
