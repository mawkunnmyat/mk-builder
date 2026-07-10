import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { label } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-area-tag mk-hc-area-tag-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Area tag', 'mk-builder' ) }
						initialOpen={ true }
					>
						<p style={ { margin: 0, color: '#666', fontSize: 12 } }>
							{ __(
								'Edit the tag text in the canvas.',
								'mk-builder'
							) }
						</p>
					</PanelBody>
				</InspectorControls>
			) }

			<span { ...blockProps }>
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( val ) => setAttributes( { label: val } ) }
					placeholder={ __( 'Township or area…', 'mk-builder' ) }
					withoutInteractiveFormatting
				/>
			</span>
		</>
	);
}
