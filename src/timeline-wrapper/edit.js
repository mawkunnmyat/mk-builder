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
	TextControl,
	Button,
	BaseControl,
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
		sectionSubtitleFontWeight,
		sectionSubtitleMarginBottom,
		containerMaxWidth,
		containerPadding,
		timelineLineColor,
		timelineLineWidth,
		timelineProgressColor,
		timelineDotSize,
		timelineDotBorderWidth,
		timelineDotColor,
		timelineItemGap,
		timelineContentBorderRadius,
		timelineContentBoxShadow,
		timelineContentBoxShadowColor,
		timelineContentBoxShadowBlur,
		timelineContentBoxShadowSpread,
		timelineContentBoxShadowOffsetX,
		timelineContentBoxShadowOffsetY,
		hoverEffect,
		hoverTranslateY,
		hoverScale,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/timeline-item' ];
	const TEMPLATE = [
		[ 'mk/timeline-item', {} ],
		[ 'mk/timeline-item', {} ],
		[ 'mk/timeline-item', {} ],
		[ 'mk/timeline-item', {} ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-timeline-wrapper-editor',
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
										'Title Font Size (rem)',
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
							help={ __(
								'Horizontal padding for the container',
								'mk-builder'
							) }
						/>

						<Divider />

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
						title={ __(
							'Timeline Line Settings',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Line Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: timelineLineColor,
									onChange: ( val ) =>
										setAttributes( {
											timelineLineColor: val,
										} ),
									label: __( 'Line Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Line Width (px)', 'mk-builder' ) }
							value={ timelineLineWidth }
							onChange={ ( val ) =>
								setAttributes( { timelineLineWidth: val } )
							}
							min={ 2 }
							max={ 10 }
							step={ 1 }
						/>

						<Divider />

						<PanelColorSettings
							title={ __( 'Progress Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: timelineProgressColor,
									onChange: ( val ) =>
										setAttributes( {
											timelineProgressColor: val,
										} ),
									label: __(
										'Progress Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Timeline Dot Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Dot Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: timelineDotColor,
									onChange: ( val ) =>
										setAttributes( {
											timelineDotColor: val,
										} ),
									label: __( 'Dot Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Dot Size (px)', 'mk-builder' ) }
							value={ timelineDotSize }
							onChange={ ( val ) =>
								setAttributes( { timelineDotSize: val } )
							}
							min={ 12 }
							max={ 40 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Dot Border Width (px)',
								'mk-builder'
							) }
							value={ timelineDotBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { timelineDotBorderWidth: val } )
							}
							min={ 2 }
							max={ 10 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Timeline Item Settings',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Item Gap (px)', 'mk-builder' ) }
							value={ timelineItemGap }
							onChange={ ( val ) =>
								setAttributes( { timelineItemGap: val } )
							}
							min={ 40 }
							max={ 150 }
							step={ 10 }
							help={ __(
								'Vertical spacing between timeline items',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Content Border Radius (px)',
								'mk-builder'
							) }
							value={ timelineContentBorderRadius }
							onChange={ ( val ) =>
								setAttributes( {
									timelineContentBorderRadius: val,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content Box Shadow', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Enable Box Shadow', 'mk-builder' ) }
							checked={ timelineContentBoxShadow }
							onChange={ ( val ) =>
								setAttributes( {
									timelineContentBoxShadow: val,
								} )
							}
						/>

						{ timelineContentBoxShadow && (
							<>
								<PanelColorSettings
									title={ __(
										'Shadow Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: timelineContentBoxShadowColor,
											onChange: ( val ) =>
												setAttributes( {
													timelineContentBoxShadowColor:
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
									label={ __( 'Blur (px)', 'mk-builder' ) }
									value={ timelineContentBoxShadowBlur }
									onChange={ ( val ) =>
										setAttributes( {
											timelineContentBoxShadowBlur: val,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Spread (px)',
										'mk-builder'
									) }
									value={ timelineContentBoxShadowSpread }
									onChange={ ( val ) =>
										setAttributes( {
											timelineContentBoxShadowSpread: val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset X (px)',
										'mk-builder'
									) }
									value={ timelineContentBoxShadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( {
											timelineContentBoxShadowOffsetX:
												val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset Y (px)',
										'mk-builder'
									) }
									value={ timelineContentBoxShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											timelineContentBoxShadowOffsetY:
												val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>
							</>
						) }
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
								'Enable hover animations for timeline items',
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
							'Timeline Wrapper (Editor View)',
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
						className="timeline-wrapper mk-timeline-wrapper"
						style={ {
							position: 'relative',
							padding: '40px 0',
						} }
					>
						<div
							className="timeline-line"
							style={ {
								position: 'absolute',
								left: '50%',
								top: 0,
								bottom: 0,
								width: `${ timelineLineWidth }px`,
								background: timelineLineColor,
								transform: 'translateX(-50%)',
								zIndex: 1,
								pointerEvents: 'none',
							} }
						/>

						<div
							className="timeline-progress"
							style={ {
								position: 'absolute',
								left: '50%',
								top: 0,
								width: `${ timelineLineWidth }px`,
								background: timelineProgressColor,
								transform: 'translateX(-50%)',
								height: '50%',
								zIndex: 2,
								pointerEvents: 'none',
								transition: 'height 0.3s ease',
							} }
						/>

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
