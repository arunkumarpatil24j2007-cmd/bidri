<?php
/**
 * Small server-rendered pieces used inside the block templates.
 * Shortcodes are used (not custom blocks) because they need no build step and show
 * as editable text in the Site Editor.
 *
 *   [bc_contact field="whatsapp|phone|email|address|hours" label="WhatsApp: "]
 *   [bc_whatsapp text="Chat with us on WhatsApp" message="Hello" class="…"]
 *   [bc_specs]               product attribute list (empty rows are never shown)
 *   [bc_shop_categories]     shop sidebar category list — the selected one is the page's silk element
 *   [bc_price_filter]        price range links
 *   [bc_artisan_quote]       quote card on Our Craft (hidden until set in Settings → Bidri Crafts)
 *   [bc_platter_days]        "A single platter can take N days…" (hidden until set)
 *   [bc_year]                current year
 *   [bc_gstin]               "GSTIN …" (hidden until set)
 *
 * @package bidri-crafts
 */

defined( 'ABSPATH' ) || exit;

/*
 * WordPress runs shortcodes on a template *before* its blocks render, so a shortcode that sits
 * inside a pattern (e.g. the shop sidebar) would be printed as raw text. Run ours — only ours,
 * the [bc_…] ones — after each text block renders.
 */
add_filter( 'render_block', function ( $html, $block ) {
	static $types = array( 'core/shortcode', 'core/paragraph', 'core/heading', 'core/list-item' );
	if ( in_array( $block['blockName'] ?? '', $types, true ) && str_contains( $html, '[bc_' ) ) {
		$html = do_shortcode( $html );
	}
	return $html;
}, 10, 2 );

add_shortcode( 'bc_year', fn() => esc_html( wp_date( 'Y' ) ) );

add_shortcode( 'bc_gstin', function () {
	$gstin = bidri_detail( 'gstin' );
	return $gstin ? ' · GSTIN ' . esc_html( $gstin ) : '';
} );

add_shortcode( 'bc_contact', function ( $atts ) {
	$atts  = shortcode_atts( array( 'field' => 'phone', 'label' => '' ), $atts );
	$field = $atts['field'];
	$value = bidri_detail( $field );
	if ( '' === $value ) {
		return '';
	}
	$label = esc_html( $atts['label'] );
	switch ( $field ) {
		case 'whatsapp':
			$shown = preg_replace( '/\D+/', '', $value );
			$shown = 10 === strlen( $shown ) ? '91' . $shown : $shown;
			$shown = strlen( $shown ) > 10 ? '+' . substr( $shown, 0, -10 ) . ' ' . substr( $shown, -10, 5 ) . ' ' . substr( $shown, -5 ) : $shown;
			return sprintf( '<a href="%s" rel="noopener" target="_blank">%s%s</a>', esc_url( bidri_whatsapp_url() ), $label, esc_html( $shown ) );
		case 'phone':
			return sprintf( '<a href="tel:%s">%s%s</a>', esc_attr( preg_replace( '/[^\d+]/', '', $value ) ), $label, esc_html( $value ) );
		case 'email':
			return sprintf( '<a href="mailto:%1$s">%2$s%1$s</a>', esc_attr( antispambot( $value ) ), $label );
		default:
			return $label . esc_html( $value );
	}
} );

/*
 * WhatsApp link. If no number is set yet it falls back to the Contact page,
 * so a button never leads nowhere.
 */
add_shortcode( 'bc_whatsapp', function ( $atts ) {
	$atts = shortcode_atts( array(
		'text'    => __( 'Chat with us on WhatsApp', 'bidri-crafts' ),
		'message' => '',
		'class'   => '',
	), $atts );
	$url    = bidri_whatsapp_url( $atts['message'] );
	$target = $url ? ' target="_blank" rel="noopener"' : '';
	if ( ! $url ) {
		$url = home_url( '/contact/' );
	}
	return sprintf(
		'<a class="%s" href="%s"%s>%s</a>',
		esc_attr( $atts['class'] ),
		esc_url( $url ),
		$target,
		esc_html( $atts['text'] )
	);
} );

add_shortcode( 'bc_specs', function () {
	global $product;
	$p = $product instanceof WC_Product ? $product : wc_get_product( get_the_ID() );
	if ( ! $p ) {
		return '';
	}
	$rows = array();
	foreach ( $p->get_attributes() as $attr ) {
		if ( ! $attr->get_visible() ) {
			continue;
		}
		$values = $attr->is_taxonomy()
			? wc_get_product_terms( $p->get_id(), $attr->get_name(), array( 'fields' => 'names' ) )
			: $attr->get_options();
		$value = trim( implode( ', ', array_filter( array_map( 'trim', (array) $values ) ) ) );
		// Never show empty rows or leftover placeholders.
		if ( '' === $value || preg_match( '/^\[.*\]$/', $value ) ) {
			continue;
		}
		$rows[] = sprintf(
			'<div class="bc-spec"><dt>%s</dt><dd>%s</dd></div>',
			esc_html( wc_attribute_label( $attr->get_name(), $p ) ),
			esc_html( $value )
		);
	}
	return $rows ? '<dl class="bc-specs">' . implode( '', $rows ) . '</dl>' : '';
} );

add_shortcode( 'bc_shop_categories', function () {
	$terms = get_terms( array(
		'taxonomy'   => 'product_cat',
		'hide_empty' => false,
		'parent'     => 0,
		'orderby'    => 'menu_order',
		'exclude'    => array( (int) get_option( 'default_product_cat' ) ),
	) );
	if ( is_wp_error( $terms ) ) {
		return '';
	}
	$current = is_product_category() ? get_queried_object_id() : 0;
	$total   = (int) ( wp_count_posts( 'product' )->publish ?? 0 );
	$items   = array();

	$items[] = sprintf(
		'<li><a href="%s"%s><span>%s</span><span class="bc-count">%d</span></a></li>',
		esc_url( wc_get_page_permalink( 'shop' ) ),
		$current ? '' : ' class="is-current" aria-current="page"',
		esc_html__( 'All pieces', 'bidri-crafts' ),
		$total
	);
	foreach ( $terms as $term ) {
		$is = $current === $term->term_id;
		$items[] = sprintf(
			'<li><a href="%s"%s><span>%s</span><span class="bc-count">%d</span></a></li>',
			esc_url( get_term_link( $term ) ),
			$is ? ' class="is-current" aria-current="page"' : '',
			esc_html( $term->name ),
			(int) $term->count
		);
	}
	return '<nav class="bc-filter bc-filter--cats" aria-label="' . esc_attr__( 'Categories', 'bidri-crafts' ) . '"><ul>' . implode( '', $items ) . '</ul></nav>';
} );

add_shortcode( 'bc_price_filter', function () {
	$ranges = array(
		array( __( 'Any price', 'bidri-crafts' ), null, null ),
		array( __( 'Under ₹20,000', 'bidri-crafts' ), 0, 19999 ),
		array( __( '₹20,000 – ₹40,000', 'bidri-crafts' ), 20000, 40000 ),
		array( __( 'Above ₹40,000', 'bidri-crafts' ), 40001, 9999999 ),
	);
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only filter links.
	$min  = isset( $_GET['min_price'] ) ? absint( $_GET['min_price'] ) : null;
	$max  = isset( $_GET['max_price'] ) ? absint( $_GET['max_price'] ) : null;
	$base = remove_query_arg( array( 'min_price', 'max_price', 'paged', 'product-page' ) );
	$base = preg_replace( '#/page/\d+/?#', '/', $base );

	$items = array();
	foreach ( $ranges as $r ) {
		$active = ( $min === $r[1] && $max === $r[2] );
		$url    = null === $r[1] ? $base : add_query_arg( array( 'min_price' => $r[1], 'max_price' => $r[2] ), $base );
		$items[] = sprintf(
			'<li><a href="%s" rel="nofollow"%s>%s</a></li>',
			esc_url( $url ),
			$active ? ' class="is-current" aria-current="true"' : '',
			esc_html( $r[0] )
		);
	}
	return '<nav class="bc-filter bc-filter--price" aria-label="' . esc_attr__( 'Price', 'bidri-crafts' ) . '"><ul>' . implode( '', $items ) . '</ul></nav>';
} );

add_shortcode( 'bc_artisan_quote', function () {
	$quote = bidri_detail( 'artisan_quote' );
	if ( '' === $quote ) {
		return '';
	}
	$name = bidri_detail( 'artisan_name' );
	return sprintf(
		'<figure class="bc-quote-card"><blockquote><p>“%s”</p></blockquote>%s</figure>',
		esc_html( trim( $quote, '"“” ' ) ),
		$name ? '<figcaption>' . esc_html( $name ) . '</figcaption>' : ''
	);
} );

add_shortcode( 'bc_platter_days', function () {
	$days = absint( bidri_detail( 'platter_days' ) );
	return $days ? esc_html( sprintf( __( 'A single platter can take %d days to finish.', 'bidri-crafts' ), $days ) ) : '';
} );
