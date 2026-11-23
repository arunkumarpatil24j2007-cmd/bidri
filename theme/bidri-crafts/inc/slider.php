<?php
/**
 * Homepage banner slider: loads its small script only where a slider is on the page,
 * and drops slides that are outside their scheduled dates.
 *
 * Schedule a slide by adding to its "Additional CSS class(es)" (block settings → Advanced):
 *   bc-from-2026-12-20  bc-until-2026-12-31   (either or both; dates in India time)
 *
 * @package bidri-crafts
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	wp_register_script(
		'bidri-slider',
		get_theme_file_uri( 'assets/js/slider.js' ),
		array(),
		(string) filemtime( get_theme_file_path( 'assets/js/slider.js' ) ),
		array( 'strategy' => 'defer', 'in_footer' => true )
	);
} );

add_filter( 'render_block_core/group', function ( $html, $block ) {
	$class = $block['attrs']['className'] ?? '';
	if ( '' === $class ) {
		return $html;
	}
	if ( preg_match( '/(^|\s)bc-slider(\s|$)/', $class ) ) {
		wp_enqueue_script( 'bidri-slider' );
		return $html;
	}
	if ( preg_match( '/(^|\s)bc-slide(\s|$)/', $class ) ) {
		$today = wp_date( 'Y-m-d' );
		if ( preg_match( '/bc-from-(\d{4}-\d{2}-\d{2})/', $class, $m ) && $today < $m[1] ) {
			return '';
		}
		if ( preg_match( '/bc-until-(\d{4}-\d{2}-\d{2})/', $class, $m ) && $today > $m[1] ) {
			return '';
		}
	}
	return $html;
}, 10, 2 );
