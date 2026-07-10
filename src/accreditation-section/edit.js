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
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gridMarginTop,
		showIntroTitle,
		introTitle,
		introTitleColor,
		introTitleFontSize,
		introTitleFontWeight,
		introTitleAlignment,
		showIntroContent,
		introContent,
		introContentColor,
		introContentFontSize,
		introContentAlignment,
		introMaxWidth,
		introMarginBottom,
		containerMaxWidth,
		containerPadding,
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/accreditation-cert-card' ];
	const TEMPLATE = [
		[
			'mk/accreditation-cert-card',
			{
				iconClass: 'fas fa-certificate',
				certTitle: 'ISO 9001:2015',
				certBadge: 'Certified Since 2018',
				certDescription:
					'Recognized for our Quality Management System ensuring consistent and excellent healthcare services.',
			},
		],

		[
			'mk/accreditation-cert-card',
			{
				iconClass: 'fas fa-globe',
				certTitle: 'JCI Accreditation',
				certBadge: 'Gold Seal of Approval',
				certDescription:
					'The highest international standard for healthcare safety and quality protocols.',
			},
		],

		[
			'mk/accreditation-cert-card',
			{
				iconClass: 'fas fa-shield-alt',
				certTitle: 'Safety Excellence',
				certBadge: 'National Safety Council',
				certDescription:
					'Awarded for maintaining zero-accident records and advanced fire safety protocols.',
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-accreditation-section-editor',
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

	const gridStyle = {
		'--grid-columns': columns,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
		marginTop: `${ gridMarginTop }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Intro Text', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Intro Title', 'mk-builder' ) }
							checked={ showIntroTitle }
							onChange={ ( val ) =>
								setAttributes( { showIntroTitle: val } )
							}
						/>

						{ showIntroTitle && (
							<>
								<TextControl
									label={ __(
										'Title Text',
										'mk-builder'
									) }
									value={ introTitle }
									onChange={ ( val ) =>
										setAttributes( { introTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: introTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													introTitleColor: val,
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
									value={ introTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											introTitleFontSize: val,
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
									value={ introTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											introTitleFontWeight: val,
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
									value={ introTitleAlignment }
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
											introTitleAlignment: val,
										} )
									}
								/>
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __(
								'Show Intro Paragraph',
								'mk-builder'
							) }
							checked={ showIntroContent }
							onChange={ ( val ) =>
								setAttributes( { showIntroContent: val } )
							}
						/>

						{ showIntroContent && (
							<>
								<TextControl
									label={ __(
										'Intro Content',
										'mk-builder'
									) }
									value={ introContent }
									onChange={ ( val ) =>
										setAttributes( { introContent: val } )
									}
									help={ __(
										'Main introductory paragraph for the section',
										'mk-builder'
									) }
								/>

								<PanelColorSettings
									title={ __(
										'Content Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: introContentColor,
											onChange: ( val ) =>
												setAttributes( {
													introContentColor: val,
												} ),
											label: __(
												'Content Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Content Font Size (rem)',
										'mk-builder'
									) }
									value={ introContentFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											introContentFontSize: val,
										} )
									}
									min={ 0.9 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<SelectControl
									label={ __(
										'Content Alignment',
										'mk-builder'
									) }
									value={ introContentAlignment }
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
											introContentAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Intro Max Width (px)',
										'mk-builder'
									) }
									value={ introMaxWidth }
									onChange={ ( val ) =>
										setAttributes( { introMaxWidth: val } )
									}
									min={ 400 }
									max={ 1200 }
									step={ 20 }
									help={ __(
										'Maximum width of intro text container',
										'mk-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Intro Margin Bottom (px)',
										'mk-builder'
									) }
									value={ introMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											introMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 120 }
									step={ 5 }
								/>
							</>
						) }
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
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ false }
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
								'Number of columns on desktop screens',
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

						<Divider />
						<RangeControl
							label={ __(
								'Gap Between Cards (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 10 }
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Grid Margin Top (px)',
								'mk-builder'
							) }
							value={ gridMarginTop }
							onChange={ ( val ) =>
								setAttributes( { gridMarginTop: val } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>
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

						<Divider />
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
								'Card lift and border highlight on hover',
								'mk-builder'
							) }
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
								help={ __(
									'Vertical movement on hover (negative = up)',
									'mk-builder'
								) }
							/>
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
									help={ __(
										'Delay between each card animation',
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
					{ ( showIntroTitle || showIntroContent ) && (
						<div
							className="intro-text"
							style={ {
								maxWidth: `${ introMaxWidth }px`,
								margin: `0 auto ${ introMarginBottom }px`,
								textAlign: introTitleAlignment,
							} }
						>
							{ showIntroTitle && (
								<RichText
									tagName="h2"
									value={ introTitle }
									onChange={ ( val ) =>
										setAttributes( { introTitle: val } )
									}
									placeholder={ __(
										'Intro title...',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ introTitleFontSize }rem`,
										fontWeight: introTitleFontWeight,
										color: introTitleColor,
										marginBottom: showIntroContent
											? '20px'
											: '0',
									} }
								/>
							) }
							{ showIntroContent && (
								<RichText
									tagName="p"
									value={ introContent }
									onChange={ ( val ) =>
										setAttributes( { introContent: val } )
									}
									placeholder={ __(
										'Intro content...',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ introContentFontSize }rem`,
										color: introContentColor,
										textAlign: introContentAlignment,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }

					<div
						className="mk-accreditation-grid-container"
						style={ gridStyle }
						data-columns={ columns }
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
