<?php
/**
 * Settings → Bidri Crafts: one place for the shop's contact details.
 *
 * Every phone number / email on the site (header, footer, cart, product page, contact page)
 * reads from here. A field left empty is simply hidden on the site — so a placeholder
 * like "[YOUR NUMBER]" can never go live.
 *
 * @package bidri-crafts
 */

defined( 'ABSPATH' ) || exit;

/**
 * The fields. Key => [label, help text].
 */
function bidri_store_fields(): array {
	return array(
		'whatsapp'      => array( __( 'WhatsApp number', 'bidri-crafts' ), __( 'With country code, digits only. Example: 919876543210', 'bidri-crafts' ) ),
		'phone'         => array( __( 'Phone number', 'bidri-crafts' ), __( 'As customers should see it. Example: +91 98765 43210', 'bidri-crafts' ) ),
		'email'         => array( __( 'Customer email', 'bidri-crafts' ), __( 'Example: hello@yourdomain.in', 'bidri-crafts' ) ),
		'address'       => array( __( 'Address line', 'bidri-crafts' ), __( 'Shown in the footer and contact page. Example: Bidar, Karnataka, India', 'bidri-crafts' ) ),
		'hours'         => array( __( 'Support hours', 'bidri-crafts' ), __( 'Example: Mon–Sat, 10 am – 7 pm IST', 'bidri-crafts' ) ),
		'gstin'         => array( __( 'GSTIN (optional)', 'bidri-crafts' ), __( 'Shown in the footer fine print once you have it.', 'bidri-crafts' ) ),
		'platter_days'  => array( __( 'Days to make a platter (optional)', 'bidri-crafts' ), __( 'Our Craft page: "A single platter can take N days to finish." Leave empty to hide the sentence.', 'bidri-crafts' ) ),
		'artisan_quote' => array( __( 'Artisan quote (optional)', 'bidri-crafts' ), __( 'A line from one of your artisans. Leave empty to hide the quote card.', 'bidri-crafts' ) ),
		'artisan_name'  => array( __( 'Artisan name & years (optional)', 'bidri-crafts' ), __( 'Example: Mohammed Saleem, 32 years at the craft', 'bidri-crafts' ) ),
	);
}

/**
 * Read one store detail (trimmed). Defaults are safe, non-placeholder values.
 */
function bidri_detail( string $key ): string {
	$opts     = get_option( 'bidri_store', array() );
	$defaults = array( 'address' => 'Bidar, Karnataka, India' );
	$val      = isset( $opts[ $key ] ) ? trim( (string) $opts[ $key ] ) : '';
	return '' !== $val ? $val : ( $defaults[ $key ] ?? '' );
}

/** WhatsApp chat URL, optionally with a pre-filled message. Empty string if not set. */
function bidri_whatsapp_url( string $message = '' ): string {
	$num = preg_replace( '/\D+/', '', bidri_detail( 'whatsapp' ) );
	if ( '' === $num ) {
		return '';
	}
	if ( 10 === strlen( $num ) ) { // Indian mobile typed without country code.
		$num = '91' . $num;
	}
	$url = 'https://wa.me/' . $num;
	return $message ? $url . '?text=' . rawurlencode( $message ) : $url;
}

add_action( 'admin_menu', function () {
	add_options_page(
		__( 'Bidri Crafts — store details', 'bidri-crafts' ),
		__( 'Bidri Crafts', 'bidri-crafts' ),
		'manage_options',
		'bidri-store',
		'bidri_render_settings_page'
	);
} );

add_action( 'admin_init', function () {
	register_setting( 'bidri_store', 'bidri_store', array(
		'type'              => 'array',
		'sanitize_callback' => function ( $input ) {
			$clean = array();
			foreach ( array_keys( bidri_store_fields() ) as $key ) {
				$val = isset( $input[ $key ] ) ? wp_unslash( $input[ $key ] ) : '';
				$clean[ $key ] = 'email' === $key ? sanitize_email( $val ) : sanitize_text_field( $val );
			}
			return $clean;
		},
	) );
} );

function bidri_render_settings_page(): void {
	$opts = get_option( 'bidri_store', array() );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Bidri Crafts — store details', 'bidri-crafts' ); ?></h1>
		<p><?php esc_html_e( 'These appear across the website. Leave a field empty to hide it everywhere.', 'bidri-crafts' ); ?></p>
		<form method="post" action="options.php">
			<?php settings_fields( 'bidri_store' ); ?>
			<table class="form-table" role="presentation">
				<?php foreach ( bidri_store_fields() as $key => $field ) : ?>
					<tr>
						<th scope="row"><label for="bidri-<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $field[0] ); ?></label></th>
						<td>
							<input class="regular-text" type="<?php echo 'email' === $key ? 'email' : 'text'; ?>" id="bidri-<?php echo esc_attr( $key ); ?>" name="bidri_store[<?php echo esc_attr( $key ); ?>]" value="<?php echo esc_attr( $opts[ $key ] ?? '' ); ?>">
							<p class="description"><?php echo esc_html( $field[1] ); ?></p>
						</td>
					</tr>
				<?php endforeach; ?>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

/* Remind the owner (admins only) until the essentials are filled in. */
add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$missing = array();
	foreach ( array( 'whatsapp', 'phone', 'email' ) as $key ) {
		if ( '' === bidri_detail( $key ) ) {
			$missing[] = bidri_store_fields()[ $key ][0];
		}
	}
	if ( $missing ) {
		printf(
			'<div class="notice notice-warning"><p><strong>Bidri Crafts:</strong> %s <a href="%s">%s</a></p></div>',
			esc_html( sprintf( __( 'Not set yet (hidden on the site until you add them): %s.', 'bidri-crafts' ), implode( ', ', $missing ) ) ),
			esc_url( admin_url( 'options-general.php?page=bidri-store' ) ),
			esc_html__( 'Add store details', 'bidri-crafts' )
		);
	}
} );
