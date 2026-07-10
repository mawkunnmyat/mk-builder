import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/dept-tech-item' ];
const TEMPLATE = [
	[ 'mk/dept-tech-item', { caption: 'Philips Azurion Cath Lab' } ],
	[ 'mk/dept-tech-item', { caption: 'Modular Cardiac OT' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title, intro } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section mk-dept-technology-editor',
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

						<TextControl
							label={ __( 'Intro', 'mk-builder' ) }
							value={ intro }
							onChange={ ( v ) => setAttributes( { intro: v } ) }
							multiline
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<h2>{ title }</h2>
				<p>{ intro }</p>
				<div className="tech-grid">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</section>
		</>
	);
}
