<?php
/**
 * Add / edit a piece. Only the fields a shop owner actually needs.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.Security.NonceVerification -- read-only.
$id  = absint( $_GET['id'] ?? 0 );
$new = ! $id;
// phpcs:enable
$p = $id ? wc_get_product( $id ) : null;
if ( $id && ( ! $p || 'product' !== get_post_type( $id ) ) ) {
	echo '<p class="bs-empty">' . esc_html__( 'Piece not found.', 'bidri-studio' ) . '</p>';
	return;
}
$cats    = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'orderby' => 'name', 'exclude' => array( (int) get_option( 'default_product_cat' ) ) ) );
if ( is_array( $cats ) ) {
	usort( $cats, fn( $a, $b ) => (int) get_term_meta( $a->term_id, 'order', true ) <=> (int) get_term_meta( $b->term_id, 'order', true ) );
}
$cur_cat = $p ? ( $p->get_category_ids()[0] ?? 0 ) : 0;
$grams   = $p && $p->get_weight() ? (int) round( (float) $p->get_weight() * 1000 ) : '';
$visible = $p ? 'publish' === $p->get_status() : true;
?>
<a class="bs-back" href="<?php echo esc_url( bs_url( 'pieces' ) ); ?>"><?php esc_html_e( 'Pieces', 'bidri-studio' ); ?></a>

<div class="bs-head bs-head--row">
	<h1><?php echo $new ? esc_html__( 'New piece', 'bidri-studio' ) : esc_html( $p->get_name() ); ?></h1>
	<?php if ( ! $new && 'publish' === $p->get_status() ) : ?>
		<a class="bs-link" href="<?php echo esc_url( get_permalink( $id ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'View in shop', 'bidri-studio' ); ?></a>
	<?php endif; ?>
</div>

<form class="bs-form" method="post" action="<?php echo esc_url( bs_action_url() ); ?>" enctype="multipart/form-data">
	<?php bs_form_fields( 'save', array( 'piece' => $id ) ); ?>

	<div class="bs-form__grid">
		<label class="bs-photo">
			<span class="bs-photo__frame" data-photo-preview>
				<?php if ( $p && $p->get_image_id() ) : ?>
					<?php echo wp_get_attachment_image( $p->get_image_id(), 'woocommerce_single', false, array( 'alt' => '' ) ); ?>
				<?php else : ?>
					<span class="bs-photo__empty bs-ico--plus"><?php esc_html_e( 'Add photo', 'bidri-studio' ); ?></span>
				<?php endif; ?>
			</span>
			<span class="bs-photo__change"><?php echo $p && $p->get_image_id() ? esc_html__( 'Change photo', 'bidri-studio' ) : esc_html__( 'Choose a photo', 'bidri-studio' ); ?></span>
			<input type="file" name="photo" accept="image/jpeg,image/png,image/webp" class="screen-reader-text">
		</label>

		<div class="bs-card bs-fields">
			<p class="bs-field">
				<label for="bs-name"><?php esc_html_e( 'Name', 'bidri-studio' ); ?></label>
				<input id="bs-name" name="name" type="text" required maxlength="120" value="<?php echo esc_attr( $p ? $p->get_name() : '' ); ?>" placeholder="<?php esc_attr_e( 'Lotus Bowl', 'bidri-studio' ); ?>">
			</p>
			<div class="bs-field-row">
				<p class="bs-field">
					<label for="bs-price"><?php esc_html_e( 'Price (₹, incl. tax)', 'bidri-studio' ); ?></label>
					<input id="bs-price" name="price" type="text" inputmode="numeric" pattern="[0-9,₹ ]*" value="<?php echo esc_attr( $p ? $p->get_regular_price() : '' ); ?>" placeholder="18200">
				</p>
				<p class="bs-field">
					<label for="bs-stock"><?php esc_html_e( 'In stock', 'bidri-studio' ); ?></label>
					<input id="bs-stock" name="stock" type="number" min="0" max="9999" inputmode="numeric" value="<?php echo esc_attr( $p ? (int) $p->get_stock_quantity() : 1 ); ?>">
				</p>
			</div>
			<p class="bs-field">
				<label for="bs-collection"><?php esc_html_e( 'Collection', 'bidri-studio' ); ?></label>
				<select id="bs-collection" name="collection">
					<?php foreach ( (array) $cats as $c ) : ?>
						<option value="<?php echo (int) $c->term_id; ?>"<?php selected( $cur_cat, $c->term_id ); ?>><?php echo esc_html( $c->name ); ?></option>
					<?php endforeach; ?>
				</select>
			</p>
			<p class="bs-field">
				<label for="bs-about"><?php esc_html_e( 'About this piece', 'bidri-studio' ); ?></label>
				<textarea id="bs-about" name="about" rows="3" maxlength="600" placeholder="<?php esc_attr_e( 'One or two sentences customers see under the price.', 'bidri-studio' ); ?>"><?php echo esc_textarea( $p ? wp_strip_all_tags( $p->get_short_description() ) : '' ); ?></textarea>
			</p>
			<div class="bs-field-row">
				<p class="bs-field">
					<label for="bs-size"><?php esc_html_e( 'Size', 'bidri-studio' ); ?></label>
					<input id="bs-size" name="size" type="text" maxlength="80" value="<?php echo esc_attr( $p ? bs_attr( $p, 'Size' ) : '' ); ?>" placeholder="<?php esc_attr_e( '20 cm high', 'bidri-studio' ); ?>">
				</p>
				<p class="bs-field">
					<label for="bs-weight"><?php esc_html_e( 'Weight (g)', 'bidri-studio' ); ?></label>
					<input id="bs-weight" name="weight" type="number" min="0" max="99999" inputmode="numeric" value="<?php echo esc_attr( $grams ); ?>" placeholder="760">
				</p>
			</div>
			<label class="bs-toggle"><input type="checkbox" name="visible" value="1"<?php checked( $visible ); ?>><span><?php esc_html_e( 'Show in shop', 'bidri-studio' ); ?></span></label>
			<label class="bs-toggle"><input type="checkbox" name="featured" value="1"<?php checked( $p && $p->is_featured() ); ?>><span><?php esc_html_e( 'Show in Bestsellers', 'bidri-studio' ); ?></span></label>
		</div>
	</div>

	<div class="bs-form__actions">
		<button class="bs-btn bs-btn--silk bs-btn--wide" type="submit"><?php echo $new ? esc_html__( 'Add piece', 'bidri-studio' ) : esc_html__( 'Save', 'bidri-studio' ); ?></button>
	</div>
</form>

<?php if ( ! $new ) : ?>
	<form class="bs-quiet-actions" method="post" action="<?php echo esc_url( bs_action_url() ); ?>">
		<?php bs_form_fields( 'trash', array( 'piece' => $id ) ); ?>
		<button class="bs-link" type="submit" data-confirm="<?php esc_attr_e( 'Remove this piece from the shop?', 'bidri-studio' ); ?>"><?php esc_html_e( 'Remove piece', 'bidri-studio' ); ?></button>
	</form>
<?php endif; ?>
