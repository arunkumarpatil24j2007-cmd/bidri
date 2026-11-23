<?php
/**
 * Title: Shop by collection (6 tiles)
 * Slug: bidri-crafts/collections
 * Categories: bidri-crafts
 */
$bc_tiles = array(
	array( 'I', 'Home Décor &amp; Vases', 'home-decor-vases', '' ),
	array( 'II', 'Sculptures &amp; Statues', 'sculptures-statues', '' ),
	array( 'III', 'Barware &amp; Hospitality', 'barware-hospitality', '' ),
	array( 'IV', 'Desk &amp; Office Décor', 'desk-office-decor', '' ),
	array( 'V', 'Traditional Gifts &amp; Boxes', 'traditional-gifts-boxes', '' ),
	array( 'VI · Rare', 'Museum Masterpieces', 'museum-masterpieces', 'Museum-grade Bahmani court pieces' ),
);
?>
<!-- wp:group {"align":"wide","className":"bc-section","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide bc-section"><!-- wp:heading {"className":"bc-rule"} -->
<h2 class="wp-block-heading bc-rule">Shop by Collection</h2>
<!-- /wp:heading -->

<!-- wp:group {"className":"bc-tiles","layout":{"type":"grid","minimumColumnWidth":"18rem"}} -->
<div class="wp-block-group bc-tiles"><?php foreach ( $bc_tiles as $i => $t ) : $rare = 5 === $i; ?><!-- wp:group {"className":"bc-tile<?php echo $rare ? ' bc-tile--rare' : ''; ?>","layout":{"type":"default"}} -->
<div class="wp-block-group bc-tile<?php echo $rare ? ' bc-tile--rare' : ''; ?>"><!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow"><?php echo $t[0]; ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"className":"bc-tile__title"} -->
<h3 class="wp-block-heading bc-tile__title"><a href="/collection/<?php echo $t[2]; ?>/"><?php echo $t[1]; ?></a></h3>
<!-- /wp:heading -->
<?php if ( $t[3] ) : ?>
<!-- wp:paragraph {"className":"bc-tile__note"} -->
<p class="bc-tile__note"><?php echo $t[3]; ?></p>
<!-- /wp:paragraph -->
<?php endif; ?>
<!-- wp:paragraph {"className":"bc-tile__cta bc-arrow-text"} -->
<p class="bc-tile__cta bc-arrow-text"><?php echo $rare ? 'View the piece' : 'Explore collection'; ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
<?php endforeach; ?></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
