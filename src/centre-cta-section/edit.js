import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		text,
		buttonText,
		buttonUrl,
		gradientStart,
		gradientEnd,
		padding = 50,
		borderRadius = 12,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'centre-cta fade-up mk-centre-cta-editor',
			style: {
				background: `linear-gradient(135deg, ${ gradientStart } 0%, ${ gradientEnd } 100%)`,
				padding: `${ padding }px`,
				borderRadius: `${ borderRadius }px`,
				textAlign: 'center',
				color: '#fff',
				boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
			},
		} ),
		[ borderRadius, gradientEnd, gradientStart, padding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'CTA content', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Button text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( v ) =>
								setAttributes( { buttonText: v } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( v ) =>
								setAttributes( { buttonUrl: v || '#' } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Background gradient', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Gradient colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: gradientStart,
									onChange: ( v ) =>
										setAttributes( { gradientStart: v } ),
									label: __( 'Start', 'mk-builder' ),
								},
								{
									value: gradientEnd,
									onChange: ( v ) =>
										setAttributes( { gradientEnd: v } ),
									label: __( 'End', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding (px)', 'mk-builder' ) }
							value={ padding }
							onChange={ ( v ) =>
								setAttributes( { padding: v } )
							}
							min={ 24 }
							max={ 80 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Border radius (px)',
								'mk-builder'
							) }
							value={ borderRadius }
							onChange={ ( v ) =>
								setAttributes( { borderRadius: v } )
							}
							min={ 0 }
							max={ 24 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __(
						'Expert Neurological Care',
						'mk-builder'
					) }
					className="centre-cta-title"
				/>

				<RichText
					tagName="p"
					value={ text }
					onChange={ ( v ) => setAttributes( { text: v } ) }
					placeholder={ __(
						"Don't ignore the symptoms. Schedule a consultation with our specialists today.",
						'mk-builder'
					) }
					className="centre-cta-text"
				/>

				<a
					href={ buttonUrl || '#' }
					className="jivaka-btn btn-primary centre-cta-btn"
					onClick={ ( e ) => e.preventDefault() }
					role="presentation"
					aria-label={
						buttonText
							? undefined
							: __( 'Book Appointment', 'mk-builder' )
					}
				>
					{ buttonText || __( 'Book Appointment', 'mk-builder' ) }
				</a>
			</div>
		</>
	);
}
