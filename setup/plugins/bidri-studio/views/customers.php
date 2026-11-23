<?php
/**
 * Customers: who bought, how often, how much. Search by name, phone or email.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.Security.NonceVerification -- read-only filters.
$q    = sanitize_text_field( wp_unslash( $_GET['q'] ?? '' ) );
$sort = 'top' === ( $_GET['sort'] ?? '' ) ? 'top' : 'recent';
// phpcs:enable
$all = bs_customers();
if ( '' !== $q ) {
	$needle = mb_strtolower( $q );
	$digits = preg_replace( '/\D+/', '', $q );
	$all    = array_filter( $all, fn( $c ) => str_contains( mb_strtolower( $c['name'] . ' ' . $c['email'] . ' ' . $c['city'] ), $needle ) || ( strlen( $digits ) >= 4 && str_contains( preg_replace( '/\D+/', '', $c['phone'] ), $digits ) ) );
}
if ( 'top' === $sort ) {
	uasort( $all, fn( $a, $b ) => $b['spent'] <=> $a['spent'] );
}
$list = array_slice( $all, 0, 100 );
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'more' ) ); ?>"><?php esc_html_e( 'More', 'bidri-studio' ); ?></a>
<div class="bs-head bs-head--row">
	<h1><?php esc_html_e( 'Customers', 'bidri-studio' ); ?></h1>
	<form class="bs-search" method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" role="search">
		<input type="hidden" name="page" value="bidri-studio"><input type="hidden" name="bs" value="customers">
		<label class="screen-reader-text" for="bs-q"><?php esc_html_e( 'Search customers', 'bidri-studio' ); ?></label>
		<input id="bs-q" type="search" name="q" value="<?php echo esc_attr( $q ); ?>" placeholder="<?php esc_attr_e( 'Name, phone, email or city', 'bidri-studio' ); ?>">
	</form>
</div>

<?php if ( '' === $q ) : ?>
<nav class="bs-pills" aria-label="<?php esc_attr_e( 'Sort customers', 'bidri-studio' ); ?>">
	<a href="<?php echo esc_url( bs_url( 'customers' ) ); ?>"<?php echo 'recent' === $sort ? ' aria-current="true"' : ''; ?>><?php esc_html_e( 'Recent', 'bidri-studio' ); ?></a>
	<a href="<?php echo esc_url( bs_url( 'customers', array( 'sort' => 'top' ) ) ); ?>"<?php echo 'top' === $sort ? ' aria-current="true"' : ''; ?>><?php esc_html_e( 'Top spenders', 'bidri-studio' ); ?></a>
</nav>
<?php endif; ?>

<?php if ( ! $list ) : ?>
	<p class="bs-empty"><?php echo '' !== $q ? esc_html__( 'No customers found.', 'bidri-studio' ) : esc_html__( 'No customers yet. They appear here after their first paid order.', 'bidri-studio' ); ?></p>
<?php else : ?>
	<ul class="bs-list">
		<?php foreach ( $list as $c ) : $n = count( $c['orders'] ); ?>
			<li><a class="bs-row" href="<?php echo esc_url( bs_url( 'customer', array( 'c' => $c['key'] ) ) ); ?>">
				<span class="bs-avatar" aria-hidden="true"><?php echo esc_html( mb_strtoupper( mb_substr( $c['name'], 0, 1 ) ) ); ?></span>
				<span class="bs-row__main"><strong><?php echo esc_html( $c['name'] ); ?></strong><span class="bs-muted"><?php echo esc_html( implode( ' · ', array_filter( array( $c['city'], sprintf( _n( '%d order', '%d orders', $n, 'bidri-studio' ), $n ) ) ) ) ); ?></span></span>
				<span class="bs-row__end"><strong class="bs-money"><?php echo esc_html( bs_inr( $c['spent'] ) ); ?></strong><span class="bs-muted"><?php echo esc_html( bs_when( $c['last'] ) ); ?></span></span>
			</a></li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
