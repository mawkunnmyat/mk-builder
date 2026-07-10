import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	RangeControl,
	PanelColorSettings,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, clientId, isSelected } ) {
	const {
		title,
		description,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		stepPadding,
	} = attributes;

	const stepIndex = useSelect(
		( select ) => {
			const { getBlockIndex, getBlockRootClientId } =
				select( 'core/block-editor' );
			const rootClientId = getBlockRootClientId( clientId );
			if ( ! rootClientId ) {
				return 1;
			}
			return getBlockIndex( clientId, rootClientId ) + 1;
		},
		[ clientId ]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-amb-process-step-editor amb-step',
			style: {
				position: 'relative',
				padding: `${ stepPadding }px`,
				textAlign: 'center',
			},
		} ),
		[ stepPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Title', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 1.8 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Margin Bottom (px)',
								'mk-builder'
							) }
							value={ titleMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { titleMarginBottom: val } )
							}
							min={ 0 }
							max={ 30 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __( 'Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Step Padding (px)', 'mk-builder' ) }
							value={ stepPadding }
							onChange={ ( val ) =>
								setAttributes( { stepPadding: val } )
							}
							min={ 12 }
							max={ 40 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="amb-step-number-editor" aria-hidden="true">
					{ stepIndex }
				</div>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Step title...', 'mk-builder' ) }
					style={ {
						color: titleColor,
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						marginBottom: `${ titleMarginBottom }px`,
						marginTop: 0,
					} }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Step description...', 'mk-builder' ) }
					style={ {
						color: descriptionColor,
						fontSize: `${ descriptionFontSize }rem`,
						margin: 0,
					} }
				/>
			</div>
		</>
	);
}
