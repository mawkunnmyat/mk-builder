<?php

/**
 * Plugin Name:       MK Builder
 * Plugin URI:        https://github.com/mawkunnmyat/mk-builder
 * Description:       General Company Page Builder Blocks for MK Ecosystem.
 * Version:           1.0.0
 * Author:            Maw Kunn
 * Author URI:        https://github.com/mawkunnmyat
 * Text Domain:       mk-builder
 * Domain Path:       /languages
 * Requires at least: 6.0
 * Requires PHP:      7.4
 *
 * @package           MkBuilder
 */

// Security: Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/** Define Constants */
define('MK_BUILDER_VERSION', '1.0.0');
define('MK_BUILDER_PATH', plugin_dir_path(__FILE__));
define('MK_BUILDER_URL', plugin_dir_url(__FILE__));

/** Load Award CPT and dynamic block support */
require_once MK_BUILDER_PATH . 'includes/class-mk-award.php';

/** Load CSR Initiative post meta support */
require_once MK_BUILDER_PATH . 'includes/class-mk-csr-initiative.php';

/** Load Updates Section (Hospital News & Updates) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-updates-section.php';

/** Load Blog Section (Blog layout: featured, grid, sidebar, pagination) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-blog-section.php';

/** Load Emergency Units Section (Specialized Units from Posts) render callback + post meta */
require_once MK_BUILDER_PATH . 'includes/class-mk-em-units-section.php';

/** Load Pharmacy Shop by Category Section (WooCommerce product categories) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-ph-shop-category-section.php';

/** Load Pharmacy Popular Products Section (WooCommerce products) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-ph-popular-products-section.php';

/** Load Agrezer Shop Grid Section (WooCommerce shop layout) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-agrezer-shop-grid-section.php';

/** Load Physio Facilities Section (Facilities cards from Posts) render callback */
require_once MK_BUILDER_PATH . 'includes/class-mk-phy-facilities-section.php';

/**
 * 1. Register custom block category for MK Builder.
 * Places the category at the top of the block inserter panel.
 */
function mk_builder_register_category($categories)
{
    // Use array_unshift to add category at the beginning (top of inserter)
    array_unshift(
        $categories,
        array(
            'slug' => 'mk-builder',
            'title' => __('MK Builder Blocks', 'mk-builder'),
            'icon' => 'admin-site-alt3',
        )
    );
    
    return $categories;
}

add_filter('block_categories_all', 'mk_builder_register_category', 10, 1);

/**
 * 2. Register frontend scripts for MK Builder blocks.
 * Scripts are registered globally and only enqueued conditionally per page.
 */
function mk_builder_register_frontend_scripts()
{
    $version   = MK_BUILDER_VERSION;
    $assets_js = MK_BUILDER_URL . 'assets/js/';

    $scripts = array(
        'mk-jivaka-header-init'          => 'jivaka-header-init.js',
        'mk-hero-new-init'             => 'hero-new-init.js',
        'mk-lab-hero-init'             => 'lab-hero-init.js',
        'mk-dept-layout-init'          => 'dept-layout-init.js',
        'mk-centre-layout-init'        => 'centre-layout-init.js',
        'mk-services-grid-init'        => 'services-grid-init.js',
        'mk-contact-layout-init'       => 'contact-layout-init.js',
        'mk-team-members-init'         => 'team-members-init.js',
        'mk-amb-fleet-section-init'    => 'amb-fleet-section-init.js',
        'mk-amb-tech-section-init'     => 'amb-tech-section-init.js',
        'mk-amb-process-section-init'  => 'amb-process-section-init.js',
        'mk-amb-map-section-init'      => 'amb-map-section-init.js',
        'mk-doctor-directory-init'     => 'doctor-directory-init.js',
        'mk-csr-initiatives-init'      => 'csr-initiatives-init.js',
        'mk-csr-moments-gallery-init'  => 'csr-moments-gallery-init.js',
        'mk-csr-events-init'           => 'csr-events-init.js',
        'mk-journey-steps-init'        => 'journey-steps-init.js',
        'mk-exclusive-services-init'   => 'exclusive-services-init.js',
        'mk-testimonial-init'          => 'testimonial-init.js',
        'mk-nearby-accommodation-init' => 'nearby-accommodation-init.js',
        'mk-inquiry-form-init'         => 'inquiry-form-init.js',
        'mk-profile-tabs-init'         => 'profile-tabs-init.js',
        'mk-neuro-faq-init'            => 'neuro-faq-init.js',
        'mk-rad-prep-faq-init'         => 'rad-prep-faq-init.js',
        'mk-phy-faq-init'              => 'phy-faq-init.js',
        'mk-neuro-centre-init'         => 'neuro-centre-init.js',
        'mk-benefits-init'             => 'benefits-init.js',
        'mk-job-openings-init'         => 'job-openings-init.js',
    );

    foreach ($scripts as $handle => $file) {
        wp_register_script(
            $handle,
            $assets_js . $file,
            array(),
            $version,
            true
        );
    }
}

add_action('init', 'mk_builder_register_frontend_scripts');

/**
 * 2a. Enqueue Frontend Assets
 * Conditionally enqueues JavaScript for interactive blocks based on presence in the current post content.
 * Also enqueues shared frontend styles (Font Awesome, Dashicons).
 */
function mk_builder_enqueue_assets()
{
    if (is_admin()) {
        return;
    }

    // Header interactions are needed site-wide (template parts / site editor header).
    if (wp_script_is('mk-jivaka-header-init', 'registered') && !wp_script_is('mk-jivaka-header-init', 'enqueued')) {
        wp_enqueue_script('mk-jivaka-header-init');
    }

    global $post;
    if (!$post instanceof WP_Post) {
        // Fallback: no global post (e.g. template parts, some archives) – skip block-conditional scripts.
        // Keep global assets (like header interactions) enqueued above.
        return;
    }

    // Map block names to their frontend script handles.
    $block_script_map = array(
        // Hero / layout
        'mk/hero-new-section'              => array('mk-hero-new-init'),
        'mk/lab-hero-section'              => array('mk-lab-hero-init'),
        'mk/dept-layout-section'           => array('mk-dept-layout-init'),
        'mk/centre-layout-section'         => array('mk-centre-layout-init'),

        // Services / team / contact
        'mk/services-section'              => array('mk-services-grid-init'),
        'mk/services-grid'                 => array('mk-services-grid-init'),
        'mk/contact-layout-section'        => array('mk-contact-layout-init'),
        'mk/team-members-section'          => array('mk-team-members-init'),

        // Ambulance related
        'mk/amb-fleet-section'             => array('mk-amb-fleet-section-init'),
        'mk/amb-tech-section'              => array('mk-amb-tech-section-init'),
        'mk/amb-process-section'           => array('mk-amb-process-section-init'),
        'mk/amb-map-section'               => array('mk-amb-map-section-init'),

        // Doctor directory
        'mk/doctor-directory-section'      => array('mk-doctor-directory-init'),
        'mk/doctor-search-filter-section'  => array('mk-doctor-directory-init'),

        // CSR
        'mk/csr-initiatives-section'       => array('mk-csr-initiatives-init'),
        'mk/csr-moments-gallery-section'   => array('mk-csr-moments-gallery-init'),
        'mk/csr-events-section'            => array('mk-csr-events-init'),

        // Journey / Exclusive / Nearby
        'mk/journey-steps-section'         => array('mk-journey-steps-init'),
        'mk/exclusive-services-section'    => array('mk-exclusive-services-init'),
        'mk/nearby-accommodation-section'  => array('mk-nearby-accommodation-init'),

        // Forms / tabs
        'mk/inquiry-form-section'          => array('mk-inquiry-form-init'),
        'mk/profile-tabs-section'          => array('mk-profile-tabs-init'),

        // Neuro / Rad / Physio
        'mk/neuro-centre-section'          => array('mk-neuro-centre-init'),
        'mk/neuro-faq-section'             => array('mk-neuro-faq-init'),
        'mk/rad-prep-faq-section'          => array('mk-rad-prep-faq-init'),
        'mk/phy-faq-section'               => array('mk-phy-faq-init'),

        // Benefits / jobs
        'mk/benefits-section'              => array('mk-benefits-init'),
        'mk/job-openings-section'          => array('mk-job-openings-init'),

        // Testimonials
        'mk/testimonial-section'           => array('mk-testimonial-init'),
    );

    foreach ($block_script_map as $block_name => $handles) {
        if (has_block($block_name, $post)) {
            foreach ($handles as $handle) {
                if (wp_script_is($handle, 'registered') && !wp_script_is($handle, 'enqueued')) {
                    wp_enqueue_script($handle);
                }
            }
        }
    }

    // Font Awesome for icons (optional - only if not already loaded by theme)
    if (!wp_style_is('mk-font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'mk-font-awesome',
            plugins_url('assets/vendor/fontawesome/css/all.min.css', __FILE__),
            array(),
            '6.5.2'
        );
    }

    // WordPress Dashicons (for Info Cards and other blocks using Dashicons on frontend)
    wp_enqueue_style('dashicons');
}

add_action('wp_enqueue_scripts', 'mk_builder_enqueue_assets', 5); // Priority 5 to load early

/**
 * 2b. Enqueue Editor Assets
 * Enqueues Font Awesome and other assets needed in the Gutenberg editor.
 */
function mk_builder_enqueue_editor_assets()
{
    // Font Awesome for icons in editor (optional - only if not already loaded)
    if (!wp_style_is('mk-font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'mk-font-awesome',
            plugins_url('assets/vendor/fontawesome/css/all.min.css', __FILE__),
            array(),
            '6.5.2'
        );
    }
}

add_action('enqueue_block_editor_assets', 'mk_builder_enqueue_editor_assets');

/**
 * 2c. Enqueue shared Google Fonts once for blocks.
 * Loads on both front-end and block editor via enqueue_block_assets.
 */
function mk_builder_enqueue_global_block_fonts()
{
    if (!wp_style_is('mk-builder-google-fonts', 'enqueued')) {
        wp_enqueue_style(
            'mk-builder-google-fonts',
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Manrope:wght@400;500;600;700;800&family=Marcellus&family=Roboto:wght@300;400;500;600;700;900&display=swap',
            array(),
            null
        );
    }
}
add_action('enqueue_block_assets', 'mk_builder_enqueue_global_block_fonts');

/**
 * 2d. Global shared block CSS (single build entry: `src/global.scss` → `build/global.css`).
 * - Block editor: always enqueued (see `mk_builder_enqueue_global_block_styles_editor`) so
 *   utilities are available in the canvas/iframe.
 * - Front end: enqueued only when the main queried singular content includes stats-related
 *   blocks (see `mk_builder_should_enqueue_global_responsive_block_styles_on_front`) for performance.
 */
function mk_builder_enqueue_global_block_style_asset()
{
    static $done = false;
    if ($done) {
        return;
    }

    $file = MK_BUILDER_PATH . 'build/global.css';
    if (!is_readable($file)) {
        return;
    }

    $asset_path = MK_BUILDER_PATH . 'build/global.asset.php';
    $asset = is_readable($asset_path) ? include $asset_path : array();
    $version = is_array($asset) && !empty($asset['version']) ? $asset['version'] : MK_BUILDER_VERSION;

    wp_enqueue_style(
        'mk-builder-global',
        MK_BUILDER_URL . 'build/global.css',
        array(),
        $version
    );
    // wp-scripts + RtlCssPlugin emit `build/global-rtl.css` for RTL locales.
    wp_style_add_data('mk-builder-global', 'rtl', 'replace');

    $done = true;
}

/**
 * Resolve the post object used to test `has_block()` for conditional front-end global CSS.
 * Defaults to the main singular queried post. Block themes and archives can use the filter
 * `mk_builder_global_responsive_style_post` to supply a different `WP_Post` (or return null to skip).
 *
 * @return WP_Post|null
 */
function mk_builder_get_post_for_global_responsive_style_check()
{
    $post = null;
    if (is_singular()) {
        $queried = get_queried_object();
        if ($queried instanceof WP_Post) {
            $post = $queried;
        }
    }

    $post = apply_filters('mk_builder_global_responsive_style_post', $post, $post);
    if ($post instanceof WP_Post) {
        return $post;
    }
    return null;
}

/**
 * @param WP_Post $post The post to inspect.
 * @return bool
 */
function mk_builder_post_needs_global_responsive_block_styles($post)
{
    if (!$post instanceof WP_Post) {
        return false;
    }

    $block_names = array(
        'mk/cta-block',
        'mk/stats-column',
        'mk/stats-section',
        'mk/stat-card',
    );

    /**
     * Filter which block names trigger `build/global.css` on the front end.
     *
     * @param string[] $block_names Block slugs to check with has_block().
     * @param WP_Post  $post        Post used for the check.
     */
    $block_names = apply_filters('mk_builder_global_responsive_style_block_names', $block_names, $post);
    if (!is_array($block_names)) {
        $block_names = array();
    }

    foreach ($block_names as $name) {
        if (!is_string($name) || $name === '') {
            continue;
        }
        if (has_block($name, $post)) {
            return true;
        }
    }

    return false;
}

/**
 * Whether to load global responsive CSS on the front (non-admin) for the current main view.
 *
 * @return bool
 */
function mk_builder_should_enqueue_global_responsive_block_styles_on_front()
{
    if (is_admin()) {
        return false;
    }

    $post = mk_builder_get_post_for_global_responsive_style_check();

    $override = apply_filters('mk_builder_enqueue_global_responsive_block_styles', null, $post);
    if (is_bool($override)) {
        return $override;
    }
    if (!$post instanceof WP_Post) {
        return false;
    }

    if (!mk_builder_post_needs_global_responsive_block_styles($post)) {
        return false;
    }

    return true;
}

/**
 * Block editor: always load global shared CSS (includes responsive utility classes for stats blocks).
 */
function mk_builder_enqueue_global_block_styles_editor()
{
    mk_builder_enqueue_global_block_style_asset();
}
add_action('enqueue_block_editor_assets', 'mk_builder_enqueue_global_block_styles_editor', 3);

/**
 * Front end: load global shared CSS only when the main singular post (see
 * `mk_builder_get_post_for_global_responsive_style_check`, filterable) contains stats-related
 * blocks that use shared responsive utilities, or the filter forces loading.
 */
function mk_builder_enqueue_global_block_styles_frontend()
{
    if (!mk_builder_should_enqueue_global_responsive_block_styles_on_front()) {
        return;
    }
    mk_builder_enqueue_global_block_style_asset();
}
add_action('wp_enqueue_scripts', 'mk_builder_enqueue_global_block_styles_frontend', 20);


/**
 * 3. Initialize Blocks.
 * Registers all blocks from the /build directory with comprehensive error handling.
 *
 * Note on entry imports:
 * Some blocks are also explicitly imported in src/index.js (for example mk/header
 * and mk/nav-item) so they are guaranteed to be included in the compiled bundle.
 * Runtime registration still happens here from build/* via register_block_type().
 */
function mk_builder_init_blocks()
{
    // Early exit if register_block_type is not available
    if (!function_exists('register_block_type')) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: register_block_type function not available');
        }
        return;
    }

    $blocks_path = MK_BUILDER_PATH . 'build/';

    // Check if build directory exists
    if (!is_dir($blocks_path)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: Build directory does not exist: ' . $blocks_path);
        }
        // Don't break the site if build directory is missing
        return;
    }

    // Get block folders with error handling
    $block_folders = @scandir($blocks_path);
    if ($block_folders === false) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: Failed to scan build directory: ' . $blocks_path);
        }
        return;
    }

    $block_folders = array_diff($block_folders, array('..', '.', 'images'));

    if (empty($block_folders)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: No block folders found in build directory');
        }
        return;
    }

    $registered_count = 0;
    $failed_count = 0;

    /**
     * Dynamic blocks that declare "render": "file:./render.php" in block.json (for example
     * mk/posts-grid under build/agrezer-blog-section/) are registered automatically by this loop via
     * register_block_type( $block_dir ). WordPress resolves render.php relative to that folder.
     *
     * Requirements:
     * - Run `npm run build` so build/agrezer-blog-section/ contains block.json, index.js, and render.php.
     * - Do not register the same block twice (no extra register_block_type for agrezer-blog-section here).
     * - Do not set render_callback for mk/posts-grid unless overriding PHP output intentionally.
     *
     * Optional one-off registration (same as one loop iteration; use only if not using this loop):
     * register_block_type( MK_BUILDER_PATH . 'build/agrezer-blog-section' );
     * // or: register_block_type_from_metadata( MK_BUILDER_PATH . 'build/agrezer-blog-section' );
     *
     * Note: includes/class-mk-blog-section.php provides mk_render_blog_section for mk/blog-section
     * only — it does not affect mk/posts-grid.
     */

    foreach ($block_folders as $folder) {
        $block_dir = $blocks_path . $folder;
        
        // Skip if not a directory
        if (!is_dir($block_dir)) {
            continue;
        }

        // Check if block.json exists and is readable
        $block_json = $block_dir . '/block.json';
        if (!file_exists($block_json) || !is_readable($block_json)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: block.json not found or not readable: ' . $block_json);
            }
            $failed_count++;
            continue;
        }

        // Validate block.json is valid JSON
        $block_json_content = @file_get_contents($block_json);
        if ($block_json_content === false) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: Failed to read block.json for ' . $folder);
            }
            $failed_count++;
            continue;
        }

        $block_data = json_decode($block_json_content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: Invalid JSON in block.json for ' . $folder . ': ' . json_last_error_msg());
            }
            $failed_count++;
            continue;
        }

        // Check if block has required name attribute
        if (empty($block_data['name'])) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: Block missing name attribute: ' . $folder);
            }
            $failed_count++;
            continue;
        }

        // Check if required index.js exists
        $index_js = $block_dir . '/index.js';
        if (!file_exists($index_js)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: index.js not found for block: ' . $folder);
            }
            $failed_count++;
            continue;
        }

        // Register block with error suppression (to prevent one bad block from breaking all)
        try {
            $block_args = array();
            // Requirement: explicitly register mk/posts-grid from its build folder.
            // This ensures WordPress reads block.json + its `render: file:./render.php`
            // from the same directory where webpack copies PHP.
            if (isset($block_data['name']) && $block_data['name'] === 'mk/posts-grid') {
                // Requirement: explicitly register from the build folder.
                // This ensures WordPress loads `block.json` + `render: file:./render.php` correctly.
                $result = register_block_type( __DIR__ . '/build/agrezer-blog-section' );
            } else {
                if (isset($block_data['name']) && $block_data['name'] === 'mk/awards-section') {
                    $block_args['render_callback'] = 'mk_render_awards_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/csr-initiatives-section') {
                    $block_args['render_callback'] = 'mk_render_csr_initiatives_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/updates-section') {
                    $block_args['render_callback'] = 'mk_render_updates_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/blog-section') {
                    $block_args['render_callback'] = 'mk_render_blog_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/em-units-section') {
                    $block_args['render_callback'] = 'mk_render_em_units_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/ph-shop-category-section') {
                    $block_args['render_callback'] = 'mk_render_ph_shop_category_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/ph-popular-products-section') {
                    $block_args['render_callback'] = 'mk_render_ph_popular_products_section';
                }
                if (isset($block_data['name']) && in_array($block_data['name'], array('mk/agrezer-shop-grid-section', 'mk/products-grid'), true)) {
                    $block_args['render_callback'] = 'mk_render_agrezer_shop_grid_section';
                }
                if (isset($block_data['name']) && $block_data['name'] === 'mk/phy-facilities-section') {
                    $block_args['render_callback'] = 'mk_render_phy_facilities_section';
                }

                $result = register_block_type($block_dir, $block_args);
            }
            
            if ($result && !is_wp_error($result)) {
                $registered_count++;
                
                if (defined('WP_DEBUG') && WP_DEBUG && WP_DEBUG_LOG) {
                    error_log('MK Builder: Successfully registered block: ' . $block_data['name']);
                }
            } else {
                $failed_count++;
                $error_message = is_wp_error($result) ? $result->get_error_message() : 'Unknown error';
                
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    error_log('MK Builder: Failed to register block ' . $folder . ' (' . $block_data['name'] . '): ' . $error_message);
                }
            }
        } catch (Exception $e) {
            $failed_count++;
            
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: Exception registering block ' . $folder . ': ' . $e->getMessage());
            }
            continue;
        } catch (Error $e) {
            $failed_count++;
            
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('MK Builder: Fatal error registering block ' . $folder . ': ' . $e->getMessage());
            }
            continue;
        }
    }

    // Log summary in debug mode
    if (defined('WP_DEBUG') && WP_DEBUG && WP_DEBUG_LOG) {
        error_log('MK Builder: Registration complete - Success: ' . $registered_count . ', Failed: ' . $failed_count);
    }

    // If no blocks registered at all, log warning
    if ($registered_count === 0) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder WARNING: No blocks were successfully registered!');
        }
    }
}

// Use priority 20 to ensure WordPress core blocks are registered first
// Wrap in error handler to prevent fatal errors from breaking the site
add_action('init', function() {
    try {
        mk_builder_init_blocks();
    } catch (Exception $e) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: Exception during block initialization: ' . $e->getMessage());
        }
    } catch (Error $e) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('MK Builder: Fatal error during block initialization: ' . $e->getMessage());
        }
    }
}, 20);

/**
 * 3b. Invalidate post cache on save so static blocks (e.g. rad-process-section with InnerBlocks)
 * reflect backend changes on the front-end. Clears WordPress object cache for the post;
 * full-page cache plugins should hook into save_post and purge their cache.
 */
function mk_builder_invalidate_post_cache_on_save($post_id)
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    clean_post_cache($post_id);
    do_action('mk_builder_after_post_save_cache_invalidate', $post_id);
}
add_action('save_post', 'mk_builder_invalidate_post_cache_on_save', 20, 1);

/**
 * 4. Activation Hook - Verify plugin can be activated safely
 */
function mk_builder_activation_check()
{
    // Check if build directory exists
    $blocks_path = MK_BUILDER_PATH . 'build/';
    if (!is_dir($blocks_path)) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die(
            __('MK Builder plugin could not be activated. Build directory is missing. Please run "npm run build" first.', 'mk-builder'),
            __('Plugin Activation Error', 'mk-builder'),
            array('back_link' => true)
        );
    }
}
register_activation_hook(__FILE__, 'mk_builder_activation_check');

/**
 * 5. Add admin notice if blocks fail to register
 */
function mk_builder_admin_notices()
{
    // Only show on admin pages
    if (!is_admin()) {
        return;
    }

    // Check if we're in the block editor
    $screen = get_current_screen();
    if (!$screen || $screen->base !== 'post') {
        return;
    }

    // This is a placeholder - actual check would need to be more sophisticated
    // For now, we rely on error logging
}
add_action('admin_notices', 'mk_builder_admin_notices');
