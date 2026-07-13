import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import {
	getPlatformPreset,
	PLATFORM_OPTIONS,
} from './platform-presets';
import {
	FOCAL_PRESET_COORDS,
	getQrImageStyle,
} from './qr-image-utils';

const OBJECT_FIT_OPTIONS = [
	{
		label: __( 'Contain (full QR)', 'mk-builder' ),
		value: 'contain',
	},
	{
		label: __( 'Cover (crop fill)', 'mk-builder' ),
		value: 'cover',
	},
];

const FOCAL_PRESET_OPTIONS = [
	{ label: __( 'Center', 'mk-builder' ), value: 'center' },
	{ label: __( 'Top', 'mk-builder' ), value: 'top' },
	{ label: __( 'Bottom', 'mk-builder' ), value: 'bottom' },
	{ label: __( 'Left', 'mk-builder' ), value: 'left' },
	{ label: __( 'Right', 'mk-builder' ), value: 'right' },
	{ label: __( 'Top Left', 'mk-builder' ), value: 'top-left' },
	{ label: __( 'Top Right', 'mk-builder' ), value: 'top-right' },
	{ label: __( 'Bottom Left', 'mk-builder' ), value: 'bottom-left' },
	{ label: __( 'Bottom Right', 'mk-builder' ), value: 'bottom-right' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		platform,
		platformLabel,
		showPlatformBadge,
		qrImage,
		qrImageId,
		qrImageAlt,
		qrImageObjectFit,
		qrImageFocalPreset,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
		footerLabel,
		showFooterLabel,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonFontSize,
		buttonFontWeight,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonBorderRadius,
		buttonMarginTop,
	} = attributes;

	const preset = getPlatformPreset( platform );
	const displayLabel = platformLabel || preset.label;
	const qrImageStyle = getQrImageStyle( {
		qrImageObjectFit,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
	} );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-social-qr-item-editor social-qr-item-wrapper',
			'data-platform': platform,
		} ),
		[ platform ]
	);

	const handlePlatformChange = ( nextPlatform ) => {
		const nextPreset = getPlatformPreset( nextPlatform );
		setAttributes( {
			platform: nextPlatform,
			footerLabel: nextPreset.defaultFooter,
			buttonText: nextPreset.defaultButtonText,
			buttonUrl: nextPreset.defaultButtonUrl,
		} );
	};

	const handleMediaSelect = ( media ) => {
		setAttributes( {
			qrImage: media.url,
			qrImageId: media.id,
			qrImageAlt: media.alt || `${ displayLabel } QR Code`,
		} );
	};

	const handleFocalPresetChange = ( nextPreset ) => {
		const coords = FOCAL_PRESET_COORDS[ nextPreset ] || FOCAL_PRESET_COORDS.center;
		setAttributes( {
			qrImageFocalPreset: nextPreset,
			qrImagePositionX: coords.x,
			qrImagePositionY: coords.y,
		} );
	};

	const clearQrImage = () => {
		setAttributes( {
			qrImage: '',
			qrImageId: undefined,
			qrImageAlt: '',
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Platform', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Platform', 'mk-builder' ) }
							value={ platform }
							options={ PLATFORM_OPTIONS }
							onChange={ handlePlatformChange }
						/>

						<TextControl
							label={ __(
								'Platform Label (optional)',
								'mk-builder'
							) }
							value={ platformLabel }
							onChange={ ( val ) =>
								setAttributes( { platformLabel: val } )
							}
							help={ __(
								'Leave empty to use the default platform name.',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Show Header', 'mk-builder' ) }
							checked={ showPlatformBadge }
							onChange={ ( val ) =>
								setAttributes( { showPlatformBadge: val } )
							}
							help={ __(
								'Toggle On to display the platform badge at the top of the card.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'QR Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'QR Code', 'mk-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ handleMediaSelect }
									allowedTypes={ [ 'image' ] }
									value={ qrImageId }
									render={ ( { open } ) => (
										<div>
											{ qrImage ? (
												<>
													<img
														src={ qrImage }
														alt=""
														style={ {
															width: '100%',
															maxWidth: '180px',
															height: 'auto',
															marginBottom: '10px',
															borderRadius: '4px',
														} }
													/>

													<div
														style={ {
															display: 'flex',
															gap: '8px',
															flexWrap: 'wrap',
														} }
													>
														<Button
															variant="primary"
															onClick={ open }
														>
															{ __(
																'Replace / Crop',
																'mk-builder'
															) }
														</Button>
														<Button
															variant="secondary"
															isDestructive
															onClick={
																clearQrImage
															}
														>
															{ __(
																'Remove',
																'mk-builder'
															) }
														</Button>
													</div>
												</>
											) : (
												<Button
													variant="primary"
													onClick={ open }
												>
													{ __(
														'Upload QR Image',
														'mk-builder'
													) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						</BaseControl>

						<TextControl
							label={ __( 'Image Alt Text', 'mk-builder' ) }
							value={ qrImageAlt }
							onChange={ ( val ) =>
								setAttributes( { qrImageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Image Crop & Focus', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Object Fit', 'mk-builder' ) }
							value={ qrImageObjectFit }
							options={ OBJECT_FIT_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { qrImageObjectFit: val } )
							}
							help={ __(
								'Use Contain for scannable QR codes. Cover crops to fill the square.',
								'mk-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Focal Preset', 'mk-builder' ) }
							value={ qrImageFocalPreset }
							options={ FOCAL_PRESET_OPTIONS }
							onChange={ handleFocalPresetChange }
						/>

						<RangeControl
							label={ __( 'Focus X (%)', 'mk-builder' ) }
							value={ qrImagePositionX }
							onChange={ ( val ) =>
								setAttributes( { qrImagePositionX: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Focus Y (%)', 'mk-builder' ) }
							value={ qrImagePositionY }
							onChange={ ( val ) =>
								setAttributes( { qrImagePositionY: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Zoom Scale', 'mk-builder' ) }
							value={ qrImageScale }
							onChange={ ( val ) =>
								setAttributes( { qrImageScale: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.05 }
							help={ __(
								'Zoom into a specific part of the image. Keep near 1.0 for QR scanning.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Description', 'mk-builder' ) }
							checked={ showFooterLabel }
							onChange={ ( val ) =>
								setAttributes( { showFooterLabel: val } )
							}
							help={ __(
								'Toggle On to display the footer URL or text below the QR code.',
								'mk-builder'
							) }
						/>

						{ showFooterLabel && (
							<TextControl
								label={ __( 'Description Text / URL', 'mk-builder' ) }
								value={ footerLabel }
								onChange={ ( val ) =>
									setAttributes( { footerLabel: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Action Button', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Button', 'mk-builder' ) }
							checked={ showButton }
							onChange={ ( val ) =>
								setAttributes( { showButton: val } )
							}
							help={ __(
								'Toggle On to display the button below the QR card.',
								'mk-builder'
							) }
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
									label={ __( 'Button URL', 'mk-builder' ) }
									value={ buttonUrl }
									onChange={ ( val ) =>
										setAttributes( { buttonUrl: val } )
									}
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
												'Background',
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
												'Text',
												'mk-builder'
											),
										},
										{
											value: buttonHoverBgColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonHoverBgColor: val,
												} ),
											label: __(
												'Hover Background',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Button Margin Top (px)',
										'mk-builder'
									) }
									value={ buttonMarginTop }
									onChange={ ( val ) =>
										setAttributes( { buttonMarginTop: val } )
									}
									min={ 0 }
									max={ 40 }
									step={ 2 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="social-qr-card"
					data-platform={ platform }
					style={ {
						'--button-margin-top': `${ buttonMarginTop }px`,
						'--button-bg': buttonBgColor,
						'--button-color': buttonTextColor,
						'--button-hover-bg': buttonHoverBgColor,
					} }
				>
					{ showPlatformBadge && (
						<div
							className={ `social-qr-badge ${ preset.badgeClass }` }
						>
							<i
								className={ preset.icon }
								aria-hidden="true"
							/>
							<span>{ displayLabel }</span>
						</div>
					) }

					<div className="social-qr-code-wrap">
						{ qrImage ? (
							<img
								src={ qrImage }
								alt={ qrImageAlt || `${ displayLabel } QR` }
								style={ qrImageStyle }
							/>
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ handleMediaSelect }
									allowedTypes={ [ 'image' ] }
									value={ qrImageId }
									render={ ( { open } ) => (
										<button
											type="button"
											className="social-qr-code-placeholder"
											onClick={ open }
										>
											{ __(
												'Upload QR Image',
												'mk-builder'
											) }
										</button>
									) }
								/>
							</MediaUploadCheck>
						) }
					</div>

					{ showFooterLabel && footerLabel && (
						<p className="social-qr-footer">{ footerLabel }</p>
					) }
				</div>

				{ showButton && buttonText && (
					<a
						href={ buttonUrl || '#' }
						className="jivaka-btn social-qr-btn"
						style={ {
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: `${ buttonMarginTop }px`,
							padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
							borderRadius: `${ buttonBorderRadius }px`,
							fontWeight: buttonFontWeight,
							fontSize: `${ buttonFontSize }rem`,
							backgroundColor: buttonBgColor,
							color: buttonTextColor,
							textDecoration: 'none',
							width: '100%',
							textAlign: 'center',
							boxSizing: 'border-box',
						} }
						onClick={ ( event ) => event.preventDefault() }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</>
	);
}
