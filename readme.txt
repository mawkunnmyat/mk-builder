=== MK Builder ===
Contributors: mawkunnmyat
Tags: gutenberg, blocks, page builder, healthcare, woocommerce
Requires at least: 6.0
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.1.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Professional Gutenberg block builder by Maw Kunn (MK) for company, healthcare, and ecommerce websites.

== Description ==

MK Builder extends the WordPress block editor with a production-ready collection of reusable blocks for marketing and content-rich pages.

Key features:

* 250+ Gutenberg blocks for sections, cards, sliders, testimonials, FAQs, and layouts.
* Industry-focused block sets for healthcare, corporate, and service websites.
* WooCommerce-ready blocks for product sections, category listings, and shop layouts (WooCommerce optional).
* Dynamic render callbacks for data-driven sections.
* Optimized frontend loading with conditional script enqueueing.
* All included blocks and features are free to use with no artificial limitations.

This plugin is designed for teams that build pages with the native WordPress block editor.

== Source Code and Build ==

Human-readable source for compiled assets under `/build` lives in the public repository:

https://github.com/mawkunnmyat/mk-builder

* Source directory: `/src`
* Build tool: `@wordpress/scripts` (webpack via `wp-scripts`)
* Node.js: 18 or newer
* Install dependencies: `npm install`
* Rebuild assets: `npm run build`
* Optional package script: `npm run plugin-zip`

Third-party libraries shipped with the plugin include Font Awesome Free (bundled locally). Google Fonts may be loaded from Google's CDN when block styles are displayed (see FAQ).

== Installation ==

1. Go to Plugins > Add New in your WordPress admin dashboard.
2. Search for "MK Builder".
3. Click Install Now, then Activate.

Manual install:

1. Upload the plugin folder to `/wp-content/plugins/mk-builder/`.
2. Activate the plugin through Plugins > Installed Plugins.
3. Open the block editor and use the "MK Builder Blocks" category.

== Frequently Asked Questions ==

= Does MK Builder work with any theme? =

Yes. MK Builder is built for the native WordPress block editor and works with modern, standards-compliant themes.

= Is WooCommerce required? =

No. WooCommerce is only needed for product and shop related blocks. All other blocks work without WooCommerce installed.

= Can I use only a few blocks and ignore the rest? =

Yes. You can use any subset of blocks. Frontend scripts are conditionally loaded for better performance.

= Does this plugin load external resources? =

Yes. MK Builder may load Google Fonts stylesheets from `fonts.googleapis.com` and `fonts.gstatic.com` when block styles are displayed. Font Awesome icon styles are bundled locally with the plugin. Block image defaults do not load remote media; users choose images from the Media Library. Optional map embeds only load when the site editor pastes a map URL.

= Where is the source code? =

The GPL-compatible source and build tooling are public at https://github.com/mawkunnmyat/mk-builder (see "Source Code and Build" above).

= Is there a paid or Pro version? =

This WordPress.org release is the complete free core plugin. Any future optional add-ons would be distributed separately and would not restrict features already included in this plugin.

== Screenshots ==

1. MK Builder block category in the Gutenberg inserter.
2. Example page sections built with MK Builder blocks.
3. WooCommerce-ready shop section blocks.

== Changelog ==

= 1.1.2 =

* Documented public source repository and build steps for compiled assets.
* Removed remote placeholder image URLs from block defaults and examples.
* Clarified external resource usage in the readme FAQ.

= 1.1.1 =

* Improved block stability and editor behavior across multiple block sets.
* Added and refined hospital and content section blocks.
* Updated frontend initialization scripts and shared utilities.
* WordPress.org submission metadata and documentation updates.

== Upgrade Notice ==

= 1.1.2 =

Recommended for WordPress.org guideline compliance: source documentation and no remote placeholder media defaults.
