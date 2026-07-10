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
		memberImage,
		memberImageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		memberName,
		memberNameColor,
		memberNameFontSize,
		memberNameFontWeight,
		memberPosition,
		memberPositionColor,
		memberPositionFontSize,
		memberPositionFontWeight,
		memberPositionTextTransform,
		showBio,
		memberBio,
		memberBioColor,
		memberBioFontSize,
		memberBioLineHeight,
		showSpecializations,
		specializations,
		specializationBgColor,
		specializationTextColor,
		specializationFontSize,
		specializationBorderRadius,
		showContactInfo,
		memberEmail,
		memberPhone,
		contactIconColor,
		contactTextColor,
		contactFontSize,
		showSocialLinks,
		socialFacebook,
		socialTwitter,
		socialLinkedin,
		socialInstagram,
		socialIconSize,
		socialIconColor,
		socialIconHoverColor,
		socialIconBgColor,
		socialIconBgHoverColor,
		socialIconBorderRadius,
		cardStyle,
		cardBackgroundColor,
		cardBackgroundGradientStart,
		cardBackgroundGradientEnd,
		cardBackgroundGradientAngle,
		cardPadding,
		cardBorderWidth,
		cardBorderColor,
		cardBorderStyle,
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
			className: 'mk-team-member-item-editor',
			style: {
				borderRadius: '8px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
			},
		} ),
		[]
	);

	const getCardBackground = () => {
		if ( cardStyle === 'gradient' ) {
			return `linear-gradient(${ cardBackgroundGradientAngle }deg, ${ cardBackgroundGradientStart }, ${ cardBackgroundGradientEnd })`;
		}
		return cardBackgroundColor;
	};

	const addSpecialization = () => {
		const newSpec = {
			id: Date.now(),
			text: 'New Specialization',
		};
		setAttributes( {
			specializations: [ ...specializations, newSpec ],
		} );
	};

	const updateSpecialization = ( id, text ) => {
		const updated = specializations.map( ( spec ) =>
			spec.id === id ? { ...spec, text } : spec
		);
		setAttributes( { specializations: updated } );
	};

	const removeSpecialization = ( id ) => {
		const filtered = specializations.filter( ( spec ) => spec.id !== id );
		setAttributes( { specializations: filtered } );
	};

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
						title={ __( 'Member Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ! memberImage ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										memberImage: media.url,
										memberImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Member Image',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ memberImage }
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
											memberImage: '',
											memberImageId: null,
										} )
									}
								>
									{ __( 'Change Image', 'mk-builder' ) }
								</Button>
							</div>
						) }

						<Divider />

						<RangeControl
							label={ __( 'Image Height (px)', 'mk-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) =>
								setAttributes( { imageHeight: val } )
							}
							min={ 200 }
							max={ 600 }
							step={ 10 }
						/>

						<SelectControl
							label={ __( 'Object Fit', 'mk-builder' ) }
							value={ imageObjectFit }
							options={ [
								{
									label: __( 'Cover', 'mk-builder' ),
									value: 'cover',
								},
								{
									label: __( 'Contain', 'mk-builder' ),
									value: 'contain',
								},
								{
									label: __( 'Fill', 'mk-builder' ),
									value: 'fill',
								},
								{
									label: __( 'None', 'mk-builder' ),
									value: 'none',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imageObjectFit: val } )
							}
						/>

						<SelectControl
							label={ __( 'Object Position', 'mk-builder' ) }
							value={ imageObjectPosition }
							options={ [
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center',
								},
								{
									label: __( 'Top', 'mk-builder' ),
									value: 'top',
								},
								{
									label: __( 'Bottom', 'mk-builder' ),
									value: 'bottom',
								},
								{
									label: __( 'Left', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __( 'Right', 'mk-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imageObjectPosition: val } )
							}
						/>

						<Divider />

						<ToggleControl
							label={ __(
								'Show Image Overlay',
								'mk-builder'
							) }
							checked={ showImageOverlay }
							onChange={ ( val ) =>
								setAttributes( { showImageOverlay: val } )
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
													imageOverlayColor: val,
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
					</PanelBody>

					<PanelBody
						title={ __( 'Member Name', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Name Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: memberNameColor,
									onChange: ( val ) =>
										setAttributes( {
											memberNameColor: val,
										} ),
									label: __( 'Name Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ memberNameFontSize }
							onChange={ ( val ) =>
								setAttributes( { memberNameFontSize: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ memberNameFontWeight }
							onChange={ ( val ) =>
								setAttributes( { memberNameFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Member Position', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Position Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: memberPositionColor,
									onChange: ( val ) =>
										setAttributes( {
											memberPositionColor: val,
										} ),
									label: __(
										'Position Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ memberPositionFontSize }
							onChange={ ( val ) =>
								setAttributes( { memberPositionFontSize: val } )
							}
							min={ 0.8 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ memberPositionFontWeight }
							onChange={ ( val ) =>
								setAttributes( {
									memberPositionFontWeight: val,
								} )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>

						<SelectControl
							label={ __( 'Text Transform', 'mk-builder' ) }
							value={ memberPositionTextTransform }
							options={ [
								{
									label: __( 'None', 'mk-builder' ),
									value: 'none',
								},
								{
									label: __( 'Uppercase', 'mk-builder' ),
									value: 'uppercase',
								},
								{
									label: __( 'Lowercase', 'mk-builder' ),
									value: 'lowercase',
								},
								{
									label: __( 'Capitalize', 'mk-builder' ),
									value: 'capitalize',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									memberPositionTextTransform: val,
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Member Bio', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Bio', 'mk-builder' ) }
							checked={ showBio }
							onChange={ ( val ) =>
								setAttributes( { showBio: val } )
							}
						/>

						{ showBio && (
							<>
								<PanelColorSettings
									title={ __( 'Bio Color', 'mk-builder' ) }
									colorSettings={ [
										{
											value: memberBioColor,
											onChange: ( val ) =>
												setAttributes( {
													memberBioColor: val,
												} ),
											label: __(
												'Bio Color',
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
									value={ memberBioFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											memberBioFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Line Height',
										'mk-builder'
									) }
									value={ memberBioLineHeight }
									onChange={ ( val ) =>
										setAttributes( {
											memberBioLineHeight: val,
										} )
									}
									min={ 1 }
									max={ 2.5 }
									step={ 0.1 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Specializations', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Specializations',
								'mk-builder'
							) }
							checked={ showSpecializations }
							onChange={ ( val ) =>
								setAttributes( { showSpecializations: val } )
							}
						/>

						{ showSpecializations && (
							<>
								<BaseControl
									label={ __(
										'Specialization Tags',
										'mk-builder'
									) }
								>
									{ specializations.map( ( spec ) => (
										<div
											key={ spec.id }
											style={ {
												marginBottom: '10px',
												display: 'flex',
												gap: '5px',
											} }
										>
											<TextControl
												value={ spec.text }
												onChange={ ( val ) =>
													updateSpecialization(
														spec.id,
														val
													)
												}
												style={ { flex: 1 } }
											/>

											<Button
												isDestructive
												isSmall
												onClick={ () =>
													removeSpecialization(
														spec.id
													)
												}
											>
												{ __(
													'Remove',
													'mk-builder'
												) }
											</Button>
										</div>
									) ) }
									<Button
										isPrimary
										isSmall
										onClick={ addSpecialization }
									>
										{ __(
											'Add Specialization',
											'mk-builder'
										) }
									</Button>
								</BaseControl>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Specialization Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: specializationBgColor,
											onChange: ( val ) =>
												setAttributes( {
													specializationBgColor: val,
												} ),
											label: __(
												'Background Color',
												'mk-builder'
											),
										},
										{
											value: specializationTextColor,
											onChange: ( val ) =>
												setAttributes( {
													specializationTextColor:
														val,
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
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ specializationFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											specializationFontSize: val,
										} )
									}
									min={ 0.6 }
									max={ 1.2 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'mk-builder'
									) }
									value={ specializationBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											specializationBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Contact Information', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Contact Info', 'mk-builder' ) }
							checked={ showContactInfo }
							onChange={ ( val ) =>
								setAttributes( { showContactInfo: val } )
							}
						/>

						{ showContactInfo && (
							<>
								<TextControl
									label={ __( 'Email', 'mk-builder' ) }
									value={ memberEmail }
									onChange={ ( val ) =>
										setAttributes( { memberEmail: val } )
									}
									type="email"
								/>

								<TextControl
									label={ __( 'Phone', 'mk-builder' ) }
									value={ memberPhone }
									onChange={ ( val ) =>
										setAttributes( { memberPhone: val } )
									}
									type="tel"
								/>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Contact Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: contactIconColor,
											onChange: ( val ) =>
												setAttributes( {
													contactIconColor: val,
												} ),
											label: __(
												'Icon Color',
												'mk-builder'
											),
										},
										{
											value: contactTextColor,
											onChange: ( val ) =>
												setAttributes( {
													contactTextColor: val,
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
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ contactFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											contactFontSize: val,
										} )
									}
									min={ 0.7 }
									max={ 1.5 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Social Links', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Social Links', 'mk-builder' ) }
							checked={ showSocialLinks }
							onChange={ ( val ) =>
								setAttributes( { showSocialLinks: val } )
							}
						/>

						{ showSocialLinks && (
							<>
								<TextControl
									label={ __(
										'Facebook URL',
										'mk-builder'
									) }
									value={ socialFacebook }
									onChange={ ( val ) =>
										setAttributes( { socialFacebook: val } )
									}
									type="url"
								/>

								<TextControl
									label={ __(
										'Twitter URL',
										'mk-builder'
									) }
									value={ socialTwitter }
									onChange={ ( val ) =>
										setAttributes( { socialTwitter: val } )
									}
									type="url"
								/>

								<TextControl
									label={ __(
										'LinkedIn URL',
										'mk-builder'
									) }
									value={ socialLinkedin }
									onChange={ ( val ) =>
										setAttributes( { socialLinkedin: val } )
									}
									type="url"
								/>

								<TextControl
									label={ __(
										'Instagram URL',
										'mk-builder'
									) }
									value={ socialInstagram }
									onChange={ ( val ) =>
										setAttributes( {
											socialInstagram: val,
										} )
									}
									type="url"
								/>

								<Divider />

								<RangeControl
									label={ __(
										'Icon Size (rem)',
										'mk-builder'
									) }
									value={ socialIconSize }
									onChange={ ( val ) =>
										setAttributes( { socialIconSize: val } )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.1 }
								/>

								<PanelColorSettings
									title={ __(
										'Icon Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: socialIconColor,
											onChange: ( val ) =>
												setAttributes( {
													socialIconColor: val,
												} ),
											label: __(
												'Icon Color',
												'mk-builder'
											),
										},
										{
											value: socialIconHoverColor,
											onChange: ( val ) =>
												setAttributes( {
													socialIconHoverColor: val,
												} ),
											label: __(
												'Icon Hover Color',
												'mk-builder'
											),
										},
										{
											value: socialIconBgColor,
											onChange: ( val ) =>
												setAttributes( {
													socialIconBgColor: val,
												} ),
											label: __(
												'Background Color',
												'mk-builder'
											),
										},
										{
											value: socialIconBgHoverColor,
											onChange: ( val ) =>
												setAttributes( {
													socialIconBgHoverColor: val,
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
										'Border Radius (%)',
										'mk-builder'
									) }
									value={ socialIconBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											socialIconBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Card Style', 'mk-builder' ) }
							value={ cardStyle }
							options={ [
								{
									label: __(
										'Default (Solid)',
										'mk-builder'
									),
									value: 'default',
								},
								{
									label: __( 'Gradient', 'mk-builder' ),
									value: 'gradient',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { cardStyle: val } )
							}
						/>

						{ cardStyle === 'default' ? (
							<PanelColorSettings
								title={ __(
									'Background Color',
									'mk-builder'
								) }
								colorSettings={ [
									{
										value: cardBackgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												cardBackgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
								] }
							/>
						) : (
							<>
								<PanelColorSettings
									title={ __(
										'Gradient Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: cardBackgroundGradientStart,
											onChange: ( val ) =>
												setAttributes( {
													cardBackgroundGradientStart:
														val,
												} ),
											label: __(
												'Start Color',
												'mk-builder'
											),
										},
										{
											value: cardBackgroundGradientEnd,
											onChange: ( val ) =>
												setAttributes( {
													cardBackgroundGradientEnd:
														val,
												} ),
											label: __(
												'End Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Gradient Angle (deg)',
										'mk-builder'
									) }
									value={ cardBackgroundGradientAngle }
									onChange={ ( val ) =>
										setAttributes( {
											cardBackgroundGradientAngle: val,
										} )
									}
									min={ 0 }
									max={ 360 }
									step={ 15 }
								/>
							</>
						) }

						<Divider />

						<RangeControl
							label={ __( 'Card Padding (px)', 'mk-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>

						<Divider />

						<RangeControl
							label={ __( 'Border Width (px)', 'mk-builder' ) }
							value={ cardBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { cardBorderWidth: val } )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
						/>

						{ cardBorderWidth > 0 && (
							<>
								<PanelColorSettings
									title={ __(
										'Border Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: cardBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													cardBorderColor: val,
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
									value={ cardBorderStyle }
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
									] }
									onChange={ ( val ) =>
										setAttributes( {
											cardBorderStyle: val,
										} )
									}
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
				{ memberImage && (
					<div style={ { position: 'relative' } }>
						<img
							src={ memberImage }
							alt=""
							style={ {
								width: '100%',
								height: `${ imageHeight }px`,
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
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
								} }
							/>
						) }
					</div>
				) }

				<div
					style={ {
						padding: `${ cardPadding }px`,
						background: getCardBackground(),
						borderWidth: `${ cardBorderWidth }px`,
						borderColor: cardBorderColor,
						borderStyle: cardBorderStyle,
					} }
				>
					<RichText
						tagName="h3"
						value={ memberName }
						onChange={ ( val ) =>
							setAttributes( { memberName: val } )
						}
						placeholder={ __( 'Member Name...', 'mk-builder' ) }
						style={ {
							fontSize: `${ memberNameFontSize }rem`,
							fontWeight: memberNameFontWeight,
							color: memberNameColor,
							marginTop: 0,
							marginBottom: '8px',
						} }
					/>

					<RichText
						tagName="p"
						value={ memberPosition }
						onChange={ ( val ) =>
							setAttributes( { memberPosition: val } )
						}
						placeholder={ __( 'Position...', 'mk-builder' ) }
						style={ {
							fontSize: `${ memberPositionFontSize }rem`,
							fontWeight: memberPositionFontWeight,
							color: memberPositionColor,
							textTransform: memberPositionTextTransform,
							marginTop: 0,
							marginBottom: '15px',
						} }
					/>

					{ showBio && (
						<RichText
							tagName="p"
							value={ memberBio }
							onChange={ ( val ) =>
								setAttributes( { memberBio: val } )
							}
							placeholder={ __( 'Bio...', 'mk-builder' ) }
							style={ {
								fontSize: `${ memberBioFontSize }rem`,
								lineHeight: memberBioLineHeight,
								color: memberBioColor,
								marginBottom: '15px',
							} }
						/>
					) }

					{ showSpecializations && specializations.length > 0 && (
						<div
							style={ {
								display: 'flex',
								flexWrap: 'wrap',
								gap: '8px',
								marginBottom: '15px',
							} }
						>
							{ specializations.map( ( spec ) => (
								<span
									key={ spec.id }
									style={ {
										backgroundColor: specializationBgColor,
										color: specializationTextColor,
										fontSize: `${ specializationFontSize }rem`,
										padding: '4px 12px',
										borderRadius: `${ specializationBorderRadius }px`,
										display: 'inline-block',
									} }
								>
									{ spec.text }
								</span>
							) ) }
						</div>
					) }

					{ showContactInfo && ( memberEmail || memberPhone ) && (
						<div style={ { marginBottom: '15px' } }>
							{ memberEmail && (
								<div
									style={ {
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										marginBottom: '5px',
										fontSize: `${ contactFontSize }rem`,
										color: contactTextColor,
									} }
								>
									<i
										className="fa fa-envelope"
										style={ { color: contactIconColor } }
									/>

									<span>{ memberEmail }</span>
								</div>
							) }
							{ memberPhone && (
								<div
									style={ {
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										fontSize: `${ contactFontSize }rem`,
										color: contactTextColor,
									} }
								>
									<i
										className="fa fa-phone"
										style={ { color: contactIconColor } }
									/>

									<span>{ memberPhone }</span>
								</div>
							) }
						</div>
					) }

					{ showSocialLinks &&
						( socialFacebook ||
							socialTwitter ||
							socialLinkedin ||
							socialInstagram ) && (
							<div
								style={ {
									display: 'flex',
									gap: '10px',
									marginBottom: showButton ? '15px' : '0',
								} }
							>
								{ socialFacebook && (
									<a
										href={ socialFacebook }
										target="_blank"
										rel="noopener noreferrer"
										style={ {
											fontSize: `${ socialIconSize }rem`,
											color: socialIconColor,
											backgroundColor: socialIconBgColor,
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: `${ socialIconBorderRadius }%`,
											textDecoration: 'none',
										} }
										onClick={ ( e ) => e.preventDefault() }
									>
										<i className="fab fa-facebook-f" />
									</a>
								) }
								{ socialTwitter && (
									<a
										href={ socialTwitter }
										target="_blank"
										rel="noopener noreferrer"
										style={ {
											fontSize: `${ socialIconSize }rem`,
											color: socialIconColor,
											backgroundColor: socialIconBgColor,
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: `${ socialIconBorderRadius }%`,
											textDecoration: 'none',
										} }
										onClick={ ( e ) => e.preventDefault() }
									>
										<i className="fab fa-twitter" />
									</a>
								) }
								{ socialLinkedin && (
									<a
										href={ socialLinkedin }
										target="_blank"
										rel="noopener noreferrer"
										style={ {
											fontSize: `${ socialIconSize }rem`,
											color: socialIconColor,
											backgroundColor: socialIconBgColor,
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: `${ socialIconBorderRadius }%`,
											textDecoration: 'none',
										} }
										onClick={ ( e ) => e.preventDefault() }
									>
										<i className="fab fa-linkedin-in" />
									</a>
								) }
								{ socialInstagram && (
									<a
										href={ socialInstagram }
										target="_blank"
										rel="noopener noreferrer"
										style={ {
											fontSize: `${ socialIconSize }rem`,
											color: socialIconColor,
											backgroundColor: socialIconBgColor,
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: `${ socialIconBorderRadius }%`,
											textDecoration: 'none',
										} }
										onClick={ ( e ) => e.preventDefault() }
									>
										<i className="fab fa-instagram" />
									</a>
								) }
							</div>
						) }

					{ showButton && (
						<div
							className="member-button-wrapper"
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
								className="member-button"
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
