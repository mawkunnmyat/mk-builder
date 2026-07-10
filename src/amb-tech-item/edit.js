import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	PanelColorSettings,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{ value: 'fa-heartbeat', label: __( 'Heartbeat', 'mk-builder' ) },
	{ value: 'fa-lungs', label: __( 'Lungs', 'mk-builder' ) },
	{ value: 'fa-map-marker-alt', label: __( 'Map Marker', 'mk-builder' ) },
	{ value: 'fa-first-aid', label: __( 'First Aid', 'mk-builder' ) },
	{ value: 'fa-stethoscope', label: __( 'Stethoscope', 'mk-builder' ) },
	{ value: 'fa-syringe', label: __( 'Syringe', 'mk-builder' ) },
	{ value: 'fa-ambulance', label: __( 'Ambulance', 'mk-builder' ) },
	{ value: 'fa-heart-pulse', label: __( 'Heart Pulse', 'mk-builder' ) },
	{ value: 'fa-bolt', label: __( 'Bolt', 'mk-builder' ) },
	{ value: 'fa-shield-alt', label: __( 'Shield', 'mk-builder' ) },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		icon,
		title,
		description,
		iconColor,
		iconSize,
		iconMarginBottom,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		itemPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-amb-tech-item-editor amb-tech-item',
			style: {
				padding: `${ itemPadding }px`,
				background: 'rgba(255, 255, 255, 0.05)',
				borderRadius: '8px',
				border: '1px solid rgba(255, 255, 255, 0.1)',
				borderColor: 'rgba(255, 255, 255, 0.1)',
			},
		} ),
		[ itemPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Font Awesome Icon Class',
								'mk-builder'
							) }
							value={ icon }
							onChange={ ( val ) =>
								setAttributes( { icon: val || 'fa-circle' } )
							}
							help={ __(
								'e.g. fa-heartbeat, fa-lungs, fa-first-aid',
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
									label: __( 'Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'mk-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Icon Margin Bottom (px)',
								'mk-builder'
							) }
							value={ iconMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { iconMarginBottom: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
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
									label: __( 'Color', 'mk-builder' ),
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
							max={ 30 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'mk-builder' ) }
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
									label: __( 'Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Item Padding (px)', 'mk-builder' ) }
							value={ itemPadding }
							onChange={ ( val ) =>
								setAttributes( { itemPadding: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ icon && (
					<i
						className={ `fas ${ icon } amb-tech-icon` }
						style={ {
							fontSize: `${ iconSize }rem`,
							color: iconColor,
							marginBottom: `${ iconMarginBottom }px`,
							display: 'block',
						} }
						aria-hidden
					/>
				) }
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title...', 'mk-builder' ) }
					style={ {
						color: titleColor,
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						marginBottom: `${ titleMarginBottom }px`,
						marginTop: 0,
					} }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description...', 'mk-builder' ) }
					style={ {
						color: descriptionColor,
						fontSize: `${ descriptionFontSize }rem`,
						margin: 0,
					} }
				/>
			</div>
		</>
	);
}
