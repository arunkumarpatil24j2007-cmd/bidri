<?php
/**
 * Sales: three numbers, one chart, best pieces.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$range   = sanitize_key( $_GET['range'] ?? '30' ); // phpcs:ignore WordPress.Security.NonceVerification
$ranges  = array(
	'7'  => __( '7 days', 'bidri-studio' ),
	'30' => __( '30 days', 'bidri-studio' ),
	'12' => __( '12 months', 'bidri-studio' ),
);
if ( ! isset( $ranges[ $range ] ) ) {
	$range = '30';
}
$tz      = wp_timezone();
$today   = new DateTimeImmutable( 'today', $tz );
$monthly = '12' === $range;
$start   = $monthly ? $today->modify( 'first day of this month' )->modify( '-11 months' ) : $today->modify( '-' . ( (int) $range - 1 ) . ' days' );
$orders  = bs_paid_orders_since( $start->getTimestamp() );

// Buckets for the chart.
$buckets = array();
$cursor  = $start;
while ( $cursor <= $today ) {
	$buckets[ $cursor->format( $monthly ? 'Y-m' : 'Y-m-d' ) ] = array( 'label' => wp_date( $monthly ? 'M' : ( '7' === $range ? 'D' : 'j' ), $cursor->getTimestamp() ), 'sum' => 0.0 );
	$cursor = $cursor->modify( $monthly ? '+1 month' : '+1 day' );
}
$pieces = array();
foreach ( $orders as $o ) {
	if ( ! $o->get_date_created() ) {
		continue;
	}
	$key = $o->get_date_created()->setTimezone( $tz )->format( $monthly ? 'Y-m' : 'Y-m-d' );
	if ( isset( $buckets[ $key ] ) ) {
		$buckets[ $key ]['sum'] += (float) $o->get_total() - (float) $o->get_total_refunded();
	}
	foreach ( $o->get_items() as $item ) {
		$name = $item->get_name();
		$pieces[ $name ] ??= array( 'qty' => 0, 'sum' => 0.0 );
		$pieces[ $name ]['qty'] += $item->get_quantity();
		$pieces[ $name ]['sum'] += (float) $item->get_total() + (float) $item->get_total_tax();
	}
}
uasort( $pieces, fn( $a, $b ) => $b['sum'] <=> $a['sum'] );
$revenue = bs_revenue( $orders );
$count   = count( $orders );
$max     = max( 1, ...array_column( $buckets, 'sum' ) );
?>
<div class="bs-head bs-head--row">
	<h1><?php esc_html_e( 'Sales', 'bidri-studio' ); ?></h1>
	<nav class="bs-pills bs-pills--tight" aria-label="<?php esc_attr_e( 'Period', 'bidri-studio' ); ?>">
		<?php foreach ( $ranges as $key => $label ) : ?>
			<a href="<?php echo esc_url( bs_url( 'sales', array( 'range' => $key ) ) ); ?>"<?php echo (string) $key === $range ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $label ); ?></a>
		<?php endforeach; ?>
	</nav>
</div>

<div class="bs-stats">
	<div class="bs-stat"><span class="bs-stat__label"><?php esc_html_e( 'Revenue', 'bidri-studio' ); ?></span><span class="bs-stat__value"><?php echo esc_html( bs_inr( $revenue ) ); ?></span></div>
	<div class="bs-stat"><span class="bs-stat__label"><?php esc_html_e( 'Orders', 'bidri-studio' ); ?></span><span class="bs-stat__value"><?php echo (int) $count; ?></span></div>
	<div class="bs-stat"><span class="bs-stat__label"><?php esc_html_e( 'Average order', 'bidri-studio' ); ?></span><span class="bs-stat__value"><?php echo esc_html( bs_inr( $count ? $revenue / $count : 0 ) ); ?></span></div>
</div>

<section class="bs-card bs-chart-card">
	<div class="bs-chart bs-chart--<?php echo esc_attr( $range ); ?>" role="img" aria-label="<?php esc_attr_e( 'Revenue over time', 'bidri-studio' ); ?>">
		<?php foreach ( $buckets as $b ) : $h = $b['sum'] > 0 ? max( 3, round( $b['sum'] / $max * 100 ) ) : 0; ?>
			<span class="bs-bar" title="<?php echo esc_attr( $b['label'] . ': ' . bs_inr( $b['sum'] ) ); ?>"><i style="height:<?php echo (int) $h; ?>%"></i><small><?php echo esc_html( $b['label'] ); ?></small></span>
		<?php endforeach; ?>
	</div>
</section>

<section class="bs-section">
	<div class="bs-section__head"><h2><?php esc_html_e( 'Best pieces', 'bidri-studio' ); ?></h2></div>
	<?php if ( ! $pieces ) : ?>
		<p class="bs-empty"><?php esc_html_e( 'No sales in this period yet.', 'bidri-studio' ); ?></p>
	<?php else : ?>
		<ul class="bs-list">
			<?php foreach ( array_slice( $pieces, 0, 5, true ) as $name => $d ) : ?>
				<li><div class="bs-row">
					<span class="bs-row__main"><strong><?php echo esc_html( $name ); ?></strong><span class="bs-muted"><?php echo esc_html( sprintf( _n( '%d sold', '%d sold', $d['qty'], 'bidri-studio' ), $d['qty'] ) ); ?></span></span>
					<span class="bs-row__end"><strong class="bs-money"><?php echo esc_html( bs_inr( $d['sum'] ) ); ?></strong></span>
				</div></li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</section>
