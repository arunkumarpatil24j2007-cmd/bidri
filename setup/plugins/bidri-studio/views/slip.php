<?php
/**
 * Packing slip: print and put in the parcel.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$order = wc_get_order( absint( $_GET['id'] ?? 0 ) ); // phpcs:ignore WordPress.Security.NonceVerification
if ( ! $order || 'shop_order' !== $order->get_type() ) {
	echo '<p class="bs-empty">' . esc_html__( 'Order not found.', 'bidri-studio' ) . '</p>';
	return;
}
?>
<div class="bs-noprint bs-head bs-head--row">
	<a class="bs-back" href="<?php echo esc_url( bs_url( 'order', array( 'id' => $order->get_id() ) ) ); ?>"><?php echo esc_html( sprintf( __( 'Order #%s', 'bidri-studio' ), $order->get_order_number() ) ); ?></a>
	<button class="bs-btn bs-btn--silk bs-ico--print" type="button" data-print><?php esc_html_e( 'Print', 'bidri-studio' ); ?></button>
</div>

<article class="bs-slip">
	<header>
		<p class="bs-slip__brand"><span class="bs-mark" aria-hidden="true"></span><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
		<p><?php echo esc_html( sprintf( __( 'Order #%s', 'bidri-studio' ), $order->get_order_number() ) ); ?><br><?php echo esc_html( wp_date( 'j F Y', $order->get_date_created()->getTimestamp() ) ); ?></p>
	</header>
	<section>
		<h2><?php esc_html_e( 'Ship to', 'bidri-studio' ); ?></h2>
		<address><?php echo wp_kses( $order->get_formatted_shipping_address() ?: $order->get_formatted_billing_address(), array( 'br' => array() ) ); ?><br><?php echo esc_html( $order->get_billing_phone() ); ?></address>
	</section>
	<table>
		<thead><tr><th><?php esc_html_e( 'Piece', 'bidri-studio' ); ?></th><th><?php esc_html_e( 'Qty', 'bidri-studio' ); ?></th></tr></thead>
		<tbody>
			<?php foreach ( $order->get_items() as $item ) : $p = $item->get_product(); ?>
				<tr><td><?php echo esc_html( $item->get_name() ); ?><?php echo $p && $p->get_sku() ? '<small> · ' . esc_html( $p->get_sku() ) . '</small>' : ''; ?></td><td><?php echo (int) $item->get_quantity(); ?></td></tr>
			<?php endforeach; ?>
		</tbody>
	</table>
	<?php if ( $order->get_customer_note() ) : ?>
		<section class="bs-slip__note"><h2><?php esc_html_e( 'Gift note', 'bidri-studio' ); ?></h2><p><?php echo nl2br( esc_html( $order->get_customer_note() ) ); ?></p></section>
	<?php endif; ?>
	<footer><?php esc_html_e( 'Handmade in Bidar. Your GI certificate is enclosed. Thank you.', 'bidri-studio' ); ?></footer>
</article>
