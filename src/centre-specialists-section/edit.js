import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/centre-specialist-card' ];
const TEMPLATE = [
	[
		'mk/centre-specialist-card',
		{
			name: 'Dr. Kyaw Swar',
			specialization: 'Interventional Cardiologist',
			qualifications: 'MBBS, M.Med.Sc, MRCP (UK)',
		},
	],

	[
		'mk/centre-specialist-card',
		{
			name: 'Dr. Susan May',
			specialization: 'Cardiothoracic Surgeon',
			qualifications: 'MBBS, Dr.Med.Sc (Surgery)',
		},
	],

	[
		'mk/centre-specialist-card',
		{
			name: 'Dr. Hlaing Min',
			specialization: 'Senior Cardiologist',
			qualifications: 'MBBS, M.Med.Sc (Internal Med), Dip.Cardio',
		},
	],

	[
		'mk/centre-specialist-card',
		{
			name: 'Dr. Thida Win',
			specialization: 'Electrophysiologist',
			qualifications: 'MBBS, Ph.D. (Cardiology)',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title, showSection } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'content-section fade-up mk-centre-specialists-editor',
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
								'Specialists Section',
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
									'Display this section on the page.',
									'mk-builder'
								) }
							/>
						</PanelBody>
					</InspectorControls>
				) }
				<div
					{ ...blockProps }
					style={ {
						padding: 20,
						background: '#f5f5f5',
						border: '1px dashed #ccc',
						borderRadius: 8,
					} }
				>
					<p style={ { margin: 0, color: '#666' } }>
						{ __(
							'Specialists section is hidden. Turn “Show section” on in block settings to display it.',
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
						title={ __( 'Specialists Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show section', 'mk-builder' ) }
							checked={ showSection !== false }
							onChange={ ( v ) =>
								setAttributes( { showSection: v } )
							}
							help={ __(
								'Display this section on the page.',
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
									sectionId: v || 'specialists',
								} )
							}
							help={ __(
								'e.g. #specialists for sidebar links',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Section title', 'mk-builder' ) }
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<RichText
					tagName="h2"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Our Specialists', 'mk-builder' ) }
				/>

				<div className="specialists-doc-list">
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
