<?php
/*
Plugin Name: Custom Pagination Titles
Description: A plugin to modify the pagination block in the Full Site Editor to display page titles instead of numbers.
Version: 1.0
Author: david wolfpaw
*/

// This function enqueus the JavaScript needed to make the block variation
function cpt_enqueue_custom_pagination_script() {
	wp_enqueue_script(
		'cpt-custom-pagination-title',
		plugin_dir_url( __FILE__ ) . 'custom-pagination-title-block.js',
		array( 'wp-blocks', 'wp-hooks', 'wp-element', 'wp-data' ),
		'1.0.0',
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'cpt_enqueue_custom_pagination_script' );

// This is commented out because we don't have any styles to load right now and may not
function cpt_enqueue_custom_pagination_styles() {
	wp_enqueue_style(
		'cpt-custom-pagination-styles',
		plugin_dir_url( __FILE__ ) . 'style.css',
		array(),
		'1.0.0'
	);
}
// add_action( 'wp_enqueue_scripts', 'cpt_enqueue_custom_pagination_styles' );
