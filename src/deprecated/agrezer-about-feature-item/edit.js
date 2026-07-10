import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { AboutFeatureIcon } from './icons';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, description, iconVariant } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'agrezer-about-feature' } ),
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
										'Growth / arrow',
										'mk-builder'
									),
									value: 'growth',
								},
								{
									label: __( 'Barn', 'mk-builder' ),
									value: 'barn',
								},
								{
									label: __(
										'Soil / tools',
										'mk-builder'
									),
									value: 'soil',
								},
								{
									label: __(
										'Organic plant',
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
				<AboutFeatureIcon variant={ iconVariant } />
				<RichText
					tagName="h3"
					className="agrezer-about-feature__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					className="agrezer-about-feature__desc"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description', 'mk-builder' ) }
				/>
			</article>
		</>
	);
}
