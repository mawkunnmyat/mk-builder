import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		year,
		yearColor,
		yearFontSize,
		yearFontWeight,
		heading,
		headingColor,
		headingFontSize,
		headingFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		showImage,
		image,
		imageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		imageBorderRadius,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		contentBackgroundColor,
		contentPadding,
		contentBorderRadius,
		contentBoxShadow,
		contentBoxShadowColor,
		contentBoxShadowBlur,
		contentBoxShadowSpread,
		contentBoxShadowOffsetX,
		contentBoxShadowOffsetY,
		contentBorderWidth,
		contentBorderColor,
		contentBorderStyle,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonStyle,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonFontSize,
		buttonFontWeight,
		buttonTextTransform,
		buttonIcon,
		buttonIconPosition,
		buttonBorderWidth,
		buttonBorderColor,
		buttonBorderStyle,
		buttonHoverBgColor,
		buttonHoverTextColor,
		buttonHoverBorderColor,
		buttonBoxShadow,
		buttonBoxShadowColor,
		buttonBoxShadowBlur,
		buttonBoxShadowSpread,
		buttonBoxShadowOffsetX,
		buttonBoxShadowOffsetY,
		buttonHoverBoxShadow,
		buttonHoverBoxShadowColor,
		buttonHoverBoxShadowBlur,
		buttonHoverBoxShadowSpread,
		buttonHoverBoxShadowOffsetX,
		buttonHoverBoxShadowOffsetY,
		buttonWidth,
		buttonWidthCustom,
		buttonAlignment,
		buttonMarginTop,
		buttonMarginBottom,
		buttonMarginLeft,
		buttonMarginRight,
		buttonLetterSpacing,
		buttonLineHeight,
		buttonTransitionDuration,
		buttonHoverScale,
		buttonHoverTranslateY,
		buttonFontSizeMobile,
		buttonPaddingVerticalMobile,
		buttonPaddingHorizontalMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-timeline-item-editor',
			style: {
				borderRadius: '8px',
				overflow: 'visible',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				marginBottom: '20px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'relative',
				width: '100%',
			},
		} ),
		[]
	);

	const buttonWidthOptions = [
		{ label: __( 'Auto', 'mk-builder' ), value: 'auto' },
		{ label: __( 'Full Width', 'mk-builder' ), value: 'full' },
		{ label: __( 'Custom', 'mk-builder' ), value: 'custom' },
	];

	const buttonAlignmentOptions = [
		{ label: __( 'Left', 'mk-builder' ), value: 'left' },
		{ label: __( 'Center', 'mk-builder' ), value: 'center' },
		{ label: __( 'Right', 'mk-builder' ), value: 'right' },
	];

	const borderStyleOptions = [
		{ label: __( 'Solid', 'mk-builder' ), value: 'solid' },
		{ label: __( 'Dashed', 'mk-builder' ), value: 'dashed' },
		{ label: __( 'Dotted', 'mk-builder' ), value: 'dotted' },
		{ label: __( 'Double', 'mk-builder' ), value: 'double' },
	];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Year Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Year Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: yearColor,
									onChange: ( val ) =>
										setAttributes( { yearColor: val } ),
									label: __( 'Year Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ yearFontSize }
							onChange={ ( val ) =>
								setAttributes( { yearFontSize: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ yearFontWeight }
							onChange={ ( val ) =>
								setAttributes( { yearFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Heading Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Heading Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: headingColor,
									onChange: ( val ) =>
										setAttributes( { headingColor: val } ),
									label: __(
										'Heading Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ headingFontSize }
							onChange={ ( val ) =>
								setAttributes( { headingFontSize: val } )
							}
							min={ 0.8 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ headingFontWeight }
							onChange={ ( val ) =>
								setAttributes( { headingFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.7 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'mk-builder' ) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1 }
							max={ 2.5 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Image Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Image', 'mk-builder' ) }
							checked={ showImage }
							onChange={ ( val ) =>
								setAttributes( { showImage: val } )
							}
						/>

						{ showImage && (
							<>
								{ ! image ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												image: media.url,
												imageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Timeline Image',
												'mk-builder'
											),
										} }
									/>
								) : (
									<div>
										<img
											src={ image }
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
													image: '',
													imageId: null,
												} )
											}
										>
											{ __(
												'Change Image',
												'mk-builder'
											) }
										</Button>
									</div>
								) }

								<Divider />

								<RangeControl
									label={ __(
										'Image Height (px)',
										'mk-builder'
									) }
									value={ imageHeight }
									onChange={ ( val ) =>
										setAttributes( { imageHeight: val } )
									}
									min={ 100 }
									max={ 400 }
									step={ 10 }
								/>

								<SelectControl
									label={ __(
										'Object Fit',
										'mk-builder'
									) }
									value={ imageObjectFit }
									options={ [
										{
											label: __(
												'Cover',
												'mk-builder'
											),
											value: 'cover',
										},
										{
											label: __(
												'Contain',
												'mk-builder'
											),
											value: 'contain',
										},
										{
											label: __(
												'Fill',
												'mk-builder'
											),
											value: 'fill',
										},
										{
											label: __(
												'None',
												'mk-builder'
											),
											value: 'none',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { imageObjectFit: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Object Position',
										'mk-builder'
									) }
									value={ imageObjectPosition }
									options={ [
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __( 'Top', 'mk-builder' ),
											value: 'top',
										},
										{
											label: __(
												'Bottom',
												'mk-builder'
											),
											value: 'bottom',
										},
										{
											label: __(
												'Left',
												'mk-builder'
											),
											value: 'left',
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
											imageObjectPosition: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'mk-builder'
									) }
									value={ imageBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											imageBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 30 }
									step={ 1 }
								/>

								<Divider />

								<ToggleControl
									label={ __(
										'Show Image Overlay',
										'mk-builder'
									) }
									checked={ showImageOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											showImageOverlay: val,
										} )
									}
								/>

								{ showImageOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: imageOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															imageOverlayColor:
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
											value={ imageOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													imageOverlayOpacity: val,
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
						title={ __( 'Content Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: contentBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											contentBackgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
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
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Border Radius (px)',
								'mk-builder'
							) }
							value={ contentBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { contentBorderRadius: val } )
							}
							min={ 0 }
							max={ 30 }
							step={ 1 }
						/>

						<Divider />

						<RangeControl
							label={ __( 'Border Width (px)', 'mk-builder' ) }
							value={ contentBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { contentBorderWidth: val } )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
						/>

						{ contentBorderWidth > 0 && (
							<>
								<PanelColorSettings
									title={ __(
										'Border Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: contentBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													contentBorderColor: val,
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
									value={ contentBorderStyle }
									options={ borderStyleOptions }
									onChange={ ( val ) =>
										setAttributes( {
											contentBorderStyle: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Content Box Shadow', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Enable Box Shadow', 'mk-builder' ) }
							checked={ contentBoxShadow }
							onChange={ ( val ) =>
								setAttributes( { contentBoxShadow: val } )
							}
						/>

						{ contentBoxShadow && (
							<>
								<PanelColorSettings
									title={ __(
										'Shadow Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: contentBoxShadowColor,
											onChange: ( val ) =>
												setAttributes( {
													contentBoxShadowColor: val,
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
									value={ contentBoxShadowBlur }
									onChange={ ( val ) =>
										setAttributes( {
											contentBoxShadowBlur: val,
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
									value={ contentBoxShadowSpread }
									onChange={ ( val ) =>
										setAttributes( {
											contentBoxShadowSpread: val,
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
									value={ contentBoxShadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( {
											contentBoxShadowOffsetX: val,
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
									value={ contentBoxShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											contentBoxShadowOffsetY: val,
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
						title={ __( 'Button Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Button', 'mk-builder' ) }
							checked={ showButton }
							onChange={ ( val ) =>
								setAttributes( { showButton: val } )
							}
						/>

						{ showButton && (
							<>
								<TextControl
									label={ __(
										'Button Text',
										'mk-builder'
									) }
									value={ buttonText }
									onChange={ ( val ) =>
										setAttributes( { buttonText: val } )
									}
								/>

								<TextControl
									label={ __(
										'Button URL',
										'mk-builder'
									) }
									value={ buttonUrl }
									onChange={ ( val ) =>
										setAttributes( { buttonUrl: val } )
									}
									type="url"
								/>

								<ToggleControl
									label={ __(
										'Open in New Tab',
										'mk-builder'
									) }
									checked={ buttonTarget }
									onChange={ ( val ) =>
										setAttributes( { buttonTarget: val } )
									}
								/>

								<TextControl
									label={ __(
										'Button Rel',
										'mk-builder'
									) }
									value={ buttonRel }
									onChange={ ( val ) =>
										setAttributes( { buttonRel: val } )
									}
									help={ __(
										'For SEO (e.g., noopener noreferrer)',
										'mk-builder'
									) }
								/>

								<Divider />

								<SelectControl
									label={ __(
										'Button Style',
										'mk-builder'
									) }
									value={ buttonStyle }
									options={ [
										{
											label: __(
												'Primary',
												'mk-builder'
											),
											value: 'primary',
										},
										{
											label: __(
												'Secondary',
												'mk-builder'
											),
											value: 'secondary',
										},
										{
											label: __(
												'Outline',
												'mk-builder'
											),
											value: 'outline',
										},
										{
											label: __(
												'Text',
												'mk-builder'
											),
											value: 'text',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { buttonStyle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Button Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: buttonBgColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonBgColor: val,
												} ),
											label: __(
												'Background Color',
												'mk-builder'
											),
										},
										{
											value: buttonTextColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonTextColor: val,
												} ),
											label: __(
												'Text Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'mk-builder'
									) }
									value={ buttonBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding Vertical (px)',
										'mk-builder'
									) }
									value={ buttonPaddingVertical }
									onChange={ ( val ) =>
										setAttributes( {
											buttonPaddingVertical: val,
										} )
									}
									min={ 5 }
									max={ 30 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding Horizontal (px)',
										'mk-builder'
									) }
									value={ buttonPaddingHorizontal }
									onChange={ ( val ) =>
										setAttributes( {
											buttonPaddingHorizontal: val,
										} )
									}
									min={ 10 }
									max={ 60 }
									step={ 5 }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ buttonFontSize }
									onChange={ ( val ) =>
										setAttributes( { buttonFontSize: val } )
									}
									min={ 0.7 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
									value={ buttonFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											buttonFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Text Transform',
										'mk-builder'
									) }
									value={ buttonTextTransform }
									options={ [
										{
											label: __(
												'None',
												'mk-builder'
											),
											value: 'none',
										},
										{
											label: __(
												'Uppercase',
												'mk-builder'
											),
											value: 'uppercase',
										},
										{
											label: __(
												'Lowercase',
												'mk-builder'
											),
											value: 'lowercase',
										},
										{
											label: __(
												'Capitalize',
												'mk-builder'
											),
											value: 'capitalize',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											buttonTextTransform: val,
										} )
									}
								/>

								<Divider />

								<TextControl
									label={ __(
										'Button Icon (Font Awesome class)',
										'mk-builder'
									) }
									value={ buttonIcon }
									onChange={ ( val ) =>
										setAttributes( { buttonIcon: val } )
									}
									help={ __(
										'e.g., fa-arrow-right',
										'mk-builder'
									) }
								/>

								<SelectControl
									label={ __(
										'Icon Position',
										'mk-builder'
									) }
									value={ buttonIconPosition }
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
												'Right',
												'mk-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											buttonIconPosition: val,
										} )
									}
								/>

								<Divider />

								<BaseControl
									label={ __(
										'Button Layout',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Button Width',
											'mk-builder'
										) }
										value={ buttonWidth }
										options={ buttonWidthOptions }
										onChange={ ( val ) =>
											setAttributes( {
												buttonWidth: val,
											} )
										}
									/>

									{ buttonWidth === 'custom' && (
										<RangeControl
											label={ __(
												'Custom Width (px)',
												'mk-builder'
											) }
											value={ buttonWidthCustom }
											onChange={ ( val ) =>
												setAttributes( {
													buttonWidthCustom: val,
												} )
											}
											min={ 100 }
											max={ 500 }
											step={ 10 }
											help={ __(
												'Custom button width in pixels',
												'mk-builder'
											) }
										/>
									) }

									<SelectControl
										label={ __(
											'Button Alignment',
											'mk-builder'
										) }
										value={ buttonAlignment }
										options={ buttonAlignmentOptions }
										onChange={ ( val ) =>
											setAttributes( {
												buttonAlignment: val,
											} )
										}
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Button Border',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Border Width (px)',
											'mk-builder'
										) }
										value={ buttonBorderWidth }
										onChange={ ( val ) =>
											setAttributes( {
												buttonBorderWidth: val,
											} )
										}
										min={ 0 }
										max={ 10 }
										step={ 1 }
									/>

									{ buttonBorderWidth > 0 && (
										<>
											<SelectControl
												label={ __(
													'Border Style',
													'mk-builder'
												) }
												value={ buttonBorderStyle }
												options={ borderStyleOptions }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBorderStyle: val,
													} )
												}
											/>

											<PanelColorSettings
												title={ __(
													'Border Color',
													'mk-builder'
												) }
												colorSettings={ [
													{
														value: buttonBorderColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonBorderColor:
																	val,
															} ),
														label: __(
															'Border Color',
															'mk-builder'
														),
													},
												] }
											/>
										</>
									) }
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Button Spacing',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Margin Top (px)',
											'mk-builder'
										) }
										value={ buttonMarginTop }
										onChange={ ( val ) =>
											setAttributes( {
												buttonMarginTop: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
									/>

									<RangeControl
										label={ __(
											'Margin Bottom (px)',
											'mk-builder'
										) }
										value={ buttonMarginBottom }
										onChange={ ( val ) =>
											setAttributes( {
												buttonMarginBottom: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
									/>

									<RangeControl
										label={ __(
											'Margin Left (px)',
											'mk-builder'
										) }
										value={ buttonMarginLeft }
										onChange={ ( val ) =>
											setAttributes( {
												buttonMarginLeft: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
									/>

									<RangeControl
										label={ __(
											'Margin Right (px)',
											'mk-builder'
										) }
										value={ buttonMarginRight }
										onChange={ ( val ) =>
											setAttributes( {
												buttonMarginRight: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Button Typography',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Letter Spacing (px)',
											'mk-builder'
										) }
										value={ buttonLetterSpacing }
										onChange={ ( val ) =>
											setAttributes( {
												buttonLetterSpacing: val,
											} )
										}
										min={ 0 }
										max={ 3 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Line Height',
											'mk-builder'
										) }
										value={ buttonLineHeight }
										onChange={ ( val ) =>
											setAttributes( {
												buttonLineHeight: val,
											} )
										}
										min={ 1 }
										max={ 3 }
										step={ 0.1 }
									/>
								</BaseControl>

								<Divider />

								<PanelBody
									title={ __(
										'Button Shadow',
										'mk-builder'
									) }
									initialOpen={ false }
								>
									<ToggleControl
										label={ __(
											'Enable Box Shadow',
											'mk-builder'
										) }
										checked={ buttonBoxShadow }
										onChange={ ( val ) =>
											setAttributes( {
												buttonBoxShadow: val,
											} )
										}
									/>

									{ buttonBoxShadow && (
										<>
											<PanelColorSettings
												title={ __(
													'Shadow Color',
													'mk-builder'
												) }
												colorSettings={ [
													{
														value: buttonBoxShadowColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonBoxShadowColor:
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
													'Blur (px)',
													'mk-builder'
												) }
												value={ buttonBoxShadowBlur }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBoxShadowBlur:
															val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Spread (px)',
													'mk-builder'
												) }
												value={ buttonBoxShadowSpread }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBoxShadowSpread:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Offset X (px)',
													'mk-builder'
												) }
												value={ buttonBoxShadowOffsetX }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBoxShadowOffsetX:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Offset Y (px)',
													'mk-builder'
												) }
												value={ buttonBoxShadowOffsetY }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBoxShadowOffsetY:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>
										</>
									) }
								</PanelBody>

								<Divider />

								<PanelBody
									title={ __(
										'Button Hover Effects',
										'mk-builder'
									) }
									initialOpen={ false }
								>
									<PanelColorSettings
										title={ __(
											'Hover Colors',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: buttonHoverBgColor,
												onChange: ( val ) =>
													setAttributes( {
														buttonHoverBgColor: val,
													} ),
												label: __(
													'Hover Background Color',
													'mk-builder'
												),
											},
											{
												value: buttonHoverTextColor,
												onChange: ( val ) =>
													setAttributes( {
														buttonHoverTextColor:
															val,
													} ),
												label: __(
													'Hover Text Color',
													'mk-builder'
												),
											},
											{
												value: buttonHoverBorderColor,
												onChange: ( val ) =>
													setAttributes( {
														buttonHoverBorderColor:
															val,
													} ),
												label: __(
													'Hover Border Color',
													'mk-builder'
												),
											},
										] }
									/>

									<Divider />

									<RangeControl
										label={ __(
											'Hover Scale',
											'mk-builder'
										) }
										value={ buttonHoverScale }
										onChange={ ( val ) =>
											setAttributes( {
												buttonHoverScale: val,
											} )
										}
										min={ 0.9 }
										max={ 1.2 }
										step={ 0.01 }
										help={ __(
											'Scale transformation on hover',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Hover Translate Y (px)',
											'mk-builder'
										) }
										value={ buttonHoverTranslateY }
										onChange={ ( val ) =>
											setAttributes( {
												buttonHoverTranslateY: val,
											} )
										}
										min={ -10 }
										max={ 10 }
										step={ 1 }
										help={ __(
											'Vertical movement on hover (negative = up)',
											'mk-builder'
										) }
									/>

									<Divider />

									<ToggleControl
										label={ __(
											'Enable Hover Shadow',
											'mk-builder'
										) }
										checked={ buttonHoverBoxShadow }
										onChange={ ( val ) =>
											setAttributes( {
												buttonHoverBoxShadow: val,
											} )
										}
									/>

									{ buttonHoverBoxShadow && (
										<>
											<PanelColorSettings
												title={ __(
													'Hover Shadow Color',
													'mk-builder'
												) }
												colorSettings={ [
													{
														value: buttonHoverBoxShadowColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonHoverBoxShadowColor:
																	val,
															} ),
														label: __(
															'Hover Shadow Color',
															'mk-builder'
														),
													},
												] }
											/>

											<RangeControl
												label={ __(
													'Hover Shadow Blur (px)',
													'mk-builder'
												) }
												value={
													buttonHoverBoxShadowBlur
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverBoxShadowBlur:
															val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Hover Shadow Spread (px)',
													'mk-builder'
												) }
												value={
													buttonHoverBoxShadowSpread
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverBoxShadowSpread:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Hover Shadow Offset X (px)',
													'mk-builder'
												) }
												value={
													buttonHoverBoxShadowOffsetX
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverBoxShadowOffsetX:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Hover Shadow Offset Y (px)',
													'mk-builder'
												) }
												value={
													buttonHoverBoxShadowOffsetY
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverBoxShadowOffsetY:
															val,
													} )
												}
												min={ -20 }
												max={ 20 }
												step={ 1 }
											/>
										</>
									) }

									<Divider />

									<RangeControl
										label={ __(
											'Transition Duration (s)',
											'mk-builder'
										) }
										value={ buttonTransitionDuration }
										onChange={ ( val ) =>
											setAttributes( {
												buttonTransitionDuration: val,
											} )
										}
										min={ 0.1 }
										max={ 1 }
										step={ 0.1 }
										help={ __(
											'Animation speed for hover effects',
											'mk-builder'
										) }
									/>
								</PanelBody>

								<Divider />

								<PanelBody
									title={ __(
										'Button Responsive Settings',
										'mk-builder'
									) }
									initialOpen={ false }
								>
									<BaseControl
										label={ __(
											'Mobile Settings',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Font Size Mobile (rem)',
												'mk-builder'
											) }
											value={
												buttonFontSizeMobile ||
												buttonFontSize
											}
											onChange={ ( val ) =>
												setAttributes( {
													buttonFontSizeMobile: val,
												} )
											}
											min={ 0.6 }
											max={ 2 }
											step={ 0.05 }
											help={ __(
												'Font size on mobile devices. Set to 0 to use desktop size.',
												'mk-builder'
											) }
										/>

										<RangeControl
											label={ __(
												'Padding Vertical Mobile (px)',
												'mk-builder'
											) }
											value={
												buttonPaddingVerticalMobile ||
												buttonPaddingVertical
											}
											onChange={ ( val ) =>
												setAttributes( {
													buttonPaddingVerticalMobile:
														val,
												} )
											}
											min={ 0 }
											max={ 30 }
											step={ 1 }
											help={ __(
												'Vertical padding on mobile. Set to 0 to use desktop value.',
												'mk-builder'
											) }
										/>

										<RangeControl
											label={ __(
												'Padding Horizontal Mobile (px)',
												'mk-builder'
											) }
											value={
												buttonPaddingHorizontalMobile ||
												buttonPaddingHorizontal
											}
											onChange={ ( val ) =>
												setAttributes( {
													buttonPaddingHorizontalMobile:
														val,
												} )
											}
											min={ 0 }
											max={ 60 }
											step={ 1 }
											help={ __(
												'Horizontal padding on mobile. Set to 0 to use desktop value.',
												'mk-builder'
											) }
										/>
									</BaseControl>
								</PanelBody>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="timeline-dot"
					style={ {
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '20px',
						height: '20px',
						background: '#fff',
						border: '4px solid #f48b2a',
						borderRadius: '50%',
						zIndex: 4,
						boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.8)',
						pointerEvents: 'none',
					} }
				/>

				{ showImage && image ? (
					<div
						className="timeline-image-wrapper"
						style={ {
							position: 'relative',
							width: '45%',
							flex: '0 0 45%',
							marginBottom: 0,
						} }
					>
						<img
							src={ image }
							alt=""
							style={ {
								width: '100%',
								height: `${ imageHeight }px`,
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
								borderRadius: `${ imageBorderRadius }px`,
							} }
						/>

						{ showImageOverlay && (
							<div
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: imageOverlayColor,
									opacity: imageOverlayOpacity,
									borderRadius: `${ imageBorderRadius }px`,
									pointerEvents: 'none',
								} }
							/>
						) }
					</div>
				) : null }

				<div
					className="timeline-content"
					style={ {
						width: '45%',
						flex: '0 0 45%',
						padding: `${ contentPadding }px`,
						background: contentBackgroundColor || '#fff',
						borderRadius: `${ contentBorderRadius }px`,
						borderWidth: `${ contentBorderWidth }px`,
						borderColor: contentBorderColor,
						borderStyle: contentBorderStyle,
						boxShadow: contentBoxShadow
							? `${ contentBoxShadowOffsetX }px ${ contentBoxShadowOffsetY }px ${ contentBoxShadowBlur }px ${ contentBoxShadowSpread }px ${ contentBoxShadowColor }`
							: '0 5px 15px rgba(0, 0, 0, 0.05)',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
					} }
				>
					<RichText
						tagName="h3"
						value={ year }
						onChange={ ( val ) => setAttributes( { year: val } ) }
						placeholder={ __( 'Year...', 'mk-builder' ) }
						className="timeline-year"
						style={ {
							fontSize: `${ yearFontSize }rem`,
							fontWeight: yearFontWeight,
							color: yearColor || '#f48b2a',
							marginTop: 0,
							marginBottom: '10px',
							lineHeight: 1.2,
						} }
					/>

					<RichText
						tagName="h4"
						value={ heading }
						onChange={ ( val ) =>
							setAttributes( { heading: val } )
						}
						placeholder={ __( 'Heading...', 'mk-builder' ) }
						className="timeline-heading"
						style={ {
							fontSize: `${ headingFontSize }rem`,
							fontWeight: headingFontWeight,
							color: headingColor || '#212121',
							marginTop: 0,
							marginBottom: '10px',
							lineHeight: 1.3,
						} }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __( 'Description...', 'mk-builder' ) }
						className="timeline-description"
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							lineHeight: descriptionLineHeight,
							color: descriptionColor || '#666',
							marginBottom: showButton ? '20px' : '0',
							marginTop: 0,
						} }
					/>

					{ showButton && (
						<div
							className="timeline-button-wrapper"
							style={ {
								marginTop: 'auto',
								width:
									buttonWidth === 'full'
										? '100%'
										: buttonWidth === 'custom'
										? `${ buttonWidthCustom }px`
										: 'auto',
								textAlign: buttonAlignment,
								marginTop: `${ buttonMarginTop }px`,
								marginBottom: `${ buttonMarginBottom }px`,
								marginLeft: `${ buttonMarginLeft }px`,
								marginRight: `${ buttonMarginRight }px`,
								'--button-font-size-mobile':
									buttonFontSizeMobile > 0
										? `${ buttonFontSizeMobile }rem`
										: `${ buttonFontSize }rem`,
								'--button-padding-vertical-mobile':
									buttonPaddingVerticalMobile > 0
										? `${ buttonPaddingVerticalMobile }px`
										: `${ buttonPaddingVertical }px`,
								'--button-padding-horizontal-mobile':
									buttonPaddingHorizontalMobile > 0
										? `${ buttonPaddingHorizontalMobile }px`
										: `${ buttonPaddingHorizontal }px`,
							} }
						>
							<a
								href={ buttonUrl }
								target={ buttonTarget ? '_blank' : '_self' }
								rel={ buttonRel }
								className="timeline-button"
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									gap: '8px',
									backgroundColor: buttonBgColor,
									color: buttonTextColor,
									padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
									borderRadius: `${ buttonBorderRadius }px`,
									fontSize: `${ buttonFontSize }rem`,
									fontWeight: buttonFontWeight,
									textTransform: buttonTextTransform,
									letterSpacing: `${ buttonLetterSpacing }px`,
									lineHeight: buttonLineHeight,
									textDecoration: 'none',
									cursor: 'pointer',
									borderWidth: `${ buttonBorderWidth }px`,
									borderStyle: buttonBorderStyle,
									borderColor: buttonBorderColor,
									boxShadow: buttonBoxShadow
										? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
										: 'none',
									transition: `all ${ buttonTransitionDuration }s ease`,
									width:
										buttonWidth === 'full'
											? '100%'
											: buttonWidth === 'custom'
											? `${ buttonWidthCustom }px`
											: 'auto',
									justifyContent:
										buttonAlignment === 'center'
											? 'center'
											: buttonAlignment === 'right'
											? 'flex-end'
											: 'flex-start',
									'--hover-bg-color':
										buttonHoverBgColor || buttonBgColor,
									'--hover-text-color':
										buttonHoverTextColor || buttonTextColor,
									'--hover-border-color':
										buttonHoverBorderColor ||
										buttonBorderColor,
									'--hover-scale': buttonHoverScale || 1,
									'--hover-translate-y': `${
										buttonHoverTranslateY || 0
									}px`,

									'--hover-shadow':
										buttonHoverBoxShadow &&
										( buttonHoverBoxShadowColor ||
											buttonBoxShadowColor )
											? `${
													buttonHoverBoxShadowOffsetX ||
													0
											  }px ${
													buttonHoverBoxShadowOffsetY ||
													0
											  }px ${
													buttonHoverBoxShadowBlur ||
													0
											  }px ${
													buttonHoverBoxShadowSpread ||
													0
											  }px ${
													buttonHoverBoxShadowColor ||
													buttonBoxShadowColor
											  }`
											: 'none',
								} }
								onMouseEnter={ ( e ) => {
									if ( buttonHoverBgColor )
										e.target.style.backgroundColor =
											buttonHoverBgColor;
									if ( buttonHoverTextColor )
										e.target.style.color =
											buttonHoverTextColor;
									if (
										buttonHoverBorderColor &&
										buttonBorderWidth > 0
									)
										e.target.style.borderColor =
											buttonHoverBorderColor;
									if ( buttonHoverBoxShadow ) {
										e.target.style.boxShadow = `${ buttonHoverBoxShadowOffsetX }px ${ buttonHoverBoxShadowOffsetY }px ${ buttonHoverBoxShadowBlur }px ${ buttonHoverBoxShadowSpread }px ${
											buttonHoverBoxShadowColor ||
											buttonBoxShadowColor
										}`;
									}
									e.target.style.transform = `translateY(${ buttonHoverTranslateY }px) scale(${ buttonHoverScale })`;
								} }
								onMouseLeave={ ( e ) => {
									e.target.style.backgroundColor =
										buttonBgColor;
									e.target.style.color = buttonTextColor;
									if ( buttonBorderWidth > 0 )
										e.target.style.borderColor =
											buttonBorderColor;
									e.target.style.boxShadow = buttonBoxShadow
										? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
										: 'none';
									e.target.style.transform =
										'translateY(0) scale(1)';
								} }
								onClick={ ( e ) => e.preventDefault() }
							>
								{ buttonIcon &&
									buttonIconPosition === 'left' && (
										<i
											className={ `fa ${ buttonIcon }` }
											aria-hidden="true"
										/>
									) }
								{ buttonText }
								{ buttonIcon &&
									buttonIconPosition === 'right' && (
										<i
											className={ `fa ${ buttonIcon }` }
											aria-hidden="true"
										/>
									) }
							</a>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
