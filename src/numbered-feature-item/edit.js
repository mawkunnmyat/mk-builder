import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { FeatureIcon, ICON_OPTIONS } from './icons';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { number, title, text, iconKey } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'why-choose-us__item mk-numbered-feature-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Feature', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Number', 'mk-builder' ) }
							value={ number || '' }
							onChange={ ( val ) =>
								setAttributes( { number: val } )
							}
						/>
						<SelectControl
							label={ __( 'Icon', 'mk-builder' ) }
							value={ iconKey || 'cube' }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconKey: val || 'cube' } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<span
					className="why-choose-us__number"
					aria-hidden="true"
				>
					{ number || '01' }
				</span>
				<FeatureIcon iconKey={ iconKey } />
				<RichText
					tagName="h3"
					className="why-choose-us__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Feature title…', 'mk-builder' ) }
				/>
				<RichText
					tagName="p"
					className="why-choose-us__text"
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __(
						'Feature description…',
						'mk-builder'
					) }
				/>
			</article>
		</>
	);
}
