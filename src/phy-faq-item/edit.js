import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { question, answer } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-faq-item mk-phy-faq-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'FAQ item', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Question', 'mk-builder' ) }
							value={ question || '' }
							onChange={ ( val ) =>
								setAttributes( { question: val } )
							}
						/>

						<TextControl
							label={ __( 'Answer', 'mk-builder' ) }
							value={ answer || '' }
							onChange={ ( val ) =>
								setAttributes( { answer: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="phy-faq-q">
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( val ) =>
							setAttributes( { question: val } )
						}
						placeholder={ __(
							"Do I need a doctor's referral?",
							'mk-builder'
						) }
					/>

					<i className="fas fa-plus" aria-hidden="true" />
				</div>
				<div className="phy-faq-a">
					<RichText
						tagName="p"
						value={ answer }
						onChange={ ( val ) => setAttributes( { answer: val } ) }
						placeholder={ __( 'Answer…', 'mk-builder' ) }
					/>
				</div>
			</div>
		</>
	);
}
