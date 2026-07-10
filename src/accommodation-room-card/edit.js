import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const PRIMARY_ORANGE = '#f48b2a';
const DARK_GREY = '#212121';
const MEDIUM_GREY = '#666666';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		imageUrl,
		imageId,
		imageAlt,
		imageHeight,
		imageObjectFit,
		priceText,
		priceBgColor,
		priceTextColor,
		priceFontSize,
		amenities,
		amenityIconColor,
		amenityTextColor,
		amenityFontSize,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonBgColor,
		buttonTextColor,
		buttonBorderColor,
		buttonFontSize,
		buttonFontWeight,
		detailsPadding,
		detailsPaddingMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-accommodation-room-card-editor room-card fade-up',
			style: {
				borderRadius: '12px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fff',
				display: 'flex',
				flexDirection: 'column',
			},
		} ),
		[]
	);

	const addAmenity = () => {
		const newItem = {
			id: amenities.length
				? Math.max( ...amenities.map( ( i ) => i.id ) ) + 1
				: 1,
			icon: 'fas fa-check',
			text: __( 'New amenity', 'mk-builder' ),
		};
		setAttributes( { amenities: [ ...amenities, newItem ] } );
	};

	const updateAmenity = ( id, field, value ) => {
		const updated = amenities.map( ( item ) =>
			item.id === id ? { ...item, [ field ]: value } : item
		);
		setAttributes( { amenities: updated } );
	};

	const removeAmenity = ( id ) => {
		setAttributes( {
			amenities: amenities.filter( ( item ) => item.id !== id ),
		} );
	};

	const effectiveTitleColor = titleColor || DARK_GREY;
	const effectiveAmenityIcon = amenityIconColor || PRIMARY_ORANGE;
	const effectiveAmenityText = amenityTextColor || MEDIUM_GREY;
	const effectiveBtnBg = buttonBgColor || 'transparent';
	const effectiveBtnText = buttonTextColor || DARK_GREY;
	const effectiveBtnBorder = buttonBorderColor || DARK_GREY;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Room Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Image', 'mk-builder' ) }>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt: media.alt || 'Room',
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Room Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ imageUrl }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
											borderRadius: '8px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: null,
												imageAlt: 'Room',
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
						<TextControl
							label={ __( 'Alt Text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>

						<RangeControl
							label={ __( 'Image Height (px)', 'mk-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) =>
								setAttributes( { imageHeight: val } )
							}
							min={ 150 }
							max={ 400 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Price Badge', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Price Text', 'mk-builder' ) }
							value={ priceText }
							onChange={ ( val ) =>
								setAttributes( { priceText: val } )
							}
							help={ __(
								'e.g. 30,000 MMK / Night',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __(
								'Price Badge Colors',
								'mk-builder'
							) }
							colorSettings={ [
								{
									value: priceBgColor,
									onChange: ( val ) =>
										setAttributes( { priceBgColor: val } ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: priceTextColor,
									onChange: ( val ) =>
										setAttributes( {
											priceTextColor: val,
										} ),
									label: __( 'Text', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ priceFontSize }
							onChange={ ( val ) =>
								setAttributes( { priceFontSize: val } )
							}
							min={ 0.75 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Room Title', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor || DARK_GREY,
									onChange: ( val ) =>
										setAttributes( {
											titleColor: val || '',
										} ),
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
							min={ 1 }
							max={ 2 }
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
						title={ __( 'Amenities', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Amenity Items', 'mk-builder' ) }
						>
							{ amenities.map( ( item ) => (
								<div
									key={ item.id }
									style={ {
										marginBottom: '10px',
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
										flexWrap: 'wrap',
									} }
								>
									<TextControl
										label={ __(
											'Icon class',
											'mk-builder'
										) }
										value={ item.icon }
										onChange={ ( val ) =>
											updateAmenity(
												item.id,
												'icon',
												val
											)
										}
										style={ { width: '120px' } }
									/>

									<TextControl
										value={ item.text }
										onChange={ ( val ) =>
											updateAmenity(
												item.id,
												'text',
												val
											)
										}
										style={ { flex: 1, minWidth: '140px' } }
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeAmenity( item.id )
										}
									>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addAmenity }>
								{ __( 'Add Amenity', 'mk-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'Amenity Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: amenityIconColor || PRIMARY_ORANGE,
									onChange: ( val ) =>
										setAttributes( {
											amenityIconColor: val || '',
										} ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
								{
									value: amenityTextColor || MEDIUM_GREY,
									onChange: ( val ) =>
										setAttributes( {
											amenityTextColor: val || '',
										} ),
									label: __( 'Text Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ amenityFontSize }
							onChange={ ( val ) =>
								setAttributes( { amenityFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.1 }
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

								<Divider />
								<PanelColorSettings
									title={ __(
										'Button Colors',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value:
												buttonBgColor || 'transparent',
											onChange: ( val ) =>
												setAttributes( {
													buttonBgColor: val || '',
												} ),
											label: __(
												'Background',
												'mk-builder'
											),
										},
										{
											value: buttonTextColor || DARK_GREY,
											onChange: ( val ) =>
												setAttributes( {
													buttonTextColor: val || '',
												} ),
											label: __(
												'Text',
												'mk-builder'
											),
										},
										{
											value:
												buttonBorderColor || DARK_GREY,
											onChange: ( val ) =>
												setAttributes( {
													buttonBorderColor:
														val || '',
												} ),
											label: __(
												'Border',
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
									value={ buttonFontSize }
									onChange={ ( val ) =>
										setAttributes( { buttonFontSize: val } )
									}
									min={ 0.75 }
									max={ 1.1 }
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

					<PanelBody
						title={ __( 'Details Padding', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Padding Desktop (px)',
								'mk-builder'
							) }
							value={ detailsPadding }
							onChange={ ( val ) =>
								setAttributes( { detailsPadding: val } )
							}
							min={ 16 }
							max={ 40 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Padding Mobile (px)',
								'mk-builder'
							) }
							value={ detailsPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { detailsPaddingMobile: val } )
							}
							min={ 16 }
							max={ 35 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="room-img"
					style={ {
						height: `${ imageHeight }px`,
						overflow: 'hidden',
						position: 'relative',
						background: '#f0f0f0',
					} }
				>
					{ imageUrl ? (
						<>
							<img
								src={ imageUrl }
								alt={ imageAlt }
								style={ {
									width: '100%',
									height: '100%',
									objectFit: imageObjectFit,
									display: 'block',
								} }
								decoding="async"
							/>

							{ priceText && (
								<div
									className="room-price"
									style={ {
										position: 'absolute',
										bottom: '15px',
										right: '15px',
										background: priceBgColor,
										color: priceTextColor,
										padding: '5px 15px',
										borderRadius: '20px',
										fontWeight: 700,
										fontSize: `${ priceFontSize }rem`,
									} }
								>
									{ priceText }
								</div>
							) }
						</>
					) : (
						<MediaPlaceholder
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media.url,
									imageId: media.id,
									imageAlt: media.alt || 'Room',
								} )
							}
							allowedTypes={ [ 'image' ] }
							multiple={ false }
							labels={ {
								title: __( 'Room Image', 'mk-builder' ),
							} }
							className="room-img-placeholder"
						/>
					) }
				</div>

				<div
					className="room-details"
					style={ {
						padding: `${ detailsPadding }px`,
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
					} }
				>
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Room title...', 'mk-builder' ) }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: effectiveTitleColor,
							margin: '0 0 10px',
						} }
					/>

					{ amenities.length > 0 && (
						<ul
							className="room-amenities"
							style={ {
								listStyle: 'none',
								margin: '15px 0',
								padding: 0,
								color: effectiveAmenityText,
								fontSize: `${ amenityFontSize }rem`,
							} }
						>
							{ amenities.map( ( item ) => (
								<li
									key={ item.id }
									style={ {
										marginBottom: '8px',
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
									} }
								>
									{ item.icon && (
										<i
											className={ item.icon }
											style={ {
												color: effectiveAmenityIcon,
												width: '20px',
												textAlign: 'center',
											} }
											aria-hidden="true"
										/>
									) }
									<span>{ item.text }</span>
								</li>
							) ) }
						</ul>
					) }

					{ showButton && (
						<a
							href={ buttonUrl }
							className="room-btn"
							style={ {
								marginTop: 'auto',
								width: '100%',
								textAlign: 'center',
								padding: '10px',
								border: `1px solid ${ effectiveBtnBorder }`,
								borderRadius: '5px',
								fontWeight: buttonFontWeight,
								fontSize: `${ buttonFontSize }rem`,
								backgroundColor: effectiveBtnBg,
								color: effectiveBtnText,
								textDecoration: 'none',
								display: 'block',
							} }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ buttonText }
						</a>
					) }
				</div>
			</div>
		</>
	);
}
