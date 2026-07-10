import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/centre-technology-item' ];
const TEMPLATE = [
	[ 'mk/centre-technology-item', { caption: 'Philips Azurion Cath Lab' } ],
	[ 'mk/centre-technology-item', { caption: 'Modular Cardiac OT' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title, introText, showSection } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section fade-up mk-centre-technology-editor',
			id: sectionId,
		} ),
		[ sectionId ]
	);

	if ( showSection === false ) {
		return (
			<>
				{ isSelected && (
					<InspectorControls>
						<PanelBody
							title={ __(
								'Technology Section',
								'mk-builder'
							) }
							initialOpen={ true }
						>
							<ToggleControl
								label={ __( 'Show section', 'mk-builder' ) }
								checked={ false }
								onChange={ ( v ) =>
									setAttributes( { showSection: v } )
								}
								help={ __(
									'Display this section on the page. When off, hidden in Editor, Front-end, and Responsive.',
									'mk-builder'
								) }
							/>
						</PanelBody>
					</InspectorControls>
				) }
				<div
					{ ...blockProps }
					className={
						( blockProps.className || '' ) +
						' centre-technology-section-placeholder'
					}
					style={ {
						padding: 20,
						background: '#f5f5f5',
						border: '1px dashed #ccc',
						borderRadius: 8,
					} }
				>
					<div
						className="editor-label editor-label--hidden"
						style={ {
							textAlign: 'center',
							padding: '10px 16px',
							background: '#856404',
							color: '#fff',
							fontWeight: 600,
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: 12,
							borderRadius: 4,
						} }
					>
						{ __(
							'Technology & Facilities (Hidden)',
							'mk-builder'
						) }
					</div>
					<p
						style={ {
							margin: 0,
							color: '#666',
							fontSize: '13px',
							lineHeight: 1.5,
						} }
					>
						{ __(
							'Section is turned off. Turn "Show section" on in the block settings (right panel) to display it on the page.',
							'mk-builder'
						) }
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Technology Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show section', 'mk-builder' ) }
							checked={ showSection !== false }
							onChange={ ( v ) =>
								setAttributes( { showSection: v } )
							}
							help={ __(
								'Display this section on the page. When off, hidden in Editor, Front-end, and Responsive.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Section ID (anchor)',
								'mk-builder'
							) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( {
									sectionId: v || 'technology',
								} )
							}
							help={ __(
								'e.g. #technology for sidebar links',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Section title', 'mk-builder' ) }
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>

						<TextControl
							label={ __( 'Intro text', 'mk-builder' ) }
							value={ introText }
							onChange={ ( v ) =>
								setAttributes( { introText: v } )
							}
							multiline
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<RichText
					tagName="h2"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __(
						'Technology & Facilities',
						'mk-builder'
					) }
				/>

				<RichText
					tagName="p"
					value={ introText }
					onChange={ ( v ) => setAttributes( { introText: v } ) }
					placeholder={ __(
						'We utilize the latest medical technology...',
						'mk-builder'
					) }
				/>

				<div className="tech-grid">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</section>
		</>
	);
}
