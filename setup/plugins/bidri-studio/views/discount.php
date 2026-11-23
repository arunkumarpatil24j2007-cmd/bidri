<?php
/**
 * New discount code.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'discounts' ) ); ?>"><?php esc_html_e( 'Discount codes', 'bidri-studio' ); ?></a>
<div class="bs-head"><h1><?php esc_html_e( 'New code', 'bidri-studio' ); ?></h1></div>

<form class="bs-card bs-narrow" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
	<?php bs_form_fields( 'discount' ); ?>
	<div class="bs-fields">
		<div class="bs-field"><label for="bs-code"><?php esc_html_e( 'Code customers type', 'bidri-studio' ); ?></label>
			<input id="bs-code" class="bs-code" type="text" name="code" required maxlength="30" autocapitalize="characters" autocomplete="off" placeholder="DIWALI10"></div>
		<div class="bs-field-row">
			<div class="bs-field"><label for="bs-type"><?php esc_html_e( 'Type', 'bidri-studio' ); ?></label>
				<select id="bs-type" name="type"><option value="percent"><?php esc_html_e( 'Percent off', 'bidri-studio' ); ?></option><option value="fixed"><?php esc_html_e( '₹ off the order', 'bidri-studio' ); ?></option></select></div>
			<div class="bs-field"><label for="bs-amount"><?php esc_html_e( 'Amount', 'bidri-studio' ); ?></label>
				<input id="bs-amount" type="number" name="amount" required min="1" step="1" inputmode="numeric" placeholder="10"></div>
		</div>
		<div class="bs-field-row">
			<div class="bs-field"><label for="bs-ends"><?php esc_html_e( 'Ends on (optional)', 'bidri-studio' ); ?></label>
				<input id="bs-ends" type="date" name="ends" min="<?php echo esc_attr( wp_date( 'Y-m-d' ) ); ?>"></div>
			<div class="bs-field"><label for="bs-min"><?php esc_html_e( 'Minimum order ₹ (optional)', 'bidri-studio' ); ?></label>
				<input id="bs-min" type="number" name="min" min="0" step="1" inputmode="numeric"></div>
		</div>
		<div class="bs-field"><label for="bs-uses"><?php esc_html_e( 'Total uses allowed (optional)', 'bidri-studio' ); ?></label>
			<input id="bs-uses" type="number" name="uses" min="0" step="1" inputmode="numeric" placeholder="<?php esc_attr_e( 'No limit', 'bidri-studio' ); ?>"></div>
		<label class="bs-toggle"><?php esc_html_e( 'Once per customer', 'bidri-studio' ); ?><input type="checkbox" name="once" value="1" checked></label>
	</div>
	<div class="bs-form__actions"><button class="bs-btn bs-btn--silk bs-btn--wide bs-ico--tag" type="submit"><?php esc_html_e( 'Create code', 'bidri-studio' ); ?></button></div>
</form>
