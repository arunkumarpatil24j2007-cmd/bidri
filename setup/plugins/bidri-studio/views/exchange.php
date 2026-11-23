<?php
/**
 * One exchange request: what, why, photos — and one main action.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$ex    = bs_exchange( absint( $_GET['id'] ?? 0 ) ); // phpcs:ignore WordPress.Security.NonceVerification
$order = $ex ? wc_get_order( $ex['order'] ) : null;
if ( ! $ex || ! $order ) {
	echo '<p class="bs-empty">' . esc_html__( 'Request not found.', 'bidri-studio' ) . '</p>';
	return;
}
$state = $ex['state'];
$phone = $order->get_billing_phone();
$value = bs_exchange_value( $ex );
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'exchanges', array( 'show' => 'requested' === $state ? 'new' : 'all' ) ) ); ?>"><?php esc_html_e( 'Exchanges', 'bidri-studio' ); ?></a>

<div class="bs-head bs-head--row">
	<div>
		<p class="bs-eyebrow"><?php echo esc_html( sprintf( __( 'Order #%s', 'bidri-studio' ), $order->get_order_number() ) ); ?> · <?php echo esc_html( wp_date( 'j M, g:i a', $ex['date']->getTimestamp() ) ); ?></p>
		<h1><?php echo esc_html( bs_exchange_reasons()[ $ex['reason'] ] ?? __( 'Exchange', 'bidri-studio' ) ); ?></h1>
	</div>
	<?php echo bs_exchange_chip( $state ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
</div>

<?php if ( 'requested' === $state ) : ?>
	<form class="bs-primary" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
		<?php bs_form_fields( 'ex_approve', array( 'exchange' => $ex['id'] ) ); ?>
		<details class="bs-more-field"><summary><?php esc_html_e( 'Add a message', 'bidri-studio' ); ?></summary>
			<label class="screen-reader-text" for="bs-reply"><?php esc_html_e( 'Message to the customer', 'bidri-studio' ); ?></label>
			<textarea id="bs-reply" name="reply" rows="3" placeholder="<?php esc_attr_e( 'We’ll arrange a pickup and send the exchange once it reaches us.', 'bidri-studio' ); ?>"></textarea>
		</details>
		<button class="bs-btn bs-btn--silk bs-btn--wide bs-ico--exchange" type="submit"><?php esc_html_e( 'Approve exchange', 'bidri-studio' ); ?></button>
	</form>
<?php elseif ( 'approved' === $state ) : ?>
	<form class="bs-primary" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
		<?php bs_form_fields( 'ex_done', array( 'exchange' => $ex['id'] ) ); ?>
		<button class="bs-btn bs-btn--silk bs-btn--wide bs-ico--truck" type="submit"><?php esc_html_e( 'Mark as exchanged', 'bidri-studio' ); ?></button>
	</form>
<?php endif; ?>

<div class="bs-grid">
	<section class="bs-card">
		<h2><?php esc_html_e( 'Pieces', 'bidri-studio' ); ?></h2>
		<ul class="bs-items">
			<?php foreach ( $ex['items'] as $item_id => $qty ) : $item = $order->get_item( (int) $item_id ); if ( ! $item ) { continue; } ?>
				<li>
					<?php echo bs_thumb( $item->get_product() ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span class="bs-row__main"><strong><?php echo esc_html( $item->get_name() ); ?></strong><span class="bs-muted"><?php echo esc_html( sprintf( '× %d', $qty ) ); ?></span></span>
				</li>
			<?php endforeach; ?>
		</ul>
		<p class="bs-total"><span><?php esc_html_e( 'Value', 'bidri-studio' ); ?></span><strong class="bs-money"><?php echo esc_html( bs_inr( $value ) ); ?></strong></p>
		<?php if ( $ex['details'] ) : ?><p class="bs-quote"><?php echo nl2br( esc_html( $ex['details'] ) ); ?></p><?php endif; ?>
	</section>

	<section class="bs-card">
		<h2><?php echo esc_html( $ex['name'] ); ?></h2>
		<div class="bs-contact">
			<?php if ( $phone ) : ?>
				<a class="bs-btn bs-ico--phone" href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a>
				<a class="bs-btn bs-ico--chat" href="<?php echo esc_url( bs_whatsapp( $phone, sprintf( __( 'Hello! About your exchange request for order #%s:', 'bidri-studio' ), $order->get_order_number() ) ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'WhatsApp', 'bidri-studio' ); ?></a>
			<?php endif; ?>
			<a class="bs-link" href="<?php echo esc_url( bs_url( 'order', array( 'id' => $order->get_id() ) ) ); ?>"><?php echo esc_html( sprintf( __( 'Open order #%s', 'bidri-studio' ), $order->get_order_number() ) ); ?></a>
		</div>
	</section>

	<?php if ( $ex['photos'] ) : ?>
		<section class="bs-card bs-card--wide">
			<h2><?php esc_html_e( 'Photos', 'bidri-studio' ); ?></h2>
			<div class="bs-photos">
				<?php foreach ( $ex['photos'] as $att ) : ?>
					<a href="<?php echo esc_url( wp_get_attachment_url( $att ) ); ?>" target="_blank" rel="noopener"><?php echo wp_get_attachment_image( $att, 'medium', false, array( 'alt' => '', 'loading' => 'lazy' ) ); ?></a>
				<?php endforeach; ?>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( $ex['reply'] || $ex['credit'] ) : ?>
		<section class="bs-card bs-card--note">
			<h2><?php echo $ex['credit'] ? esc_html__( 'Store credit code', 'bidri-studio' ) : esc_html__( 'Your reply', 'bidri-studio' ); ?></h2>
			<p><?php echo $ex['credit'] ? esc_html( $ex['credit'] ) : nl2br( esc_html( $ex['reply'] ) ); ?></p>
		</section>
	<?php endif; ?>
</div>

<?php if ( in_array( $state, array( 'requested', 'approved' ), true ) ) : ?>
<div class="bs-quiet-actions">
	<?php if ( $value > 0 && ! $ex['credit'] ) : ?>
		<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'ex_credit', array( 'exchange' => $ex['id'] ) ); ?><button class="bs-link" type="submit" data-confirm="<?php echo esc_attr( sprintf( __( 'Email the customer a one-time code worth %s instead of an exchange?', 'bidri-studio' ), bs_inr( $value ) ) ); ?>"><?php echo esc_html( sprintf( __( 'Give %s store credit instead', 'bidri-studio' ), bs_inr( $value ) ) ); ?></button></form>
	<?php endif; ?>
	<?php if ( 'requested' === $state ) : ?>
		<details class="bs-more-field bs-more-field--quiet"><summary class="bs-link"><?php esc_html_e( 'Decline', 'bidri-studio' ); ?></summary>
			<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
				<?php bs_form_fields( 'ex_decline', array( 'exchange' => $ex['id'] ) ); ?>
				<label class="screen-reader-text" for="bs-decline"><?php esc_html_e( 'Reason for the customer', 'bidri-studio' ); ?></label>
				<textarea id="bs-decline" name="reply" rows="3" required placeholder="<?php esc_attr_e( 'Reason for the customer', 'bidri-studio' ); ?>"></textarea>
				<button class="bs-btn" type="submit"><?php esc_html_e( 'Decline and email', 'bidri-studio' ); ?></button>
			</form>
		</details>
	<?php endif; ?>
</div>
<?php endif; ?>
