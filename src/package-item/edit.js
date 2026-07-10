import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
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
		category,
		isRecommended,
		ribbonText,
		packageName,
		packageNameColor,
		packageNameFontSize,
		packageNameFontWeight,
		currency,
		amount,
		priceColor,
		amountFontSize,
		description,
		descriptionColor,
		descriptionFontSize,
		features,
		featureTextColor,
		featureUnavailableColor,
		featureIconColor,
		featureFontSize,
		featureMarkerType,
		featureMarkerImageUrl,
		featureMarkerImageId,
		itemDisplayType,
		itemImageUrl,
		itemImageId,
		itemImageAlt,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonStyle,
		buttonBgColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderRadius,
		buttonFontSize,
		buttonFontWeight,
	} = attributes;

	const isImageDisplayType =
		itemDisplayType === 'image' || itemDisplayType === 'image-only';
	const shouldUseImageCard = isImageDisplayType && !! itemImageUrl;
	const isImageOnly = itemDisplayType === 'image-only' && !! itemImageUrl;
	const showHeader = ! isImageOnly;
	const showFooterButton = showButton && ! isImageOnly;

	const blockProps = useStableBlockProps(
		() => ( {
			className: [
				'mk-package-item-editor',
				'package-card',
				isRecommended ? 'recommended' : '',
				shouldUseImageCard ? 'is-image-card' : '',
				isImageOnly ? 'is-image-only' : '',
			]
				.filter( Boolean )
				.join( ' ' ),

			'data-category': category,
			style: {
				borderRadius: '8px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				display: 'flex',
				flexDirection: 'column',
			},
		} ),
		[ category, isRecommended, shouldUseImageCard, isImageOnly ]
	);

	const addFeature = () => {
		setAttributes( {
			features: [
				...features,
				{ text: __( 'New feature', 'mk-builder' ), available: true },
			],
		} );
	};

	const updateFeature = ( index, field, value ) => {
		const updated = [ ...features ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { features: updated } );
	};

	const removeFeature = ( index ) => {
		const filtered = features.filter( ( _, i ) => i !== index );
		setAttributes( { features: filtered } );
	};

	const shouldUseImageMarker =
		featureMarkerType === 'image' && !! featureMarkerImageUrl;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Package & Category', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Category (for filter)',
								'mk-builder'
							) }
							value={ category }
							onChange={ ( val ) =>
								setAttributes( { category: val } )
							}
							help={ __(
								'Must match a filter tab value (e.g. general, heart, women).',
								'mk-builder'
							) }
						/>

						<Divider />
						<ToggleControl
							label={ __(
								'Recommended / Highlight',
								'mk-builder'
							) }
							checked={ isRecommended }
							onChange={ ( val ) =>
								setAttributes( { isRecommended: val } )
							}
						/>

						{ isRecommended && (
							<TextControl
								label={ __( 'Ribbon Text', 'mk-builder' ) }
								value={ ribbonText }
								onChange={ ( val ) =>
									setAttributes( { ribbonText: val } )
								}
							/>
						) }
						<Divider />
						<SelectControl
							label={ __( 'Package Display Type', 'mk-builder' ) }
							value={ itemDisplayType }
							options={ [
								{
									label: __( 'Bullet List Card', 'mk-builder' ),
									value: 'bullet',
								},
								{
									label: __( 'Image Card', 'mk-builder' ),
									value: 'image',
								},
								{
									label: __( 'Image Only', 'mk-builder' ),
									value: 'image-only',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { itemDisplayType: val } )
							}
						/>
						{ isImageDisplayType && (
							<BaseControl
								label={ __( 'Package Image', 'mk-builder' ) }
							>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												itemImageUrl: media?.url || '',
												itemImageId:
													media?.id || undefined,
												itemImageAlt:
													media?.alt || '',
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ itemImageId }
										render={ ( { open } ) => (
											<Button
												isSecondary
												isSmall
												onClick={ open }
											>
												{ itemImageUrl
													? __(
															'Replace Package Image',
															'mk-builder'
													  )
													: __(
															'Select Package Image',
															'mk-builder'
													  ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ itemImageUrl && (
									<div style={ { marginTop: '10px' } }>
										<img
											src={ itemImageUrl }
											alt={ itemImageAlt || '' }
											style={ {
												width: '100%',
												maxWidth: '220px',
												height: 'auto',
												display: 'block',
												marginBottom: '8px',
												borderRadius: '6px',
											} }
										/>
										<Button
											isDestructive
											isSmall
											onClick={ () =>
												setAttributes( {
													itemImageUrl: '',
													itemImageId: undefined,
													itemImageAlt: '',
												} )
											}
										>
											{ __(
												'Remove Package Image',
												'mk-builder'
											) }
										</Button>
									</div>
								) }
							</BaseControl>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Package Name', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: packageNameColor,
									onChange: ( val ) =>
										setAttributes( {
											packageNameColor: val,
										} ),
									label: __( 'Name Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ packageNameFontSize }
							onChange={ ( val ) =>
								setAttributes( { packageNameFontSize: val } )
							}
							min={ 0.8 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ packageNameFontWeight }
							onChange={ ( val ) =>
								setAttributes( { packageNameFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Price', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Currency', 'mk-builder' ) }
							value={ currency }
							onChange={ ( val ) =>
								setAttributes( { currency: val } )
							}
						/>

						<TextControl
							label={ __( 'Amount', 'mk-builder' ) }
							value={ amount }
							onChange={ ( val ) =>
								setAttributes( { amount: val } )
							}
						/>

						<PanelColorSettings
							colorSettings={ [
								{
									value: priceColor,
									onChange: ( val ) =>
										setAttributes( { priceColor: val } ),
									label: __( 'Price Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Amount Font Size (rem)',
								'mk-builder'
							) }
							value={ amountFontSize }
							onChange={ ( val ) =>
								setAttributes( { amountFontSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
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
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Features List', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Feature Marker Style', 'mk-builder' ) }
							value={ featureMarkerType }
							options={ [
								{
									label: __(
										'Bullet (Default Icons)',
										'mk-builder'
									),
									value: 'bullet',
								},
								{
									label: __( 'Image', 'mk-builder' ),
									value: 'image',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { featureMarkerType: val } )
							}
						/>

						{ featureMarkerType === 'image' && (
							<BaseControl
								label={ __( 'Feature Marker Image', 'mk-builder' ) }
							>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												featureMarkerImageUrl:
													media?.url || '',
												featureMarkerImageId:
													media?.id || undefined,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ featureMarkerImageId }
										render={ ( { open } ) => (
											<Button
												isSecondary
												isSmall
												onClick={ open }
											>
												{ featureMarkerImageUrl
													? __(
															'Replace Marker Image',
															'mk-builder'
													  )
													: __(
															'Select Marker Image',
															'mk-builder'
													  ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ featureMarkerImageUrl && (
									<div style={ { marginTop: '10px' } }>
										<img
											src={ featureMarkerImageUrl }
											alt={ __(
												'Feature marker preview',
												'mk-builder'
											) }
											style={ {
												width: '24px',
												height: '24px',
												objectFit: 'contain',
												display: 'block',
												marginBottom: '8px',
											} }
										/>
										<Button
											isDestructive
											isSmall
											onClick={ () =>
												setAttributes( {
													featureMarkerImageUrl: '',
													featureMarkerImageId:
														undefined,
												} )
											}
										>
											{ __(
												'Remove Marker Image',
												'mk-builder'
											) }
										</Button>
									</div>
								) }
							</BaseControl>
						) }
						<Divider />
						<BaseControl
							label={ __( 'Features', 'mk-builder' ) }
						>
							{ features.map( ( feat, index ) => (
								<div
									key={ index }
									style={ {
										marginBottom: '10px',
										padding: '10px',
										border: '1px solid #e0e0e0',
										borderRadius: '4px',
									} }
								>
									<TextControl
										label={ __(
											'Feature text',
											'mk-builder'
										) }
										value={ feat.text }
										onChange={ ( val ) =>
											updateFeature( index, 'text', val )
										}
									/>

									<ToggleControl
										label={ __(
											'Available (check icon)',
											'mk-builder'
										) }
										checked={ feat.available }
										onChange={ ( val ) =>
											updateFeature(
												index,
												'available',
												val
											)
										}
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () => removeFeature( index ) }
										style={ { marginTop: '8px' } }
									>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addFeature }>
								{ __( 'Add Feature', 'mk-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'Feature Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: featureTextColor,
									onChange: ( val ) =>
										setAttributes( {
											featureTextColor: val,
										} ),
									label: __( 'Text Color', 'mk-builder' ),
								},
								{
									value: featureUnavailableColor,
									onChange: ( val ) =>
										setAttributes( {
											featureUnavailableColor: val,
										} ),
									label: __(
										'Unavailable Text Color',
										'mk-builder'
									),
								},
								{
									value: featureIconColor,
									onChange: ( val ) =>
										setAttributes( {
											featureIconColor: val,
										} ),
									label: __(
										'Check Icon Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Feature Font Size (rem)',
								'mk-builder'
							) }
							value={ featureFontSize }
							onChange={ ( val ) =>
								setAttributes( { featureFontSize: val } )
							}
							min={ 0.75 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
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
									label={ __( 'Rel', 'mk-builder' ) }
									value={ buttonRel }
									onChange={ ( val ) =>
										setAttributes( { buttonRel: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Button Style',
										'mk-builder'
									) }
									value={ buttonStyle }
									options={ [
										{
											label: __(
												'Primary (filled)',
												'mk-builder'
											),
											value: 'primary',
										},
										{
											label: __(
												'Outline',
												'mk-builder'
											),
											value: 'outline',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { buttonStyle: val } )
									}
								/>

								<PanelColorSettings
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
												'Text Color',
												'mk-builder'
											),
										},
										{
											value: buttonBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonBorderColor: val,
												} ),
											label: __(
												'Border Color',
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
									max={ 30 }
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
									min={ 0.7 }
									max={ 1.2 }
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
									min={ 400 }
									max={ 900 }
									step={ 100 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ isRecommended && ribbonText && (
					<div
						className="ribbon"
						style={ {
							position: 'absolute',
							top: 15,
							right: -30,
							background: '#f48b2a',
							color: '#fff',
							padding: '5px 40px',
							fontSize: '0.75rem',
							fontWeight: 700,
							transform: 'rotate(45deg)',
							textTransform: 'uppercase',
						} }
					>
						{ ribbonText }
					</div>
				) }
				{ showHeader && (
				<div
					className="pkg-header"
					style={ {
						padding: 30,
						textAlign: 'center',
						borderBottom: '1px solid #eee',
						background: 'linear-gradient(to bottom, #fff, #fcfcfc)',
					} }
				>
					<RichText
						tagName="h3"
						className="pkg-name"
						value={ packageName }
						onChange={ ( val ) =>
							setAttributes( { packageName: val } )
						}
						placeholder={ __( 'Package name...', 'mk-builder' ) }
						style={ {
							fontSize: `${ packageNameFontSize }rem`,
							fontWeight: packageNameFontWeight,
							color: packageNameColor,
							margin: '0 0 10px',
							textTransform: 'uppercase',
							letterSpacing: '0.5px',
						} }
					/>

					<div
						className="pkg-price"
						style={ {
							color: priceColor,
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'center',
							lineHeight: 1,
						} }
					>
						<span
							className="currency"
							style={ {
								fontSize: '1rem',
								marginTop: 5,
								marginRight: 2,
								fontWeight: 700,
							} }
						>
							{ currency }
						</span>
						<span
							className="amount"
							style={ {
								fontSize: `${ amountFontSize }rem`,
								fontWeight: 800,
							} }
						>
							{ amount }
						</span>
					</div>
					<RichText
						tagName="p"
						className="pkg-desc"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Short description...',
							'mk-builder'
						) }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							marginTop: 10,
						} }
					/>
				</div>
				) }
				<div
					className="pkg-body"
					style={ {
						padding: shouldUseImageCard ? 0 : 30,
						flexGrow: 1,
					} }
				>
					{ shouldUseImageCard ? (
						<div className="pkg-display-image">
							<img
								src={ itemImageUrl }
								alt={ itemImageAlt || packageName || '' }
								loading="lazy"
								decoding="async"
							/>
						</div>
					) : (
						<ul
							className="pkg-features"
							style={ { listStyle: 'none', padding: 0, margin: 0 } }
						>
							{ features.map( ( feat, index ) => (
								<li
									key={ index }
									className={
										feat.available ? '' : 'unavailable'
									}
									style={ {
										display: 'flex',
										alignItems: 'flex-start',
										marginBottom: 15,
										fontSize: `${ featureFontSize }rem`,
										color: feat.available
											? featureTextColor
											: featureUnavailableColor,
										textDecoration: feat.available
											? 'none'
											: 'line-through',
									} }
								>
									{ shouldUseImageMarker ? (
										<img
											src={ featureMarkerImageUrl }
											alt=""
											style={ {
												width: '18px',
												height: '18px',
												marginRight: 12,
												marginTop: 2,
												objectFit: 'contain',
												flexShrink: 0,
											} }
											aria-hidden
										/>
									) : (
										<i
											className={
												feat.available
													? 'fas fa-check-circle'
													: 'fas fa-times-circle'
											}
											style={ {
												color: feat.available
													? featureIconColor
													: '#ccc',
												marginRight: 12,
												marginTop: 4,
												fontSize: '1rem',
												flexShrink: 0,
											} }
											aria-hidden
										/>
									) }

									<span>{ feat.text }</span>
								</li>
							) ) }
						</ul>
					) }
				</div>
				{ showFooterButton && (
					<div
						className="pkg-footer"
						style={ {
							padding: '0 30px 30px',
							textAlign: 'center',
						} }
					>
						<a
							href={ buttonUrl }
							className="jivaka-btn"
							style={ {
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								padding: '12px 30px',
								borderRadius: `${ buttonBorderRadius }px`,
								fontWeight: buttonFontWeight,
								fontSize: `${ buttonFontSize }rem`,
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
								backgroundColor:
									buttonStyle === 'primary'
										? '#f48b2a'
										: buttonBgColor,
								color: buttonTextColor,
								border: `2px solid ${
									buttonStyle === 'primary'
										? 'transparent'
										: buttonBorderColor
								}`,

								textDecoration: 'none',
								cursor: 'pointer',
							} }
							target={ buttonTarget ? '_blank' : '_self' }
							rel={ buttonRel }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ buttonText }
						</a>
					</div>
				) }
			</div>
		</>
	);
}
