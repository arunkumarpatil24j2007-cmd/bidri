<?php
/**
 * Plugin Name: Bidri Studio
 * Description: A calm, simple store panel for the Bidri Crafts owner — today, orders, pieces, sales. Built on WooCommerce.
 * Version: 1.0.0
 * Requires at least: 6.6
 * Requires PHP: 8.1
 * Requires Plugins: woocommerce
 * Author: Bidri Crafts
 * License: GPL-2.0-or-later
 * Text Domain: bidri-studio
 *
 * @package bidri-studio
 */

defined( 'ABSPATH' ) || exit;

define( 'BIDRI_STUDIO_VERSION', '1.0.0' );
define( 'BIDRI_STUDIO_DIR', __DIR__ );
define( 'BIDRI_STUDIO_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/access.php';
require_once __DIR__ . '/inc/actions.php';
require_once __DIR__ . '/inc/screens.php';
require_once __DIR__ . '/inc/security.php';
require_once __DIR__ . '/inc/reliability.php';
require_once __DIR__ . '/inc/app.php';
require_once __DIR__ . '/inc/shortcuts.php';
