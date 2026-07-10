import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	RichText,
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
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		heightDesktop,
		heightTablet,
		heightMobile,
		showBreadcrumb,
		breadcrumbText,
		breadcrumbColor,
		breadcrumbFontSize,
		breadcrumbFontSizeTablet,
		breadcrumbFontSizeMobile,
		breadcrumbFontWeight,
		breadcrumbBackground,
		breadcrumbPadding,
		breadcrumbPaddingHorizontal,
		breadcrumbBorderRadius,
		titleText,
		titleHighlightText,
		titleHighlightColor,
		titleColor,
		titleFontSize,
		titleFontSizeTablet,
		titleFontSizeMobile,
		titleFontWeight,
		titleLineHeight,
		titleMarginBottom,
		showSubtitle,
		subtitleText,
		subtitleColor,
		subtitleFontSize,
		subtitleFontSizeTablet,
		subtitleFontSizeMobile,
		subtitleFontWeight,
		subtitleLineHeight,
		subtitleMarginTop,
		subtitleMaxWidth,
		containerMaxWidth,
		containerPadding,
		containerPaddingTablet,
		containerPaddingMobile,
		textAlignment,
		animationOnScroll,
		animationType,
		imageOpacity,
		imageSaturation,
		heroStyle,
		showPrimaryButton,
		primaryButtonText,
		primaryButtonUrl,
		primaryButtonPulse,
		showSecondaryButton,
		secondaryButtonText,
		secondaryButtonUrl,
	} = attributes;

	const isEmergency = heroStyle === 'emergency';

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-page-hero-editor ${
				isEmergency ? 'em-hero page-hero-emergency' : ''
			}`,

			style: {
				position: 'relative',
				height: `${ isEmergency ? 600 : heightDesktop }px`,
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: isEmergency ? '#0b1c2c' : '#000',
				color: '#fff',
			},
		} ),
		[ heightDesktop, isEmergency ]
	);

	const containerStyle = {
		position: 'relative',
		zIndex: 3,
		width: '100%',
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		textAlign: textAlignment,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Hero Style', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Style', 'mk-builder' ) }
							value={ heroStyle }
							options={ [
								{
									label: __( 'Default', 'mk-builder' ),
									value: 'default',
								},
								{
									label: __(
										'Emergency (24/7)',
										'mk-builder'
									),
									value: 'emergency',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { heroStyle: val } )
							}
							help={ __(
								'Emergency style shows badge, title, description and two CTA buttons.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					{ isEmergency && (
						<PanelBody
							title={ __( 'Buttons', 'mk-builder' ) }
							initialOpen={ true }
						>
							<ToggleControl
								label={ __(
									'Show primary button',
									'mk-builder'
								) }
								checked={ showPrimaryButton !== false }
								onChange={ ( val ) =>
									setAttributes( { showPrimaryButton: val } )
								}
							/>

							{ showPrimaryButton !== false && (
								<>
									<TextControl
										label={ __(
											'Primary button text',
											'mk-builder'
										) }
										value={ primaryButtonText }
										onChange={ ( val ) =>
											setAttributes( {
												primaryButtonText: val,
											} )
										}
									/>

									<TextControl
										label={ __(
											'Primary button URL',
											'mk-builder'
										) }
										value={ primaryButtonUrl }
										onChange={ ( val ) =>
											setAttributes( {
												primaryButtonUrl: val,
											} )
										}
										help={ __(
											'e.g. tel:199 or tel:09789101101',
											'mk-builder'
										) }
									/>

									<ToggleControl
										label={ __(
											'Pulse animation',
											'mk-builder'
										) }
										checked={ primaryButtonPulse !== false }
										onChange={ ( val ) =>
											setAttributes( {
												primaryButtonPulse: val,
											} )
										}
									/>
								</>
							) }
							<Divider />
							<ToggleControl
								label={ __(
									'Show secondary button',
									'mk-builder'
								) }
								checked={ showSecondaryButton !== false }
								onChange={ ( val ) =>
									setAttributes( {
										showSecondaryButton: val,
									} )
								}
							/>

							{ showSecondaryButton !== false && (
								<>
									<TextControl
										label={ __(
											'Secondary button text',
											'mk-builder'
										) }
										value={ secondaryButtonText }
										onChange={ ( val ) =>
											setAttributes( {
												secondaryButtonText: val,
											} )
										}
									/>

									<TextControl
										label={ __(
											'Secondary button URL',
											'mk-builder'
										) }
										value={ secondaryButtonUrl }
										onChange={ ( val ) =>
											setAttributes( {
												secondaryButtonUrl: val,
											} )
										}
									/>
								</>
							) }
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Background Settings', 'mk-builder' ) }
						initialOpen={ true }
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

						{ backgroundImage && (
							<>
								<Divider />
								<RangeControl
									label={ __(
										'Image Opacity',
										'mk-builder'
									) }
									value={ imageOpacity }
									onChange={ ( val ) =>
										setAttributes( { imageOpacity: val } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Image Saturation',
										'mk-builder'
									) }
									value={ imageSaturation }
									onChange={ ( val ) =>
										setAttributes( {
											imageSaturation: val,
										} )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>

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
						title={ __( 'Height Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Height Desktop (px)',
								'mk-builder'
							) }
							value={ heightDesktop }
							onChange={ ( val ) =>
								setAttributes( { heightDesktop: val } )
							}
							min={ 200 }
							max={ 800 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Height Tablet (px)',
								'mk-builder'
							) }
							value={ heightTablet }
							onChange={ ( val ) =>
								setAttributes( { heightTablet: val } )
							}
							min={ 200 }
							max={ 600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Height Mobile (px)',
								'mk-builder'
							) }
							value={ heightMobile }
							onChange={ ( val ) =>
								setAttributes( { heightMobile: val } )
							}
							min={ 200 }
							max={ 500 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Breadcrumb Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Breadcrumb', 'mk-builder' ) }
							checked={ showBreadcrumb }
							onChange={ ( val ) =>
								setAttributes( { showBreadcrumb: val } )
							}
						/>

						{ showBreadcrumb && (
							<>
								<TextControl
									label={ __(
										'Breadcrumb Text',
										'mk-builder'
									) }
									value={ breadcrumbText }
									onChange={ ( val ) =>
										setAttributes( { breadcrumbText: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Breadcrumb Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: breadcrumbColor,
											onChange: ( val ) =>
												setAttributes( {
													breadcrumbColor: val,
												} ),
											label: __(
												'Breadcrumb Color',
												'mk-builder'
											),
										},
									] }
								/>

								<PanelColorSettings
									title={ __(
										'Breadcrumb Background',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: breadcrumbBackground,
											onChange: ( val ) =>
												setAttributes( {
													breadcrumbBackground: val,
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
										'Font Size Desktop (rem)',
										'mk-builder'
									) }
									value={ breadcrumbFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbFontSize: val,
										} )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Size Tablet (rem)',
										'mk-builder'
									) }
									value={ breadcrumbFontSizeTablet }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbFontSizeTablet: val,
										} )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Size Mobile (rem)',
										'mk-builder'
									) }
									value={ breadcrumbFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbFontSizeMobile: val,
										} )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
									value={ breadcrumbFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<RangeControl
									label={ __(
										'Padding Vertical (px)',
										'mk-builder'
									) }
									value={ breadcrumbPadding }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbPadding: val,
										} )
									}
									min={ 0 }
									max={ 20 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding Horizontal (px)',
										'mk-builder'
									) }
									value={ breadcrumbPaddingHorizontal }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbPaddingHorizontal: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'mk-builder'
									) }
									value={ breadcrumbBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											breadcrumbBorderRadius: val,
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
						title={ __( 'Title Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Title Text', 'mk-builder' ) }
							value={ titleText }
							onChange={ ( val ) =>
								setAttributes( { titleText: val } )
							}
						/>

						<TextControl
							label={ __(
								'Title Highlight Text',
								'mk-builder'
							) }
							value={ titleHighlightText }
							onChange={ ( val ) =>
								setAttributes( { titleHighlightText: val } )
							}
							help={ __(
								'Text that will be highlighted in the title',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'mk-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Highlight Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleHighlightColor,
									onChange: ( val ) =>
										setAttributes( {
											titleHighlightColor: val,
										} ),
									label: __(
										'Highlight Color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Font Size Desktop (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 6 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Font Size Tablet (rem)',
								'mk-builder'
							) }
							value={ titleFontSizeTablet }
							onChange={ ( val ) =>
								setAttributes( { titleFontSizeTablet: val } )
							}
							min={ 1.5 }
							max={ 5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Font Size Mobile (rem)',
								'mk-builder'
							) }
							value={ titleFontSizeMobile }
							onChange={ ( val ) =>
								setAttributes( { titleFontSizeMobile: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'mk-builder' ) }
							value={ titleLineHeight }
							onChange={ ( val ) =>
								setAttributes( { titleLineHeight: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Margin Bottom (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Subtitle Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Subtitle', 'mk-builder' ) }
							checked={ showSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSubtitle: val } )
							}
						/>

						{ showSubtitle && (
							<>
								<TextControl
									label={ __(
										'Subtitle Text',
										'mk-builder'
									) }
									value={ subtitleText }
									onChange={ ( val ) =>
										setAttributes( { subtitleText: val } )
									}
									placeholder={ __(
										'e.g. Committed to international standards…',
										'mk-builder'
									) }
									help={ __(
										'Optional line below the title. Also editable in the hero preview.',
										'mk-builder'
									) }
								/>

								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: subtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													subtitleColor: val,
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
										'Font Size Desktop (rem)',
										'mk-builder'
									) }
									value={ subtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Size Tablet (rem)',
										'mk-builder'
									) }
									value={ subtitleFontSizeTablet }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleFontSizeTablet: val,
										} )
									}
									min={ 0.8 }
									max={ 1.8 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Size Mobile (rem)',
										'mk-builder'
									) }
									value={ subtitleFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleFontSizeMobile: val,
										} )
									}
									min={ 0.8 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
									value={ subtitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<RangeControl
									label={ __(
										'Line Height',
										'mk-builder'
									) }
									value={ subtitleLineHeight }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleLineHeight: val,
										} )
									}
									min={ 1 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Margin Top (px)',
										'mk-builder'
									) }
									value={ subtitleMarginTop }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleMarginTop: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 2 }
								/>

								<RangeControl
									label={ __(
										'Max Width (px)',
										'mk-builder'
									) }
									value={ subtitleMaxWidth }
									onChange={ ( val ) =>
										setAttributes( {
											subtitleMaxWidth: val,
										} )
									}
									min={ 300 }
									max={ 900 }
									step={ 50 }
									help={ __(
										'Max width for subtitle text (centered).',
										'mk-builder'
									) }
								/>
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
						/>

						<RangeControl
							label={ __(
								'Padding Desktop (px)',
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
								'Padding Tablet (px)',
								'mk-builder'
							) }
							value={ containerPaddingTablet }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingTablet: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Mobile (px)',
								'mk-builder'
							) }
							value={ containerPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingMobile: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<SelectControl
							label={ __( 'Text Alignment', 'mk-builder' ) }
							value={ textAlignment }
							options={ [
								{
									label: __( 'Left', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center',
								},
								{
									label: __( 'Right', 'mk-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { textAlignment: val } )
							}
						/>
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
										label: __( 'Fade In', 'mk-builder' ),
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
										label: __( 'Zoom In', 'mk-builder' ),
										value: 'zoomIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ backgroundImage && (
					<div
						className={
							isEmergency ? 'em-hero-bg-wrap' : 'hero-bg-wrapper'
						}
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '120%',
							zIndex: 1,
						} }
					>
						<img
							src={ backgroundImage }
							alt=""
							className={
								isEmergency ? 'em-hero-bg' : 'hero-bg-img'
							}
							style={ {
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								opacity: isEmergency
									? imageOpacity || 0.4
									: imageOpacity,
								filter: `saturate(${ imageSaturation })`,
							} }
						/>
					</div>
				) }

				{ backgroundImage && backgroundOverlay && ! isEmergency && (
					<div
						className="background-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 2,
						} }
					/>
				) }

				<div
					className={
						isEmergency ? 'em-container' : 'hero-container'
					}
					style={ {
						...containerStyle,
						...( isEmergency ? { maxWidth: 1280 } : {} ),
					} }
				>
					{ isEmergency ? (
						<div
							className="em-hero-content em-animate-hero"
							style={ { width: '100%' } }
						>
							{ showBreadcrumb !== false && (
								<RichText
									tagName="span"
									value={ breadcrumbText }
									onChange={ ( val ) =>
										setAttributes( { breadcrumbText: val } )
									}
									placeholder={ __(
										'Badge text…',
										'mk-builder'
									) }
									className="em-hero-badge"
								/>
							) }
							<RichText
								tagName="h1"
								value={ titleText ?? '' }
								onChange={ ( val ) =>
									setAttributes( { titleText: val } )
								}
								placeholder={ __(
									'Hero title…',
									'mk-builder'
								) }
								className="em-hero-title"
							/>

							{ showSubtitle !== false && (
								<RichText
									tagName="p"
									value={ subtitleText }
									onChange={ ( val ) =>
										setAttributes( { subtitleText: val } )
									}
									placeholder={ __(
										'Description…',
										'mk-builder'
									) }
									className="em-hero-desc"
								/>
							) }
							<div
								className="em-hero-buttons"
								style={ {
									display: 'flex',
									gap: 20,
									justifyContent: 'center',
									flexWrap: 'wrap',
									marginTop: 24,
								} }
							>
								{ showPrimaryButton !== false &&
									primaryButtonText && (
										<a
											href={ primaryButtonUrl }
											className={ `em-btn em-btn-primary ${
												primaryButtonPulse !== false
													? 'em-btn-pulse'
													: ''
											}` }
											onClick={ ( e ) =>
												e.preventDefault()
											}
										>
											<i className="fas fa-phone-alt" />
											{ primaryButtonText }
										</a>
									) }
								{ showSecondaryButton !== false &&
									secondaryButtonText && (
										<a
											href={ secondaryButtonUrl }
											className="em-btn em-btn-glass"
											style={ {
												background:
													'rgba(255,255,255,0.2)',
												color: '#fff',
												backdropFilter: 'blur(5px)',
												border: '1px solid #fff',
											} }
											onClick={ ( e ) =>
												e.preventDefault()
											}
										>
											{ secondaryButtonText }
										</a>
									) }
							</div>
						</div>
					) : (
						<>
							{ showBreadcrumb && (
								<RichText
									tagName="span"
									value={ breadcrumbText }
									onChange={ ( val ) =>
										setAttributes( { breadcrumbText: val } )
									}
									placeholder={ __(
										'Breadcrumb text...',
										'mk-builder'
									) }
									className="hero-breadcrumb"
									style={ {
										fontSize: `${ breadcrumbFontSize }rem`,
										fontWeight: breadcrumbFontWeight,
										color: breadcrumbColor,
										background: breadcrumbBackground,
										padding: `${ breadcrumbPadding }px ${ breadcrumbPaddingHorizontal }px`,
										borderRadius: `${ breadcrumbBorderRadius }px`,
										display: 'inline-block',
										marginBottom: '15px',
										textTransform: 'uppercase',
										letterSpacing: '2px',
									} }
								/>
							) }

							<div
								className="hero-title-wrapper"
								style={ { width: '100%' } }
							>
								<h1
									className="hero-title"
									style={ {
										fontSize: `${ titleFontSize }rem`,
										fontWeight: titleFontWeight,
										color: titleColor,
										lineHeight: titleLineHeight,
										margin: `0 0 ${ titleMarginBottom }px 0`,
										'--title-font-size-desktop': `${ titleFontSize }rem`,
										'--title-font-size-tablet': `${ titleFontSizeTablet }rem`,
										'--title-font-size-mobile': `${ titleFontSizeMobile }rem`,
									} }
								>
									<RichText
										tagName="span"
										value={ titleText ?? '' }
										onChange={ ( val ) =>
											setAttributes( { titleText: val } )
										}
										placeholder={ __(
											'Title text…',
											'mk-builder'
										) }
										className="hero-title-main"
										identifier="hero-title-main"
									/>

									<RichText
										tagName="span"
										value={ titleHighlightText ?? '' }
										onChange={ ( val ) =>
											setAttributes( {
												titleHighlightText: val,
											} )
										}
										placeholder={ __(
											'Title highlight text…',
											'mk-builder'
										) }
										className="hero-title-highlight"
										identifier="hero-title-highlight"
										style={ {
											display: 'block',
											margin: '0.2em 0 0',
											color:
												titleHighlightColor ||
												undefined,
										} }
									/>
								</h1>
							</div>

							{ showSubtitle && (
								<RichText
									tagName="p"
									value={ subtitleText }
									onChange={ ( val ) =>
										setAttributes( { subtitleText: val } )
									}
									placeholder={ __(
										'Hero subtitle…',
										'mk-builder'
									) }
									className="hero-subtitle"
									style={ {
										fontSize: `${ subtitleFontSize }rem`,
										fontWeight: subtitleFontWeight,
										color: subtitleColor,
										lineHeight: subtitleLineHeight,
										margin: `${ subtitleMarginTop }px auto 0`,
										maxWidth: subtitleMaxWidth
											? `${ subtitleMaxWidth }px`
											: undefined,
									} }
								/>
							) }
						</>
					) }
				</div>
			</div>
		</>
	);
}
