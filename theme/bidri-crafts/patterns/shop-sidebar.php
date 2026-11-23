<?php
/**
 * Title: Shop — filter sidebar
 * Slug: bidri-crafts/shop-sidebar
 * Categories: bidri-crafts
 * Inserter: false
 * Description: The selected category is the shop page's one silk element.
 */
?>
<!-- wp:group {"tagName":"aside","className":"bc-sidebar","layout":{"type":"default"}} -->
<aside class="wp-block-group bc-sidebar"><!-- wp:heading {"level":2,"className":"bc-sidebar__h"} -->
<h2 class="wp-block-heading bc-sidebar__h">Category</h2>
<!-- /wp:heading -->

<!-- wp:shortcode -->
[bc_shop_categories]
<!-- /wp:shortcode -->

<!-- wp:heading {"level":2,"className":"bc-sidebar__h"} -->
<h2 class="wp-block-heading bc-sidebar__h">Price</h2>
<!-- /wp:heading -->

<!-- wp:shortcode -->
[bc_price_filter]
<!-- /wp:shortcode -->

<!-- wp:group {"className":"bc-card bc-bulk","layout":{"type":"default"}} -->
<div class="wp-block-group bc-card bc-bulk"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Gifting in bulk?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Corporate and wedding orders with custom engraving.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"bc-arrow-text"} -->
<p class="bc-arrow-text">[bc_whatsapp text="Chat with us on WhatsApp" message="Hello! I would like to discuss a bulk / corporate gifting order."]</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></aside>
<!-- /wp:group -->
