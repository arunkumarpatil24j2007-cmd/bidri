<?php
/**
 * Small helpers shared by the Studio screens.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** Order statuses that mean "paid". */
const BIDRI_STUDIO_PAID = array( 'wc-processing', 'wc-completed', 'wc-on-hold' );

/** Rupees in Indian grouping: ₹1,85,000. */
function bs_inr( $amount ): string {
	$n   = (int) round( (float) $amount );
	$neg = $n < 0;
	$s   = (string) abs( $n );
	if ( strlen( $s ) > 3 ) {
		$rest = preg_replace( '/\B(?=(\d{2})+(?!\d))/', ',', substr( $s, 0, -3 ) );
		$s    = $rest . ',' . substr( $s, -3 );
	}
	return ( $neg ? '−' : '' ) . '₹' . $s;
}

/** Studio URL: bs_url( 'orders', [ 'id' => 12 ] ). */
function bs_url( string $screen = 'today', array $args = array() ): string {
	return add_query_arg( array_merge( array( 'page' => 'bidri-studio', 'bs' => $screen ), $args ), admin_url( 'admin.php' ) );
}

/** URL that posts to an action handler (used in <form action>). */
function bs_action_url(): string {
	return admin_url( 'admin-post.php' );
}

/** Hidden fields every Studio form carries. */
function bs_form_fields( string $action, array $extra = array() ): void {
	printf( '<input type="hidden" name="action" value="%s">', esc_attr( 'bidri_studio_' . $action ) );
	wp_nonce_field( 'bidri_studio_' . $action, '_bsnonce' );
	foreach ( $extra as $k => $v ) {
		printf( '<input type="hidden" name="%s" value="%s">', esc_attr( $k ), esc_attr( $v ) );
	}
}

/** Owner-friendly order status. */
function bs_status( string $status ): array {
	$map = array(
		'processing' => array( __( 'To ship', 'bidri-studio' ), 'todo' ),
		'completed'  => array( __( 'Shipped', 'bidri-studio' ), 'done' ),
		'on-hold'    => array( __( 'On hold', 'bidri-studio' ), 'wait' ),
		'pending'    => array( __( 'Awaiting payment', 'bidri-studio' ), 'muted' ),
		'failed'     => array( __( 'Payment failed', 'bidri-studio' ), 'muted' ),
		'cancelled'  => array( __( 'Cancelled', 'bidri-studio' ), 'muted' ),
		'refunded'   => array( __( 'Refunded', 'bidri-studio' ), 'muted' ),
	);
	return $map[ $status ] ?? array( ucfirst( $status ), 'muted' );
}

function bs_chip( string $status ): string {
	[ $label, $tone ] = bs_status( $status );
	return sprintf( '<span class="bs-chip bs-chip--%s">%s</span>', esc_attr( $tone ), esc_html( $label ) );
}

/** "2 h ago", "Yesterday", "3 Nov". */
function bs_when( $date ): string {
	if ( ! $date ) {
		return '';
	}
	$ts   = $date->getTimestamp();
	$diff = time() - $ts;
	if ( $diff < DAY_IN_SECONDS ) {
		/* translators: %s: e.g. "2 hours" */
		return sprintf( __( '%s ago', 'bidri-studio' ), human_time_diff( $ts ) );
	}
	if ( $diff < 2 * DAY_IN_SECONDS ) {
		return __( 'Yesterday', 'bidri-studio' );
	}
	return wp_date( 'j M', $ts );
}

/** Product thumbnail <img> or an empty tile. */
function bs_thumb( $product, string $class = 'bs-thumb' ): string {
	$id = $product ? $product->get_image_id() : 0;
	if ( $id ) {
		return wp_get_attachment_image( $id, 'thumbnail', false, array( 'class' => $class, 'alt' => '', 'loading' => 'lazy' ) );
	}
	return '<span class="' . esc_attr( $class ) . ' bs-thumb--empty" aria-hidden="true"></span>';
}

/** All pieces (small catalogue — one query is fine). */
function bs_pieces( array $status = array( 'publish', 'draft', 'private' ) ): array {
	return wc_get_products( array(
		'status'  => $status,
		'limit'   => -1,
		'orderby' => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
		'type'    => array( 'simple' ),
	) );
}

function bs_stock( $product ): ?int {
	return $product->managing_stock() ? (int) $product->get_stock_quantity() : null;
}

/** Text for a stock level: "Sold out", "1 left", "6 in stock". */
function bs_stock_label( $product ): string {
	$q = bs_stock( $product );
	if ( null === $q ) {
		return $product->is_in_stock() ? __( 'In stock', 'bidri-studio' ) : __( 'Sold out', 'bidri-studio' );
	}
	if ( $q <= 0 ) {
		return __( 'Sold out', 'bidri-studio' );
	}
	/* translators: %d: number of pieces */
	return 1 === $q ? __( '1 left', 'bidri-studio' ) : sprintf( __( '%d in stock', 'bidri-studio' ), $q );
}

/** Net paid revenue for a set of orders (refunds removed). */
function bs_revenue( array $orders ): float {
	$sum = 0.0;
	foreach ( $orders as $o ) {
		$sum += (float) $o->get_total() - (float) $o->get_total_refunded();
	}
	return $sum;
}

/** Paid orders created since a timestamp. */
function bs_paid_orders_since( int $ts ): array {
	return wc_get_orders( array(
		'status'       => BIDRI_STUDIO_PAID,
		'date_created' => '>=' . $ts,
		'limit'        => -1,
		'type'         => 'shop_order',
	) );
}

/** Midnight today in the store's timezone, as a Unix timestamp. */
function bs_today_start(): int {
	return ( new DateTimeImmutable( 'today', wp_timezone() ) )->getTimestamp();
}

/** One-word attribute value (e.g. "Size") from a product, or ''. */
function bs_attr( $product, string $name ): string {
	foreach ( $product->get_attributes() as $a ) {
		if ( 0 === strcasecmp( wc_attribute_label( $a->get_name() ), $name ) ) {
			return trim( implode( ', ', (array) $a->get_options() ) );
		}
	}
	return '';
}
