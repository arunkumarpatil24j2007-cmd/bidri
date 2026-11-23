<?php
/**
 * One-time setup when this version is first loaded on a site (safe to run again).
 *
 *  - Creates the notifications table.
 *  - Creates the "Request an exchange" page.
 *  - Exchange-only policy: updates the Returns, Terms and Shipping pages, but only while they still
 *    have the original wording (a page you have edited yourself is left alone).
 *  - Publishes the Privacy Policy page if it is missing or still a draft.
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	if ( get_option( 'bidri_studio_version' ) === BIDRI_STUDIO_VERSION || wp_installing() ) {
		return;
	}
	update_option( 'bidri_studio_version', BIDRI_STUDIO_VERSION ); // First, so two visitors can't run it at once.
	bs_install_events_table();
	bs_upgrade_pages();
}, 20 );

function bs_content( string $slug ): string {
	$file = BIDRI_STUDIO_DIR . '/content/' . $slug . '.html';
	return file_exists( $file ) ? (string) file_get_contents( $file ) : ''; // phpcs:ignore WordPress.WP.AlternativeFunctions
}

/** Create or update a page. $old_marker: only replace content that still contains this text. */
function bs_upgrade_page( string $slug, string $title, string $old_marker = '' ): int {
	$content = bs_content( $slug );
	if ( '' === $content ) {
		return 0;
	}
	$page = get_page_by_path( $slug );
	if ( ! $page ) {
		$id = wp_insert_post( wp_slash( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => $title, 'post_content' => $content ) ) );
		return is_wp_error( $id ) ? 0 : (int) $id;
	}
	$unpublished = 'publish' !== $page->post_status;
	if ( $unpublished || ( '' !== $old_marker && str_contains( $page->post_content, $old_marker ) ) ) {
		wp_update_post( wp_slash( array( 'ID' => $page->ID, 'post_status' => 'publish', 'post_title' => $title, 'post_content' => $content ) ) );
	}
	return (int) $page->ID;
}

function bs_upgrade_pages(): void {
	bs_upgrade_page( 'exchange', __( 'Request an exchange', 'bidri-studio' ) );
	bs_upgrade_page( 'returns', __( 'Exchange policy', 'bidri-studio' ), 'We refund the full amount.' );
	bs_upgrade_page( 'terms', __( 'Terms of Service', 'bidri-studio' ), 'you may cancel for a full refund' );
	bs_upgrade_page( 'shipping', __( 'Shipping', 'bidri-studio' ), 'we will replace it.' );

	// Privacy: WordPress makes its own draft "privacy-policy" page on install; ours must be the published one.
	$privacy = get_post( (int) get_option( 'wp_page_for_privacy_policy' ) );
	if ( ! $privacy || 'publish' !== $privacy->post_status ) {
		$draft = get_page_by_path( 'privacy-policy' );
		$data  = array( 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => 'privacy-policy', 'post_title' => __( 'Privacy Policy', 'bidri-studio' ), 'post_content' => bs_content( 'privacy-policy' ) );
		if ( $draft ) {
			$data['ID'] = $draft->ID;
		}
		$id = wp_insert_post( wp_slash( $data ) );
		if ( $id && ! is_wp_error( $id ) ) {
			update_option( 'wp_page_for_privacy_policy', (int) $id );
		}
	}
}
