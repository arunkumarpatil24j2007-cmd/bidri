<?php
/**
 * Screen router + shared layout (top bar, tab bar on phones, messages).
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

function bs_screen(): string {
	$s = sanitize_key( $_GET['bs'] ?? 'today' ); // phpcs:ignore WordPress.Security.NonceVerification
	return in_array( $s, array( 'today', 'orders', 'order', 'pieces', 'piece', 'sales' ), true ) ? $s : 'today';
}

function bs_messages(): array {
	return array(
		'shipped'   => __( 'Marked as shipped. The customer has been emailed.', 'bidri-studio' ),
		'unshipped' => __( 'Moved back to To ship.', 'bidri-studio' ),
		'cancelled' => __( 'Order cancelled.', 'bidri-studio' ),
		'stock'     => __( 'Stock updated.', 'bidri-studio' ),
		'saved'     => __( 'Saved.', 'bidri-studio' ),
		'added'     => __( 'Piece added.', 'bidri-studio' ),
		'removed'   => __( 'Piece removed.', 'bidri-studio' ),
		'needname'  => __( 'Please give the piece a name.', 'bidri-studio' ),
		'badphoto'  => __( 'That photo couldn’t be used. Use a JPG, PNG or WebP image.', 'bidri-studio' ),
		'nochange'  => __( 'Nothing changed.', 'bidri-studio' ),
	);
}

function bs_render(): void {
	if ( ! bs_can_use() ) {
		wp_die( esc_html__( 'You don’t have permission to view this page.', 'bidri-studio' ), 403 );
	}
	$screen = bs_screen();
	$tab    = array( 'order' => 'orders', 'piece' => 'pieces' )[ $screen ] ?? $screen;
	$to_ship = count( wc_get_orders( array( 'status' => 'wc-processing', 'limit' => -1, 'return' => 'ids', 'type' => 'shop_order' ) ) );
	$tabs   = array(
		'today'  => array( __( 'Today', 'bidri-studio' ), 'silver-sparkle' ),
		'orders' => array( __( 'Orders', 'bidri-studio' ), 'bag' ),
		'pieces' => array( __( 'Pieces', 'bidri-studio' ), 'cat-home-decor' ),
		'sales'  => array( __( 'Sales', 'bidri-studio' ), 'chart' ),
	);
	$msg  = sanitize_key( $_GET['msg'] ?? '' ); // phpcs:ignore WordPress.Security.NonceVerification
	$msgs = bs_messages();
	$user = wp_get_current_user();
	?>
	<div class="bs" style="--bs-icons:url('<?php echo esc_url( BIDRI_STUDIO_URL . 'assets/' ); ?>')">
		<header class="bs-top">
			<a class="bs-brand" href="<?php echo esc_url( bs_url() ); ?>"><span class="bs-mark" aria-hidden="true"></span><?php echo esc_html( get_bloginfo( 'name' ) ); ?><span class="bs-brand__sub">Studio</span></a>
			<nav class="bs-tabs" aria-label="<?php esc_attr_e( 'Studio', 'bidri-studio' ); ?>">
				<?php foreach ( $tabs as $key => $t ) : ?>
					<a href="<?php echo esc_url( bs_url( $key ) ); ?>" class="bs-tab bs-ico--<?php echo esc_attr( $t[1] ); ?>"<?php echo $key === $tab ? ' aria-current="page"' : ''; ?>>
						<span><?php echo esc_html( $t[0] ); ?></span>
						<?php if ( 'orders' === $key && $to_ship ) : ?><b class="bs-badge" aria-label="<?php echo esc_attr( sprintf( _n( '%d to ship', '%d to ship', $to_ship, 'bidri-studio' ), $to_ship ) ); ?>"><?php echo (int) $to_ship; ?></b><?php endif; ?>
					</a>
				<?php endforeach; ?>
			</nav>
			<div class="bs-top__end">
				<a class="bs-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'View shop', 'bidri-studio' ); ?></a>
				<?php if ( current_user_can( 'manage_options' ) ) : ?>
					<a class="bs-link bs-hide-sm" href="<?php echo esc_url( admin_url() ); ?>"><?php esc_html_e( 'WordPress', 'bidri-studio' ); ?></a>
				<?php endif; ?>
				<details class="bs-me">
					<summary aria-label="<?php esc_attr_e( 'Account', 'bidri-studio' ); ?>"><?php echo esc_html( mb_strtoupper( mb_substr( $user->display_name ?: $user->user_login, 0, 1 ) ) ); ?></summary>
					<div class="bs-me__menu">
						<a href="<?php echo esc_url( admin_url( 'profile.php' ) ); ?>"><?php esc_html_e( 'Account & security', 'bidri-studio' ); ?></a>
						<a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>"><?php esc_html_e( 'Log out', 'bidri-studio' ); ?></a>
					</div>
				</details>
			</div>
		</header>

		<?php if ( isset( $msgs[ $msg ] ) ) : ?>
			<p class="bs-toast<?php echo in_array( $msg, array( 'needname', 'badphoto' ), true ) ? ' bs-toast--warn' : ''; ?>" role="status"><?php echo esc_html( $msgs[ $msg ] ); ?></p>
		<?php endif; ?>

		<main class="bs-main">
			<?php require BIDRI_STUDIO_DIR . '/views/' . $screen . '.php'; ?>
		</main>
	</div>
	<?php
}
