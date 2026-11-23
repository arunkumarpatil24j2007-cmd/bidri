<?php
/**
 * Title: Home banner slider (festivals & offers)
 * Slug: bidri-crafts/hero
 * Categories: bidri-crafts, banner
 * Description: Rotating homepage banner. Each slide is a group with the class "bc-slide". Duplicate a slide to add one, delete one to remove it. Optional dates in a slide's "Additional CSS class(es)": bc-from-2026-12-20 bc-until-2026-12-31. Dark slides use a wide dark photo; light slides use a product photo on a light background.
 */

$bc_img = fn( $f ) => esc_url( get_theme_file_uri( 'assets/images/' . $f ) );

/**
 * One slide. $tone: 'dark' | 'light'. Only the first slide's title is the page <h1>.
 */
$bc_slide = function ( array $s, bool $first ) use ( $bc_img ) {
	$tone    = $s['tone'];
	$classes = 'bc-hero bc-slide bc-hero--' . $tone . ( 'dark' === $tone ? ' bc-on-dark' : '' ) . ( $s['schedule'] ? ' ' . $s['schedule'] : '' );
	$bg      = 'dark' === $tone ? 'hero-black' : 'sand';
	$text    = 'dark' === $tone ? 'surface' : 'ink';
	$img_cls = $first ? 'bc-hero__media bc-hero-img' : 'bc-hero__media';
	$level   = $first ? 1 : 2;
	?>
<!-- wp:group {"className":"<?php echo esc_attr( $classes ); ?>","backgroundColor":"<?php echo $bg; ?>","textColor":"<?php echo $text; ?>","layout":{"type":"default"}} -->
<div class="wp-block-group <?php echo esc_attr( $classes ); ?> has-<?php echo $text; ?>-color has-<?php echo $bg; ?>-background-color has-text-color has-background"><!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"<?php echo $img_cls; ?>"} -->
<figure class="wp-block-image size-full <?php echo $img_cls; ?>"><img src="<?php echo $bc_img( $s['img'] ); ?>" alt="<?php echo esc_attr( $s['alt'] ); ?>"/></figure>
<!-- /wp:image -->

<!-- wp:group {"className":"bc-hero__text","layout":{"type":"default"}} -->
<div class="wp-block-group bc-hero__text"><!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow"><?php echo esc_html( $s['eyebrow'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":<?php echo $level; ?>,"className":"bc-hero__title<?php echo $s['long'] ? ' bc-hero__title--long' : ''; ?>"} -->
<h<?php echo $level; ?> class="wp-block-heading bc-hero__title<?php echo $s['long'] ? ' bc-hero__title--long' : ''; ?>"><?php echo esc_html( $s['title'] ); ?></h<?php echo $level; ?>>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"bc-hero__intro"} -->
<p class="bc-hero__intro"><?php echo esc_html( $s['intro'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-silk bc-arrow"} -->
<div class="wp-block-button is-style-silk bc-arrow"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_attr( $s['url'] ); ?>"><?php echo esc_html( $s['cta'] ); ?></a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
	<?php
};

$bc_slides = array(
	array(
		'tone' => 'dark', 'img' => 'hero-diwali.webp', 'alt' => 'Bidri diyas with pure silver floral inlay, lit for Diwali',
		'eyebrow' => 'Festive Edit', 'title' => 'Diwali', 'long' => false,
		'intro' => 'Silver-inlaid diyas, platters and urlis — handmade in Bidar for the festival of lights.',
		'cta' => 'Explore', 'url' => '/shop/', 'schedule' => '',
	),
	array(
		'tone' => 'light', 'img' => 'slide-gifting.webp', 'alt' => 'Bidri paan-daan box with pure silver floral inlay',
		'eyebrow' => 'Wedding & corporate gifting', 'title' => 'Gifts that last generations', 'long' => true,
		'intro' => 'Bulk orders with custom engraving, gift-ready and shipped across India.',
		'cta' => 'Plan your gifting', 'url' => '/contact/', 'schedule' => '',
	),
	array(
		'tone' => 'light', 'img' => 'slide-barware.webp', 'alt' => 'Pair of Bidri wine goblets with pure silver inlay',
		'eyebrow' => 'Barware & hospitality', 'title' => 'Raise a glass, the Bahmani way', 'long' => true,
		'intro' => 'Goblets, flasks, coasters and trays, each inlaid with 99.9% pure silver.',
		'cta' => 'Shop barware', 'url' => '/collection/barware-hospitality/', 'schedule' => '',
	),
	array(
		'tone' => 'light', 'img' => 'slide-museum.webp', 'alt' => 'Bahmani court huqqa base with dense pure silver inlay',
		'eyebrow' => 'One of one', 'title' => 'Museum Masterpieces', 'long' => true,
		'intro' => 'Single-edition pieces in the Bahmani court tradition, made over hundreds of hours.',
		'cta' => 'View the piece', 'url' => '/collection/museum-masterpieces/', 'schedule' => '',
	),
	array(
		'tone' => 'light', 'img' => 'slide-shipping.webp', 'alt' => 'Bidri platter with pure silver peacock inlay',
		'eyebrow' => 'On every order', 'title' => 'Free insured shipping', 'long' => true,
		'intro' => 'Delivered across India in 3–5 business days, with its GI Tag No. 12 certificate.',
		'cta' => 'Shop all Bidriware', 'url' => '/shop/', 'schedule' => '',
	),
);
?>
<!-- wp:group {"align":"wide","className":"bc-slider bc-every-6","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide bc-slider bc-every-6"><!-- wp:group {"className":"bc-slides","layout":{"type":"default"}} -->
<div class="wp-block-group bc-slides"><?php foreach ( $bc_slides as $i => $s ) { $bc_slide( $s, 0 === $i ); } ?></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
