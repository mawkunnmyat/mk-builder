/**
 * Shared SelectControl option lists for recovered blocks.
 */
import { __ } from '@wordpress/i18n';

export const DEPARTMENT_OPTIONS = [
	{ value: 'heart', label: 'Heart Centre' },
	{ value: 'neuro', label: 'Neuro Centre' },
	{ value: 'cancer', label: 'Cancer Centre' },
	{ value: 'peds', label: 'Paediatrics' },
	{ value: 'general', label: 'General Medicine' },
	{ value: 'ent', label: 'ENT' },
	{ value: 'dental', label: 'Dental' },
];

export const GENDER_OPTIONS = [
	{ value: '', label: __( 'Not specified', 'mk-builder' ) },
	{ value: 'male', label: __( 'Male', 'mk-builder' ) },
	{ value: 'female', label: __( 'Female', 'mk-builder' ) },
];

export const ICON_TYPE_OPTIONS = [
	{ label: __( 'Font Awesome', 'mk-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'mk-builder' ), value: 'dashicon' },
	{ label: __( 'Image / GIF', 'mk-builder' ), value: 'image' },
	{ label: __( 'Video', 'mk-builder' ), value: 'video' },
];

export const MEDIA_TYPE_OPTIONS = [
	{ label: __( 'Image', 'mk-builder' ), value: 'image' },
	{ label: __( 'Video', 'mk-builder' ), value: 'video' },
	{ label: __( 'Font Awesome', 'mk-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'mk-builder' ), value: 'dashicon' },
];

export const PHOTO_TYPE_OPTIONS = [
	{ label: __( 'Image / GIF', 'mk-builder' ), value: 'image' },
	{ label: __( 'Video', 'mk-builder' ), value: 'video' },
	{ label: __( 'Font Awesome', 'mk-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'mk-builder' ), value: 'dashicon' },
];

export const INFO_CARD_ICON_TYPE_OPTIONS = [
	{ label: __( 'Font Awesome', 'mk-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'mk-builder' ), value: 'dashicon' },
	{ label: __( 'Image', 'mk-builder' ), value: 'image' },
];

export const DASHICON_OPTIONS = [
	{ label: __( 'Phone', 'mk-builder' ), value: 'dashicons-phone' },
	{ label: __( 'Email', 'mk-builder' ), value: 'dashicons-email' },
	{ label: __( 'Location', 'mk-builder' ), value: 'dashicons-location' },
	{ label: __( 'Heart', 'mk-builder' ), value: 'dashicons-heart' },
	{ label: __( 'Admin users', 'mk-builder' ), value: 'dashicons-admin-users' },
	{ label: __( 'Arrow right', 'mk-builder' ), value: 'dashicons-arrow-right-alt2' },
];
