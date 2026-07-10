import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-journey-item mk-phy-journey-step-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Journey step', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Title (with step number)',
								'mk-builder'
							) }
							value={ title || '' }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							help={ __(
								'e.g. "1. Initial Assessment"',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Short description', 'mk-builder' ) }
							value={ description || '' }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __(
						'1. Initial Assessment',
						'mk-builder'
					) }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Step description…', 'mk-builder' ) }
				/>
			</div>
		</>
	);
}
