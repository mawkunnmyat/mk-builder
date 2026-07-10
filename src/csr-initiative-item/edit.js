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
	RangeControl,
	TextControl,
	SelectControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const objectFitOptions = [
	{ label: __( 'Cover', 'mk-builder' ), value: 'cover' },
	{ label: __( 'Contain', 'mk-builder' ), value: 'contain' },
	{ label: __( 'Fill', 'mk-builder' ), value: 'fill' },
	{ label: __( 'None', 'mk-builder' ), value: 'none' },
];

const objectPositionOptions = [
	{ label: __( 'Center', 'mk-builder' ), value: 'center' },
	{ label: __( 'Top', 'mk-builder' ), value: 'top' },
	{ label: __( 'Bottom', 'mk-builder' ), value: 'bottom' },
	{ label: __( 'Left', 'mk-builder' ), value: 'left' },
	{ label: __( 'Right', 'mk-builder' ), value: 'right' },
];

const COMMON_ICONS = [
	{ label: __( 'Ambulance', 'mk-builder' ), value: 'fas fa-ambulance' },
	{ label: __( 'Heart', 'mk-builder' ), value: 'fas fa-heart' },
	{
		label: __( 'Hand Holding Heart', 'mk-builder' ),
		value: 'fas fa-hand-holding-heart',
	},
	{ label: __( 'Hospital', 'mk-builder' ), value: 'fas fa-hospital' },
	{
		label: __( 'Stethoscope', 'mk-builder' ),
		value: 'fas fa-stethoscope',
	},
	{ label: __( 'Pills', 'mk-builder' ), value: 'fas fa-pills' },
	{ label: __( 'Users', 'mk-builder' ), value: 'fas fa-users' },
	{
		label: __( 'Hands Helping', 'mk-builder' ),
		value: 'fas fa-hands-helping',
	},
	{ label: __( 'Globe', 'mk-builder' ), value: 'fas fa-globe' },
];

const iconSelectOptions = [
	...COMMON_ICONS,
	{ label: __( 'Custom...', 'mk-builder' ), value: '__custom__' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageId,
		imageAlt,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		iconClass,
		iconColor,
		iconBgColor,
		iconSize,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		contentPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-initiative-item-editor',
			style: {
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '12px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image Settings', 'mk-builder' ) }
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
										'Select Initiative Image',
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
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove Image', 'mk-builder' ) }
								</Button>
							</div>
						) }

						{ image && (
							<>
								<Divider />
								<TextControl
									label={ __(
										'Image Alt Text',
										'mk-builder'
									) }
									value={ imageAlt }
									onChange={ ( val ) =>
										setAttributes( { imageAlt: val } )
									}
									help={ __(
										'Accessibility and SEO',
										'mk-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Image Height (px)',
										'mk-builder'
									) }
									value={ imageHeight }
									onChange={ ( val ) =>
										setAttributes( { imageHeight: val } )
									}
									min={ 120 }
									max={ 400 }
									step={ 10 }
								/>

								<SelectControl
									label={ __(
										'Object Fit',
										'mk-builder'
									) }
									value={ imageObjectFit }
									options={ objectFitOptions }
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
									options={ objectPositionOptions }
									onChange={ ( val ) =>
										setAttributes( {
											imageObjectPosition: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Icon Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Quick Select Icon', 'mk-builder' ) }
							value={
								COMMON_ICONS.find(
									( i ) => i.value === iconClass
								)
									? iconClass
									: '__custom__'
							}
							options={ iconSelectOptions }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass:
										val === '__custom__'
											? iconClass || 'fas fa-heart'
											: val,
								} )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'mk-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-heart',
								} )
							}
							help={ __(
								'e.g., fas fa-ambulance',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Icon Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon Background',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'mk-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Typography', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl label={ __( 'Title', 'mk-builder' ) }>
							<RangeControl
								label={ __(
									'Font Size (rem)',
									'mk-builder'
								) }
								value={ titleFontSize }
								onChange={ ( val ) =>
									setAttributes( { titleFontSize: val } )
								}
								min={ 0.9 }
								max={ 2.5 }
								step={ 0.1 }
							/>

							<RangeControl
								label={ __( 'Font Weight', 'mk-builder' ) }
								value={ titleFontWeight }
								onChange={ ( val ) =>
									setAttributes( { titleFontWeight: val } )
								}
								min={ 300 }
								max={ 900 }
								step={ 100 }
							/>

							<PanelColorSettings
								colorSettings={ [
									{
										value: titleColor,
										onChange: ( val ) =>
											setAttributes( {
												titleColor: val,
											} ),
										label: __(
											'Title Color',
											'mk-builder'
										),
									},
								] }
							/>
						</BaseControl>
						<Divider />
						<BaseControl
							label={ __( 'Description', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Font Size (rem)',
									'mk-builder'
								) }
								value={ descriptionFontSize }
								onChange={ ( val ) =>
									setAttributes( {
										descriptionFontSize: val,
									} )
								}
								min={ 0.75 }
								max={ 1.5 }
								step={ 0.05 }
							/>

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
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Content Padding (px)',
								'mk-builder'
							) }
							value={ contentPadding }
							onChange={ ( val ) =>
								setAttributes( { contentPadding: val } )
							}
							min={ 15 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! image ? (
					<div
						className="init-img-wrap"
						style={ {
							height: `${ imageHeight }px`,
							background: '#e8e8e8',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#999',
							fontSize: '0.9rem',
						} }
					>
						{ __( 'Add image in sidebar', 'mk-builder' ) }
					</div>
				) : (
					<div
						className="init-img-wrap"
						style={ {
							height: `${ imageHeight }px`,
							overflow: 'hidden',
						} }
					>
						<img
							src={ image }
							alt={ imageAlt || title || '' }
							decoding="async"
							style={ {
								width: '100%',
								height: '100%',
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
							} }
						/>
					</div>
				) }

				<div
					className="init-content"
					style={ {
						padding: `${ contentPadding }px`,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					} }
				>
					<div
						className="init-icon"
						style={ {
							color: iconColor,
							backgroundColor: iconBgColor,
							fontSize: `${ iconSize }rem`,
							width: '50px',
							height: '50px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
							marginBottom: '15px',
							flexShrink: 0,
						} }
					>
						<i
							className={ iconClass || 'fas fa-heart' }
							aria-hidden="true"
						/>
					</div>
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Initiative title...',
							'mk-builder'
						) }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: titleColor,
							margin: '0 0 10px 0',
							lineHeight: 1.3,
						} }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Initiative description...',
							'mk-builder'
						) }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							margin: 0,
							lineHeight: 1.6,
						} }
					/>
				</div>
			</div>
		</>
	);
}
