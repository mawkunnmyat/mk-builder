import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'Stethoscope (General Medicine)', 'mk-builder' ),
		value: 'fas fa-stethoscope',
	},
	{
		label: __( 'Allergies (Dermatology)', 'mk-builder' ),
		value: 'fas fa-allergies',
	},
	{ label: __( 'Baby (Pediatrics)', 'mk-builder' ), value: 'fas fa-baby' },
	{
		label: __( 'Brain (Psychology)', 'mk-builder' ),
		value: 'fas fa-brain',
	},
	{
		label: __( 'Female (Gynecology)', 'mk-builder' ),
		value: 'fas fa-female',
	},
	{
		label: __( 'Carrot (Nutrition)', 'mk-builder' ),
		value: 'fas fa-carrot',
	},
	{
		label: __( 'Heartbeat (Cardiology)', 'mk-builder' ),
		value: 'fas fa-heartbeat',
	},
	{
		label: __( 'Notes Medical (Report Review)', 'mk-builder' ),
		value: 'fas fa-notes-medical',
	},
	{ label: __( 'User MD', 'mk-builder' ), value: 'fas fa-user-md' },
	{ label: __( 'Lungs', 'mk-builder' ), value: 'fas fa-lungs' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-tele-specialty-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Specialty Item', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon', 'mk-builder' ) }
							value={ iconClass }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'mk-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
							help={ __(
								'Override: e.g. fas fa-stethoscope',
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

			<div { ...blockProps } className="specialty-item stagger-card">
				<div className="spec-icon">
					<i
						className={ iconClass || 'fas fa-stethoscope' }
						aria-hidden="true"
					/>
				</div>
				<RichText
					tagName="h5"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Specialty title…', 'mk-builder' ) }
				/>
			</div>
		</>
	);
}
