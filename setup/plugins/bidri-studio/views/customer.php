<?php
/**
 * One customer: contact, total spent, every order.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$key = strtolower( sanitize_text_field( wp_unslash( $_GET['c'] ?? '' ) ) ); // phpcs:ignore WordPress.Security.NonceVerification
$c   = bs_customers()[ $key ] ?? null;
if ( ! $c ) {
	echo '<p class="bs-empty">' . esc_html__( 'Customer not found.', 'bidri-studio' ) . '</p>';
	return;
}
$n    = count( $c['orders'] );
$addr = $c['orders'][0]->get_formatted_shipping_address() ?: $c['orders'][0]->get_formatted_billing_address();
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'customers' ) ); ?>"><?php esc_html_e( 'Customers', 'bidri-studio' ); ?></a>

<div class="bs-head">
	<p class="bs-eyebrow"><?php echo esc_html( sprintf( _n( '%d order', '%d orders', $n, 'bidri-studio' ), $n ) ); ?> · <?php echo esc_html( sprintf( __( 'since %s', 'bidri-studio' ), wp_date( 'M Y', end( $c['orders'] )->get_date_created()->getTimestamp() ) ) ); ?></p>
	<h1><?php echo esc_html( $c['name'] ); ?></h1>
</div>

<div class="bs-stats bs-stats--two">
	<div class="bs-stat"><span class="bs-stat__label"><?php esc_html_e( 'Spent', 'bidri-studio' ); ?></span><span class="bs-stat__value"><?php echo esc_html( bs_inr( $c['spent'] ) ); ?></span></div>
	<div class="bs-stat"><span class="bs-stat__label"><?php esc_html_e( 'Average order', 'bidri-studio' ); ?></span><span class="bs-stat__value"><?php echo esc_html( bs_inr( $c['spent'] / max( 1, $n ) ) ); ?></span></div>
</div>

<div class="bs-grid bs-grid--gap">
	<section class="bs-card">
		<h2><?php esc_html_e( 'Contact', 'bidri-studio' ); ?></h2>
		<?php if ( $addr ) : ?><address class="bs-address"><?php echo wp_kses( $addr, array( 'br' => array() ) ); ?></address><?php endif; ?>
		<div class="bs-contact">
			<?php if ( $c['phone'] ) : ?>
				<a class="bs-btn bs-ico--phone" href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $c['phone'] ) ); ?>"><?php echo esc_html( $c['phone'] ); ?></a>
				<a class="bs-btn bs-ico--chat" href="<?php echo esc_url( bs_whatsapp( $c['phone'] ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'WhatsApp', 'bidri-studio' ); ?></a>
			<?php endif; ?>
			<?php if ( $c['email'] ) : ?><a class="bs-link" href="mailto:<?php echo esc_attr( $c['email'] ); ?>"><?php echo esc_html( $c['email'] ); ?></a><?php endif; ?>
		</div>
	</section>
	<section class="bs-section bs-section--flush">
		<ul class="bs-list">
			<?php foreach ( $c['orders'] as $o ) : ?>
				<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'order', array( 'id' => $o->get_id() ) ) ); ?>">
					<span class="bs-row__main"><strong>#<?php echo esc_html( $o->get_order_number() ); ?></strong><span class="bs-muted"><?php echo esc_html( wp_date( 'j M Y', $o->get_date_created()->getTimestamp() ) ); ?></span></span>
					<span class="bs-row__end"><strong class="bs-money"><?php echo esc_html( bs_inr( $o->get_total() ) ); ?></strong><?php echo bs_chip( $o->get_status() ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
				</a></li>
			<?php endforeach; ?>
		</ul>
	</section>
</div>
