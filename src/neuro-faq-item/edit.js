import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const { question = '', answer = '' } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'faq-item mk-neuro-faq-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'FAQ Item', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Question', 'mk-builder' ) }
							value={ question }
							onChange={ ( v ) =>
								setAttributes( { question: v } )
							}
							help={ __(
								'Plain text question shown in the accordion header.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Answer', 'mk-builder' ) }
							value={ answer }
							onChange={ ( v ) => setAttributes( { answer: v } ) }
							multiline
							help={ __(
								'Supports HTML (e.g. <strong>). For rich formatting, edit in the block below.',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<button type="button" className="faq-btn" disabled>
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( v ) => setAttributes( { question: v } ) }
						placeholder={ __( 'Question…', 'mk-builder' ) }
						withoutInteractiveFormatting
					/>

					<i className="fas fa-chevron-down" aria-hidden />
				</button>
				<div className="faq-content faq-content--open">
					<RichText
						tagName="div"
						value={ answer }
						onChange={ ( v ) => setAttributes( { answer: v } ) }
						placeholder={ __( 'Answer…', 'mk-builder' ) }
						multiline
					/>
				</div>
			</div>
		</>
	);
}
