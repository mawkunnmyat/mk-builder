import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useState, useMemo } from '@wordpress/element';
import {
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
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
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		columns,
		gap,
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
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
		imageHeight,
		iconColor,
		iconBgColor,
		iconSize,
		titleFontSize,
		titleFontWeight,
		descFontSize,
		contentPadding,
		showReadMoreButton,
		readMoreLabel,
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
			className: 'mk-csr-initiatives-section-editor',
			style: {
				backgroundColor: backgroundImage
					? 'transparent'
					: backgroundColor,
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, backgroundImage, paddingBottom, paddingTop ]
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
								'Display posts from your WordPress site. Set csr_icon_class meta on each post for the icon (e.g. fas fa-ambulance).',
								'mk-builder'
							) }
						</p>

						<SelectControl
							label={ __( 'Source', 'mk-builder' ) }
							value={ source }
							options={ [
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

						{ source === 'category' && (
							<>
								<SelectControl
									label={ __( 'Category', 'mk-builder' ) }
									value={ categoryId || 0 }
									options={ categoryOptions }
									onChange={ ( val ) =>
										setAttributes( {
											categoryId:
												parseInt( val, 10 ) || 0,
										} )
									}
								/>

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
									max={ 24 }
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
									label={ __(
										'Title Text',
										'mk-builder'
									) }
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
												'Title Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
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
										'Font Weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 300 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __( 'Alignment', 'mk-builder' ) }
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
									label={ __(
										'Subtitle Text',
										'mk-builder'
									) }
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
												'Subtitle Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
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
						title={ __(
							'Read More / View Detail',
							'mk-builder'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Read More / View Detail button',
								'mk-builder'
							) }
							checked={ showReadMoreButton }
							onChange={ ( val ) =>
								setAttributes( { showReadMoreButton: val } )
							}
							help={ __(
								'When on: each card shows a button linking to the post. When off: the whole card is clickable.',
								'mk-builder'
							) }
						/>

						{ showReadMoreButton && (
							<TextControl
								label={ __( 'Button label', 'mk-builder' ) }
								value={ readMoreLabel || '' }
								onChange={ ( val ) =>
									setAttributes( {
										readMoreLabel: val || 'View Detail',
									} )
								}
								placeholder="View Detail"
								help={ __(
									'e.g. View Detail, Read More',
									'mk-builder'
								) }
							/>
						) }
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
							min={ 15 }
							max={ 50 }
							step={ 5 }
						/>

						<PanelColorSettings
							title={ __( 'Icon Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon Background',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'mk-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
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
							max={ 1.8 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Description Font Size (rem)',
								'mk-builder'
							) }
							value={ descFontSize }
							onChange={ ( val ) =>
								setAttributes( { descFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.3 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />
						<BaseControl
							label={ __( 'Background Image', 'mk-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											backgroundImage: media.url,
											backgroundImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Background Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImage }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												backgroundImage: '',
												backgroundImageId: null,
											} )
										}
									>
										{ __(
											'Remove Image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Show Overlay',
										'mk-builder'
									) }
									checked={ backgroundOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundOverlay: val,
										} )
									}
								/>

								{ backgroundOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: backgroundOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															backgroundOverlayColor:
																val,
														} ),
													label: __(
														'Overlay Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Overlay Opacity',
												'mk-builder'
											) }
											value={ backgroundOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													backgroundOverlayOpacity:
														val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'mk-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 10 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'mk-builder' ) }
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
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Padding', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
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
								'Padding Bottom (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Hover & Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Enable Hover', 'mk-builder' ) }
							checked={ hoverEffect }
							onChange={ ( val ) =>
								setAttributes( { hoverEffect: val } )
							}
						/>

						{ hoverEffect && (
							<RangeControl
								label={ __(
									'Translate Y (px)',
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
						<Divider />
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
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
				{ backgroundImage && backgroundOverlay && (
					<div
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 1,
						} }
					/>
				) }

				<div
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
						position: 'relative',
						zIndex: 2,
					} }
				>
					<ServerSideRender
						block="mk/csr-initiatives-section"
						attributes={ attributes }
						LoadingPlaceholder={ () => (
							<div
								style={ {
									padding: '40px',
									textAlign: 'center',
									background: '#f8f9fa',
									borderRadius: '8px',
									color: '#666',
								} }
							>
								{ __( 'Loading posts...', 'mk-builder' ) }
							</div>
						) }
					/>
				</div>
			</div>
		</>
	);
}
