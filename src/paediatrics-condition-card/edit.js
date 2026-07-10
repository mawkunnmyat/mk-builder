import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, subtitle } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'paed-cond-card paed-stagger mk-paed-cond-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Condition card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon class (Font Awesome)',
								'mk-builder'
							) }
							value={ iconClass || '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-lungs',
								} )
							}
							help={ __(
								'e.g. fas fa-lungs, fas fa-temperature-high, fas fa-baby',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title || '' }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
						/>

						<TextControl
							label={ __(
								'Subtitle (examples)',
								'mk-builder'
							) }
							value={ subtitle || '' }
							onChange={ ( val ) =>
								setAttributes( { subtitle: val } )
							}
							help={ __(
								'e.g. Asthma, Pneumonia',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="paed-cond-icon">
					{ iconClass && (
						<i className={ iconClass } aria-hidden="true" />
					) }
				</div>
				<RichText
					tagName="h5"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Condition title…', 'mk-builder' ) }
				/>

				<RichText
					tagName="span"
					value={ subtitle }
					onChange={ ( val ) => setAttributes( { subtitle: val } ) }
					placeholder={ __(
						'e.g. Asthma, Pneumonia',
						'mk-builder'
					) }
				/>
			</div>
		</>
	);
}
