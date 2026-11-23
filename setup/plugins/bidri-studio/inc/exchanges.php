<?php
/**
 * Exchanges — the shop's only after-sale option (no cancellations, no returns).
 *
 * Customer: the "Request an exchange" page (shortcode [bidri_exchange]). They enter their order number
 * and the email or phone used at checkout, pick the piece(s), a reason and add photos. Works for guests
 * and for logged-in customers (My account → Orders → Exchange).
 * Owner: Studio → More → Exchanges, and a phone notification. Approve, decline, mark exchanged,
 * or give store credit (a one-time coupon code) instead.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

/** Days after delivery that customers are promised. */
const BIDRI_STUDIO_EXCHANGE_DAYS = 7;
/** Days after "shipped" that the form accepts (delivery time + the 7 days). */
const BIDRI_STUDIO_EXCHANGE_OPEN = 15;
const BIDRI_STUDIO_EXCHANGE_PHOTOS = 3;

add_action( 'init', function () {
	register_post_type( 'bs_exchange', array(
		'label'               => __( 'Exchanges', 'bidri-studio' ),
		'public'              => false,
		'publicly_queryable'  => false,
		'exclude_from_search' => true,
		'show_ui'             => false,
		'show_in_rest'        => false,
		'rewrite'             => false,
		'query_var'           => false,
		'supports'            => array( 'title' ),
	) );
	add_shortcode( 'bidri_exchange', 'bs_exchange_shortcode' );
} );

function bs_exchange_reasons(): array {
	return array(
		'damaged'   => __( 'Arrived damaged', 'bidri-studio' ),
		'wrong'     => __( 'Wrong piece received', 'bidri-studio' ),
		'defect'    => __( 'A fault in the making', 'bidri-studio' ),
		'different' => __( 'I’d like a different piece', 'bidri-studio' ),
	);
}

function bs_exchange_states(): array {
	return array(
		'requested' => array( __( 'New', 'bidri-studio' ), 'todo' ),
		'approved'  => array( __( 'Approved', 'bidri-studio' ), 'wait' ),
		'done'      => array( __( 'Exchanged', 'bidri-studio' ), 'done' ),
		'credit'    => array( __( 'Store credit', 'bidri-studio' ), 'done' ),
		'declined'  => array( __( 'Declined', 'bidri-studio' ), 'muted' ),
	);
}

function bs_exchange_chip( string $state ): string {
	[ $label, $tone ] = bs_exchange_states()[ $state ] ?? array( ucfirst( $state ), 'muted' );
	return sprintf( '<span class="bs-chip bs-chip--%s">%s</span>', esc_attr( $tone ), esc_html( $label ) );
}

/** Everything about one request. */
function bs_exchange( $post ): ?array {
	$post = get_post( $post );
	if ( ! $post || 'bs_exchange' !== $post->post_type ) {
		return null;
	}
	$m = fn( $k ) => get_post_meta( $post->ID, $k, true );
	return array(
		'id'      => $post->ID,
		'order'   => (int) $m( '_bs_order' ),
		'items'   => (array) $m( '_bs_items' ),   // order item id => quantity
		'reason'  => (string) $m( '_bs_reason' ),
		'details' => (string) $m( '_bs_details' ),
		'photos'  => array_filter( array_map( 'absint', (array) $m( '_bs_photos' ) ) ),
		'state'   => (string) $m( '_bs_state' ) ?: 'requested',
		'reply'   => (string) $m( '_bs_reply' ),
		'credit'  => (string) $m( '_bs_credit' ),
		'name'    => (string) $m( '_bs_name' ),
		'date'    => get_post_datetime( $post, 'date', 'gmt' ),
	);
}

/** Requests, newest first. */
function bs_exchanges( array $states = array(), int $order_id = 0, int $limit = -1 ): array {
	$meta = array();
	if ( $states ) {
		$meta[] = array( 'key' => '_bs_state', 'value' => $states, 'compare' => 'IN' );
	}
	if ( $order_id ) {
		$meta[] = array( 'key' => '_bs_order', 'value' => $order_id );
	}
	return array_values( array_filter( array_map( 'bs_exchange', get_posts( array(
		'post_type'      => 'bs_exchange',
		'post_status'    => 'publish',
		'posts_per_page' => $limit,
		'orderby'        => 'date',
		'order'          => 'DESC',
		'meta_query'     => $meta, // phpcs:ignore WordPress.DB.SlowDBQuery
	) ) ) ) );
}

function bs_open_exchange_count(): int {
	return count( bs_exchanges( array( 'requested' ) ) );
}

/** Value of the pieces in a request (what store credit would be worth). */
function bs_exchange_value( array $ex ): float {
	$order = wc_get_order( $ex['order'] );
	$sum   = 0.0;
	if ( $order ) {
		foreach ( $ex['items'] as $item_id => $qty ) {
			$item = $order->get_item( (int) $item_id );
			if ( $item && $item->get_quantity() > 0 ) {
				$sum += ( (float) $item->get_total() + (float) $item->get_total_tax() ) / $item->get_quantity() * min( (int) $qty, $item->get_quantity() );
			}
		}
	}
	return round( $sum );
}

/** The customer-facing page. */
function bs_exchange_page_url( array $args = array() ): string {
	$page = get_page_by_path( 'exchange' );
	$url  = $page ? get_permalink( $page ) : home_url( '/exchange/' );
	return add_query_arg( $args, $url );
}

/**
 * Why this order can't be exchanged right now ('' = it can).
 */
function bs_exchange_blocker( WC_Order $order ): string {
	$status = $order->get_status();
	if ( in_array( $status, array( 'processing', 'on-hold' ), true ) ) {
		return __( 'This order hasn’t been shipped yet. You can ask for an exchange once it has been delivered.', 'bidri-studio' );
	}
	if ( 'completed' !== $status ) {
		return __( 'This order can’t be exchanged. Please message us and we’ll help.', 'bidri-studio' );
	}
	$shipped = $order->get_date_completed() ?: $order->get_date_modified();
	if ( $shipped && time() - $shipped->getTimestamp() > BIDRI_STUDIO_EXCHANGE_OPEN * DAY_IN_SECONDS ) {
		/* translators: %d: days */
		return sprintf( __( 'Exchanges can be requested within %d days of delivery, and that time has passed for this order. Please message us if you need help.', 'bidri-studio' ), BIDRI_STUDIO_EXCHANGE_DAYS );
	}
	if ( bs_exchanges( array( 'requested', 'approved' ), $order->get_id() ) ) {
		return __( 'We already have an exchange request for this order and will be in touch soon.', 'bidri-studio' );
	}
	return '';
}

/* ---------------------------------------------------------------- Proof of order (no login needed) */

/** A short-lived signed pass: "this visitor proved they placed order N". */
function bs_exchange_pass( int $order_id ): string {
	$exp = time() + 2 * HOUR_IN_SECONDS;
	return $order_id . '.' . $exp . '.' . hash_hmac( 'sha256', $order_id . '|' . $exp, wp_salt( 'nonce' ) );
}

function bs_exchange_check_pass( string $pass ): int {
	if ( ! preg_match( '/^(\d+)\.(\d+)\.([a-f0-9]{64})$/', $pass, $m ) || (int) $m[2] < time() ) {
		return 0;
	}
	return hash_equals( hash_hmac( 'sha256', $m[1] . '|' . $m[2], wp_salt( 'nonce' ) ), $m[3] ) ? (int) $m[1] : 0;
}

/** The order, if the number and the email/phone match it. */
function bs_exchange_find( string $number, string $contact ): ?WC_Order {
	$id    = absint( ltrim( trim( $number ), '#' ) );
	$order = $id ? wc_get_order( $id ) : null;
	if ( ! $order || 'shop_order' !== $order->get_type() ) {
		return null;
	}
	$contact = trim( $contact );
	if ( is_email( $contact ) ) {
		return 0 === strcasecmp( $contact, (string) $order->get_billing_email() ) ? $order : null;
	}
	$given = substr( preg_replace( '/\D+/', '', $contact ), -10 );
	$known = substr( preg_replace( '/\D+/', '', (string) $order->get_billing_phone() ), -10 );
	return ( 10 === strlen( $given ) && hash_equals( $known, $given ) ) ? $order : null;
}

/** Max 10 look-ups an hour per visitor (stops guessing order numbers). */
function bs_exchange_throttled(): bool {
	$key = 'bs_exl_' . md5( ( $_SERVER['REMOTE_ADDR'] ?? '' ) . wp_salt() ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
	$n   = (int) get_transient( $key );
	set_transient( $key, $n + 1, HOUR_IN_SECONDS );
	return $n >= 10;
}

/* ---------------------------------------------------------------- Customer form */

/* The page has a live form: never serve it from the page cache. And load its small stylesheet. */
add_action( 'template_redirect', function () {
	if ( is_page() && has_shortcode( (string) get_post_field( 'post_content', get_queried_object_id() ), 'bidri_exchange' ) ) {
		nocache_headers();
		do_action( 'litespeed_control_set_nocache', 'exchange form' ); // phpcs:ignore WordPress.NamingConventions.ValidHookName
		add_action( 'wp_enqueue_scripts', function () {
			wp_enqueue_style( 'bidri-exchange', BIDRI_STUDIO_URL . 'assets/exchange.css', array(), BIDRI_STUDIO_VERSION );
		} );
	}
}, 1 );

/* Handle the two form steps before the page is drawn (so a finished request can redirect). */
add_action( 'template_redirect', function () {
	// phpcs:disable WordPress.Security.NonceVerification -- verified just below.
	$step = sanitize_key( $_POST['bs_ex_step'] ?? '' );
	if ( '' === $step ) {
		return;
	}
	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_bsex'] ?? '' ) ), 'bs_exchange' ) ) {
		$GLOBALS['bs_ex'] = array( 'error' => __( 'This page expired. Please try again.', 'bidri-studio' ) );
		return;
	}
	if ( 'find' === $step ) {
		$number  = sanitize_text_field( wp_unslash( $_POST['order'] ?? '' ) );
		$contact = sanitize_text_field( wp_unslash( $_POST['contact'] ?? '' ) );
		if ( bs_exchange_throttled() ) {
			$GLOBALS['bs_ex'] = array( 'error' => __( 'Too many tries. Please wait an hour, or message us.', 'bidri-studio' ), 'number' => $number );
			return;
		}
		$order = bs_exchange_find( $number, $contact );
		$GLOBALS['bs_ex'] = $order
			? array( 'pass' => bs_exchange_pass( $order->get_id() ) )
			: array( 'error' => __( 'We couldn’t find that order. Check the order number and use the email or phone you ordered with.', 'bidri-studio' ), 'number' => $number, 'contact' => $contact );
		return;
	}
	if ( 'send' === $step ) {
		$pass  = sanitize_text_field( wp_unslash( $_POST['pass'] ?? '' ) );
		$order = wc_get_order( bs_exchange_check_pass( $pass ) );
		if ( ! $order ) {
			$GLOBALS['bs_ex'] = array( 'error' => __( 'This page expired. Please start again.', 'bidri-studio' ) );
			return;
		}
		$blocker = bs_exchange_blocker( $order );
		$reason  = sanitize_key( $_POST['reason'] ?? '' );
		$details = sanitize_textarea_field( wp_unslash( $_POST['details'] ?? '' ) );
		$items   = array();
		foreach ( (array) ( $_POST['items'] ?? array() ) as $item_id => $qty ) {
			$item = $order->get_item( absint( $item_id ) );
			$qty  = absint( $qty );
			if ( $item && $qty > 0 ) {
				$items[ $item->get_id() ] = min( $qty, $item->get_quantity() );
			}
		}
		$files = bs_exchange_uploaded_files();
		$error = '';
		if ( $blocker ) {
			$error = $blocker;
		} elseif ( ! $items ) {
			$error = __( 'Choose the piece you’d like to exchange.', 'bidri-studio' );
		} elseif ( ! isset( bs_exchange_reasons()[ $reason ] ) ) {
			$error = __( 'Choose a reason.', 'bidri-studio' );
		} elseif ( 'different' !== $reason && ! $files ) {
			$error = __( 'Please add at least one photo of the piece.', 'bidri-studio' );
		}
		if ( $error ) {
			$GLOBALS['bs_ex'] = array( 'error' => $error, 'pass' => $pass, 'reason' => $reason, 'details' => $details, 'items' => $items );
			return;
		}
		bs_exchange_create( $order, $items, $reason, $details, $files );
		wp_safe_redirect( bs_exchange_page_url( array( 'sent' => $order->get_order_number() ) ) );
		exit;
	}
	// phpcs:enable
} );

/** Valid photos from the form (max 3, max 8 MB each, JPG/PNG/WebP). */
function bs_exchange_uploaded_files(): array {
	$f = $_FILES['photos'] ?? null; // phpcs:ignore WordPress.Security.NonceVerification
	if ( ! $f || ! is_array( $f['name'] ?? null ) ) {
		return array();
	}
	$out = array();
	foreach ( array_keys( $f['name'] ) as $i ) {
		if ( count( $out ) >= BIDRI_STUDIO_EXCHANGE_PHOTOS || UPLOAD_ERR_OK !== (int) $f['error'][ $i ] || (int) $f['size'][ $i ] > 8 * MB_IN_BYTES ) {
			continue;
		}
		$name  = sanitize_file_name( $f['name'][ $i ] );
		$check = wp_check_filetype_and_ext( $f['tmp_name'][ $i ], $name );
		if ( in_array( $check['type'], array( 'image/jpeg', 'image/png', 'image/webp' ), true ) ) {
			$out[] = array( 'name' => $name, 'tmp_name' => $f['tmp_name'][ $i ], 'type' => $check['type'], 'size' => (int) $f['size'][ $i ], 'error' => 0 );
		}
	}
	return $out;
}

function bs_exchange_create( WC_Order $order, array $items, string $reason, string $details, array $files ): int {
	$name = $order->get_formatted_billing_full_name() ?: __( 'Customer', 'bidri-studio' );
	$id   = wp_insert_post( array(
		'post_type'   => 'bs_exchange',
		'post_status' => 'publish',
		/* translators: %s: order number */
		'post_title'  => sprintf( __( 'Exchange · #%s', 'bidri-studio' ), $order->get_order_number() ),
	) );
	if ( ! $id || is_wp_error( $id ) ) {
		return 0;
	}
	update_post_meta( $id, '_bs_order', $order->get_id() );
	update_post_meta( $id, '_bs_items', $items );
	update_post_meta( $id, '_bs_reason', $reason );
	update_post_meta( $id, '_bs_details', $details );
	update_post_meta( $id, '_bs_state', 'requested' );
	update_post_meta( $id, '_bs_name', $name );

	if ( $files ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$photos = array();
		foreach ( $files as $file ) {
			$att = media_handle_sideload( $file, $id, sprintf( 'Exchange #%s', $order->get_order_number() ) );
			if ( ! is_wp_error( $att ) ) {
				$photos[] = $att;
			}
		}
		update_post_meta( $id, '_bs_photos', $photos );
	}

	$reasons = bs_exchange_reasons();
	$pieces  = array();
	foreach ( $items as $item_id => $qty ) {
		$pieces[] = $qty . ' × ' . $order->get_item( $item_id )->get_name();
	}
	/* translators: 1: reason, 2: pieces */
	$order->add_order_note( sprintf( __( 'Exchange requested (%1$s): %2$s', 'bidri-studio' ), $reasons[ $reason ], implode( ', ', $pieces ) ) . ( $details ? "\n" . $details : '' ) );

	bs_event(
		'exchange',
		$id,
		/* translators: %s: order number */
		sprintf( __( 'Exchange request · #%s', 'bidri-studio' ), $order->get_order_number() ),
		$name . ' · ' . $reasons[ $reason ],
		bs_url( 'exchange', array( 'id' => $id ) )
	);

	// Emails: to the shop, and a receipt to the customer.
	$owner = get_option( 'woocommerce_new_order_settings', array() )['recipient'] ?? '';
	bs_mail(
		$owner ?: get_option( 'admin_email' ),
		/* translators: %s: order number */
		sprintf( __( 'Exchange request for order #%s', 'bidri-studio' ), $order->get_order_number() ),
		__( 'Exchange request', 'bidri-studio' ),
		sprintf( '<p>%s — %s</p><p>%s</p><p>%s</p><p><a href="%s">%s</a></p>', esc_html( $name ), esc_html( $reasons[ $reason ] ), esc_html( implode( ', ', $pieces ) ), nl2br( esc_html( $details ) ), esc_url( bs_url( 'exchange', array( 'id' => $id ) ) ), esc_html__( 'Open in Studio', 'bidri-studio' ) )
	);
	bs_mail(
		$order->get_billing_email(),
		/* translators: %s: order number */
		sprintf( __( 'We’ve received your exchange request (order #%s)', 'bidri-studio' ), $order->get_order_number() ),
		__( 'Exchange request received', 'bidri-studio' ),
		sprintf( '<p>%s</p><p>%s</p>', esc_html( sprintf( __( 'Thank you, %s.', 'bidri-studio' ), $order->get_billing_first_name() ?: $name ) ), esc_html__( 'We’ll look at it and reply within 2 working days with the next steps. Please keep the piece and its packaging until then.', 'bidri-studio' ) )
	);
	return $id;
}

/** A WooCommerce-styled email (same look as order emails). */
function bs_mail( string $to, string $subject, string $heading, string $html ): void {
	if ( ! is_email( $to ) ) {
		return;
	}
	$mailer = WC()->mailer();
	$mailer->send( $to, $subject, $mailer->wrap_message( $heading, $html ), array( 'Content-Type: text/html; charset=UTF-8' ) );
}

function bs_exchange_shortcode(): string {
	$state = $GLOBALS['bs_ex'] ?? array();
	// phpcs:disable WordPress.Security.NonceVerification -- read-only GET.
	$sent = sanitize_text_field( wp_unslash( $_GET['sent'] ?? '' ) );
	$pre  = absint( $_GET['order'] ?? 0 );
	// phpcs:enable

	// Logged-in customer coming from My account: their own order needs no second check.
	if ( empty( $state['pass'] ) && $pre && is_user_logged_in() ) {
		$o = wc_get_order( $pre );
		if ( $o && 'shop_order' === $o->get_type() && (int) $o->get_customer_id() === get_current_user_id() ) {
			$state['pass'] = bs_exchange_pass( $o->get_id() );
		}
	}

	ob_start();
	echo '<div class="bc-exchange">';
	if ( '' !== $sent ) {
		printf( '<div class="bc-exchange__done"><h2>%s</h2><p>%s</p></div>', esc_html__( 'Request sent', 'bidri-studio' ), esc_html( sprintf( __( 'We’ve emailed you a copy for order #%s and will reply within 2 working days.', 'bidri-studio' ), $sent ) ) );
		echo '</div>';
		return (string) ob_get_clean();
	}
	if ( ! empty( $state['error'] ) ) {
		printf( '<p class="bc-exchange__error" role="alert">%s</p>', esc_html( $state['error'] ) );
	}

	$order = ! empty( $state['pass'] ) ? wc_get_order( bs_exchange_check_pass( $state['pass'] ) ) : null;
	if ( ! $order ) {
		// Step 1: find the order.
		?>
		<form class="bc-exchange__form" method="post">
			<?php wp_nonce_field( 'bs_exchange', '_bsex' ); ?>
			<input type="hidden" name="bs_ex_step" value="find">
			<p><label for="bs-ex-order"><?php esc_html_e( 'Order number', 'bidri-studio' ); ?></label>
			<input id="bs-ex-order" name="order" inputmode="numeric" autocomplete="off" required value="<?php echo esc_attr( $state['number'] ?? ( $pre ?: '' ) ); ?>"></p>
			<p><label for="bs-ex-contact"><?php esc_html_e( 'Email or phone used for the order', 'bidri-studio' ); ?></label>
			<input id="bs-ex-contact" name="contact" autocomplete="email" required value="<?php echo esc_attr( $state['contact'] ?? '' ); ?>"></p>
			<p><button type="submit" class="wp-element-button"><?php esc_html_e( 'Find my order', 'bidri-studio' ); ?></button></p>
		</form>
		<?php
		echo '</div>';
		return (string) ob_get_clean();
	}

	// Step 2: what, why, photos.
	$blocker = bs_exchange_blocker( $order );
	printf( '<p class="bc-exchange__order">%s</p>', esc_html( sprintf( __( 'Order #%s', 'bidri-studio' ), $order->get_order_number() ) ) );
	if ( $blocker ) {
		printf( '<p class="bc-exchange__error">%s</p></div>', esc_html( $blocker ) );
		return (string) ob_get_clean();
	}
	$chosen = $state['items'] ?? array();
	$single = 1 === count( $order->get_items() ); // One line: preselect it.
	?>
	<form class="bc-exchange__form" method="post" enctype="multipart/form-data">
		<?php wp_nonce_field( 'bs_exchange', '_bsex' ); ?>
		<input type="hidden" name="bs_ex_step" value="send">
		<input type="hidden" name="pass" value="<?php echo esc_attr( $state['pass'] ); ?>">
		<fieldset><legend><?php esc_html_e( 'Which piece?', 'bidri-studio' ); ?></legend>
			<?php foreach ( $order->get_items() as $item_id => $item ) : $max = (int) $item->get_quantity(); ?>
				<label class="bc-exchange__item">
					<?php if ( $max > 1 ) : ?>
						<select name="items[<?php echo (int) $item_id; ?>]" aria-label="<?php esc_attr_e( 'How many', 'bidri-studio' ); ?>">
							<?php for ( $i = 0; $i <= $max; $i++ ) : ?><option value="<?php echo (int) $i; ?>"<?php selected( (int) ( $chosen[ $item_id ] ?? ( $single ? 1 : 0 ) ), $i ); ?>><?php echo (int) $i; ?></option><?php endfor; ?>
						</select>
					<?php else : ?>
						<input type="checkbox" name="items[<?php echo (int) $item_id; ?>]" value="1"<?php checked( ! empty( $chosen[ $item_id ] ) || ( $single && ! isset( $state['items'] ) ) ); ?>>
					<?php endif; ?>
					<span><?php echo esc_html( $item->get_name() ); ?></span>
				</label>
			<?php endforeach; ?>
		</fieldset>
		<fieldset><legend><?php esc_html_e( 'Reason', 'bidri-studio' ); ?></legend>
			<?php foreach ( bs_exchange_reasons() as $key => $label ) : ?>
				<label class="bc-exchange__reason"><input type="radio" name="reason" value="<?php echo esc_attr( $key ); ?>" required<?php checked( $state['reason'] ?? '', $key ); ?>> <span><?php echo esc_html( $label ); ?></span></label>
			<?php endforeach; ?>
		</fieldset>
		<p><label for="bs-ex-photos"><?php echo esc_html( sprintf( __( 'Photos of the piece and packaging (up to %d)', 'bidri-studio' ), BIDRI_STUDIO_EXCHANGE_PHOTOS ) ); ?></label>
		<input id="bs-ex-photos" type="file" name="photos[]" accept="image/jpeg,image/png,image/webp" multiple></p>
		<p><label for="bs-ex-details"><?php esc_html_e( 'Anything else? (optional)', 'bidri-studio' ); ?></label>
		<textarea id="bs-ex-details" name="details" rows="3" maxlength="1000"><?php echo esc_textarea( $state['details'] ?? '' ); ?></textarea></p>
		<p><button type="submit" class="wp-element-button"><?php esc_html_e( 'Request exchange', 'bidri-studio' ); ?></button></p>
	</form>
	<?php
	echo '</div>';
	return (string) ob_get_clean();
}

/* ---------------------------------------------------------------- My account & emails */

/* No cancelling from My account; "Exchange" on delivered orders instead. */
add_filter( 'woocommerce_valid_order_statuses_for_cancel', '__return_empty_array' );
add_filter( 'woocommerce_my_account_my_orders_actions', function ( $actions, $order ) {
	unset( $actions['cancel'] );
	if ( $order instanceof WC_Order && '' === bs_exchange_blocker( $order ) ) {
		$actions['bs-exchange'] = array( 'url' => bs_exchange_page_url( array( 'order' => $order->get_id() ) ), 'name' => __( 'Exchange', 'bidri-studio' ) );
	}
	return $actions;
}, 10, 2 );

/* "Shipped" email: tell the customer how to ask for an exchange. */
add_action( 'woocommerce_email_after_order_table', function ( $order, $sent_to_admin, $plain, $email = null ) {
	if ( $sent_to_admin || ! $email || 'customer_completed_order' !== $email->id ) {
		return;
	}
	/* translators: %d: days */
	$line = sprintf( __( 'Need to exchange a piece? Ask within %d days of delivery:', 'bidri-studio' ), BIDRI_STUDIO_EXCHANGE_DAYS );
	$url  = bs_exchange_page_url( array( 'order' => $order->get_id() ) );
	if ( $plain ) {
		echo "\n" . esc_html( $line ) . ' ' . esc_url_raw( $url ) . "\n";
	} else {
		printf( '<p>%s <a href="%s">%s</a></p>', esc_html( $line ), esc_url( $url ), esc_html__( 'Request an exchange', 'bidri-studio' ) );
	}
}, 20, 4 );

/* ---------------------------------------------------------------- Owner actions (Studio) */

function bs_exchange_from_post(): array {
	$ex = bs_exchange( bs_post_int( 'exchange' ) );
	if ( ! $ex ) {
		bs_back( 'exchanges', array(), 'nochange' );
	}
	return $ex;
}

function bs_exchange_set( array $ex, string $state, string $reply, string $note ): void {
	update_post_meta( $ex['id'], '_bs_state', $state );
	if ( '' !== $reply ) {
		update_post_meta( $ex['id'], '_bs_reply', $reply );
	}
	$order = wc_get_order( $ex['order'] );
	if ( $order ) {
		$order->add_order_note( $note . ( $reply ? "\n" . $reply : '' ) );
	}
}

function bs_exchange_tell_customer( array $ex, string $subject, string $heading, string $html ): void {
	$order = wc_get_order( $ex['order'] );
	if ( $order ) {
		bs_mail( $order->get_billing_email(), sprintf( '%s (order #%s)', $subject, $order->get_order_number() ), $heading, $html );
	}
}

add_action( 'admin_post_bidri_studio_ex_approve', function () {
	bs_guard( 'ex_approve', 'edit_shop_orders' );
	$ex    = bs_exchange_from_post();
	$reply = bs_post_text( 'reply', true ) ?: __( 'We’ll arrange a pickup of the piece and send the exchange as soon as it reaches us. We’ll message you with the details.', 'bidri-studio' );
	bs_exchange_set( $ex, 'approved', $reply, __( 'Exchange approved in Studio.', 'bidri-studio' ) );
	bs_exchange_tell_customer( $ex, __( 'Your exchange is approved', 'bidri-studio' ), __( 'Exchange approved', 'bidri-studio' ), '<p>' . nl2br( esc_html( $reply ) ) . '</p>' );
	bs_back( 'exchange', array( 'id' => $ex['id'] ), 'exapproved' );
} );

add_action( 'admin_post_bidri_studio_ex_decline', function () {
	bs_guard( 'ex_decline', 'edit_shop_orders' );
	$ex    = bs_exchange_from_post();
	$reply = bs_post_text( 'reply', true );
	if ( '' === $reply ) {
		bs_back( 'exchange', array( 'id' => $ex['id'] ), 'needreason' );
	}
	bs_exchange_set( $ex, 'declined', $reply, __( 'Exchange declined in Studio.', 'bidri-studio' ) );
	bs_exchange_tell_customer( $ex, __( 'About your exchange request', 'bidri-studio' ), __( 'Exchange request', 'bidri-studio' ), '<p>' . nl2br( esc_html( $reply ) ) . '</p>' );
	bs_back( 'exchange', array( 'id' => $ex['id'] ), 'exdeclined' );
} );

add_action( 'admin_post_bidri_studio_ex_done', function () {
	bs_guard( 'ex_done', 'edit_shop_orders' );
	$ex = bs_exchange_from_post();
	bs_exchange_set( $ex, 'done', '', __( 'Exchange completed (marked in Studio).', 'bidri-studio' ) );
	bs_back( 'exchange', array( 'id' => $ex['id'] ), 'exdone' );
} );

/* Store credit: a one-time code worth the pieces, for this customer's email, valid 12 months. */
add_action( 'admin_post_bidri_studio_ex_credit', function () {
	bs_guard( 'ex_credit', 'edit_shop_coupons' );
	$ex    = bs_exchange_from_post();
	$order = wc_get_order( $ex['order'] );
	$value = bs_exchange_value( $ex );
	if ( ! $order || $value <= 0 || $ex['credit'] ) {
		bs_back( 'exchange', array( 'id' => $ex['id'] ), 'nochange' );
	}
	$code = strtoupper( 'CREDIT-' . $order->get_order_number() . '-' . wp_generate_password( 4, false, false ) );
	$c    = new WC_Coupon();
	$c->set_code( $code );
	$c->set_discount_type( 'fixed_cart' );
	$c->set_amount( $value );
	$c->set_usage_limit( 1 );
	$c->set_individual_use( true );
	$c->set_email_restrictions( array( $order->get_billing_email() ) );
	$c->set_date_expires( time() + YEAR_IN_SECONDS );
	$c->set_description( sprintf( 'Store credit for exchange on order #%s', $order->get_order_number() ) );
	$c->save();
	update_post_meta( $ex['id'], '_bs_credit', $code );
	/* translators: 1: code, 2: amount */
	bs_exchange_set( $ex, 'credit', '', sprintf( __( 'Store credit %1$s (%2$s) given in Studio.', 'bidri-studio' ), $code, bs_inr( $value ) ) );
	bs_exchange_tell_customer(
		$ex,
		__( 'Your store credit', 'bidri-studio' ),
		__( 'Your store credit', 'bidri-studio' ),
		sprintf(
			'<p>%s</p><p style="font-size:22px;letter-spacing:2px"><strong>%s</strong></p><p>%s</p>',
			/* translators: %s: amount */
			esc_html( sprintf( __( 'Here is store credit worth %s for your exchange. Use this code at checkout:', 'bidri-studio' ), bs_inr( $value ) ) ),
			esc_html( $code ),
			esc_html__( 'It works once, with the email you ordered with, for 12 months.', 'bidri-studio' )
		)
	);
	bs_back( 'exchange', array( 'id' => $ex['id'] ), 'excredit' );
} );
