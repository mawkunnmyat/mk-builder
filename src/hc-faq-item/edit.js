import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { question, answer } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-faq-item mk-hc-faq-item-editor',
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
						<p style={ { margin: 0, color: '#666', fontSize: 12 } }>
							{ __(
								'Edit the question and answer in the canvas.',
								'mk-builder'
							) }
						</p>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="hc-faq-q-editor"
					style={ {
						padding: '15px 0',
						fontWeight: 600,
						marginBottom: 8,
					} }
				>
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( val ) =>
							setAttributes( { question: val } )
						}
						placeholder={ __( 'Question…', 'mk-builder' ) }
					/>

					<i
						className="fas fa-plus"
						aria-hidden="true"
						style={ { marginLeft: 8, opacity: 0.7 } }
					/>
				</div>
				<RichText
					tagName="div"
					className="hc-faq-a"
					value={ answer }
					onChange={ ( val ) => setAttributes( { answer: val } ) }
					placeholder={ __( 'Answer…', 'mk-builder' ) }
					style={ {
						paddingBottom: 12,
						color: '#666',
						fontSize: '0.95rem',
					} }
				/>
			</div>
		</>
	);
}
