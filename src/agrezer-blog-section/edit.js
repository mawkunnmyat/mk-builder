import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	FormTokenField,
	Button,
	Spinner,
	Notice,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

/** Stable REST queries when there is nothing to fetch by ID (avoids invalid empty `include`). */
const NOOP_CATEGORY_QUERY = {
	slug: 'mk-posts-grid__noop--categories',
	per_page: 1,
};
const NOOP_POST_QUERY = {
	slug: 'mk-posts-grid__noop--posts',
	per_page: 1,
};

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

const IMAGE_SIZE_FALLBACK_ORDER = [
	'large',
	'medium_large',
	'medium',
	'thumbnail',
	'full',
];

/**
 * Merge two REST entity lists by numeric `id`. Items in `preferred` overwrite `base` on duplicates
 * so explicitly fetched (include=…) records win over search results.
 *
 * @param {Array} baseRecords
 * @param {Array} preferredRecords
 * @return {Array}
 */
function mergeEntityRecordsById( baseRecords, preferredRecords ) {
	const map = new Map();
	for ( const item of baseRecords ) {
		if ( item && typeof item.id === 'number' ) {
			map.set( item.id, item );
		}
	}
	for ( const item of preferredRecords ) {
		if ( item && typeof item.id === 'number' ) {
			map.set( item.id, item );
		}
	}
	return [ ...map.values() ];
}

/**
 * Resolve featured image URL from embedded media with size fallbacks.
 *
 * @param {Object|null|undefined} featuredMedia Embedded `wp:featuredmedia` item.
 * @param {string}                preferredSize Attribute slug (e.g. large).
 * @return {string} Empty string if nothing usable.
 */
function getFeaturedImageUrl( featuredMedia, preferredSize ) {
	if ( ! featuredMedia || typeof featuredMedia !== 'object' ) {
		return '';
	}
	const sizes = featuredMedia.media_details?.sizes;
	if ( sizes && typeof sizes === 'object' ) {
		const direct = sizes[ preferredSize ]?.source_url;
		if ( direct ) {
			return direct;
		}
		for ( const key of IMAGE_SIZE_FALLBACK_ORDER ) {
			const url = sizes[ key ]?.source_url;
			if ( url ) {
				return url;
			}
		}
		for ( const entry of Object.values( sizes ) ) {
			if ( entry?.source_url ) {
				return entry.source_url;
			}
		}
	}
	if ( typeof featuredMedia.source_url === 'string' && featuredMedia.source_url ) {
		return featuredMedia.source_url;
	}
	return '';
}

/** Parse "#123" tokens from FormTokenField when labels are unknown. */
function parseHashIdToken( token ) {
	if ( typeof token !== 'string' ) {
		return null;
	}
	const m = token.match( /^#(\d+)$/ );
	if ( ! m ) {
		return null;
	}
	const n = parseInt( m[ 1 ], 10 );
	return Number.isFinite( n ) && n > 0 ? n : null;
}

function getPostPlainTitle( post ) {
	if ( post?.title?.rendered ) {
		return post.title.rendered.replace( /<[^>]+>/g, '' );
	}
	return __( '(Untitled)', 'mk-builder' );
}

function hexToRgba( color, opacity ) {
	if ( typeof color !== 'string' || ! color.startsWith( '#' ) ) {
		return 'rgba(0, 0, 0, 0)';
	}
	const value = color.replace( '#', '' );
	if ( value.length !== 3 && value.length !== 6 ) {
		return 'rgba(0, 0, 0, 0)';
	}
	const normalize = value.length === 3
		? value
				.split( '' )
				.map( ( char ) => `${ char }${ char }` )
				.join( '' )
		: value;
	const int = parseInt( normalize, 16 );
	const r = ( int >> 16 ) & 255;
	const g = ( int >> 8 ) & 255;
	const b = int & 255;
	const safeOpacity = Math.min( 1, Math.max( 0, opacity ) );
	return `rgba(${ r }, ${ g }, ${ b }, ${ safeOpacity })`;
}

function isVideoAsset( url = '', mime = '' ) {
	if ( typeof mime === 'string' && mime.indexOf( 'video' ) === 0 ) {
		return true;
	}
	return /\.(mp4|webm|ogg)$/i.test( String( url ) );
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionTitle,
		tagline,
		tagIcon,
		tagIconId,
		tagIconAlt,
		moreButtonUrl,
		moreButtonText,
		moreButtonNewTab,
		showMoreButtonIcon = true,
		moreButtonIconType = 'diagonal-arrow',
		readMoreText,
		showReadMoreIcon = true,
		readMoreIconType = 'arrow-right',
		postsToShow,
		columns,
		orderBy,
		order,
		categoryIds,
		excludeIds,
		offset,
		imageSize,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		showAuthorMeta,
		authorPrefix,
		showCommentsMeta,
		commentPrefix,
		titleColor,
		titleFontSize,
		titleFontWeight,
		taglineColor,
		taglineBackgroundColor,
		taglineFontSize,
		taglineFontWeight,
		moreButtonTextColor,
		moreButtonBackgroundColor,
		moreButtonHoverTextColor,
		moreButtonHoverBackgroundColor,
		postTitleColor,
		postTitleHoverColor,
		postTitleFontSize,
		postTitleFontWeight,
		postMetaColor,
		postMetaIconColor,
		postMetaFontSize,
		postMetaFontWeight,
		dateBadgeBackgroundColor,
		dateBadgeTextColor,
		dateBadgeBorderRadius,
		readMoreTextColor,
		readMoreBackgroundColor,
		readMoreHoverTextColor,
		readMoreHoverBackgroundColor,
		readMoreIconColor,
		readMoreIconBackgroundColor,
		readMoreIconHoverColor,
		readMoreIconHoverBackgroundColor,
		cardBackgroundColor,
		cardBorderRadius,
		cardBorderColor,
		cardBorderWidth,
		cardBoxShadow,
		cardBoxShadowHover,
		cardHoverTranslateY,
		imageAspectRatio,
		imageObjectFit,
		imageHeight,
		imageBorderRadius,
		imageOverlayColor,
		imageOverlayOpacity,
		imageOverlayGradient,
		imageOverlayHoverColor,
		imageOverlayHoverOpacity,
		imageOverlayHoverGradient,
		tagIconMime,
	} = attributes;

	const moreButtonIcon =
		ICONS[ moreButtonIconType ] || ICONS[ 'diagonal-arrow' ];
	const readMoreIconEl =
		ICONS[ readMoreIconType ] || ICONS[ 'arrow-right' ];

	const [ categoryInputValue, setCategoryInputValue ] = useState( '' );
	const [ excludePostInputValue, setExcludePostInputValue ] = useState( '' );
	const [ categorySearchTerm, setCategorySearchTerm ] = useState( '' );
	const [ excludePostSearchTerm, setExcludePostSearchTerm ] = useState( '' );

	const debouncedSetCategorySearchTerm = useDebounce( ( value ) => {
		setCategorySearchTerm( value );
	}, 300 );

	const debouncedSetExcludePostSearchTerm = useDebounce( ( value ) => {
		setExcludePostSearchTerm( value );
	}, 300 );

	const normalizedCategoryIds = useMemo( () => {
		if ( Array.isArray( categoryIds ) ) {
			return categoryIds
				.map( ( id ) => parseInt( id, 10 ) )
				.filter( ( id ) => Number.isFinite( id ) && id > 0 );
		}
		// Backward-safe parser if old content still carries comma-separated text.
		return String( categoryIds || '' )
			.split( ',' )
			.map( ( s ) => parseInt( String( s ).trim(), 10 ) )
			.filter( ( id ) => Number.isFinite( id ) && id > 0 );
	}, [ categoryIds ] );

	const normalizedExcludeIds = useMemo( () => {
		if ( Array.isArray( excludeIds ) ) {
			return excludeIds
				.map( ( id ) => parseInt( id, 10 ) )
				.filter( ( id ) => Number.isFinite( id ) && id > 0 );
		}
		return String( excludeIds || '' )
			.split( ',' )
			.map( ( s ) => parseInt( String( s ).trim(), 10 ) )
			.filter( ( id ) => Number.isFinite( id ) && id > 0 );
	}, [ excludeIds ] );

	const restOrder = String( order || 'DESC' ).toLowerCase() === 'asc' ? 'asc' : 'desc';
	const restOrderByAllowed = [ 'date', 'modified', 'title' ];
	const restOrderBy = restOrderByAllowed.includes( orderBy )
		? orderBy
		: 'date';

	// Stable query object — a new literal each render breaks core-data caching and can 400 the REST API.
	// categories / exclude MUST be integer arrays (WP REST schema), not CSV strings.
	const postsQuery = useMemo( () => {
		const q = {
			per_page: Math.min( 12, Math.max( 1, postsToShow || 3 ) ),
			offset: Math.max( 0, offset || 0 ),
			orderby: restOrderBy,
			order: restOrder,
			_embed: true,
		};
		if ( normalizedCategoryIds.length ) {
			q.categories = [ ...normalizedCategoryIds ];
		}
		if ( normalizedExcludeIds.length ) {
			q.exclude = [ ...normalizedExcludeIds ];
		}
		return q;
	}, [
		postsToShow,
		offset,
		restOrderBy,
		restOrder,
		normalizedCategoryIds,
		normalizedExcludeIds,
	] );

	const { records: posts, isResolving } = useEntityRecords(
		'postType',
		'post',
		postsQuery
	);

	const safePosts = useMemo( () => {
		if ( Array.isArray( posts ) ) {
			return posts.filter( ( p ) => p && typeof p.id === 'number' );
		}
		return [];
	}, [ posts ] );

	const { records: categoryRecords = [], isResolving: isCategoriesResolving } =
		useEntityRecords( 'taxonomy', 'category', {
			per_page: 100,
			search: categorySearchTerm || undefined,
			orderby: 'name',
			order: 'asc',
			hide_empty: false,
		} );

	const {
		records: excludePostRecords = [],
		isResolving: isExcludePostsResolving,
	} = useEntityRecords( 'postType', 'post', {
		per_page: 100,
		search: excludePostSearchTerm || undefined,
		orderby: 'date',
		order: 'desc',
		_embed: false,
	} );

	const selectedCategoriesQuery = useMemo( () => {
		if ( ! normalizedCategoryIds.length ) {
			return NOOP_CATEGORY_QUERY;
		}
		return {
			include: normalizedCategoryIds,
			per_page: Math.min( 100, normalizedCategoryIds.length ),
			hide_empty: false,
		};
	}, [ normalizedCategoryIds ] );

	const selectedExcludePostsQuery = useMemo( () => {
		if ( ! normalizedExcludeIds.length ) {
			return NOOP_POST_QUERY;
		}
		return {
			include: normalizedExcludeIds,
			per_page: Math.min( 100, normalizedExcludeIds.length ),
		};
	}, [ normalizedExcludeIds ] );

	const {
		records: selectedCategoryRecords = [],
		isResolving: isSelectedCategoriesResolving,
	} = useEntityRecords( 'taxonomy', 'category', selectedCategoriesQuery );

	const {
		records: selectedExcludePostRecords = [],
		isResolving: isSelectedExcludePostsResolving,
	} = useEntityRecords( 'postType', 'post', selectedExcludePostsQuery );

	const isCategorySearching =
		categoryInputValue !== categorySearchTerm ||
		isCategoriesResolving ||
		( normalizedCategoryIds.length > 0 && isSelectedCategoriesResolving );
	const isExcludePostsSearching =
		excludePostInputValue !== excludePostSearchTerm ||
		isExcludePostsResolving ||
		( normalizedExcludeIds.length > 0 && isSelectedExcludePostsResolving );

	const safeCategoryRecords = Array.isArray( categoryRecords )
		? categoryRecords
		: [];
	const safeExcludePostRecords = Array.isArray( excludePostRecords )
		? excludePostRecords
		: [];
	const safeSelectedCategoryRecords = Array.isArray( selectedCategoryRecords )
		? selectedCategoryRecords
		: [];
	const safeSelectedExcludePostRecords = Array.isArray(
		selectedExcludePostRecords
	)
		? selectedExcludePostRecords
		: [];

	const combinedCategoryRecords = useMemo(
		() =>
			mergeEntityRecordsById(
				safeCategoryRecords,
				safeSelectedCategoryRecords
			),
		[ safeCategoryRecords, safeSelectedCategoryRecords ]
	);

	const combinedExcludePostRecords = useMemo(
		() =>
			mergeEntityRecordsById(
				safeExcludePostRecords,
				safeSelectedExcludePostRecords
			),
		[ safeExcludePostRecords, safeSelectedExcludePostRecords ]
	);

	const categoryIdToName = useMemo( () => {
		const entries = combinedCategoryRecords
			.filter( ( term ) => term && typeof term.id === 'number' )
			.map( ( term ) => [ term.id, term.name || '' ] );
		return new Map( entries );
	}, [ combinedCategoryRecords ] );

	const categorySuggestions = useMemo(
		() =>
			combinedCategoryRecords
				.filter( ( term ) => term && term.name )
				.map( ( term ) => term.name ),
		[ combinedCategoryRecords ]
	);

	const selectedCategoryTokens = useMemo(
		() =>
			normalizedCategoryIds.map(
				( id ) => categoryIdToName.get( id ) || `#${ id }`
			),
		[ normalizedCategoryIds, categoryIdToName ]
	);

	const postIdToTitle = useMemo( () => {
		const entries = combinedExcludePostRecords
			.filter( ( p ) => p && typeof p.id === 'number' )
			.map( ( post ) => [ post.id, getPostPlainTitle( post ) ] );
		return new Map( entries );
	}, [ combinedExcludePostRecords ] );

	const postSuggestions = useMemo(
		() =>
			combinedExcludePostRecords
				.filter( ( p ) => p && typeof p.id === 'number' )
				.map( ( post ) => getPostPlainTitle( post ) )
				.filter( Boolean ),
		[ combinedExcludePostRecords ]
	);

	const selectedExcludeTokens = useMemo(
		() =>
			normalizedExcludeIds.map(
				( id ) => postIdToTitle.get( id ) || `#${ id }`
			),
		[ normalizedExcludeIds, postIdToTitle ]
	);

	const onCategoryTokensChange = useCallback(
		( tokens ) => {
			const list = Array.isArray( tokens ) ? tokens : [];
			const idByName = new Map(
				combinedCategoryRecords
					.filter( ( term ) => term && term.name && typeof term.id === 'number' )
					.map( ( term ) => [ term.name, term.id ] )
			);

			const ids = list
				.map( ( token ) => {
					const byName = idByName.get( token );
					if ( Number.isFinite( byName ) ) {
						return byName;
					}
					return parseHashIdToken( token );
				} )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { categoryIds: [ ...new Set( ids ) ] } );
		},
		[ combinedCategoryRecords, setAttributes ]
	);

	const onExcludeTokensChange = useCallback(
		( tokens ) => {
			const list = Array.isArray( tokens ) ? tokens : [];
			const idByTitle = new Map(
				combinedExcludePostRecords
					.filter( ( p ) => p && typeof p.id === 'number' )
					.map( ( post ) => [ getPostPlainTitle( post ), post.id ] )
			);

			const ids = list
				.map( ( token ) => {
					const byTitle = idByTitle.get( token );
					if ( Number.isFinite( byTitle ) ) {
						return byTitle;
					}
					return parseHashIdToken( token );
				} )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { excludeIds: [ ...new Set( ids ) ] } );
		},
		[ combinedExcludePostRecords, setAttributes ]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-blog mk-blog-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--mk-blog-cols': Math.min( 4, Math.max( 1, columns || 3 ) ),
				'--mk-blog-max': `${ containerMaxWidth }px`,
				'--mk-blog-width': `${ containerWidthPct }%`,
				'--mk-title-color': titleColor,
				'--mk-title-size': `${ titleFontSize }px`,
				'--mk-title-weight': titleFontWeight,
				'--mk-tagline-color': taglineColor,
				'--mk-tagline-bg': taglineBackgroundColor,
				'--mk-tagline-size': `${ taglineFontSize }px`,
				'--mk-tagline-weight': taglineFontWeight,
				'--mk-more-text': moreButtonTextColor,
				'--mk-more-bg': moreButtonBackgroundColor,
				'--mk-more-text-hover': moreButtonHoverTextColor,
				'--mk-more-bg-hover': moreButtonHoverBackgroundColor,
				'--mk-card-title-color': postTitleColor,
				'--mk-card-title-hover': postTitleHoverColor,
				'--mk-card-title-size': `${ postTitleFontSize }px`,
				'--mk-card-title-weight': postTitleFontWeight,
				'--mk-meta-color': postMetaColor,
				'--mk-meta-icon-color': postMetaIconColor,
				'--mk-meta-size': `${ postMetaFontSize }px`,
				'--mk-meta-weight': postMetaFontWeight,
				'--mk-date-bg': dateBadgeBackgroundColor,
				'--mk-date-text': dateBadgeTextColor,
				'--mk-date-radius': `${ dateBadgeBorderRadius }px`,
				'--mk-read-text': readMoreTextColor,
				'--mk-read-bg': readMoreBackgroundColor,
				'--mk-read-text-hover': readMoreHoverTextColor,
				'--mk-read-bg-hover': readMoreHoverBackgroundColor,
				'--mk-read-icon': readMoreIconColor,
				'--mk-read-icon-bg': readMoreIconBackgroundColor,
				'--mk-read-icon-hover': readMoreIconHoverColor,
				'--mk-read-icon-bg-hover': readMoreIconHoverBackgroundColor,
				'--mk-card-bg': cardBackgroundColor,
				'--mk-card-radius': `${ cardBorderRadius }px`,
				'--mk-card-border': cardBorderColor,
				'--mk-card-border-width': `${ cardBorderWidth }px`,
				'--mk-card-shadow': cardBoxShadow,
				'--mk-card-shadow-hover': cardBoxShadowHover,
				'--mk-card-lift': `${ cardHoverTranslateY }px`,
				'--mk-img-height': `${ imageHeight }px`,
				'--mk-img-fit': imageObjectFit,
				'--mk-img-radius': `${ imageBorderRadius }px`,
				'--mk-img-aspect': imageAspectRatio === 'auto' ? 'auto' : imageAspectRatio,
				'--mk-img-overlay':
					imageOverlayGradient ||
					hexToRgba( imageOverlayColor, imageOverlayOpacity / 100 ),
				'--mk-img-overlay-hover':
					imageOverlayHoverGradient ||
					hexToRgba( imageOverlayHoverColor, imageOverlayHoverOpacity / 100 ),
			},
		} ),
		[
			backgroundColor,
			paddingTop,
			paddingBottom,
			columns,
			containerMaxWidth,
			containerWidthPct,
			titleColor,
			titleFontSize,
			titleFontWeight,
			taglineColor,
			taglineBackgroundColor,
			taglineFontSize,
			taglineFontWeight,
			moreButtonTextColor,
			moreButtonBackgroundColor,
			moreButtonHoverTextColor,
			moreButtonHoverBackgroundColor,
			postTitleColor,
			postTitleHoverColor,
			postTitleFontSize,
			postTitleFontWeight,
			postMetaColor,
			postMetaIconColor,
			postMetaFontSize,
			postMetaFontWeight,
			dateBadgeBackgroundColor,
			dateBadgeTextColor,
			dateBadgeBorderRadius,
			readMoreTextColor,
			readMoreBackgroundColor,
			readMoreHoverTextColor,
			readMoreHoverBackgroundColor,
			readMoreIconColor,
			readMoreIconBackgroundColor,
			readMoreIconHoverColor,
			readMoreIconHoverBackgroundColor,
			cardBackgroundColor,
			cardBorderRadius,
			cardBorderColor,
			cardBorderWidth,
			cardBoxShadow,
			cardBoxShadowHover,
			cardHoverTranslateY,
			imageAspectRatio,
			imageObjectFit,
			imageHeight,
			imageBorderRadius,
			imageOverlayColor,
			imageOverlayOpacity,
			imageOverlayGradient,
			imageOverlayHoverColor,
			imageOverlayHoverOpacity,
			imageOverlayHoverGradient,
		]
	);

	const imageSizeOptions = [
		{ label: __( 'Thumbnail', 'mk-builder' ), value: 'thumbnail' },
		{ label: __( 'Medium', 'mk-builder' ), value: 'medium' },
		{ label: __( 'Medium large', 'mk-builder' ), value: 'medium_large' },
		{ label: __( 'Large', 'mk-builder' ), value: 'large' },
		{ label: __( 'Full', 'mk-builder' ), value: 'full' },
	];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Post query', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Number of posts', 'mk-builder' ) }
							value={ postsToShow }
							onChange={ ( val ) =>
								setAttributes( { postsToShow: val } )
							}
							min={ 1 }
							max={ 12 }
						/>

						<RangeControl
							label={ __( 'Columns (desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Offset (skip first N)',
								'mk-builder'
							) }
							value={ offset }
							onChange={ ( val ) =>
								setAttributes( { offset: val } )
							}
							min={ 0 }
							max={ 50 }
						/>

						<SelectControl
							label={ __( 'Order by', 'mk-builder' ) }
							value={ orderBy }
							options={ [
								{
									label: __(
										'Publish date',
										'mk-builder'
									),
									value: 'date',
								},
								{
									label: __(
										'Modified date',
										'mk-builder'
									),
									value: 'modified',
								},
								{
									label: __( 'Title', 'mk-builder' ),
									value: 'title',
								},
								{
									label: __(
										'Comment count',
										'mk-builder'
									),
									value: 'comment_count',
								},
								{
									label: __( 'Random', 'mk-builder' ),
									value: 'rand',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { orderBy: val } )
							}
						/>
						{ [ 'rand', 'comment_count' ].includes( orderBy ) && (
							<Notice status="info" isDismissible={ false }>
								{ __(
									'Editor preview uses publish date ordering for this mode. Frontend output still honors your selected order.',
									'mk-builder'
								) }
							</Notice>
						) }

						<SelectControl
							label={ __( 'Order', 'mk-builder' ) }
							value={ order }
							options={ [
								{
									label: __(
										'Newest first',
										'mk-builder'
									),
									value: 'DESC',
								},
								{
									label: __(
										'Oldest first',
										'mk-builder'
									),
									value: 'ASC',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { order: val } )
							}
						/>

						<FormTokenField
							label={ __( 'Categories', 'mk-builder' ) }
							value={ selectedCategoryTokens }
							suggestions={ categorySuggestions }
							onChange={ onCategoryTokensChange }
							onInputChange={ ( value ) => {
								const nextValue = value || '';
								setCategoryInputValue( nextValue );
								debouncedSetCategorySearchTerm( nextValue );
							} }
							placeholder={ __(
								'Type to search categories',
								'mk-builder'
							) }
							help={ __(
								'Leave empty for all categories.',
								'mk-builder'
							) }
						/>
						{ isCategorySearching && (
							<div className="components-base-control__help">
								<Spinner />
								{ ' ' }
								{ __( 'Searching categories…', 'mk-builder' ) }
							</div>
						) }

						<FormTokenField
							label={ __( 'Exclude posts', 'mk-builder' ) }
							value={ selectedExcludeTokens }
							suggestions={ postSuggestions }
							onChange={ onExcludeTokensChange }
							onInputChange={ ( value ) => {
								const nextValue = value || '';
								setExcludePostInputValue( nextValue );
								debouncedSetExcludePostSearchTerm( nextValue );
							} }
							placeholder={ __(
								'Type to search posts to exclude',
								'mk-builder'
							) }
						/>
						{ isExcludePostsSearching && (
							<div className="components-base-control__help">
								<Spinner />
								{ ' ' }
								{ __( 'Searching posts…', 'mk-builder' ) }
							</div>
						) }

						<SelectControl
							label={ __(
								'Featured image size',
								'mk-builder'
							) }
							value={ imageSize }
							options={ imageSizeOptions }
							onChange={ ( val ) =>
								setAttributes( { imageSize: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Header content',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'More button URL', 'mk-builder' ) }
							value={ moreButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { moreButtonUrl: val } )
							}
						/>
						<TextControl
							label={ __( 'More button label', 'mk-builder' ) }
							value={ moreButtonText }
							onChange={ ( val ) =>
								setAttributes( { moreButtonText: val } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show more button icon',
								'mk-builder'
							) }
							checked={ showMoreButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { showMoreButtonIcon: val } )
							}
						/>
						<SelectControl
							label={ __(
								'More button icon type',
								'mk-builder'
							) }
							value={ moreButtonIconType }
							options={ [
								{
									label: __(
										'Diagonal arrow',
										'mk-builder'
									),
									value: 'diagonal-arrow',
								},
								{
									label: __(
										'Arrow right',
										'mk-builder'
									),
									value: 'arrow-right',
								},
								{
									label: __(
										'External link',
										'mk-builder'
									),
									value: 'external',
								},
								{
									label: __( 'Plus', 'mk-builder' ),
									value: 'plus',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { moreButtonIconType: val } )
							}
							disabled={ ! showMoreButtonIcon }
						/>
						<ToggleControl
							label={ __( 'Open in new tab', 'mk-builder' ) }
							checked={ moreButtonNewTab }
							onChange={ ( val ) =>
								setAttributes( { moreButtonNewTab: val } )
							}
						/>
						<TextControl
							label={ __( 'Icon alt text', 'mk-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody title={ __( 'Card content', 'mk-builder' ) } initialOpen={ false }>
						<TextControl
							label={ __( 'Card "Read More" label', 'mk-builder' ) }
							value={ readMoreText }
							onChange={ ( val ) =>
								setAttributes( { readMoreText: val } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show read more icon',
								'mk-builder'
							) }
							checked={ showReadMoreIcon }
							onChange={ ( val ) =>
								setAttributes( { showReadMoreIcon: val } )
							}
						/>
						<SelectControl
							label={ __(
								'Read more icon type',
								'mk-builder'
							) }
							value={ readMoreIconType }
							options={ [
								{
									label: __(
										'Diagonal arrow',
										'mk-builder'
									),
									value: 'diagonal-arrow',
								},
								{
									label: __(
										'Arrow right',
										'mk-builder'
									),
									value: 'arrow-right',
								},
								{
									label: __(
										'External link',
										'mk-builder'
									),
									value: 'external',
								},
								{
									label: __( 'Plus', 'mk-builder' ),
									value: 'plus',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { readMoreIconType: val } )
							}
							disabled={ ! showReadMoreIcon }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card meta', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show author', 'mk-builder' ) }
							checked={ showAuthorMeta }
							onChange={ ( val ) =>
								setAttributes( { showAuthorMeta: val } )
							}
						/>

						{ showAuthorMeta && (
							<TextControl
								label={ __(
									'Author prefix (optional)',
									'mk-builder'
								) }
								value={ authorPrefix }
								onChange={ ( val ) =>
									setAttributes( { authorPrefix: val } )
								}
							/>
						) }
						<ToggleControl
							label={ __(
								'Show comment count',
								'mk-builder'
							) }
							checked={ showCommentsMeta }
							onChange={ ( val ) =>
								setAttributes( { showCommentsMeta: val } )
							}
						/>

						{ showCommentsMeta && (
							<TextControl
								label={ __(
									'Comment prefix (optional)',
									'mk-builder'
								) }
								value={ commentPrefix }
								onChange={ ( val ) =>
									setAttributes( { commentPrefix: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody title={ __( 'Featured image', 'mk-builder' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Image aspect ratio', 'mk-builder' ) }
							value={ imageAspectRatio }
							options={ [
								{ label: __( '16:9', 'mk-builder' ), value: '16/9' },
								{ label: __( '4:3', 'mk-builder' ), value: '4/3' },
								{ label: __( '1:1', 'mk-builder' ), value: '1/1' },
								{ label: __( 'Auto', 'mk-builder' ), value: 'auto' },
							] }
							onChange={ ( val ) => setAttributes( { imageAspectRatio: val } ) }
						/>
						<SelectControl
							label={ __( 'Object fit', 'mk-builder' ) }
							value={ imageObjectFit }
							options={ [
								{ label: __( 'Cover', 'mk-builder' ), value: 'cover' },
								{ label: __( 'Contain', 'mk-builder' ), value: 'contain' },
							] }
							onChange={ ( val ) => setAttributes( { imageObjectFit: val } ) }
						/>
						<RangeControl
							label={ __( 'Image height (px)', 'mk-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
							min={ 120 }
							max={ 600 }
						/>
						<RangeControl
							label={ __( 'Image border radius (px)', 'mk-builder' ) }
							value={ imageBorderRadius }
							onChange={ ( val ) => setAttributes( { imageBorderRadius: val } ) }
							min={ 0 }
							max={ 40 }
						/>
						<RangeControl
							label={ __( 'Overlay opacity (%)', 'mk-builder' ) }
							value={ imageOverlayOpacity }
							onChange={ ( val ) => setAttributes( { imageOverlayOpacity: val } ) }
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label={ __( 'Overlay hover opacity (%)', 'mk-builder' ) }
							value={ imageOverlayHoverOpacity }
							onChange={ ( val ) => setAttributes( { imageOverlayHoverOpacity: val } ) }
							min={ 0 }
							max={ 100 }
						/>
						<TextControl
							label={ __( 'Overlay gradient (optional CSS)', 'mk-builder' ) }
							value={ imageOverlayGradient }
							onChange={ ( val ) => setAttributes( { imageOverlayGradient: val } ) }
							help={ __( 'Example: linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.45))', 'mk-builder' ) }
						/>
						<TextControl
							label={ __( 'Overlay hover gradient (optional CSS)', 'mk-builder' ) }
							value={ imageOverlayHoverGradient }
							onChange={ ( val ) => setAttributes( { imageOverlayHoverGradient: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Card box', 'mk-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Card border radius (px)', 'mk-builder' ) }
							value={ cardBorderRadius }
							onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
							min={ 0 }
							max={ 40 }
						/>
						<RangeControl
							label={ __( 'Card border width (px)', 'mk-builder' ) }
							value={ cardBorderWidth }
							onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
							min={ 0 }
							max={ 8 }
						/>
						<RangeControl
							label={ __( 'Card hover translate Y (px)', 'mk-builder' ) }
							value={ cardHoverTranslateY }
							onChange={ ( val ) => setAttributes( { cardHoverTranslateY: val } ) }
							min={ -50 }
							max={ 10 }
						/>
						<TextControl
							label={ __( 'Card box shadow', 'mk-builder' ) }
							value={ cardBoxShadow }
							onChange={ ( val ) => setAttributes( { cardBoxShadow: val } ) }
						/>
						<TextControl
							label={ __( 'Card box shadow (hover)', 'mk-builder' ) }
							value={ cardBoxShadowHover }
							onChange={ ( val ) => setAttributes( { cardBoxShadowHover: val } ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container width (%)',
								'mk-builder'
							) }
							value={ containerWidthPct }
							onChange={ ( val ) =>
								setAttributes( { containerWidthPct: val } )
							}
							min={ 70 }
							max={ 100 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Typography', 'mk-builder' ) } initialOpen={ false }>
						<p>{ __( 'Section Title Size', 'mk-builder' ) }</p>
						<FontSizePicker
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: parseInt( val, 10 ) || 48 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ titleFontSize || 48 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Section Title Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
								{ label: '800', value: '800' },
							] }
							onChange={ ( val ) => setAttributes( { titleFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Tagline Size', 'mk-builder' ) }</p>
						<FontSizePicker
							value={ taglineFontSize }
							onChange={ ( val ) =>
								setAttributes( { taglineFontSize: parseInt( val, 10 ) || 16 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ taglineFontSize || 16 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Tagline Weight', 'mk-builder' ) }
							value={ taglineFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
							] }
							onChange={ ( val ) => setAttributes( { taglineFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Post Title Size', 'mk-builder' ) }</p>
						<FontSizePicker
							value={ postTitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { postTitleFontSize: parseInt( val, 10 ) || 22 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ postTitleFontSize || 22 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Post Title Weight', 'mk-builder' ) }
							value={ postTitleFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
								{ label: '800', value: '800' },
							] }
							onChange={ ( val ) => setAttributes( { postTitleFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Meta Size', 'mk-builder' ) }</p>
						<FontSizePicker
							value={ postMetaFontSize }
							onChange={ ( val ) =>
								setAttributes( { postMetaFontSize: parseInt( val, 10 ) || 15 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ postMetaFontSize || 15 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Meta Weight', 'mk-builder' ) }
							value={ postMetaFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
							] }
							onChange={ ( val ) => setAttributes( { postMetaFontWeight: val } ) }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Advanced colors', 'mk-builder' ) }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'mk-builder'
								),
							},
							{ value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Section title', 'mk-builder' ) },
							{ value: taglineColor, onChange: ( val ) => setAttributes( { taglineColor: val } ), label: __( 'Tagline text', 'mk-builder' ) },
							{ value: taglineBackgroundColor, onChange: ( val ) => setAttributes( { taglineBackgroundColor: val } ), label: __( 'Tagline background', 'mk-builder' ) },
							{ value: moreButtonTextColor, onChange: ( val ) => setAttributes( { moreButtonTextColor: val } ), label: __( 'More button text', 'mk-builder' ) },
							{ value: moreButtonBackgroundColor, onChange: ( val ) => setAttributes( { moreButtonBackgroundColor: val } ), label: __( 'More button background', 'mk-builder' ) },
							{ value: moreButtonHoverTextColor, onChange: ( val ) => setAttributes( { moreButtonHoverTextColor: val } ), label: __( 'More button text (hover)', 'mk-builder' ) },
							{ value: moreButtonHoverBackgroundColor, onChange: ( val ) => setAttributes( { moreButtonHoverBackgroundColor: val } ), label: __( 'More button background (hover)', 'mk-builder' ) },
							{ value: postTitleColor, onChange: ( val ) => setAttributes( { postTitleColor: val } ), label: __( 'Post title', 'mk-builder' ) },
							{ value: postTitleHoverColor, onChange: ( val ) => setAttributes( { postTitleHoverColor: val } ), label: __( 'Post title (hover)', 'mk-builder' ) },
							{ value: postMetaColor, onChange: ( val ) => setAttributes( { postMetaColor: val } ), label: __( 'Meta text', 'mk-builder' ) },
							{ value: postMetaIconColor, onChange: ( val ) => setAttributes( { postMetaIconColor: val } ), label: __( 'Meta icon', 'mk-builder' ) },
							{ value: dateBadgeBackgroundColor, onChange: ( val ) => setAttributes( { dateBadgeBackgroundColor: val } ), label: __( 'Date badge background', 'mk-builder' ) },
							{ value: dateBadgeTextColor, onChange: ( val ) => setAttributes( { dateBadgeTextColor: val } ), label: __( 'Date badge text', 'mk-builder' ) },
							{ value: readMoreTextColor, onChange: ( val ) => setAttributes( { readMoreTextColor: val } ), label: __( 'Read more text', 'mk-builder' ) },
							{ value: readMoreHoverTextColor, onChange: ( val ) => setAttributes( { readMoreHoverTextColor: val } ), label: __( 'Read more text (hover)', 'mk-builder' ) },
							{ value: readMoreIconColor, onChange: ( val ) => setAttributes( { readMoreIconColor: val } ), label: __( 'Read more icon', 'mk-builder' ) },
							{ value: readMoreIconBackgroundColor, onChange: ( val ) => setAttributes( { readMoreIconBackgroundColor: val } ), label: __( 'Read more icon background', 'mk-builder' ) },
							{ value: readMoreIconHoverColor, onChange: ( val ) => setAttributes( { readMoreIconHoverColor: val } ), label: __( 'Read more icon (hover)', 'mk-builder' ) },
							{ value: readMoreIconHoverBackgroundColor, onChange: ( val ) => setAttributes( { readMoreIconHoverBackgroundColor: val } ), label: __( 'Read more icon background (hover)', 'mk-builder' ) },
							{ value: cardBackgroundColor, onChange: ( val ) => setAttributes( { cardBackgroundColor: val } ), label: __( 'Card background', 'mk-builder' ) },
							{ value: cardBorderColor, onChange: ( val ) => setAttributes( { cardBorderColor: val } ), label: __( 'Card border', 'mk-builder' ) },
							{ value: imageOverlayColor, onChange: ( val ) => setAttributes( { imageOverlayColor: val } ), label: __( 'Image overlay', 'mk-builder' ) },
							{ value: imageOverlayHoverColor, onChange: ( val ) => setAttributes( { imageOverlayHoverColor: val } ), label: __( 'Image overlay (hover)', 'mk-builder' ) },
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
					<div className="mk-blog__container">
						<div className="mk-blog__header-row">
							<div className="mk-blog__header-left">
								<div className="mk-blog__tagline">
									{ ! tagIcon ? (
										<MediaPlaceholder
											icon="format-image"
											onSelect={ ( media ) =>
												setAttributes( {
													tagIcon: media.url,
													tagIconId: media.id,
													tagIconAlt: media.alt || tagIconAlt,
													tagIconMime: media.mime || '',
												} )
											}
											allowedTypes={ [ 'image', 'video' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Tagline icon',
													'mk-builder'
												),
											} }
										/>
									) : (
										<>
											{ isVideoAsset( tagIcon, tagIconMime ) ? (
												<video
													src={ tagIcon }
													className="mk-blog__tag-icon mk-blog__tag-icon--media"
													autoPlay
													loop
													muted
													playsInline
												/>
											) : (
												<img src={ tagIcon } alt="" className="mk-blog__tag-icon" />
											) }
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) =>
														setAttributes( {
															tagIcon: media.url,
															tagIconId: media.id,
															tagIconAlt: media.alt || tagIconAlt,
															tagIconMime: media.mime || '',
														} )
													}
													allowedTypes={ [ 'image', 'video' ] }
													value={ tagIconId }
													render={ ( { open } ) => (
														<Button isSecondary isSmall onClick={ open }>
															{ __( 'Replace icon media', 'mk-builder' ) }
														</Button>
													) }
												/>
											</MediaUploadCheck>
											<Button
												isDestructive
												isSmall
												onClick={ () => setAttributes( { tagIcon: '', tagIconId: null, tagIconMime: '' } ) }
											>
												{ __( 'Remove', 'mk-builder' ) }
											</Button>
										</>
									) }
									<RichText
										tagName="span"
										value={ tagline }
										onChange={ ( val ) =>
											setAttributes( { tagline: val } )
										}
										placeholder={ __( 'Tagline', 'mk-builder' ) }
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
									/>
								</div>
								<RichText
									tagName="h2"
									className="mk-blog__title"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section heading',
										'mk-builder'
									) }
									allowedFormats={ [
										'core/bold',
										'core/italic',
										'core/underline',
									] }
								/>
							</div>

							<div className="mk-blog__header-right">
								<a
									href={ moreButtonUrl || '#' }
									className="mk-blog__more-btn"
									tabIndex={ -1 }
									onClick={ ( e ) => e.preventDefault() }
								>
									<span className="mk-blog__more-btn-label">
										{ moreButtonText ||
											__( 'More News', 'mk-builder' ) }
									</span>
									{ showMoreButtonIcon && (
										<span
											className="mk-blog__more-btn-icon"
											aria-hidden="true"
										>
											{ moreButtonIcon }
										</span>
									) }
								</a>
							</div>
						</div>

						{ isResolving && (
							<div className="mk-blog__loading">
								<Spinner />
							</div>
						) }

						{ ! isResolving && safePosts.length === 0 && (
							<p className="mk-blog__empty">
								{ __(
									'No posts found for this query.',
									'mk-builder'
								) }
							</p>
						) }

						{ ! isResolving && safePosts.length > 0 && (
							<div className="mk-blog__grid">
								{ safePosts.map( ( post ) => {
									const titleText =
										post?.title?.rendered || __( '(Untitled)', 'mk-builder' );

									const authorName =
										post?._embedded?.author?.[ 0 ]?.name || '';

									const rawComment = post?.comment_count;
									const commentCountNum = Number( rawComment );
									const commentCountSafe = Number.isFinite( commentCountNum )
										? commentCountNum
										: null;

									const featured =
										post?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];
									const imgUrl = getFeaturedImageUrl(
										featured,
										imageSize || 'large'
									);

									const dateObj = post?.date ? new Date( post.date ) : null;
									const day = dateObj
										? String( dateObj.getDate() )
										: '';
									const month = dateObj
										? dateObj.toLocaleString( undefined, {
												month: 'short',
										  } )
										: '';

									const cardHref =
										typeof post?.link === 'string' && post.link
											? post.link
											: '#';

									return (
										<article
											className="mk-blog-card"
											key={ post.id }
										>
											<div className="mk-blog-card__img-box">
												{ imgUrl ? (
													<a
														href={ cardHref }
														className="mk-blog-card__img-link"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														<img src={ imgUrl } className="mk-blog-card__img" alt="" />
														<span className="mk-blog-card__img-overlay" aria-hidden="true" />
													</a>
												) : (
													<a
														href={ cardHref }
														className="mk-blog-card__img-link mk-blog-card__img-link--placeholder"
														aria-hidden="true"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														<span className="mk-blog-card__img-placeholder" />
													</a>
												) }

												<div
													className="mk-blog-card__date"
													aria-hidden="true"
												>
													<span className="mk-blog-card__date-day">
														{ day }
													</span>
													<span className="mk-blog-card__date-month">
														{ month }
													</span>
												</div>
											</div>

											<div className="mk-blog-card__content">
												{ ( showAuthorMeta || showCommentsMeta ) && (
													<div className="mk-blog-card__meta">
														{ showAuthorMeta && (
															<span>
																<span className="mk-blog-card__meta-icon" aria-hidden="true">●</span>
																{ authorPrefix || '' }
																{ authorName }
															</span>
														) }

														{ showCommentsMeta &&
															commentCountSafe !== null && (
																<span>
																	<span className="mk-blog-card__meta-icon" aria-hidden="true">●</span>
																	{ commentPrefix || '' }
																	{ commentCountSafe }{ ' ' }
																	{ commentCountSafe === 1
																		? __( 'Comment', 'mk-builder' )
																		: __( 'Comments', 'mk-builder' ) }
																</span>
															) }
													</div>
												) }

												<h3 className="mk-blog-card__title">
													<a
														href={ cardHref }
														onClick={ ( e ) => e.preventDefault() }
														dangerouslySetInnerHTML={ {
															__html: titleText,
														} }
													/>
												</h3>

												<div className="mk-blog-card__footer">
													<a
														href={ cardHref }
														className="mk-blog-card__read-btn"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														{ readMoreText ||
															__( 'Read More', 'mk-builder' ) }
														{ showReadMoreIcon && (
															<span
																className="icon-circle"
																aria-hidden="true"
															>
																{ readMoreIconEl }
															</span>
														) }
													</a>
												</div>
											</div>
										</article>
									);
								} ) }
							</div>
						) }
					</div>
			</section>
		</>
	);
}
