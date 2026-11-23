<?php
/**
 * Pieces: every product with its price and stock; + / − right in the list.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$show    = sanitize_key( $_GET['show'] ?? 'all' ); // phpcs:ignore WordPress.Security.NonceVerification
$all     = bs_pieces();
$filters = array(
	'all'    => array( __( 'All', 'bidri-studio' ), fn( $p ) => true ),
	'low'    => array( __( 'Running low', 'bidri-studio' ), fn( $p ) => 'publish' === $p->get_status() && null !== bs_stock( $p ) && bs_stock( $p ) <= 1 ),
	'hidden' => array( __( 'Hidden', 'bidri-studio' ), fn( $p ) => 'publish' !== $p->get_status() ),
);
if ( ! isset( $filters[ $show ] ) ) {
	$show = 'all';
}
$pieces = array_values( array_filter( $all, $filters[ $show ][1] ) );
?>
<div class="bs-head bs-head--row">
	<h1><?php esc_html_e( 'Pieces', 'bidri-studio' ); ?></h1>
	<a class="bs-btn bs-btn--silk bs-ico--plus" href="<?php echo esc_url( bs_url( 'piece', array( 'new' => 1 ) ) ); ?>"><?php esc_html_e( 'Add a piece', 'bidri-studio' ); ?></a>
</div>

<nav class="bs-pills" aria-label="<?php esc_attr_e( 'Filter pieces', 'bidri-studio' ); ?>">
	<?php foreach ( $filters as $key => $f ) : ?>
		<a href="<?php echo esc_url( bs_url( 'pieces', array( 'show' => $key ) ) ); ?>"<?php echo $key === $show ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $f[0] ); ?></a>
	<?php endforeach; ?>
</nav>

<?php if ( ! $pieces ) : ?>
	<p class="bs-empty"><?php echo 'low' === $show ? esc_html__( 'Nothing is running low.', 'bidri-studio' ) : esc_html__( 'Nothing here yet.', 'bidri-studio' ); ?></p>
<?php else : ?>
	<ul class="bs-list bs-list--pieces">
		<?php foreach ( $pieces as $p ) : $q = bs_stock( $p ); ?>
			<li class="bs-piece">
				<a class="bs-row" href="<?php echo esc_url( bs_url( 'piece', array( 'id' => $p->get_id() ) ) ); ?>">
					<?php echo bs_thumb( $p ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span class="bs-row__main">
						<strong><?php echo esc_html( $p->get_name() ); ?></strong>
						<span class="bs-muted"><span class="bs-money"><?php echo '' === $p->get_regular_price() ? esc_html__( 'Price on request', 'bidri-studio' ) : esc_html( bs_inr( $p->get_regular_price() ) ); ?></span><?php echo 'publish' !== $p->get_status() ? ' · ' . esc_html__( 'Hidden', 'bidri-studio' ) : ''; ?></span>
					</span>
				</a>
				<div class="bs-stepper" aria-label="<?php echo esc_attr( sprintf( __( 'Stock of %s', 'bidri-studio' ), $p->get_name() ) ); ?>">
					<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'stock', array( 'piece' => $p->get_id(), 'delta' => -1, 'from' => 'pieces' ) ); ?><button type="submit" class="bs-step bs-ico--minus" aria-label="<?php esc_attr_e( 'One less', 'bidri-studio' ); ?>"<?php disabled( null !== $q && $q <= 0 ); ?>></button></form>
					<span class="bs-step__value<?php echo null !== $q && $q <= 0 ? ' is-out' : ''; ?>"><?php echo null === $q ? '–' : (int) $q; ?></span>
					<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'stock', array( 'piece' => $p->get_id(), 'delta' => 1, 'from' => 'pieces' ) ); ?><button type="submit" class="bs-step bs-ico--plus" aria-label="<?php esc_attr_e( 'One more', 'bidri-studio' ); ?>"></button></form>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
