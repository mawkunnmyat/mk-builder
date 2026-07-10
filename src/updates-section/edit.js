/**
 * Mk Updates Section – Editor component
 * Hospital News & Updates – displays WordPress posts in a card grid.
 * Follows services-grid and awards-section patterns.
 */
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useState, useMemo } from '@wordpress/element';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	Modal,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		source,
		categoryId,
		postIds,
		numberOfItems,
		orderBy,
		order,
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleMarginBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		imageHeight,
		contentPadding,
		metaColor,
		metaFontSize,
		titleFontSize,
		excerptFontSize,
		readMoreLabel,
		readMoreColor,
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
		showBlogLink,
		blogLinkText,
		blogLinkUrl,
	} = attributes;

	const [ postPickerOpen, setPostPickerOpen ] = useState( false );
	const [ postSearch, setPostSearch ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ searching, setSearching ] = useState( false );

	const categories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
			orderby: 'name',
			order: 'asc',
		} );
	}, [] );

	const categoryOptions = useMemo( () => {
		const opts = [
			{ label: __( '— Select Category —', 'mk-builder' ), value: 0 },
		];

		if ( categories ) {
			categories.forEach( ( cat ) => {
				opts.push( { label: cat.name, value: cat.id } );
			} );
		}
		return opts;
	}, [ categories ] );

	const selectedPosts = useSelect(
		( select ) => {
			if ( ! postIds || postIds.length === 0 ) return [];
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				include: postIds,
				per_page: 99,
				orderby: 'include',
			} );
		},
		[ postIds ]
	);

	const doPostSearch = () => {
		if ( ! postSearch.trim() ) {
			setSearchResults( [] );
			return;
		}
		setSearching( true );
		apiFetch( {
			path: `wp/v2/posts?search=${ encodeURIComponent(
				postSearch
			) }&per_page=15&_fields=id,title,date`,
		} )
			.then( ( posts ) => setSearchResults( posts || [] ) )
			.catch( () => setSearchResults( [] ) )
			.finally( () => setSearching( false ) );
	};

	const addPost = ( id ) => {
		const ids = Array.isArray( postIds ) ? [ ...postIds ] : [];
		if ( ! ids.includes( id ) ) {
			ids.push( id );
			setAttributes( { postIds: ids, source: 'ids' } );
		}
		setPostSearch( '' );
		setSearchResults( [] );
	};

	const removePost = ( id ) => {
		const ids = ( Array.isArray( postIds ) ? [ ...postIds ] : [] ).filter(
			( i ) => i !== id
		);
		setAttributes( { postIds: ids } );
	};

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-updates-section-editor updates-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Posts Source', 'mk-builder' ) }
						initialOpen={ true }
					>
						<p
							style={ {
								margin: '0 0 12px',
								fontSize: '13px',
								color: '#666',
							} }
						>
							{ __(
								'Display posts from your WordPress site.',
								'mk-builder'
							) }
						</p>

						<SelectControl
							label={ __( 'Source', 'mk-builder' ) }
							value={ source }
							options={ [
								{
									label: __(
										'Latest Posts',
										'mk-builder'
									),
									value: 'recent',
								},
								{
									label: __( 'By Category', 'mk-builder' ),
									value: 'category',
								},
								{
									label: __(
										'Select Specific Posts',
										'mk-builder'
									),
									value: 'ids',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { source: val } )
							}
						/>

						{ ( source === 'recent' || source === 'category' ) && (
							<>
								{ source === 'category' && (
									<SelectControl
										label={ __(
											'Category',
											'mk-builder'
										) }
										value={ categoryId || 0 }
										options={ categoryOptions }
										onChange={ ( val ) =>
											setAttributes( {
												categoryId:
													parseInt( val, 10 ) || 0,
											} )
										}
									/>
								) }
								<RangeControl
									label={ __(
										'Number of Posts',
										'mk-builder'
									) }
									value={ numberOfItems }
									onChange={ ( val ) =>
										setAttributes( { numberOfItems: val } )
									}
									min={ 1 }
									max={ 12 }
									step={ 1 }
								/>

								<SelectControl
									label={ __( 'Order By', 'mk-builder' ) }
									value={ orderBy }
									options={ [
										{
											label: __(
												'Date',
												'mk-builder'
											),
											value: 'date',
										},
										{
											label: __(
												'Title',
												'mk-builder'
											),
											value: 'title',
										},
										{
											label: __(
												'Random',
												'mk-builder'
											),
											value: 'rand',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { orderBy: val } )
									}
								/>

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
							</>
						) }

						{ source === 'ids' && (
							<>
								<BaseControl
									label={ __(
										'Selected Posts',
										'mk-builder'
									) }
								>
									{ selectedPosts &&
									selectedPosts.length > 0 ? (
										<ul
											style={ {
												margin: '8px 0',
												paddingLeft: '20px',
												fontSize: '13px',
											} }
										>
											{ selectedPosts.map( ( p ) => (
												<li
													key={ p.id }
													style={ {
														marginBottom: '4px',
														display: 'flex',
														alignItems: 'center',
														gap: '8px',
													} }
												>
													<span style={ { flex: 1 } }>
														{ p.title?.rendered ||
															__(
																'(No title)',
																'mk-builder'
															) }
													</span>
													<Button
														isDestructive
														isSmall
														onClick={ () =>
															removePost( p.id )
														}
													>
														{ __(
															'Remove',
															'mk-builder'
														) }
													</Button>
												</li>
											) ) }
										</ul>
									) : (
										<p
											style={ {
												margin: '8px 0',
												color: '#666',
												fontSize: '13px',
											} }
										>
											{ __(
												'No posts selected.',
												'mk-builder'
											) }
										</p>
									) }
									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setPostPickerOpen( true )
										}
										style={ { marginTop: '8px' } }
									>
										{ __( 'Add Posts', 'mk-builder' ) }
									</Button>
								</BaseControl>
							</>
						) }
					</PanelBody>

					{ postPickerOpen && (
						<Modal
							title={ __( 'Select Posts', 'mk-builder' ) }
							onRequestClose={ () => {
								setPostPickerOpen( false );
								setPostSearch( '' );
								setSearchResults( [] );
							} }
							style={ { maxWidth: '400px' } }
						>
							<div style={ { marginBottom: '16px' } }>
								<TextControl
									label={ __(
										'Search posts',
										'mk-builder'
									) }
									value={ postSearch }
									onChange={ ( val ) => setPostSearch( val ) }
									placeholder={ __(
										'Type to search...',
										'mk-builder'
									) }
									onKeyDown={ ( e ) =>
										e.key === 'Enter' && doPostSearch()
									}
								/>

								<Button
									isSecondary
									onClick={ doPostSearch }
									isBusy={ searching }
									style={ { marginTop: '8px' } }
								>
									{ __( 'Search', 'mk-builder' ) }
								</Button>
							</div>
							{ searchResults.length > 0 && (
								<ul
									style={ {
										listStyle: 'none',
										padding: 0,
										margin: 0,
										maxHeight: '300px',
										overflowY: 'auto',
									} }
								>
									{ searchResults.map( ( p ) => (
										<li
											key={ p.id }
											style={ {
												padding: '10px 12px',
												borderBottom: '1px solid #eee',
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											} }
										>
											<span
												style={ { fontSize: '14px' } }
											>
												{ p.title?.rendered ||
													__(
														'(No title)',
														'mk-builder'
													) }
												{ p.date && (
													<span
														style={ {
															color: '#666',
															fontSize: '12px',
															marginLeft: '8px',
														} }
													>
														{ new Date(
															p.date
														).getFullYear() }
													</span>
												) }
											</span>
											<Button
												isPrimary
												isSmall
												onClick={ () =>
													addPost( p.id )
												}
												disabled={
													postIds &&
													postIds.includes( p.id )
												}
											>
												{ postIds &&
												postIds.includes( p.id )
													? __(
															'Added',
															'mk-builder'
													  )
													: __(
															'Add',
															'mk-builder'
													  ) }
											</Button>
										</li>
									) ) }
								</ul>
							) }
							{ postSearch &&
								searchResults.length === 0 &&
								! searching && (
									<p
										style={ {
											color: '#666',
											fontSize: '13px',
										} }
									>
										{ __(
											'No posts found.',
											'mk-builder'
										) }
									</p>
								) }
						</Modal>
					) }

					<PanelBody
						title={ __(
							'Section Title & Subtitle',
							'mk-builder'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<TextControl
									label={ __( 'Title', 'mk-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Title Alignment',
										'mk-builder'
									) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'mk-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'mk-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Title Margin Bottom (px)',
										'mk-builder'
									) }
									value={ sectionTitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 5 }
								/>
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __(
								'Show Section Subtitle',
								'mk-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<TextControl
									label={ __( 'Subtitle', 'mk-builder' ) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionSubtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionSubtitleColor: val,
												} ),
											label: __(
												'Subtitle',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Margin Bottom (px)',
										'mk-builder'
									) }
									value={ sectionSubtitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 100 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Blog Link', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show link to Blog page',
								'mk-builder'
							) }
							checked={ showBlogLink }
							onChange={ ( val ) =>
								setAttributes( { showBlogLink: val } )
							}
							help={ __(
								'Display a link below the grid that points to your blog page.',
								'mk-builder'
							) }
						/>

						{ showBlogLink && (
							<>
								<TextControl
									label={ __( 'Link text', 'mk-builder' ) }
									value={ blogLinkText }
									onChange={ ( val ) =>
										setAttributes( { blogLinkText: val } )
									}
									placeholder={ __(
										'View All on Blog',
										'mk-builder'
									) }
								/>

								<TextControl
									label={ __(
										'Blog page URL',
										'mk-builder'
									) }
									value={ blogLinkUrl }
									onChange={ ( val ) =>
										setAttributes( { blogLinkUrl: val } )
									}
									placeholder={ __(
										'e.g. /blog or full URL to blog page',
										'mk-builder'
									) }
									help={ __(
										'Leave empty to use the WordPress “Posts page” if set in Settings → Reading.',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'mk-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'mk-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'mk-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Image Height (px)', 'mk-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) =>
								setAttributes( { imageHeight: val } )
							}
							min={ 120 }
							max={ 400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Content Padding (px)',
								'mk-builder'
							) }
							value={ contentPadding }
							onChange={ ( val ) =>
								setAttributes( { contentPadding: val } )
							}
							min={ 10 }
							max={ 50 }
							step={ 5 }
						/>

						<TextControl
							label={ __( 'Read More Label', 'mk-builder' ) }
							value={ readMoreLabel }
							onChange={ ( val ) =>
								setAttributes( { readMoreLabel: val } )
							}
							placeholder="Read More →"
						/>

						<PanelColorSettings
							title={ __( 'Read More Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: readMoreColor,
									onChange: ( val ) =>
										setAttributes( { readMoreColor: val } ),
									label: __( 'Read More', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Meta Font Size (rem)',
								'mk-builder'
							) }
							value={ metaFontSize }
							onChange={ ( val ) =>
								setAttributes( { metaFontSize: val } )
							}
							min={ 0.7 }
							max={ 1.2 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Excerpt Font Size (rem)',
								'mk-builder'
							) }
							value={ excerptFontSize }
							onChange={ ( val ) =>
								setAttributes( { excerptFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.3 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container & Spacing', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'mk-builder'
							) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Hover & Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Hover Effect', 'mk-builder' ) }
							checked={ hoverEffect }
							onChange={ ( val ) =>
								setAttributes( { hoverEffect: val } )
							}
						/>

						{ hoverEffect && (
							<RangeControl
								label={ __(
									'Hover Translate Y (px)',
									'mk-builder'
								) }
								value={ hoverTranslateY }
								onChange={ ( val ) =>
									setAttributes( { hoverTranslateY: val } )
								}
								min={ -20 }
								max={ 0 }
								step={ 1 }
							/>
						) }
						<ToggleControl
							label={ __( 'Scroll Animation', 'mk-builder' ) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation Type',
										'mk-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade In Up',
												'mk-builder'
											),
											value: 'fadeInUp',
										},
										{
											label: __(
												'Fade In',
												'mk-builder'
											),
											value: 'fadeIn',
										},
										{
											label: __(
												'Slide In Left',
												'mk-builder'
											),
											value: 'slideInLeft',
										},
										{
											label: __(
												'Slide In Right',
												'mk-builder'
											),
											value: 'slideInRight',
										},
										{
											label: __(
												'Zoom In',
												'mk-builder'
											),
											value: 'zoomIn',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation Delay (ms)',
										'mk-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="jivaka-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
						position: 'relative',
						zIndex: 2,
					} }
				>
					<div
						className="editor-label"
						style={ {
							textAlign: 'center',
							padding: '10px',
							background: '#2271b1',
							color: '#fff',
							fontWeight: '600',
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: '20px',
							borderRadius: '4px',
						} }
					>
						{ __( 'Updates Section (Preview)', 'mk-builder' ) }
					</div>

					<ServerSideRender
						block="mk/updates-section"
						attributes={ attributes }
						EmptyResponsePlaceholder={ () => (
							<div
								style={ {
									padding: '40px',
									textAlign: 'center',
									background: '#f9f9f9',
									border: '2px dashed #e0e0e0',
									borderRadius: '8px',
									color: '#666',
									fontSize: '14px',
								} }
							>
								{ source === 'recent' && numberOfItems > 0
									? __(
											'Loading latest posts...',
											'mk-builder'
									  )
									: source === 'category' && ! categoryId
									? __(
											'Please select a category in the block settings.',
											'mk-builder'
									  )
									: source === 'ids' &&
									  ( ! postIds || postIds.length === 0 )
									? __(
											'Please add posts in the block settings.',
											'mk-builder'
									  )
									: __(
											'No posts found. Add some posts in WP Admin → Posts.',
											'mk-builder'
									  ) }
							</div>
						) }
					/>
				</div>
			</div>
		</>
	);
}
