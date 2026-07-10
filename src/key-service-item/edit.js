import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	URLInput,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	BaseControl,
	Button,
	ButtonGroup,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		displayType,
		icon,
		iconColor,
		iconColorHover,
		iconSize,
		iconSizeMobile,
		iconMarginBottom,
		iconMarginBottomMobile,
		image,
		imageId,
		imageSize,
		imageWidth,
		imageWidthMobile,
		imageHeight,
		imageHeightMobile,
		imageObjectFit,
		imageObjectPosition,
		imageBorderRadius,
		imageMarginBottom,
		imageMarginBottomMobile,
		title,
		titleColor,
		titleColorHover,
		titleFontSize,
		titleFontSizeMobile,
		titleFontWeight,
		titleMarginBottom,
		titleMarginBottomMobile,
		showTitleUnderline,
		titleUnderlineColor,
		titleUnderlineWidth,
		titleUnderlineHeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionFontSizeMobile,
		descriptionLineHeight,
		itemPadding,
		itemPaddingMobile,
		itemAlignment,
		itemBackgroundColor,
		itemBackgroundColorHover,
		itemBorderRadius,
		itemBorderWidth,
		itemBorderWidthTop,
		itemBorderWidthRight,
		itemBorderWidthBottom,
		itemBorderWidthLeft,
		itemBorderWidthMobile,
		itemBorderColor,
		itemBorderColorHover,
		itemBorderStyle,
		itemBorderOpacity,
		enableItemBorder,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
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
	} = attributes;

	const textTransformOptions = [
		{ label: __( 'None', 'mk-builder' ), value: 'none' },
		{ label: __( 'Uppercase', 'mk-builder' ), value: 'uppercase' },
		{ label: __( 'Lowercase', 'mk-builder' ), value: 'lowercase' },
		{ label: __( 'Capitalize', 'mk-builder' ), value: 'capitalize' },
	];

	const borderStyleOptions = [
		{ label: __( 'Solid', 'mk-builder' ), value: 'solid' },
		{ label: __( 'Dashed', 'mk-builder' ), value: 'dashed' },
		{ label: __( 'Dotted', 'mk-builder' ), value: 'dotted' },
		{ label: __( 'Double', 'mk-builder' ), value: 'double' },
	];

	const alignmentOptions = [
		{ label: __( 'Left', 'mk-builder' ), value: 'left' },
		{ label: __( 'Center', 'mk-builder' ), value: 'center' },
		{ label: __( 'Right', 'mk-builder' ), value: 'right' },
	];

	const iconPositionOptions = [
		{ label: __( 'Left', 'mk-builder' ), value: 'left' },
		{ label: __( 'Right', 'mk-builder' ), value: 'right' },
	];

	const relOptions = [
		{ label: __( 'None', 'mk-builder' ), value: '' },
		{ label: __( 'nofollow', 'mk-builder' ), value: 'nofollow' },
		{ label: __( 'noopener', 'mk-builder' ), value: 'noopener' },
		{ label: __( 'noreferrer', 'mk-builder' ), value: 'noreferrer' },
		{
			label: __( 'noopener noreferrer', 'mk-builder' ),
			value: 'noopener noreferrer',
		},
		{
			label: __( 'nofollow noopener noreferrer', 'mk-builder' ),
			value: 'nofollow noopener noreferrer',
		},
	];

	const objectFitOptions = [
		{ label: __( 'Cover', 'mk-builder' ), value: 'cover' },
		{ label: __( 'Contain', 'mk-builder' ), value: 'contain' },
		{ label: __( 'Fill', 'mk-builder' ), value: 'fill' },
		{ label: __( 'None', 'mk-builder' ), value: 'none' },
		{ label: __( 'Scale Down', 'mk-builder' ), value: 'scale-down' },
	];

	const objectPositionOptions = [
		{ label: __( 'Center', 'mk-builder' ), value: 'center' },
		{ label: __( 'Top', 'mk-builder' ), value: 'top' },
		{ label: __( 'Bottom', 'mk-builder' ), value: 'bottom' },
		{ label: __( 'Left', 'mk-builder' ), value: 'left' },
		{ label: __( 'Right', 'mk-builder' ), value: 'right' },
		{ label: __( 'Top Left', 'mk-builder' ), value: 'top left' },
		{ label: __( 'Top Right', 'mk-builder' ), value: 'top right' },
		{ label: __( 'Bottom Left', 'mk-builder' ), value: 'bottom left' },
		{ label: __( 'Bottom Right', 'mk-builder' ), value: 'bottom right' },
	];

	const displayTypeOptions = [
		{ label: __( 'Icon', 'mk-builder' ), value: 'icon' },
		{ label: __( 'Image', 'mk-builder' ), value: 'image' },
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-key-service-item-editor key-service-item',
			style: {
				flex: 1,
				padding: `${ itemPadding }px`,
				textAlign: itemAlignment,
				backgroundColor: itemBackgroundColor || 'transparent',
				borderRadius: `${ itemBorderRadius }px`,
				// Borders handled via CSS custom properties to avoid WordPress core interference
				// Only show visual preview in editor when enabled
				...( enableItemBorder && itemBorderWidth > 0
					? {
							borderTopWidth: `${
								itemBorderWidthTop || itemBorderWidth
							}px`,

							borderRightWidth: `${
								itemBorderWidthRight || itemBorderWidth
							}px`,

							borderBottomWidth: `${
								itemBorderWidthBottom || itemBorderWidth
							}px`,

							borderLeftWidth: `${
								itemBorderWidthLeft || itemBorderWidth
							}px`,

							borderColor: itemBorderColor,
							borderStyle: itemBorderStyle,
							opacity: itemBorderOpacity,
					  }
					: {
							border: 'none',
					  } ),
				display: 'flex',
				flexDirection: 'column',
				alignItems:
					itemAlignment === 'center'
						? 'center'
						: itemAlignment === 'right'
						? 'flex-end'
						: 'flex-start',
			},
		} ),
		[
			enableItemBorder,
			itemAlignment,
			itemBackgroundColor,
			itemBorderColor,
			itemBorderOpacity,
			itemBorderRadius,
			itemBorderStyle,
			itemBorderWidth,
			itemBorderWidthBottom,
			itemBorderWidthLeft,
			itemBorderWidthRight,
			itemBorderWidthTop,
			itemPadding,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Display Type', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Display Type', 'mk-builder' ) }
							value={ displayType }
							options={ displayTypeOptions }
							onChange={ ( val ) =>
								setAttributes( { displayType: val } )
							}
							help={ __(
								'Choose between icon or image',
								'mk-builder'
							) }
						/>
					</PanelBody>

					{ displayType === 'icon' && (
						<PanelBody
							title={ __( 'Icon Settings', 'mk-builder' ) }
							initialOpen={ true }
						>
							<TextControl
								label={ __( 'Icon Class', 'mk-builder' ) }
								value={ icon }
								onChange={ ( val ) =>
									setAttributes( { icon: val } )
								}
								help={ __(
									'Font Awesome icon class. Formats: "fas fa-heart-pulse" (FA 6), "fa fa-heart" (FA 4/5), "fab fa-facebook" (brands)',
									'mk-builder'
								) }
							/>

							<PanelColorSettings
								title={ __( 'Icon Colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value: iconColor,
										onChange: ( val ) =>
											setAttributes( { iconColor: val } ),
										label: __(
											'Icon Color',
											'mk-builder'
										),
									},
									{
										value: iconColorHover,
										onChange: ( val ) =>
											setAttributes( {
												iconColorHover: val,
											} ),
										label: __(
											'Icon Hover Color',
											'mk-builder'
										),
									},
								] }
							/>

							<RangeControl
								label={ __(
									'Icon Size - Desktop (rem)',
									'mk-builder'
								) }
								value={ iconSize }
								onChange={ ( val ) =>
									setAttributes( { iconSize: val } )
								}
								min={ 1 }
								max={ 8 }
								step={ 0.1 }
							/>

							<RangeControl
								label={ __(
									'Icon Size - Mobile (rem)',
									'mk-builder'
								) }
								value={ iconSizeMobile }
								onChange={ ( val ) =>
									setAttributes( { iconSizeMobile: val } )
								}
								min={ 1 }
								max={ 6 }
								step={ 0.1 }
								help={ __(
									'Icon size for mobile devices (<768px)',
									'mk-builder'
								) }
							/>

							<RangeControl
								label={ __(
									'Icon Margin Bottom - Desktop (px)',
									'mk-builder'
								) }
								value={ iconMarginBottom }
								onChange={ ( val ) =>
									setAttributes( { iconMarginBottom: val } )
								}
								min={ 0 }
								max={ 50 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Icon Margin Bottom - Mobile (px)',
									'mk-builder'
								) }
								value={ iconMarginBottomMobile }
								onChange={ ( val ) =>
									setAttributes( {
										iconMarginBottomMobile: val,
									} )
								}
								min={ 0 }
								max={ 40 }
								step={ 5 }
								help={ __(
									'Space below icon on mobile devices',
									'mk-builder'
								) }
							/>
						</PanelBody>
					) }

					{ displayType === 'image' && (
						<PanelBody
							title={ __( 'Image Settings', 'mk-builder' ) }
							initialOpen={ true }
						>
							<BaseControl
								label={ __( 'Image', 'mk-builder' ) }
							>
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
												'Service Image',
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
												maxWidth: '200px',
												marginBottom: '10px',
												display: 'block',
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
												'Remove Image',
												'mk-builder'
											) }
										</Button>
									</div>
								) }
							</BaseControl>

							<Divider />

							<RangeControl
								label={ __(
									'Image Width - Desktop (px)',
									'mk-builder'
								) }
								value={ imageWidth }
								onChange={ ( val ) =>
									setAttributes( { imageWidth: val } )
								}
								min={ 40 }
								max={ 200 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Width - Mobile (px)',
									'mk-builder'
								) }
								value={ imageWidthMobile }
								onChange={ ( val ) =>
									setAttributes( { imageWidthMobile: val } )
								}
								min={ 30 }
								max={ 150 }
								step={ 5 }
								help={ __(
									'Image width for mobile devices',
									'mk-builder'
								) }
							/>

							<RangeControl
								label={ __(
									'Image Height - Desktop (px)',
									'mk-builder'
								) }
								value={ imageHeight }
								onChange={ ( val ) =>
									setAttributes( { imageHeight: val } )
								}
								min={ 40 }
								max={ 200 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Height - Mobile (px)',
									'mk-builder'
								) }
								value={ imageHeightMobile }
								onChange={ ( val ) =>
									setAttributes( { imageHeightMobile: val } )
								}
								min={ 30 }
								max={ 150 }
								step={ 5 }
								help={ __(
									'Image height for mobile devices',
									'mk-builder'
								) }
							/>

							<SelectControl
								label={ __( 'Object Fit', 'mk-builder' ) }
								value={ imageObjectFit }
								options={ objectFitOptions }
								onChange={ ( val ) =>
									setAttributes( { imageObjectFit: val } )
								}
								help={ __(
									'How the image should fit within its container',
									'mk-builder'
								) }
							/>

							<SelectControl
								label={ __(
									'Object Position',
									'mk-builder'
								) }
								value={ imageObjectPosition }
								options={ objectPositionOptions }
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
									setAttributes( { imageBorderRadius: val } )
								}
								min={ 0 }
								max={ 50 }
								step={ 1 }
							/>

							<RangeControl
								label={ __(
									'Image Margin Bottom - Desktop (px)',
									'mk-builder'
								) }
								value={ imageMarginBottom }
								onChange={ ( val ) =>
									setAttributes( { imageMarginBottom: val } )
								}
								min={ 0 }
								max={ 50 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Margin Bottom - Mobile (px)',
									'mk-builder'
								) }
								value={ imageMarginBottomMobile }
								onChange={ ( val ) =>
									setAttributes( {
										imageMarginBottomMobile: val,
									} )
								}
								min={ 0 }
								max={ 40 }
								step={ 5 }
								help={ __(
									'Space below image on mobile devices',
									'mk-builder'
								) }
							/>
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Title Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'mk-builder' ),
								},
								{
									value: titleColorHover,
									onChange: ( val ) =>
										setAttributes( {
											titleColorHover: val,
										} ),
									label: __(
										'Title Hover Color',
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
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Title Font Size - Mobile (rem)',
								'mk-builder'
							) }
							value={ titleFontSizeMobile }
							onChange={ ( val ) =>
								setAttributes( { titleFontSizeMobile: val } )
							}
							min={ 0.9 }
							max={ 2.5 }
							step={ 0.1 }
							help={ __(
								'Title font size for mobile devices (<768px)',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Title Margin Bottom - Desktop (px)',
								'mk-builder'
							) }
							value={ titleMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { titleMarginBottom: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Title Margin Bottom - Mobile (px)',
								'mk-builder'
							) }
							value={ titleMarginBottomMobile }
							onChange={ ( val ) =>
								setAttributes( {
									titleMarginBottomMobile: val,
								} )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
							help={ __(
								'Space below title on mobile devices',
								'mk-builder'
							) }
						/>

						<Divider />

						<ToggleControl
							label={ __(
								'Show Title Underline',
								'mk-builder'
							) }
							checked={ showTitleUnderline }
							onChange={ ( val ) =>
								setAttributes( { showTitleUnderline: val } )
							}
						/>

						{ showTitleUnderline && (
							<>
								<PanelColorSettings
									title={ __(
										'Underline Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: titleUnderlineColor,
											onChange: ( val ) =>
												setAttributes( {
													titleUnderlineColor: val,
												} ),
											label: __(
												'Underline Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Underline Width (px)',
										'mk-builder'
									) }
									value={ titleUnderlineWidth }
									onChange={ ( val ) =>
										setAttributes( {
											titleUnderlineWidth: val,
										} )
									}
									min={ 10 }
									max={ 100 }
									step={ 5 }
								/>

								<RangeControl
									label={ __(
										'Underline Height (px)',
										'mk-builder'
									) }
									value={ titleUnderlineHeight }
									onChange={ ( val ) =>
										setAttributes( {
											titleUnderlineHeight: val,
										} )
									}
									min={ 1 }
									max={ 5 }
									step={ 1 }
								/>
							</>
						) }
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
							label={ __(
								'Description Font Size - Desktop (rem)',
								'mk-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.7 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __(
								'Description Font Size - Mobile (rem)',
								'mk-builder'
							) }
							value={ descriptionFontSizeMobile }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionFontSizeMobile: val,
								} )
							}
							min={ 0.7 }
							max={ 1.3 }
							step={ 0.05 }
							help={ __(
								'Description font size for mobile devices (<768px)',
								'mk-builder'
							) }
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
						title={ __( 'Item Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Content Alignment', 'mk-builder' ) }
							value={ itemAlignment }
							options={ alignmentOptions }
							onChange={ ( val ) =>
								setAttributes( { itemAlignment: val } )
							}
						/>

						<Divider />

						<PanelColorSettings
							title={ __( 'Background Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: itemBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											itemBackgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
								{
									value: itemBackgroundColorHover,
									onChange: ( val ) =>
										setAttributes( {
											itemBackgroundColorHover: val,
										} ),
									label: __(
										'Background Hover Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Item Padding - Desktop (px)',
								'mk-builder'
							) }
							value={ itemPadding }
							onChange={ ( val ) =>
								setAttributes( { itemPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Item Padding - Mobile (px)',
								'mk-builder'
							) }
							value={ itemPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { itemPaddingMobile: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
							help={ __(
								'Padding for mobile devices (<768px)',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Border Radius (px)',
								'mk-builder'
							) }
							value={ itemBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { itemBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
							help={ __(
								'Rounded corners for the item',
								'mk-builder'
							) }
						/>

						<Divider />

						<BaseControl
							label={ __(
								'Item Border Settings',
								'mk-builder'
							) }
						>
							<ToggleControl
								label={ __(
									'Enable Item Border',
									'mk-builder'
								) }
								checked={ enableItemBorder }
								onChange={ ( val ) =>
									setAttributes( { enableItemBorder: val } )
								}
								help={ __(
									'Enable border around the entire item',
									'mk-builder'
								) }
							/>
						</BaseControl>

						{ enableItemBorder && (
							<>
								<Divider />

								<BaseControl
									label={ __(
										'Border Width - Desktop',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'All Sides (px)',
											'mk-builder'
										) }
										value={ itemBorderWidth }
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidth: val,
												itemBorderWidthTop: val,
												itemBorderWidthRight: val,
												itemBorderWidthBottom: val,
												itemBorderWidthLeft: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
										help={ __(
											'Set all border sides to the same width',
											'mk-builder'
										) }
									/>

									<Divider />

									<p
										style={ {
											marginBottom: '8px',
											fontSize: '12px',
											fontWeight: 600,
										} }
									>
										{ __(
											'Individual Sides (px)',
											'mk-builder'
										) }
									</p>

									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={
											itemBorderWidthTop ||
											itemBorderWidth
										}
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidthTop: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={
											itemBorderWidthRight ||
											itemBorderWidth
										}
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidthRight: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={
											itemBorderWidthBottom ||
											itemBorderWidth
										}
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidthBottom: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={
											itemBorderWidthLeft ||
											itemBorderWidth
										}
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidthLeft: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Border Width - Mobile',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Mobile Border Width (px)',
											'mk-builder'
										) }
										value={
											itemBorderWidthMobile ||
											itemBorderWidth
										}
										onChange={ ( val ) =>
											setAttributes( {
												itemBorderWidthMobile: val,
											} )
										}
										min={ 0 }
										max={ 20 }
										step={ 0.5 }
										help={ __(
											'Border width for mobile devices (<768px)',
											'mk-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Border Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: itemBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													itemBorderColor: val,
												} ),
											label: __(
												'Border Color',
												'mk-builder'
											),
										},
										{
											value: itemBorderColorHover,
											onChange: ( val ) =>
												setAttributes( {
													itemBorderColorHover: val,
												} ),
											label: __(
												'Border Hover Color (Optional)',
												'mk-builder'
											),
										},
									] }
								/>

								<Divider />

								<SelectControl
									label={ __(
										'Border Style',
										'mk-builder'
									) }
									value={ itemBorderStyle }
									options={ borderStyleOptions }
									onChange={ ( val ) =>
										setAttributes( {
											itemBorderStyle: val,
										} )
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
									value={ itemBorderOpacity }
									onChange={ ( val ) =>
										setAttributes( {
											itemBorderOpacity: val,
										} )
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

								<BaseControl
									label={ __(
										'Button URL',
										'mk-builder'
									) }
								>
									<URLInput
										value={ buttonUrl }
										onChange={ ( val ) =>
											setAttributes( { buttonUrl: val } )
										}
									/>
								</BaseControl>

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

								<SelectControl
									label={ __(
										'Link Rel Attribute',
										'mk-builder'
									) }
									value={ buttonRel }
									options={ relOptions }
									onChange={ ( val ) =>
										setAttributes( { buttonRel: val } )
									}
								/>

								<Divider />

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
									min={ 0 }
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
									min={ 0 }
									max={ 60 }
									step={ 1 }
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
									min={ 0.6 }
									max={ 2 }
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
									min={ 300 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Text Transform',
										'mk-builder'
									) }
									value={ buttonTextTransform }
									options={ textTransformOptions }
									onChange={ ( val ) =>
										setAttributes( {
											buttonTextTransform: val,
										} )
									}
								/>

								<Divider />

								<TextControl
									label={ __(
										'Icon Class (Optional)',
										'mk-builder'
									) }
									value={ buttonIcon }
									onChange={ ( val ) =>
										setAttributes( { buttonIcon: val } )
									}
									help={ __(
										'e.g., fas fa-arrow-right or dashicons-arrow-right-alt2',
										'mk-builder'
									) }
								/>

								{ buttonIcon && (
									<BaseControl
										label={ __(
											'Icon Position',
											'mk-builder'
										) }
									>
										<ButtonGroup>
											{ iconPositionOptions.map(
												( option ) => (
													<Button
														key={ option.value }
														isPressed={
															buttonIconPosition ===
															option.value
														}
														onClick={ () =>
															setAttributes( {
																buttonIconPosition:
																	option.value,
															} )
														}
													>
														{ option.label }
													</Button>
												)
											) }
										</ButtonGroup>
									</BaseControl>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ displayType === 'icon' && icon && (
					<i
						className={ icon }
						aria-hidden="true"
						style={ {
							fontSize: `${ iconSize }rem`,
							color: iconColor,
							marginBottom: `${ iconMarginBottom }px`,
							display: 'block',
						} }
					/>
				) }

				{ displayType === 'image' && (
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
										'Select Service Image',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div
								style={ {
									position: 'relative',
									display: 'inline-block',
								} }
							>
								<img
									src={ image }
									alt={ title || '' }
									style={ {
										width: `${ imageWidth }px`,
										height: `${ imageHeight }px`,
										objectFit: imageObjectFit,
										objectPosition: imageObjectPosition,
										borderRadius: `${ imageBorderRadius }px`,
										display: 'block',
										marginBottom: `${ imageMarginBottom }px`,
									} }
								/>

								<Button
									isSecondary
									isSmall
									style={ {
										position: 'absolute',
										top: '5px',
										right: '5px',
										zIndex: 10,
									} }
									onClick={ () =>
										setAttributes( {
											image: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Change', 'mk-builder' ) }
								</Button>
							</div>
						) }
					</>
				) }

				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Service Title...', 'mk-builder' ) }
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
						marginTop: 0,
						marginBottom: `${ titleMarginBottom }px`,
						position: 'relative',
					} }
				/>

				{ showTitleUnderline && (
					<div
						style={ {
							width: `${ titleUnderlineWidth }px`,
							height: `${ titleUnderlineHeight }px`,
							backgroundColor: titleUnderlineColor,
							margin:
								itemAlignment === 'center'
									? '0 auto'
									: itemAlignment === 'right'
									? '0 0 0 auto'
									: '0',
							marginTop: `-${ titleMarginBottom }px`,
							marginBottom: `${ titleMarginBottom }px`,
						} }
					/>
				) }

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __(
						'Service description...',
						'mk-builder'
					) }
					style={ {
						fontSize: `${ descriptionFontSize }rem`,
						lineHeight: descriptionLineHeight,
						color: descriptionColor,
						marginTop: 0,
						marginBottom: showButton ? '20px' : '0',
					} }
				/>

				{ showButton && buttonText && (
					<a
						className="jivaka-btn"
						onClick={ ( e ) => e.preventDefault() }
						style={ {
							backgroundColor: buttonBgColor,
							color: buttonTextColor,
							borderRadius: `${ buttonBorderRadius }px`,
							padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
							fontSize: `${ buttonFontSize }rem`,
							fontWeight: buttonFontWeight,
							textTransform: buttonTextTransform,
							alignSelf:
								itemAlignment === 'center'
									? 'center'
									: itemAlignment === 'right'
									? 'flex-end'
									: 'flex-start',
							marginTop: 'auto',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							cursor: 'pointer',
						} }
					>
						{ buttonIcon && buttonIconPosition === 'left' && (
							<span
								className={ buttonIcon }
								aria-hidden="true"
							></span>
						) }
						{ buttonText }
						{ buttonIcon && buttonIconPosition === 'right' && (
							<span
								className={ buttonIcon }
								aria-hidden="true"
							></span>
						) }
					</a>
				) }
			</div>
		</>
	);
}
