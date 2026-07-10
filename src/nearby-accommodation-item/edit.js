import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageId,
		imageAlt,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		subtitle,
		subtitleColor,
		subtitleFontSize,
		overlayPadding,
		overlayGradientStart,
		overlayGradientEnd,
		cardHeight,
		cardBorderRadius,
		linkUrl,
		linkOpenInNewTab,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-nearby-accommodation-item-editor hotel-card',
			style: {
				position: 'relative',
				borderRadius: `${ cardBorderRadius }px`,
				overflow: 'hidden',
				height: `${ cardHeight }px`,
				border: '2px dashed #e0e0e0',
				background: '#f0f0f0',
			},
		} ),
		[ cardBorderRadius, cardHeight ]
	);

	const overlayStyle = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		padding: `${ overlayPadding }px`,
		background: `linear-gradient(${ overlayGradientStart }, ${ overlayGradientEnd })`,
		color: '#fff',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Hotel Image', 'mk-builder' ) }
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
											'Hotel Image',
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
											height: 'auto',
											maxHeight: '180px',
											objectFit: 'cover',
											borderRadius: '8px',
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
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Alt Text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'mk-builder' ) }
						initialOpen={ false }
					>
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

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Subtitle', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Subtitle', 'mk-builder' ) }
							value={ subtitle }
							onChange={ ( val ) =>
								setAttributes( { subtitle: val } )
							}
							help={ __(
								'e.g. 5 Star • 5 mins away',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Subtitle Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: subtitleColor,
									onChange: ( val ) =>
										setAttributes( { subtitleColor: val } ),
									label: __(
										'Subtitle Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ subtitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { subtitleFontSize: val } )
							}
							min={ 0.7 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Link', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Link URL', 'mk-builder' ) }
							help={ __(
								'Make the whole card clickable. Leave empty for no link.',
								'mk-builder'
							) }
						>
							<URLInput
								value={ linkUrl }
								onChange={ ( val ) =>
									setAttributes( { linkUrl: val || '' } )
								}
							/>
						</BaseControl>
						{ linkUrl && (
							<ToggleControl
								label={ __(
									'Open in new tab',
									'mk-builder'
								) }
								checked={ linkOpenInNewTab }
								onChange={ ( val ) =>
									setAttributes( { linkOpenInNewTab: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Card Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Card Height (px)', 'mk-builder' ) }
							value={ cardHeight }
							onChange={ ( val ) =>
								setAttributes( { cardHeight: val } )
							}
							min={ 150 }
							max={ 350 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Border Radius (px)',
								'mk-builder'
							) }
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 24 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Overlay Padding (px)',
								'mk-builder'
							) }
							value={ overlayPadding }
							onChange={ ( val ) =>
								setAttributes( { overlayPadding: val } )
							}
							min={ 10 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ image ? (
					( () => {
						const cardContent = (
							<>
								<img
									src={ image }
									alt={ imageAlt }
									style={ {
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										display: 'block',
									} }
								/>

								<div
									className="hotel-overlay"
									style={ overlayStyle }
								>
									<RichText
										tagName="h4"
										value={ title }
										onChange={ ( val ) =>
											setAttributes( { title: val } )
										}
										placeholder={ __(
											'Hotel name...',
											'mk-builder'
										) }
										style={ {
											margin: 0,
											fontSize: `${ titleFontSize }rem`,
											fontWeight: titleFontWeight,
											color: titleColor,
										} }
									/>

									<RichText
										tagName="p"
										value={ subtitle }
										onChange={ ( val ) =>
											setAttributes( { subtitle: val } )
										}
										placeholder={ __(
											'5 Star • 5 mins away',
											'mk-builder'
										) }
										style={ {
											margin: '5px 0 0',
											fontSize: `${ subtitleFontSize }rem`,
											color: subtitleColor,
											opacity: 0.9,
										} }
									/>
								</div>
							</>
						);

						return linkUrl ? (
							<a
								href={ linkUrl }
								target={
									linkOpenInNewTab ? '_blank' : undefined
								}
								rel={
									linkOpenInNewTab
										? 'noopener noreferrer'
										: undefined
								}
								style={ {
									display: 'block',
									height: '100%',
									textDecoration: 'none',
									color: 'inherit',
								} }
								onClick={ ( e ) => e.preventDefault() }
							>
								{ cardContent }
							</a>
						) : (
							cardContent
						);
					} )()
				) : (
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
							title: __( 'Hotel Image', 'mk-builder' ),
						} }
						className="hotel-card-placeholder"
						style={ { minHeight: `${ cardHeight }px` } }
					/>
				) }
			</div>
		</>
	);
}
