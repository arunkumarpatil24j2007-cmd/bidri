<?php
/**
 * More: everything that isn't needed every day.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$open = bs_open_exchange_count();
?>
<div class="bs-head"><h1><?php esc_html_e( 'More', 'bidri-studio' ); ?></h1></div>

<ul class="bs-list">
	<?php
	echo bs_menu_row( bs_url( 'exchanges' ), 'exchange', __( 'Exchanges', 'bidri-studio' ), $open ? '' : __( 'No new requests', 'bidri-studio' ), $open ); // phpcs:ignore WordPress.Security.EscapeOutput
	echo bs_menu_row( bs_url( 'customers' ), 'people', __( 'Customers', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	echo bs_menu_row( bs_url( 'discounts' ), 'tag', __( 'Discount codes', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	echo bs_menu_row( bs_url( 'notify' ), 'bell', __( 'Notifications', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
</ul>

<ul class="bs-list bs-list--gap">
	<?php
	if ( ! bs_in_app() && bs_has_app_file() ) {
		echo bs_menu_row( bs_app_download_url(), 'phone-app', __( 'Android app', 'bidri-studio' ), __( 'Orders and alerts on your phone', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo bs_menu_row( home_url( '/' ), 'bag', __( 'View shop', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	echo bs_menu_row( admin_url( 'profile.php' ), 'certificate', __( 'Account & security', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	if ( current_user_can( 'manage_options' ) ) {
		echo bs_menu_row( admin_url(), 'chart', __( 'WordPress', 'bidri-studio' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
	?>
</ul>

<p class="bs-center"><a class="bs-link" href="<?php echo esc_url( wp_logout_url( home_url( '/studio' ) ) ); ?>"><?php esc_html_e( 'Log out', 'bidri-studio' ); ?></a></p>
