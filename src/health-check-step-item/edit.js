import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { icon, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'chk-step-item stagger-up mk-chk-step-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Icon class', 'mk-builder' ) }
							value={ icon || '' }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
							help={ __(
								'Font Awesome class, e.g. fas fa-ban, fas fa-calendar-check, fas fa-vial',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="chk-step-icon">
					{ icon ? (
						<i className={ icon } aria-hidden="true" />
					) : (
						<i className="fas fa-circle" aria-hidden="true" />
					) }
				</div>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Step title', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Step description…', 'mk-builder' ) }
					style={ { fontSize: '0.9rem', color: '#666' } }
				/>
			</div>
		</>
	);
}
