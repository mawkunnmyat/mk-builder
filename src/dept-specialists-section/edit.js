import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/dept-doc-card-item' ];
const TEMPLATE = [
	[
		'mk/dept-doc-card-item',
		{
			name: 'Dr. Kyaw Swar',
			specialization: 'Interventional Cardiologist',
			qualifications: 'MBBS, M.Med.Sc, MRCP (UK)',
		},
	],

	[
		'mk/dept-doc-card-item',
		{
			name: 'Dr. Susan May',
			specialization: 'Cardiothoracic Surgeon',
			qualifications: 'MBBS, Dr.Med.Sc (Surgery)',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section mk-dept-specialists-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Section', 'mk-builder' ) }>
						<TextControl
							label={ __( 'Section ID', 'mk-builder' ) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( { sectionId: v } )
							}
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<h2>{ title }</h2>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</section>
		</>
	);
}
