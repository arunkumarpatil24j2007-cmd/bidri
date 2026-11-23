<?php
/**
 * Exchange requests: New · Approved · All.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$show    = sanitize_key( $_GET['show'] ?? 'new' ); // phpcs:ignore WordPress.Security.NonceVerification
$filters = array(
	'new'      => array( __( 'New', 'bidri-studio' ), array( 'requested' ) ),
	'approved' => array( __( 'Approved', 'bidri-studio' ), array( 'approved' ) ),
	'all'      => array( __( 'All', 'bidri-studio' ), array() ),
);
if ( ! isset( $filters[ $show ] ) ) {
	$show = 'new';
}
$list    = bs_exchanges( $filters[ $show ][1], 0, 100 );
$reasons = bs_exchange_reasons();
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'more' ) ); ?>"><?php esc_html_e( 'More', 'bidri-studio' ); ?></a>
<div class="bs-head"><h1><?php esc_html_e( 'Exchanges', 'bidri-studio' ); ?></h1></div>

<nav class="bs-pills" aria-label="<?php esc_attr_e( 'Filter exchanges', 'bidri-studio' ); ?>">
	<?php foreach ( $filters as $key => $f ) : ?>
		<a href="<?php echo esc_url( bs_url( 'exchanges', array( 'show' => $key ) ) ); ?>"<?php echo $key === $show ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $f[0] ); ?></a>
	<?php endforeach; ?>
</nav>

<?php if ( ! $list ) : ?>
	<p class="bs-empty"><?php echo 'new' === $show ? esc_html__( 'No new requests.', 'bidri-studio' ) : esc_html__( 'Nothing here.', 'bidri-studio' ); ?></p>
<?php else : ?>
	<ul class="bs-list">
		<?php foreach ( $list as $ex ) : $o = wc_get_order( $ex['order'] ); ?>
			<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'exchange', array( 'id' => $ex['id'] ) ) ); ?>">
				<span class="bs-row__main"><strong><?php echo esc_html( $ex['name'] ); ?></strong><span class="bs-muted">#<?php echo esc_html( $o ? $o->get_order_number() : $ex['order'] ); ?> · <?php echo esc_html( $reasons[ $ex['reason'] ] ?? '' ); ?></span></span>
				<span class="bs-row__end"><?php echo 'new' === $show ? '' : bs_exchange_chip( $ex['state'] ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span class="bs-muted"><?php echo esc_html( bs_when( $ex['date'] ) ); ?></span></span>
			</a></li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
