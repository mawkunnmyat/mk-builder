import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'Thermometer (Acute Illnesses)', 'mk-builder' ),
		value: 'fas fa-thermometer-half',
	},
	{
		label: __( 'Heartbeat (Chronic)', 'mk-builder' ),
		value: 'fas fa-heartbeat',
	},
	{
		label: __( 'Shield (Preventative)', 'mk-builder' ),
		value: 'fas fa-user-shield',
	},
	{
		label: __( 'Lungs (Respiratory)', 'mk-builder' ),
		value: 'fas fa-lungs',
	},
	{
		label: __( 'Capsules (GI Health)', 'mk-builder' ),
		value: 'fas fa-capsules',
	},
	{
		label: __( 'Virus (Infectious)', 'mk-builder' ),
		value: 'fas fa-virus',
	},
	{
		label: __( 'Band Aid (Procedures)', 'mk-builder' ),
		value: 'fas fa-band-aid',
	},
	{
		label: __( 'Syringe (Vaccinations)', 'mk-builder' ),
		value: 'fas fa-syringe',
	},
	{ label: __( 'Allergies', 'mk-builder' ), value: 'fas fa-allergies' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { icon, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'jivaka-gm-service-card mk-gm-service-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Service Item', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon Preset', 'mk-builder' ) }
							value={ icon }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'mk-builder'
							) }
							value={ icon }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
							help={ __(
								'Example: fas fa-heartbeat',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="jivaka-gm-icon-box">
					<i className={ icon || 'fas fa-stethoscope' } />
				</div>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Service title...', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __(
						'Service description...',
						'mk-builder'
					) }
				/>
			</div>
		</>
	);
}
