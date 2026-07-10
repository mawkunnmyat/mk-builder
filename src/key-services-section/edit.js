import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gapMobile,
		showBorder,
		borderPosition,
		borderColor,
		borderColorHover,
		borderWidth,
		borderWidthMobile,
		borderStyle,
		borderOpacity,
		showBorderDesktop,
		showBorderTablet,
		showBorderMobile,
		disableAllBorders,
		sectionBorderWidth,
		sectionBorderColor,
		sectionBorderStyle,
		sectionBorderRadius,
		sectionBoxShadow,
		sectionBoxShadowColor,
		sectionBoxShadowBlur,
		sectionBoxShadowSpread,
		sectionBoxShadowX,
		sectionBoxShadowY,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleFontSizeMobile,
		sectionSubtitleFontWeight,
		sectionSubtitleMarginBottom,
		animationOnScroll,
		animationDelay,
		animationType,
		hoverEffect,
		hoverScale,
		hoverTranslateY,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/key-service-item' ];
	const TEMPLATE = [
		[ 'mk/key-service-item', {} ],
		[ 'mk/key-service-item', {} ],
		[ 'mk/key-service-item', {} ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-key-services-section-editor',
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

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	// CSS custom properties for dynamic values
	const gridStyle = {
		'--grid-columns': columns,
		'--grid-columns-tablet': columnsTablet,
		'--grid-columns-mobile': columnsMobile,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
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
										'Title Font Size - Desktop (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Size - Mobile (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSizeMobile: val,
										} )
									}
									min={ 1.2 }
									max={ 3 }
									step={ 0.1 }
									help={ __(
										'Font size for mobile devices (<768px)',
										'mk-builder'
									) }
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
										'Subtitle Font Size - Desktop (rem)',
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
										'Subtitle Font Size - Mobile (rem)',
										'mk-builder'
									) }
									value={ sectionSubtitleFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSizeMobile: val,
										} )
									}
									min={ 0.7 }
									max={ 1.5 }
									step={ 0.05 }
									help={ __(
										'Font size for mobile devices (<768px)',
										'mk-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Weight',
										'mk-builder'
									) }
									value={ sectionSubtitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
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
						title={ __( 'Background Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Background Type', 'mk-builder' ) }
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

						{ ! backgroundImage && (
							<PanelColorSettings
								title={ __(
									'Background Color',
									'mk-builder'
								) }
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
						) }

						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Enable Overlay',
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
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
							help={ __(
								'Number of columns on desktop screens (≥992px)',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'mk-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
							help={ __(
								'Number of columns on tablet screens (768px - 991px)',
								'mk-builder'
							) }
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
							help={ __(
								'Number of columns on mobile screens (<768px)',
								'mk-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Gap Between Items - Desktop (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Gap Between Items - Mobile (px)',
								'mk-builder'
							) }
							value={ gapMobile }
							onChange={ ( val ) =>
								setAttributes( { gapMobile: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 1 }
							help={ __(
								'Gap between items on mobile devices',
								'mk-builder'
							) }
						/>

						<Divider />
					</PanelBody>

					<PanelBody
						title={ __( 'Border Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Item Borders Control',
								'mk-builder'
							) }
						>
							<ToggleControl
								label={ __(
									'Disable All Borders',
									'mk-builder'
								) }
								checked={ disableAllBorders }
								onChange={ ( val ) => {
									setAttributes( {
										disableAllBorders: val,
										showBorder: ! val,
										showBorderDesktop: ! val
											? showBorderDesktop
											: false,
										showBorderTablet: ! val
											? showBorderTablet
											: false,
										showBorderMobile: ! val
											? showBorderMobile
											: false,
									} );
								} }
								help={ __(
									'Completely disable all borders between items. When enabled, all border settings are ignored.',
									'mk-builder'
								) }
							/>
						</BaseControl>

						{ ! disableAllBorders && (
							<>
								<Divider />

								<ToggleControl
									label={ __(
										'Enable Borders Between Items',
										'mk-builder'
									) }
									checked={ showBorder }
									onChange={ ( val ) =>
										setAttributes( { showBorder: val } )
									}
									help={ __(
										'Show borders between service items',
										'mk-builder'
									) }
								/>
							</>
						) }

						{ ! disableAllBorders && showBorder && (
							<>
								<Divider />

								<BaseControl
									label={ __(
										'Border Visibility by Device',
										'mk-builder'
									) }
								>
									<ToggleControl
										label={ __(
											'Show on Desktop',
											'mk-builder'
										) }
										checked={ showBorderDesktop }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderDesktop: val,
											} )
										}
										help={ __(
											'Display borders on desktop screens (≥992px)',
											'mk-builder'
										) }
									/>

									<ToggleControl
										label={ __(
											'Show on Tablet',
											'mk-builder'
										) }
										checked={ showBorderTablet }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderTablet: val,
											} )
										}
										help={ __(
											'Display borders on tablet screens (768px - 991px)',
											'mk-builder'
										) }
									/>

									<ToggleControl
										label={ __(
											'Show on Mobile',
											'mk-builder'
										) }
										checked={ showBorderMobile }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderMobile: val,
											} )
										}
										help={ __(
											'Display borders on mobile screens (<768px)',
											'mk-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<SelectControl
									label={ __(
										'Border Position',
										'mk-builder'
									) }
									value={ borderPosition }
									options={ [
										{
											label: __(
												'Vertical (Between Columns)',
												'mk-builder'
											),
											value: 'vertical',
										},
										{
											label: __(
												'Horizontal (Between Rows)',
												'mk-builder'
											),
											value: 'horizontal',
										},
										{
											label: __(
												'Both (Grid Style)',
												'mk-builder'
											),
											value: 'both',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { borderPosition: val } )
									}
									help={ __(
										'Where to display borders between items',
										'mk-builder'
									) }
								/>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Border Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: borderColor,
											onChange: ( val ) =>
												setAttributes( {
													borderColor: val,
												} ),
											label: __(
												'Border Color',
												'mk-builder'
											),
										},
										{
											value: borderColorHover,
											onChange: ( val ) =>
												setAttributes( {
													borderColorHover: val,
												} ),
											label: __(
												'Border Hover Color (Optional)',
												'mk-builder'
											),
										},
									] }
								/>

								<Divider />

								<BaseControl
									label={ __(
										'Border Width',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Border Width - Desktop (px)',
											'mk-builder'
										) }
										value={ borderWidth }
										onChange={ ( val ) =>
											setAttributes( {
												borderWidth: val,
											} )
										}
										min={ 0 }
										max={ 10 }
										step={ 0.5 }
										help={ __(
											'Border thickness on desktop screens',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Border Width - Mobile (px)',
											'mk-builder'
										) }
										value={ borderWidthMobile }
										onChange={ ( val ) =>
											setAttributes( {
												borderWidthMobile: val,
											} )
										}
										min={ 0 }
										max={ 10 }
										step={ 0.5 }
										help={ __(
											'Border thickness on mobile devices',
											'mk-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<SelectControl
									label={ __(
										'Border Style',
										'mk-builder'
									) }
									value={ borderStyle }
									options={ [
										{
											label: __(
												'Solid',
												'mk-builder'
											),
											value: 'solid',
										},
										{
											label: __(
												'Dashed',
												'mk-builder'
											),
											value: 'dashed',
										},
										{
											label: __(
												'Dotted',
												'mk-builder'
											),
											value: 'dotted',
										},
										{
											label: __(
												'Double',
												'mk-builder'
											),
											value: 'double',
										},
										{
											label: __(
												'Groove',
												'mk-builder'
											),
											value: 'groove',
										},
										{
											label: __(
												'Ridge',
												'mk-builder'
											),
											value: 'ridge',
										},
										{
											label: __(
												'Inset',
												'mk-builder'
											),
											value: 'inset',
										},
										{
											label: __(
												'Outset',
												'mk-builder'
											),
											value: 'outset',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { borderStyle: val } )
									}
									help={ __(
										'Visual style of the border',
										'mk-builder'
									) }
								/>

								<Divider />

								<RangeControl
									label={ __(
										'Border Opacity',
										'mk-builder'
									) }
									value={ borderOpacity }
									onChange={ ( val ) =>
										setAttributes( { borderOpacity: val } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
									help={ __(
										'Transparency of the border (0 = transparent, 1 = opaque)',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Section Border & Shadow',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Section Border', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Border Width (px)',
									'mk-builder'
								) }
								value={ sectionBorderWidth }
								onChange={ ( val ) =>
									setAttributes( { sectionBorderWidth: val } )
								}
								min={ 0 }
								max={ 20 }
								step={ 1 }
								help={ __(
									'Border width around the entire section',
									'mk-builder'
								) }
							/>

							{ sectionBorderWidth > 0 && (
								<>
									<PanelColorSettings
										title={ __(
											'Border Color',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: sectionBorderColor,
												onChange: ( val ) =>
													setAttributes( {
														sectionBorderColor: val,
													} ),
												label: __(
													'Border Color',
													'mk-builder'
												),
											},
										] }
									/>

									<SelectControl
										label={ __(
											'Border Style',
											'mk-builder'
										) }
										value={ sectionBorderStyle }
										options={ [
											{
												label: __(
													'Solid',
													'mk-builder'
												),
												value: 'solid',
											},
											{
												label: __(
													'Dashed',
													'mk-builder'
												),
												value: 'dashed',
											},
											{
												label: __(
													'Dotted',
													'mk-builder'
												),
												value: 'dotted',
											},
											{
												label: __(
													'Double',
													'mk-builder'
												),
												value: 'double',
											},
											{
												label: __(
													'Groove',
													'mk-builder'
												),
												value: 'groove',
											},
											{
												label: __(
													'Ridge',
													'mk-builder'
												),
												value: 'ridge',
											},
											{
												label: __(
													'Inset',
													'mk-builder'
												),
												value: 'inset',
											},
											{
												label: __(
													'Outset',
													'mk-builder'
												),
												value: 'outset',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBorderStyle: val,
											} )
										}
									/>

									<RangeControl
										label={ __(
											'Border Radius (px)',
											'mk-builder'
										) }
										value={ sectionBorderRadius }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBorderRadius: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Rounded corners for the section',
											'mk-builder'
										) }
									/>
								</>
							) }
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Box Shadow', 'mk-builder' ) }
						>
							<ToggleControl
								label={ __(
									'Enable Box Shadow',
									'mk-builder'
								) }
								checked={ sectionBoxShadow }
								onChange={ ( val ) =>
									setAttributes( { sectionBoxShadow: val } )
								}
								help={ __(
									'Add shadow effect to the section',
									'mk-builder'
								) }
							/>

							{ sectionBoxShadow && (
								<>
									<PanelColorSettings
										title={ __(
											'Shadow Color',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: sectionBoxShadowColor,
												onChange: ( val ) =>
													setAttributes( {
														sectionBoxShadowColor:
															val,
													} ),
												label: __(
													'Shadow Color',
													'mk-builder'
												),
											},
										] }
									/>

									<RangeControl
										label={ __(
											'Horizontal Offset (px)',
											'mk-builder'
										) }
										value={ sectionBoxShadowX }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowX: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Horizontal shadow position',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Vertical Offset (px)',
											'mk-builder'
										) }
										value={ sectionBoxShadowY }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowY: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Vertical shadow position',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Blur Radius (px)',
											'mk-builder'
										) }
										value={ sectionBoxShadowBlur }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowBlur: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 1 }
										help={ __(
											'Shadow blur amount',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Spread Radius (px)',
											'mk-builder'
										) }
										value={ sectionBoxShadowSpread }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowSpread: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Shadow spread amount',
											'mk-builder'
										) }
									/>
								</>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'mk-builder' ) }
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
							help={ __(
								'Maximum width of the container',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Container Padding - Desktop (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
							help={ __(
								'Horizontal padding for the container on desktop',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Container Padding - Mobile (px)',
								'mk-builder'
							) }
							value={ containerPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingMobile: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
							help={ __(
								'Horizontal padding for the container on mobile',
								'mk-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Padding Top - Desktop (px)',
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
								'Padding Bottom - Desktop (px)',
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

						<Divider />

						<RangeControl
							label={ __(
								'Padding Top - Mobile (px)',
								'mk-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
							help={ __(
								'Top padding for mobile devices',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom - Mobile (px)',
								'mk-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
							help={ __(
								'Bottom padding for mobile devices',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Hover Effects', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Hover Effects',
								'mk-builder'
							) }
							checked={ hoverEffect }
							onChange={ ( val ) =>
								setAttributes( { hoverEffect: val } )
							}
							help={ __(
								'Enable hover animations for service items',
								'mk-builder'
							) }
						/>

						{ hoverEffect && (
							<>
								<RangeControl
									label={ __(
										'Translate Y (px)',
										'mk-builder'
									) }
									value={ hoverTranslateY }
									onChange={ ( val ) =>
										setAttributes( {
											hoverTranslateY: val,
										} )
									}
									min={ -20 }
									max={ 20 }
									step={ 1 }
									help={ __(
										'Vertical movement on hover (negative = up)',
										'mk-builder'
									) }
								/>

								<RangeControl
									label={ __( 'Scale', 'mk-builder' ) }
									value={ hoverScale }
									onChange={ ( val ) =>
										setAttributes( { hoverScale: val } )
									}
									min={ 0.8 }
									max={ 1.2 }
									step={ 0.01 }
									help={ __(
										'Scale transformation on hover',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Animation Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
							help={ __(
								'Animate items when they scroll into view',
								'mk-builder'
							) }
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
												'Fade In',
												'mk-builder'
											),
											value: 'fadeIn',
										},
										{
											label: __(
												'Fade In Up',
												'mk-builder'
											),
											value: 'fadeInUp',
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
									help={ __(
										'Delay between each item animation',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ backgroundImage && backgroundOverlay && (
					<div
						className="background-overlay"
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

				<div style={ containerStyle }>
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
						{ __(
							'Key Services Section (Editor View)',
							'mk-builder'
						) }
					</div>

					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="section-header"
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: `${ sectionSubtitleMarginBottom }px`,
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section Title...',
										'mk-builder'
									) }
									className="section-title"
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? `${ sectionTitleMarginBottom }px`
											: '0',
										marginTop: 0,
									} }
								/>
							) }
							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Section Subtitle...',
										'mk-builder'
									) }
									className="section-subtitle"
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										fontWeight: sectionSubtitleFontWeight,
										color: sectionSubtitleColor,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }

					<div
						className="mk-key-services-grid-container"
						style={ gridStyle }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
						data-gap={ gap }
						data-gap-mobile={ gapMobile }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
