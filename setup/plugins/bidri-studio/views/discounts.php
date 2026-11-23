<?php
/**
 * Discount codes: what's running, how often each was used. Pause or resume with one tap.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$coupons = get_posts( array( 'post_type' => 'shop_coupon', 'post_status' => array( 'publish', 'draft' ), 'posts_per_page' => 100, 'orderby' => 'date', 'order' => 'DESC' ) );
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'more' ) ); ?>"><?php esc_html_e( 'More', 'bidri-studio' ); ?></a>
<div class="bs-head bs-head--row">
	<h1><?php esc_html_e( 'Discount codes', 'bidri-studio' ); ?></h1>
	<a class="bs-btn bs-btn--silk bs-ico--plus" href="<?php echo esc_url( bs_url( 'discount' ) ); ?>"><?php esc_html_e( 'New code', 'bidri-studio' ); ?></a>
</div>

<?php if ( ! $coupons ) : ?>
	<p class="bs-empty"><?php esc_html_e( 'No discount codes yet.', 'bidri-studio' ); ?></p>
<?php else : ?>
	<ul class="bs-list">
		<?php
		foreach ( $coupons as $post ) :
			$c       = new WC_Coupon( $post->ID );
			$expires = $c->get_date_expires();
			$ended   = $expires && $expires->getTimestamp() < time();
			$used_up = $c->get_usage_limit() && $c->get_usage_count() >= $c->get_usage_limit();
			$live    = 'publish' === $post->post_status && ! $ended && ! $used_up;
			$off     = 'percent' === $c->get_discount_type() ? rtrim( rtrim( number_format( (float) $c->get_amount(), 2 ), '0' ), '.' ) . '% off' : bs_inr( $c->get_amount() ) . ' off';
			$bits    = array( $off, sprintf( _n( 'used %d time', 'used %d times', $c->get_usage_count(), 'bidri-studio' ), $c->get_usage_count() ) );
			if ( $expires ) {
				$bits[] = sprintf( $ended ? __( 'ended %s', 'bidri-studio' ) : __( 'until %s', 'bidri-studio' ), wp_date( 'j M', $expires->getTimestamp() ) );
			}
			?>
			<li class="bs-piece">
				<div class="bs-row">
					<span class="bs-row__main"><strong class="bs-code"><?php echo esc_html( strtoupper( $c->get_code() ) ); ?></strong><span class="bs-muted"><?php echo esc_html( implode( ' · ', $bits ) ); ?></span></span>
					<span class="bs-row__end"><?php echo $live ? '<span class="bs-chip bs-chip--done">' . esc_html__( 'Active', 'bidri-studio' ) . '</span>' : '<span class="bs-chip">' . esc_html( 'draft' === $post->post_status ? __( 'Paused', 'bidri-studio' ) : __( 'Ended', 'bidri-studio' ) ) . '</span>'; ?></span>
				</div>
				<?php if ( ! $ended && ! $used_up ) : ?>
					<form class="bs-row-action" method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'discount_toggle', array( 'coupon' => $post->ID ) ); ?><button class="bs-link" type="submit"><?php echo 'publish' === $post->post_status ? esc_html__( 'Pause', 'bidri-studio' ) : esc_html__( 'Resume', 'bidri-studio' ); ?></button></form>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
