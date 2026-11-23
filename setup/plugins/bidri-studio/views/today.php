<?php
/**
 * Today: three numbers and the two lists that need action.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$today   = bs_paid_orders_since( bs_today_start() );
$to_ship = wc_get_orders( array( 'status' => 'wc-processing', 'limit' => -1, 'orderby' => 'date', 'order' => 'ASC', 'type' => 'shop_order' ) );
$low     = array_values( array_filter( bs_pieces( array( 'publish' ) ), fn( $p ) => null !== bs_stock( $p ) && bs_stock( $p ) <= 1 ) );
usort( $low, fn( $a, $b ) => bs_stock( $a ) <=> bs_stock( $b ) );
$hour    = (int) wp_date( 'G' );
$hello   = $hour < 12 ? __( 'Good morning', 'bidri-studio' ) : ( $hour < 17 ? __( 'Good afternoon', 'bidri-studio' ) : __( 'Good evening', 'bidri-studio' ) );
?>
<div class="bs-head">
	<p class="bs-eyebrow"><?php echo esc_html( wp_date( 'l, j F' ) ); ?></p>
	<h1><?php echo esc_html( $hello ); ?></h1>
</div>

<div class="bs-stats">
	<a class="bs-stat" href="<?php echo esc_url( bs_url( 'sales' ) ); ?>">
		<span class="bs-stat__label"><?php esc_html_e( 'Sales today', 'bidri-studio' ); ?></span>
		<span class="bs-stat__value"><?php echo esc_html( bs_inr( bs_revenue( $today ) ) ); ?></span>
		<span class="bs-stat__note"><?php echo esc_html( sprintf( _n( '%d order', '%d orders', count( $today ), 'bidri-studio' ), count( $today ) ) ); ?></span>
	</a>
	<a class="bs-stat<?php echo $to_ship ? ' bs-stat--attn' : ''; ?>" href="<?php echo esc_url( bs_url( 'orders' ) ); ?>">
		<span class="bs-stat__label"><?php esc_html_e( 'To ship', 'bidri-studio' ); ?></span>
		<span class="bs-stat__value"><?php echo (int) count( $to_ship ); ?></span>
		<span class="bs-stat__note"><?php echo $to_ship ? esc_html__( 'Pack & ship', 'bidri-studio' ) : esc_html__( 'All shipped', 'bidri-studio' ); ?></span>
	</a>
	<a class="bs-stat" href="<?php echo esc_url( bs_url( 'pieces', array( 'show' => 'low' ) ) ); ?>">
		<span class="bs-stat__label"><?php esc_html_e( 'Running low', 'bidri-studio' ); ?></span>
		<span class="bs-stat__value"><?php echo (int) count( $low ); ?></span>
		<span class="bs-stat__note"><?php esc_html_e( '1 or none left', 'bidri-studio' ); ?></span>
	</a>
</div>

<section class="bs-section">
	<div class="bs-section__head">
		<h2><?php esc_html_e( 'To ship', 'bidri-studio' ); ?></h2>
		<?php if ( count( $to_ship ) > 5 ) : ?><a class="bs-link" href="<?php echo esc_url( bs_url( 'orders' ) ); ?>"><?php esc_html_e( 'See all', 'bidri-studio' ); ?></a><?php endif; ?>
	</div>
	<?php if ( ! $to_ship ) : ?>
		<p class="bs-empty"><?php esc_html_e( 'Nothing to ship. All caught up.', 'bidri-studio' ); ?></p>
	<?php else : ?>
		<ul class="bs-list">
			<?php foreach ( array_slice( $to_ship, 0, 5 ) as $o ) : ?>
				<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'order', array( 'id' => $o->get_id() ) ) ); ?>">
					<span class="bs-row__main"><strong><?php echo esc_html( $o->get_formatted_billing_full_name() ); ?></strong><span class="bs-muted">#<?php echo esc_html( $o->get_order_number() ); ?> · <?php echo esc_html( sprintf( _n( '%d piece', '%d pieces', $o->get_item_count(), 'bidri-studio' ), $o->get_item_count() ) ); ?></span></span>
					<span class="bs-row__end"><strong class="bs-money"><?php echo esc_html( bs_inr( $o->get_total() ) ); ?></strong><span class="bs-muted"><?php echo esc_html( bs_when( $o->get_date_created() ) ); ?></span></span>
				</a></li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</section>

<?php if ( $low ) : ?>
<section class="bs-section">
	<div class="bs-section__head"><h2><?php esc_html_e( 'Running low', 'bidri-studio' ); ?></h2></div>
	<ul class="bs-list">
		<?php foreach ( array_slice( $low, 0, 6 ) as $p ) : ?>
			<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'piece', array( 'id' => $p->get_id() ) ) ); ?>">
				<?php echo bs_thumb( $p ); // phpcs:ignore WordPress.Security.EscapeOutput -- built by wp_get_attachment_image(). ?>
				<span class="bs-row__main"><strong><?php echo esc_html( $p->get_name() ); ?></strong></span>
				<span class="bs-row__end"><span class="bs-chip <?php echo bs_stock( $p ) <= 0 ? 'bs-chip--muted' : 'bs-chip--wait'; ?>"><?php echo esc_html( bs_stock_label( $p ) ); ?></span></span>
			</a></li>
		<?php endforeach; ?>
	</ul>
</section>
<?php endif; ?>
