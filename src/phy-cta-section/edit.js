import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
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
	BaseControl,
	Button,
	__experimentalDivider as ExperimentalDivider,
} from '@wordpress/components';

const Divider =
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const DEFAULT_ATTRS = {
	backgroundMode: 'color',
	backgroundColor: 'var(--phy-secondary)',
	backgroundImageUrl: '',
	backgroundVideoUrl: '',
	backgroundVideoPoster: '',
	backgroundOverlayColor: 'rgba(0, 0, 0, 0.4)',
	backgroundOverlayOpacity: 0.4,
	padding: 60,
	borderRadius: 30,
	textColor: '#ffffff',
	marginBottom: 80,
	containerMaxWidth: 1280,
	containerPadding: 24,
	title: 'Start Your Recovery Journey Today',
	subtitle: "Don't let pain hold you back.",
	showSubtitle: true,
	buttonText: 'Book Appointment Now',
	buttonUrl: 'tel:0912345678',
	buttonAriaLabel: 'Book a physiotherapy appointment',
	centerAlign: true,
	animationOnScroll: true,
	animationType: 'fade-up',
	animationDelay: 100,
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundMode,
		backgroundColor,
		backgroundImageUrl,
		backgroundImageId,
		backgroundVideoUrl,
		backgroundVideoPoster,
		backgroundVideoId,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		padding,
		borderRadius,
		textColor,
		marginBottom,
		containerMaxWidth,
		containerPadding,
		title,
		subtitle,
		showSubtitle,
		buttonText,
		buttonUrl,
		buttonAriaLabel,
		centerAlign,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-phy-cta-section-editor',
			style: {
				marginBottom: `${ Number( marginBottom ) }px`,
			},
		} ),
		[ marginBottom ]
	);

	const hasMediaBackground =
		backgroundMode === 'image' || backgroundMode === 'video';

	const innerStyle = {
		position: 'relative',
		overflow: 'hidden',
		padding: `${ Number( padding ) }px`,
		borderRadius: `${ Number( borderRadius ) }px`,
		textAlign: centerAlign ? 'center' : 'left',
		color: textColor,
		backgroundColor:
			backgroundMode === 'color' ||
			( ! hasMediaBackground && backgroundColor )
				? backgroundColor
				: 'transparent',
	};

	if ( backgroundMode === 'image' && backgroundImageUrl ) {
		innerStyle.backgroundImage = `url(${ backgroundImageUrl })`;
		innerStyle.backgroundSize = 'cover';
		innerStyle.backgroundPosition = 'center';
	}

	const containerStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
	};

	const renderBackgroundControls = () => (
		<>
			<SelectControl
				label={ __( 'Background type', 'mk-builder' ) }
				value={ backgroundMode }
				options={ [
					{ value: 'color', label: __( 'Color', 'mk-builder' ) },
					{
						value: 'image',
						label: __( 'Image / GIF', 'mk-builder' ),
					},
					{ value: 'video', label: __( 'Video', 'mk-builder' ) },
				] }
				onChange={ ( val ) =>
					setAttributes( { backgroundMode: val || 'color' } )
				}
			/>

			{ backgroundMode === 'color' && (
				<PanelColorSettings
					title={ __( 'Background color', 'mk-builder' ) }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: ( val ) =>
								setAttributes( { backgroundColor: val } ),
							label: __( 'Background color', 'mk-builder' ),
						},
					] }
				/>
			) }

			{ backgroundMode === 'image' && (
				<BaseControl
					label={ __( 'Background image / GIF', 'mk-builder' ) }
				>
					{ ! backgroundImageUrl ? (
						<MediaPlaceholder
							onSelect={ ( media ) =>
								setAttributes( {
									backgroundImageUrl: media.url,
									backgroundImageId: media.id,
								} )
							}
							allowedTypes={ [ 'image' ] }
							multiple={ false }
							labels={ {
								title: __(
									'Select image or GIF',
									'mk-builder'
								),
							} }
						/>
					) : (
						<div>
							<img
								src={ backgroundImageUrl }
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
										backgroundImageUrl: '',
										backgroundImageId: null,
									} )
								}
							>
								{ __( 'Remove image', 'mk-builder' ) }
							</Button>
						</div>
					) }
				</BaseControl>
			) }

			{ backgroundMode === 'video' && (
				<>
					<BaseControl
						label={ __( 'Background video', 'mk-builder' ) }
					>
						{ ! backgroundVideoUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundVideoUrl: media.url,
										backgroundVideoId: media.id,
									} )
								}
								allowedTypes={ [ 'video' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Select video',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div>
								<video
									src={ backgroundVideoUrl }
									style={ {
										width: '100%',
										marginBottom: '10px',
										borderRadius: '4px',
									} }
									muted
									loop
									playsInline
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											backgroundVideoUrl: '',
											backgroundVideoId: null,
										} )
									}
								>
									{ __( 'Remove video', 'mk-builder' ) }
								</Button>
							</div>
						) }
					</BaseControl>

					<TextControl
						label={ __(
							'Fallback poster image URL (optional)',
							'mk-builder'
						) }
						value={ backgroundVideoPoster }
						onChange={ ( val ) =>
							setAttributes( { backgroundVideoPoster: val } )
						}
						help={ __(
							'Shown as a fallback background and in some browsers before video loads.',
							'mk-builder'
						) }
					/>
				</>
			) }

			{ hasMediaBackground && (
				<>
					<Divider />
					<ToggleControl
						label={ __( 'Enable overlay', 'mk-builder' ) }
						checked={ !! backgroundOverlayOpacity }
						onChange={ ( val ) =>
							setAttributes( {
								backgroundOverlayOpacity: val
									? backgroundOverlayOpacity || 0.4
									: 0,
							} )
						}
					/>

					{ backgroundOverlayOpacity > 0 && (
						<>
							<PanelColorSettings
								title={ __( 'Overlay color', 'mk-builder' ) }
								colorSettings={ [
									{
										value: backgroundOverlayColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundOverlayColor: val,
											} ),
										label: __(
											'Overlay color',
											'mk-builder'
										),
									},
								] }
							/>

							<RangeControl
								label={ __(
									'Overlay opacity',
									'mk-builder'
								) }
								value={ backgroundOverlayOpacity }
								onChange={ ( val ) =>
									setAttributes( {
										backgroundOverlayOpacity: val,
									} )
								}
								min={ 0 }
								max={ 0.9 }
								step={ 0.05 }
							/>
						</>
					) }
				</>
			) }
		</>
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ renderBackgroundControls() }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout & text', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Padding (px)', 'mk-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Border radius (px)',
								'mk-builder'
							) }
							value={ borderRadius }
							onChange={ ( val ) =>
								setAttributes( { borderRadius: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Section bottom margin (px)',
								'mk-builder'
							) }
							value={ marginBottom }
							onChange={ ( val ) =>
								setAttributes( { marginBottom: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 4 }
						/>

						<PanelColorSettings
							title={ __( 'Text color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: textColor,
									onChange: ( val ) =>
										setAttributes( { textColor: val } ),
									label: __( 'Text color', 'mk-builder' ),
								},
							] }
						/>

						<ToggleControl
							label={ __(
								'Center align content',
								'mk-builder'
							) }
							checked={ centerAlign }
							onChange={ ( val ) =>
								setAttributes( { centerAlign: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
							help={ __(
								'For phone, use tel:0912345678',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Button aria label', 'mk-builder' ) }
							value={ buttonAriaLabel }
							onChange={ ( val ) =>
								setAttributes( { buttonAriaLabel: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show subtitle', 'mk-builder' ) }
							checked={ showSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSubtitle: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation class',
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
										'Animation type class',
										'mk-builder'
									) }
									value={ animationType }
									options={ [
										{
											value: 'fade-up',
											label: __(
												'Fade up',
												'mk-builder'
											),
										},
										{
											value: 'fade-in',
											label: __(
												'Fade in',
												'mk-builder'
											),
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation delay (ms)',
										'mk-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 25 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="phy-container" style={ containerStyle }>
					<div
						className={ `phy-cta-inner ${
							animationOnScroll ? 'fade-up' : ''
						}` }
						style={ innerStyle }
						data-animation-type={ animationType }
						data-animation-delay={ Number( animationDelay ) }
					>
						{ backgroundMode === 'video' && backgroundVideoUrl && (
							<video
								className="phy-cta-bg-video"
								src={ backgroundVideoUrl }
								poster={ backgroundVideoPoster || undefined }
								autoPlay
								muted
								loop
								playsInline
							/>
						) }

						{ hasMediaBackground &&
							backgroundOverlayOpacity > 0 && (
								<div
									className="phy-cta-overlay"
									style={ {
										position: 'absolute',
										inset: 0,
										backgroundColor: backgroundOverlayColor,
										opacity: backgroundOverlayOpacity,
									} }
								/>
							) }

						<div className="phy-cta-content">
							<RichText
								tagName="h2"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Start Your Recovery Journey Today',
									'mk-builder'
								) }
							/>

							{ showSubtitle && (
								<RichText
									tagName="p"
									value={ subtitle }
									onChange={ ( val ) =>
										setAttributes( { subtitle: val } )
									}
									placeholder={ __(
										"Don't let pain hold you back.",
										'mk-builder'
									) }
									style={ { opacity: 0.8, marginBottom: 30 } }
								/>
							) }
							<RichText
								tagName="a"
								className="phy-btn"
								value={ buttonText }
								onChange={ ( val ) =>
									setAttributes( { buttonText: val } )
								}
								placeholder={ __(
									'Book Appointment Now',
									'mk-builder'
								) }
								href={ buttonUrl || undefined }
								aria-label={ buttonAriaLabel || undefined }
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
