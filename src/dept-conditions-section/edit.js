import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/dept-condition-item' ];
const TEMPLATE = [
	[
		'mk/dept-condition-item',
		{ icon: 'fa-heart-broken', title: 'Coronary Artery Disease' },
	],

	[ 'mk/dept-condition-item', { icon: 'fa-bolt', title: 'Arrhythmia' } ],
	[
		'mk/dept-condition-item',
		{ icon: 'fa-heartbeat', title: 'Heart Failure' },
	],

	[
		'mk/dept-condition-item',
		{ icon: 'fa-child', title: 'Congenital Defects' },
	],

	[
		'mk/dept-condition-item',
		{ icon: 'fa-procedures', title: 'Valvular Disease' },
	],

	[
		'mk/dept-condition-item',
		{ icon: 'fa-user-md', title: 'Hypertension' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section mk-dept-conditions-editor',
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
				<div className="conditions-grid">
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
