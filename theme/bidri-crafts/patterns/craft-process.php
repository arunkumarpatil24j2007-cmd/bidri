<?php
/**
 * Title: Our Craft — four stages
 * Slug: bidri-crafts/craft-process
 * Categories: bidri-crafts
 */
$bc_steps = array(
	array( '01', 'Cast', 'A zinc-copper alloy is poured into sand moulds and filed smooth by hand.' ),
	array( '02', 'Engrave', 'The pattern is drawn freehand and chiselled into the surface — no stencils.' ),
	array( '03', 'Inlay', 'Pure 99.9% silver wire or sheet is hammered into every groove.' ),
	array( '04', 'Oxidise', 'A paste of soil from Bidar Fort turns the alloy jet black. The silver alone stays bright.' ),
);
?>
<!-- wp:group {"align":"wide","className":"bc-section","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide bc-section"><!-- wp:group {"className":"bc-section__head","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"bottom"}} -->
<div class="wp-block-group bc-section__head"><!-- wp:heading -->
<h2 class="wp-block-heading">The Alchemy of Pure Silver &amp; Fort Soil</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"bc-muted"} -->
<p class="bc-muted">Four stages, one pair of hands. [bc_platter_days]</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"bc-process","layout":{"type":"grid","minimumColumnWidth":"14rem"}} -->
<div class="wp-block-group bc-process"><?php foreach ( $bc_steps as $s ) : ?><!-- wp:group {"className":"bc-card bc-process__card","layout":{"type":"default"}} -->
<div class="wp-block-group bc-card bc-process__card"><!-- wp:paragraph {"className":"bc-numeral"} -->
<p class="bc-numeral"><?php echo $s[0]; ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><?php echo esc_html( $s[1] ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php echo esc_html( $s[2] ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
<?php endforeach; ?></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
