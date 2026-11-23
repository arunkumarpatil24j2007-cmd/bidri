<?php
/**
 * New order — for sales made on the phone, on WhatsApp or in person.
 * "Paid already" records it straight away; otherwise Studio gives you a payment link to send.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

$pieces = array_filter( bs_pieces( array( 'publish' ) ), fn( $p ) => $p->is_in_stock() && '' !== $p->get_price() );
$states = WC()->countries->get_states( 'IN' );
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'orders' ) ); ?>"><?php esc_html_e( 'Orders', 'bidri-studio' ); ?></a>
<div class="bs-head"><h1><?php esc_html_e( 'New order', 'bidri-studio' ); ?></h1></div>

<form method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
	<?php bs_form_fields( 'neworder' ); ?>
	<div class="bs-form__grid bs-form__grid--even">
		<section class="bs-card">
			<h2><?php esc_html_e( 'Pieces', 'bidri-studio' ); ?></h2>
			<div class="bs-fields" data-lines>
				<?php for ( $i = 0; $i < 3; $i++ ) : ?>
					<div class="bs-line"<?php echo $i ? ' data-extra hidden' : ''; ?>>
						<label class="screen-reader-text" for="bs-piece-<?php echo (int) $i; ?>"><?php esc_html_e( 'Piece', 'bidri-studio' ); ?></label>
						<select id="bs-piece-<?php echo (int) $i; ?>" name="piece[]"<?php echo $i ? '' : ' required'; ?>>
							<option value=""><?php esc_html_e( 'Choose a piece', 'bidri-studio' ); ?></option>
							<?php foreach ( $pieces as $p ) : ?>
								<option value="<?php echo (int) $p->get_id(); ?>"><?php echo esc_html( $p->get_name() . ' — ' . bs_inr( $p->get_price() ) ); ?></option>
							<?php endforeach; ?>
						</select>
						<label class="screen-reader-text" for="bs-qty-<?php echo (int) $i; ?>"><?php esc_html_e( 'Quantity', 'bidri-studio' ); ?></label>
						<input id="bs-qty-<?php echo (int) $i; ?>" type="number" name="qty[]" value="1" min="1" max="20" inputmode="numeric">
					</div>
				<?php endfor; ?>
				<button class="bs-link bs-ico--plus" type="button" data-add-line><?php esc_html_e( 'Another piece', 'bidri-studio' ); ?></button>
			</div>
		</section>

		<section class="bs-card">
			<h2><?php esc_html_e( 'Customer', 'bidri-studio' ); ?></h2>
			<div class="bs-fields">
				<div class="bs-field"><label for="bs-cname"><?php esc_html_e( 'Name', 'bidri-studio' ); ?></label><input id="bs-cname" type="text" name="name" required autocomplete="off"></div>
				<div class="bs-field-row">
					<div class="bs-field"><label for="bs-cphone"><?php esc_html_e( 'Phone', 'bidri-studio' ); ?></label><input id="bs-cphone" type="tel" name="phone" required inputmode="tel"></div>
					<div class="bs-field"><label for="bs-cemail"><?php esc_html_e( 'Email (optional)', 'bidri-studio' ); ?></label><input id="bs-cemail" type="email" name="email"></div>
				</div>
				<div class="bs-field"><label for="bs-caddr"><?php esc_html_e( 'Address', 'bidri-studio' ); ?></label><input id="bs-caddr" type="text" name="address"></div>
				<div class="bs-field-row bs-field-row--three">
					<div class="bs-field"><label for="bs-ccity"><?php esc_html_e( 'City', 'bidri-studio' ); ?></label><input id="bs-ccity" type="text" name="city"></div>
					<div class="bs-field"><label for="bs-cstate"><?php esc_html_e( 'State', 'bidri-studio' ); ?></label>
						<select id="bs-cstate" name="state"><?php foreach ( $states as $code => $label ) : ?><option value="<?php echo esc_attr( $code ); ?>"<?php selected( $code, 'KA' ); ?>><?php echo esc_html( $label ); ?></option><?php endforeach; ?></select></div>
					<div class="bs-field"><label for="bs-cpin"><?php esc_html_e( 'PIN', 'bidri-studio' ); ?></label><input id="bs-cpin" type="text" name="pin" inputmode="numeric" maxlength="6"></div>
				</div>
			</div>
		</section>
	</div>

	<fieldset class="bs-choice">
		<legend class="screen-reader-text"><?php esc_html_e( 'Payment', 'bidri-studio' ); ?></legend>
		<label><input type="radio" name="paid" value="link" checked><span><strong><?php esc_html_e( 'Send a payment link', 'bidri-studio' ); ?></strong><small><?php esc_html_e( 'Customer pays online by UPI or card', 'bidri-studio' ); ?></small></span></label>
		<label><input type="radio" name="paid" value="direct"><span><strong><?php esc_html_e( 'Paid already', 'bidri-studio' ); ?></strong><small><?php esc_html_e( 'Cash, or UPI straight to you', 'bidri-studio' ); ?></small></span></label>
	</fieldset>

	<div class="bs-form__actions"><button class="bs-btn bs-btn--silk bs-btn--wide bs-ico--bag" type="submit"><?php esc_html_e( 'Add order', 'bidri-studio' ); ?></button></div>
</form>
