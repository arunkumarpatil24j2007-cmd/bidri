<?php
/**
 * Notifications: what the phone app alerts you about, and which phones get alerts.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$uid     = get_current_user_id();
$prefs   = bs_notify_prefs( $uid );
$devices = bs_devices( $uid );
$notes   = array(
	'order'    => __( 'Every paid order', 'bidri-studio' ),
	'exchange' => __( 'When a customer asks to exchange', 'bidri-studio' ),
	'stock'    => __( 'When a piece is down to 1, and when it sells out', 'bidri-studio' ),
);
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'more' ) ); ?>"><?php esc_html_e( 'More', 'bidri-studio' ); ?></a>
<div class="bs-head"><h1><?php esc_html_e( 'Notifications', 'bidri-studio' ); ?></h1></div>

<div class="bs-app-status" data-app-status hidden>
	<p><strong data-app-status-text></strong></p>
	<button class="bs-btn bs-btn--silk bs-ico--bell" type="button" data-app-allow hidden><?php esc_html_e( 'Allow notifications', 'bidri-studio' ); ?></button>
</div>

<form class="bs-card bs-narrow" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
	<?php bs_form_fields( 'notify' ); ?>
	<?php foreach ( bs_event_types() as $type => $label ) : ?>
		<label class="bs-toggle bs-toggle--note"><span><?php echo esc_html( $label ); ?><small class="bs-muted"><?php echo esc_html( $notes[ $type ] ); ?></small></span><input type="checkbox" name="on[<?php echo esc_attr( $type ); ?>]" value="1"<?php checked( $prefs[ $type ] ); ?>></label>
	<?php endforeach; ?>
	<div class="bs-form__actions"><button class="bs-btn bs-btn--wide" type="submit"><?php esc_html_e( 'Save', 'bidri-studio' ); ?></button></div>
</form>

<section class="bs-section">
	<div class="bs-section__head"><h2><?php esc_html_e( 'Phones', 'bidri-studio' ); ?></h2></div>
	<?php if ( ! $devices ) : ?>
		<p class="bs-empty">
			<?php if ( bs_has_app_file() && ! bs_in_app() ) : ?>
				<a class="bs-btn bs-btn--silk bs-ico--phone-app" href="<?php echo esc_url( bs_app_download_url() ); ?>"><?php esc_html_e( 'Get the Android app', 'bidri-studio' ); ?></a>
			<?php else : ?>
				<?php esc_html_e( 'No phone connected yet. Open Studio in the app to connect.', 'bidri-studio' ); ?>
			<?php endif; ?>
		</p>
	<?php else : ?>
		<ul class="bs-list">
			<?php foreach ( $devices as $key => $d ) : ?>
				<li class="bs-piece">
					<div class="bs-row"><span class="bs-row__main"><strong><?php echo esc_html( $d['name'] ); ?></strong><span class="bs-muted"><?php echo esc_html( sprintf( __( 'Last checked %s', 'bidri-studio' ), human_time_diff( (int) $d['seen'] ) ) ); ?></span></span></div>
					<form class="bs-row-action" method="post" action="<?php echo esc_url( bs_action_url() ); ?>"><?php bs_form_fields( 'device_remove', array( 'key' => $key ) ); ?><button class="bs-link" type="submit" data-confirm="<?php esc_attr_e( 'Stop notifications on this phone?', 'bidri-studio' ); ?>"><?php esc_html_e( 'Remove', 'bidri-studio' ); ?></button></form>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</section>
