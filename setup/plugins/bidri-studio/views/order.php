<?php
/**
 * One order: what to pack, where to send it, who to call — and one main action.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$order = wc_get_order( absint( $_GET['id'] ?? 0 ) ); // phpcs:ignore WordPress.Security.NonceVerification
if ( ! $order || 'shop_order' !== $order->get_type() ) {
	echo '<p class="bs-empty">' . esc_html__( 'Order not found.', 'bidri-studio' ) . '</p>';
	return;
}
$status = $order->get_status();
$phone  = $order->get_billing_phone();
$digits = preg_replace( '/\D+/', '', $phone );
if ( 10 === strlen( $digits ) ) {
	$digits = '91' . $digits;
}
$note   = $order->get_customer_note();
$paid   = $order->get_date_paid();
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'orders', array( 'show' => 'processing' === $status ? 'toship' : 'all' ) ) ); ?>"><?php esc_html_e( 'Orders', 'bidri-studio' ); ?></a>

<div class="bs-head bs-head--row">
	<div>
		<p class="bs-eyebrow">#<?php echo esc_html( $order->get_order_number() ); ?> · <?php echo $order->get_date_created() ? esc_html( wp_date( 'j M Y, g:i a', $order->get_date_created()->getTimestamp() ) ) : ''; ?></p>
		<h1><?php echo esc_html( $order->get_formatted_billing_full_name() ?: __( 'Guest', 'bidri-studio' ) ); ?></h1>
	</div>
	<?php echo bs_chip( $status ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
</div>

<?php if ( 'processing' === $status ) : ?>
	<form class="bs-primary" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
		<?php bs_form_fields( 'ship', array( 'order' => $order->get_id() ) ); ?>
		<details class="bs-more-field"><summary><?php esc_html_e( 'Add tracking number', 'bidri-studio' ); ?></summary>
			<?php bs_tracking_fields(); ?>
		</details>
		<button class="bs-btn bs-btn--silk bs-btn--wide bs-ico--truck" type="submit"><?php esc_html_e( 'Mark as shipped', 'bidri-studio' ); ?></button>
	</form>
<?php endif; ?>

<?php if ( 'pending' === $status && $order->needs_payment() ) : $pay = $order->get_checkout_payment_url(); ?>
	<section class="bs-card bs-card--pay">
		<h2><?php esc_html_e( 'Payment link', 'bidri-studio' ); ?></h2>
		<p class="bs-paylink"><?php echo esc_html( $pay ); ?></p>
		<div class="bs-contact">
			<?php if ( $phone ) : ?>
				<a class="bs-btn bs-btn--silk bs-ico--chat" href="<?php echo esc_url( bs_whatsapp( $phone, sprintf( __( 'Hello! Here is the link to pay for your order #%1$s (%2$s): %3$s', 'bidri-studio' ), $order->get_order_number(), bs_inr( $order->get_total() ), $pay ) ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Send on WhatsApp', 'bidri-studio' ); ?></a>
			<?php endif; ?>
			<button class="bs-btn bs-ico--share" type="button" data-share="<?php echo esc_attr( $pay ); ?>"><?php esc_html_e( 'Share', 'bidri-studio' ); ?></button>
		</div>
	</section>
<?php endif; ?>

<div class="bs-grid">
	<section class="bs-card">
		<h2><?php esc_html_e( 'Pieces', 'bidri-studio' ); ?></h2>
		<ul class="bs-items">
			<?php foreach ( $order->get_items() as $item ) : $p = $item->get_product(); ?>
				<li>
					<?php echo bs_thumb( $p ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span class="bs-row__main"><strong><?php echo esc_html( $item->get_name() ); ?></strong><span class="bs-muted"><?php echo esc_html( sprintf( '× %d', $item->get_quantity() ) ); ?></span></span>
					<span class="bs-money"><?php echo esc_html( bs_inr( $item->get_total() + $item->get_total_tax() ) ); ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
		<p class="bs-total"><span><?php esc_html_e( 'Total', 'bidri-studio' ); ?></span><strong class="bs-money"><?php echo esc_html( bs_inr( $order->get_total() ) ); ?></strong></p>
		<?php if ( $order->get_total_refunded() > 0 ) : ?>
			<p class="bs-total bs-muted"><span><?php esc_html_e( 'Refunded', 'bidri-studio' ); ?></span><span class="bs-money"><?php echo esc_html( bs_inr( -$order->get_total_refunded() ) ); ?></span></p>
		<?php endif; ?>
		<p class="bs-muted bs-small">
			<?php echo esc_html( $order->get_payment_method_title() ?: __( 'No payment method', 'bidri-studio' ) ); ?>
			<?php if ( $paid ) : ?> · <?php echo esc_html( sprintf( __( 'paid %s', 'bidri-studio' ), wp_date( 'j M, g:i a', $paid->getTimestamp() ) ) ); ?><?php endif; ?>
		</p>
	</section>

	<section class="bs-card">
		<h2><?php esc_html_e( 'Ship to', 'bidri-studio' ); ?></h2>
		<address class="bs-address"><?php echo wp_kses( $order->get_formatted_shipping_address() ?: $order->get_formatted_billing_address(), array( 'br' => array() ) ); ?></address>
		<div class="bs-contact">
			<?php if ( $phone ) : ?>
				<a class="bs-btn bs-ico--phone" href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a>
				<a class="bs-btn bs-ico--chat" href="<?php echo esc_url( 'https://wa.me/' . $digits ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'WhatsApp', 'bidri-studio' ); ?></a>
			<?php endif; ?>
			<?php if ( $order->get_billing_email() ) : ?>
				<a class="bs-link" href="mailto:<?php echo esc_attr( $order->get_billing_email() ); ?>"><?php echo esc_html( $order->get_billing_email() ); ?></a>
			<?php endif; ?>
		</div>
	</section>

	<?php if ( $order->get_meta( '_bs_tracking' ) ) : ?>
		<section class="bs-card">
			<h2><?php esc_html_e( 'Tracking', 'bidri-studio' ); ?></h2>
			<p><strong class="bs-code"><?php echo esc_html( $order->get_meta( '_bs_tracking' ) ); ?></strong><?php echo $order->get_meta( '_bs_courier' ) ? ' · ' . esc_html( $order->get_meta( '_bs_courier' ) ) : ''; ?></p>
		</section>
	<?php elseif ( 'completed' === $status ) : ?>
		<section class="bs-card">
			<h2><?php esc_html_e( 'Tracking', 'bidri-studio' ); ?></h2>
			<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
				<?php bs_form_fields( 'tracking', array( 'order' => $order->get_id() ) ); ?>
				<?php bs_tracking_fields(); ?>
				<button class="bs-btn" type="submit"><?php esc_html_e( 'Save and email customer', 'bidri-studio' ); ?></button>
			</form>
		</section>
	<?php endif; ?>

	<?php foreach ( bs_exchanges( array(), $order->get_id() ) as $ex ) : ?>
		<a class="bs-card bs-card--link" href="<?php echo esc_url( bs_url( 'exchange', array( 'id' => $ex['id'] ) ) ); ?>">
			<h2 class="bs-ico--exchange"><?php esc_html_e( 'Exchange request', 'bidri-studio' ); ?></h2>
			<p><?php echo bs_exchange_chip( $ex['state'] ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <span class="bs-muted"><?php echo esc_html( bs_exchange_reasons()[ $ex['reason'] ] ?? '' ); ?> · <?php echo esc_html( bs_when( $ex['date'] ) ); ?></span></p>
		</a>
	<?php endforeach; ?>

	<?php if ( $note ) : ?>
		<section class="bs-card bs-card--note">
			<h2><?php esc_html_e( 'Gift note', 'bidri-studio' ); ?></h2>
			<p><?php echo nl2br( esc_html( $note ) ); ?></p>
		</section>
	<?php endif; ?>
</div>

<?php $notes = wc_get_order_notes( array( 'order_id' => $order->get_id(), 'order' => 'DESC' ) ); ?>
<section class="bs-section">
	<div class="bs-section__head"><h2><?php esc_html_e( 'Notes', 'bidri-studio' ); ?></h2></div>
	<form class="bs-note-form" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
		<?php bs_form_fields( 'note', array( 'order' => $order->get_id() ) ); ?>
		<label class="screen-reader-text" for="bs-note"><?php esc_html_e( 'Add a note (only you see it)', 'bidri-studio' ); ?></label>
		<input id="bs-note" type="text" name="note" required maxlength="500" placeholder="<?php esc_attr_e( 'Add a note — only you see it', 'bidri-studio' ); ?>">
		<button class="bs-btn" type="submit"><?php esc_html_e( 'Add', 'bidri-studio' ); ?></button>
	</form>
	<?php if ( $notes ) : ?>
		<ol class="bs-timeline">
			<?php foreach ( array_slice( $notes, 0, 12 ) as $n ) : ?>
				<li<?php echo $n->customer_note ? ' class="is-customer"' : ''; ?>><p><?php echo nl2br( esc_html( wp_strip_all_tags( $n->content ) ) ); ?></p><span class="bs-muted"><?php echo esc_html( bs_when( $n->date_created ) ); ?><?php echo $n->customer_note ? ' · ' . esc_html__( 'emailed to customer', 'bidri-studio' ) : ''; ?></span></li>
			<?php endforeach; ?>
		</ol>
	<?php endif; ?>
</section>

<div class="bs-quiet-actions">
	<a class="bs-link" href="<?php echo esc_url( bs_url( 'slip', array( 'id' => $order->get_id() ) ) ); ?>"><?php esc_html_e( 'Packing slip', 'bidri-studio' ); ?></a>
	<?php if ( 'completed' === $status ) : ?>
		<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'unship', array( 'order' => $order->get_id() ) ); ?><button class="bs-link" type="submit" data-confirm="<?php esc_attr_e( 'Move this order back to To ship?', 'bidri-studio' ); ?>"><?php esc_html_e( 'Not shipped yet? Move back', 'bidri-studio' ); ?></button></form>
	<?php endif; ?>
	<?php if ( in_array( $status, array( 'pending', 'on-hold', 'failed' ), true ) ) : ?>
		<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'cancel', array( 'order' => $order->get_id() ) ); ?><button class="bs-link" type="submit" data-confirm="<?php esc_attr_e( 'Cancel this unpaid order? Its pieces go back into stock.', 'bidri-studio' ); ?>"><?php esc_html_e( 'Cancel order', 'bidri-studio' ); ?></button></form>
	<?php endif; ?>
	<?php if ( in_array( $status, array( 'processing', 'completed', 'on-hold' ), true ) && $order->get_remaining_refund_amount() > 0 ) : ?>
		<a class="bs-link" href="<?php echo esc_url( $order->get_edit_order_url() ); ?>"><?php esc_html_e( 'Refund', 'bidri-studio' ); ?></a>
	<?php endif; ?>
</div>
