<?php
/**
 * Orders list: To ship · Shipped · All, with search.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.Security.NonceVerification -- read-only filters.
$show  = sanitize_key( $_GET['show'] ?? 'toship' );
$q     = sanitize_text_field( wp_unslash( $_GET['q'] ?? '' ) );
$limit = 30 * max( 1, absint( $_GET['more'] ?? 1 ) );
// phpcs:enable

$filters = array(
	'toship'  => array( __( 'To ship', 'bidri-studio' ), array( 'wc-processing' ) ),
	'shipped' => array( __( 'Shipped', 'bidri-studio' ), array( 'wc-completed' ) ),
	'all'     => array( __( 'All', 'bidri-studio' ), array_keys( wc_get_order_statuses() ) ),
);
if ( ! isset( $filters[ $show ] ) ) {
	$show = 'toship';
}

$args = array( 'status' => $filters[ $show ][1], 'limit' => $limit + 1, 'orderby' => 'date', 'order' => 'toship' === $show ? 'ASC' : 'DESC', 'type' => 'shop_order' );
if ( '' !== $q ) {
	$args['status'] = array_keys( wc_get_order_statuses() );
	$num            = ltrim( $q, '#' );
	if ( ctype_digit( $num ) ) {
		$one    = wc_get_order( (int) $num );
		$orders = ( $one && 'shop_order' === $one->get_type() ) ? array( $one ) : array();
	} else {
		$args['s'] = $q;
	}
}
$orders  = $orders ?? wc_get_orders( $args );
$has_more = count( $orders ) > $limit;
$orders  = array_slice( $orders, 0, $limit );
?>
<div class="bs-head bs-head--row">
	<h1><?php esc_html_e( 'Orders', 'bidri-studio' ); ?></h1>
	<form class="bs-search" method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" role="search">
		<input type="hidden" name="page" value="bidri-studio"><input type="hidden" name="bs" value="orders">
		<label class="screen-reader-text" for="bs-q"><?php esc_html_e( 'Search orders', 'bidri-studio' ); ?></label>
		<input id="bs-q" type="search" name="q" value="<?php echo esc_attr( $q ); ?>" placeholder="<?php esc_attr_e( 'Order no., name or phone', 'bidri-studio' ); ?>">
	</form>
</div>

<?php if ( '' === $q ) : ?>
<nav class="bs-pills" aria-label="<?php esc_attr_e( 'Filter orders', 'bidri-studio' ); ?>">
	<?php foreach ( $filters as $key => $f ) : ?>
		<a href="<?php echo esc_url( bs_url( 'orders', array( 'show' => $key ) ) ); ?>"<?php echo $key === $show ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $f[0] ); ?></a>
	<?php endforeach; ?>
</nav>
<?php endif; ?>

<?php if ( ! $orders ) : ?>
	<p class="bs-empty"><?php echo '' !== $q ? esc_html__( 'No orders found.', 'bidri-studio' ) : ( 'toship' === $show ? esc_html__( 'Nothing to ship. All caught up.', 'bidri-studio' ) : esc_html__( 'No orders yet.', 'bidri-studio' ) ); ?></p>
<?php else : ?>
	<ul class="bs-list">
		<?php foreach ( $orders as $o ) : ?>
			<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'order', array( 'id' => $o->get_id() ) ) ); ?>">
				<span class="bs-row__main"><strong><?php echo esc_html( $o->get_formatted_billing_full_name() ?: __( 'Guest', 'bidri-studio' ) ); ?></strong><span class="bs-muted">#<?php echo esc_html( $o->get_order_number() ); ?> · <?php echo esc_html( bs_when( $o->get_date_created() ) ); ?></span></span>
				<span class="bs-row__end"><strong class="bs-money"><?php echo esc_html( bs_inr( $o->get_total() ) ); ?></strong><?php echo 'toship' === $show && '' === $q ? '' : bs_chip( $o->get_status() ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			</a></li>
		<?php endforeach; ?>
	</ul>
	<?php if ( $has_more ) : ?>
		<p class="bs-center"><a class="bs-btn" href="<?php echo esc_url( bs_url( 'orders', array( 'show' => $show, 'q' => $q, 'more' => (int) ( $limit / 30 ) + 1 ) ) ); ?>"><?php esc_html_e( 'Show more', 'bidri-studio' ); ?></a></p>
	<?php endif; ?>
<?php endif; ?>

<form class="bs-download" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
	<?php bs_form_fields( 'export' ); ?>
	<label class="screen-reader-text" for="bs-range"><?php esc_html_e( 'Orders to download', 'bidri-studio' ); ?></label>
	<select id="bs-range" name="range">
		<option value="month"><?php esc_html_e( 'This month', 'bidri-studio' ); ?></option>
		<option value="year"><?php esc_html_e( 'This year', 'bidri-studio' ); ?></option>
		<option value="all"><?php esc_html_e( 'Everything', 'bidri-studio' ); ?></option>
	</select>
	<button class="bs-btn bs-ico--chart" type="submit"><?php esc_html_e( 'Download', 'bidri-studio' ); ?></button>
</form>
