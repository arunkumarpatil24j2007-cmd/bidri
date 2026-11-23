<?php
/**
 * Title: Direct from Bidar (service grid)
 * Slug: bidri-crafts/service-grid
 * Categories: bidri-crafts
 */
$bc_items = array(
	array( 'truck', 'Free insured shipping', 'Delivered by courier across India in 3–5 business days.' ),
	array( 'certificate', 'GI certificate included', 'Every piece ships with its GI Tag No. 12 authenticity certificate.' ),
	array( 'lock', 'Secure payments', 'UPI, credit and debit cards, and netbanking.' ),
	array( 'shield', '7-day transit guarantee', 'Damaged in transit? We replace it, no questions asked.' ),
	array( 'artisans', 'Direct from artisans', 'Fair trade with hereditary Bidar families — no middlemen.' ),
	array( 'chat', 'Talk to us', 'Help on WhatsApp and phone for gifting and custom orders.' ),
);
?>
<!-- wp:group {"align":"wide","className":"bc-section","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide bc-section"><!-- wp:heading {"className":"bc-rule"} -->
<h2 class="wp-block-heading bc-rule">Direct from Bidar to Your Doorstep</h2>
<!-- /wp:heading -->

<!-- wp:group {"className":"bc-services","layout":{"type":"grid","minimumColumnWidth":"17rem"}} -->
<div class="wp-block-group bc-services"><?php foreach ( $bc_items as $it ) : ?><!-- wp:group {"className":"bc-service bc-i bc-i--<?php echo $it[0]; ?>","layout":{"type":"default"}} -->
<div class="wp-block-group bc-service bc-i bc-i--<?php echo $it[0]; ?>"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><?php echo esc_html( $it[1] ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php echo esc_html( $it[2] ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
<?php endforeach; ?></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
