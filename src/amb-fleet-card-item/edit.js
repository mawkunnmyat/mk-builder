import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	Button,
	PanelColorSettings,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		badgeText,
		badgeStyle,
		badgeBgColor,
		image,
		imageId,
		imageAlt,
		imageHeight,
		imageObjectFit,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionMarginBottom,
		listItems,
		listIconColor,
		infoPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-amb-fleet-card-item-editor',
			style: {
				position: 'relative',
				borderRadius: '8px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fff',
			},
		} ),
		[]
	);

	const getBadgeStyle = () => {
		if ( badgeBgColor ) return { background: badgeBgColor, color: '#fff' };
		if ( badgeStyle === 'primary' )
			return { background: 'var(--amb-primary, #f48b2a)', color: '#fff' };
		return { background: 'var(--amb-dark, #0f172a)', color: '#fff' };
	};

	const addListItem = () => {
		const id = listItems.length
			? Math.max( ...listItems.map( ( i ) => i.id ) ) + 1
			: 1;
		setAttributes( {
			listItems: [
				...listItems,
				{
					id,
					text: __( 'New feature', 'mk-builder' ),
					icon: 'fa-check-circle',
				},
			],
		} );
	};

	const updateListItem = ( id, field, value ) => {
		setAttributes( {
			listItems: listItems.map( ( item ) =>
				item.id === id ? { ...item, [ field ]: value } : item
			),
		} );
	};

	const removeListItem = ( id ) => {
		setAttributes( {
			listItems: listItems.filter( ( i ) => i.id !== id ),
		} );
	};

	const iconOptions = [
		{
			label: __( 'Check Circle', 'mk-builder' ),
			value: 'fa-check-circle',
		},
		{ label: __( 'User Nurse', 'mk-builder' ), value: 'fa-user-nurse' },
		{ label: __( 'Plus', 'mk-builder' ), value: 'fa-plus' },
		{ label: __( 'Heart', 'mk-builder' ), value: 'fa-heart' },
		{
			label: __( 'Stethoscope', 'mk-builder' ),
			value: 'fa-stethoscope',
		},
	];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Badge', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Badge Text', 'mk-builder' ) }
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
						/>

						<SelectControl
							label={ __( 'Badge Style', 'mk-builder' ) }
							value={ badgeStyle }
							options={ [
								{
									label: __( 'Dark', 'mk-builder' ),
									value: 'dark',
								},
								{
									label: __(
										'Primary (Orange)',
										'mk-builder'
									),
									value: 'primary',
								},
								{
									label: __( 'Custom', 'mk-builder' ),
									value: 'custom',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { badgeStyle: val } )
							}
						/>

						{ badgeStyle === 'custom' && (
							<PanelColorSettings
								title={ __(
									'Badge Background',
									'mk-builder'
								) }
								colorSettings={ [
									{
										value: badgeBgColor,
										onChange: ( val ) =>
											setAttributes( {
												badgeBgColor: val || '',
											} ),
										label: __(
											'Background',
											'mk-builder'
										),
									},
								] }
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ! image ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										image: media.url,
										imageId: media.id,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Fleet / Ambulance Image',
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
											imageAlt: '',
										} )
									}
								>
									{ __( 'Replace Image', 'mk-builder' ) }
								</Button>
							</div>
						) }
						<Divider />
						<TextControl
							label={ __( 'Image Alt Text', 'mk-builder' ) }
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
							min={ 200 }
							max={ 500 }
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
							] }
							onChange={ ( val ) =>
								setAttributes( { imageObjectFit: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title & Description', 'mk-builder' ) }
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
							label={ __(
								'Title Font Size (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<Divider />
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
								'Description Font Size (rem)',
								'mk-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.3 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __(
								'Description Margin Bottom (px)',
								'mk-builder'
							) }
							value={ descriptionMarginBottom }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionMarginBottom: val,
								} )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Feature List', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'List Items', 'mk-builder' ) }
						>
							{ listItems.map( ( item ) => (
								<div
									key={ item.id }
									style={ {
										marginBottom: '12px',
										padding: '10px',
										background: '#f5f5f5',
										borderRadius: '4px',
									} }
								>
									<TextControl
										label={ __( 'Text', 'mk-builder' ) }
										value={ item.text }
										onChange={ ( val ) =>
											updateListItem(
												item.id,
												'text',
												val
											)
										}
										style={ { marginBottom: '8px' } }
									/>

									<SelectControl
										label={ __( 'Icon', 'mk-builder' ) }
										value={ item.icon || 'fa-check-circle' }
										options={ iconOptions }
										onChange={ ( val ) =>
											updateListItem(
												item.id,
												'icon',
												val
											)
										}
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeListItem( item.id )
										}
										style={ { marginTop: '8px' } }
									>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addListItem }>
								{ __( 'Add Feature', 'mk-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'List Icon Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: listIconColor,
									onChange: ( val ) =>
										setAttributes( { listIconColor: val } ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Content Padding (px)',
								'mk-builder'
							) }
							value={ infoPadding }
							onChange={ ( val ) =>
								setAttributes( { infoPadding: val } )
							}
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ badgeText && (
					<span
						className="amb-fleet-badge"
						style={ {
							position: 'absolute',
							top: '20px',
							left: '20px',
							zIndex: 2,
							padding: '5px 15px',
							fontSize: '0.8rem',
							textTransform: 'uppercase',
							fontWeight: 700,
							...getBadgeStyle(),
						} }
					>
						{ badgeText }
					</span>
				) }

				{ image ? (
					<img
						src={ image }
						alt={ imageAlt }
						className="amb-fleet-img"
						style={ {
							width: '100%',
							height: `${ imageHeight }px`,
							objectFit: imageObjectFit,
							display: 'block',
						} }
					/>
				) : (
					<div
						style={ {
							height: `${ imageHeight }px`,
							background: '#e0e0e0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#666',
							fontSize: '14px',
						} }
					>
						{ __( 'Add image in block settings', 'mk-builder' ) }
					</div>
				) }

				<div
					className="amb-fleet-info"
					style={ {
						padding: `${ infoPadding }px`,
					} }
				>
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Card title...', 'mk-builder' ) }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							marginTop: 0,
							marginBottom: '15px',
						} }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Short description...',
							'mk-builder'
						) }
						style={ {
							color: descriptionColor,
							fontSize: `${ descriptionFontSize }rem`,
							marginBottom: `${ descriptionMarginBottom }px`,
						} }
					/>

					{ listItems && listItems.length > 0 && (
						<ul
							className="amb-fleet-list"
							style={ {
								listStyle: 'none',
								padding: 0,
								margin: 0,
							} }
						>
							{ listItems.map( ( item ) => (
								<li
									key={ item.id }
									style={ {
										marginBottom: '10px',
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
									} }
								>
									<i
										className={ `fas ${
											item.icon || 'fa-check-circle'
										}` }
										style={ {
											color: listIconColor,
											flexShrink: 0,
										} }
										aria-hidden
									/>

									<span>{ item.text }</span>
								</li>
							) ) }
						</ul>
					) }
				</div>
			</div>
		</>
	);
}
