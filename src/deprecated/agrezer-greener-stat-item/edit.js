import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { GreenerStatIcon } from './icons';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconVariant, title, description } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'agrezer-greener-stat' } ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon style', 'mk-builder' ) }
							value={ iconVariant }
							options={ [
								{
									label: __(
										'Growth / leaf',
										'mk-builder'
									),
									value: 'growth',
								},
								{
									label: __(
										'Organic globe',
										'mk-builder'
									),
									value: 'organic',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconVariant: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<GreenerStatIcon variant={ iconVariant } />
				<RichText
					tagName="h3"
					className="agrezer-greener-stat__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Stat title', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					className="agrezer-greener-stat__text"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description…', 'mk-builder' ) }
				/>
			</article>
		</>
	);
}
