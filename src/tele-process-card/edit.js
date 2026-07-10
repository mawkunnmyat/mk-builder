import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'User MD (Choose Doctor)', 'mk-builder' ),
		value: 'fas fa-user-md',
	},
	{
		label: __( 'Calendar Check (Book Slot)', 'mk-builder' ),
		value: 'fas fa-calendar-check',
	},
	{ label: __( 'Link (Get Link)', 'mk-builder' ), value: 'fas fa-link' },
	{
		label: __( 'File Prescription (Consultation)', 'mk-builder' ),
		value: 'fas fa-file-prescription',
	},
	{
		label: __( 'Stethoscope', 'mk-builder' ),
		value: 'fas fa-stethoscope',
	},
	{ label: __( 'Video', 'mk-builder' ), value: 'fas fa-video' },
	{ label: __( 'Comments', 'mk-builder' ), value: 'fas fa-comments' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { stepNumber, iconClass, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-tele-process-card-editor process-card stagger-card',
		} ),
		[]
	);

	const titleValue = title ?? '';
	const descriptionValue = description ?? '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Process Card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<p
							style={ {
								margin: '0 0 10px 0',
								fontSize: '12px',
								color: '#757575',
							} }
						>
							{ __(
								'Click the title or description in the card to edit directly.',
								'mk-builder'
							) }
						</p>
						<RangeControl
							label={ __( 'Step number', 'mk-builder' ) }
							value={ stepNumber ?? 1 }
							onChange={ ( val ) =>
								setAttributes( { stepNumber: val } )
							}
							min={ 1 }
							max={ 99 }
							step={ 1 }
							help={ __(
								'Shown in badge on icon (data-step).',
								'mk-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Icon', 'mk-builder' ) }
							value={ iconClass ?? 'fas fa-user-md' }
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
							value={ iconClass ?? '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-user-md',
								} )
							}
							help={ __(
								'Override: e.g. fas fa-user-md',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Title (or edit in card)',
								'mk-builder'
							) }
							value={ titleValue }
							onChange={ ( val ) =>
								setAttributes( { title: val ?? '' } )
							}
							placeholder={ __( 'Step title…', 'mk-builder' ) }
						/>

						<TextControl
							label={ __(
								'Description (or edit in card)',
								'mk-builder'
							) }
							value={ descriptionValue }
							onChange={ ( val ) =>
								setAttributes( { description: val ?? '' } )
							}
							placeholder={ __(
								'Step description…',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="step-icon"
					data-step={ String( stepNumber ?? 1 ) }
				>
					<i
						className={ iconClass || 'fas fa-user-md' }
						aria-hidden="true"
					/>
				</div>
				<RichText
					tagName="h4"
					value={ titleValue }
					onChange={ ( val ) =>
						setAttributes( { title: val ?? '' } )
					}
					placeholder={ __( 'Step title…', 'mk-builder' ) }
					allowedFormats={ [] }
				/>

				<RichText
					tagName="p"
					value={ descriptionValue }
					onChange={ ( val ) =>
						setAttributes( { description: val ?? '' } )
					}
					placeholder={ __( 'Step description…', 'mk-builder' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			</div>
		</>
	);
}
