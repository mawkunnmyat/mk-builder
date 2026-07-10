import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		stepNumber,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		stepNumberBgColor,
		stepNumberTextColor,
		stepNumberSize,
		cardPadding,
		cardPaddingMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-journey-step-item-editor step-card',
			style: {
				padding: `${ cardPadding }px`,
				borderRadius: 'var(--radius, 12px)',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				textAlign: 'center',
			},
		} ),
		[ cardPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step Number', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Step Number', 'mk-builder' ) }
							value={ stepNumber }
							onChange={ ( val ) =>
								setAttributes( { stepNumber: val } )
							}
							min={ 1 }
							max={ 99 }
							step={ 1 }
						/>

						<PanelColorSettings
							title={ __( 'Step Badge Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: stepNumberBgColor,
									onChange: ( val ) =>
										setAttributes( {
											stepNumberBgColor: val,
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: stepNumberTextColor,
									onChange: ( val ) =>
										setAttributes( {
											stepNumberTextColor: val,
										} ),
									label: __( 'Text', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Badge Size (px)', 'mk-builder' ) }
							value={ stepNumberSize }
							onChange={ ( val ) =>
								setAttributes( { stepNumberSize: val } )
							}
							min={ 32 }
							max={ 60 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'mk-builder' ),
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
									label: __(
										'Description Color',
										'mk-builder'
									),
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
						title={ __( 'Card Padding', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Padding Desktop (px)',
								'mk-builder'
							) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 20 }
							max={ 50 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Mobile (px)',
								'mk-builder'
							) }
							value={ cardPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { cardPaddingMobile: val } )
							}
							min={ 16 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="step-num"
					style={ {
						width: `${ stepNumberSize }px`,
						height: `${ stepNumberSize }px`,
						background: stepNumberBgColor,
						color: stepNumberTextColor,
						borderRadius: '50%',
						fontSize: `${ stepNumberSize * 0.3 }px`,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '0 auto 20px',
					} }
				>
					{ stepNumber }
				</div>

				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Step title...', 'mk-builder' ) }
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
						margin: '0 0 10px',
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
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						margin: 0,
					} }
				/>
			</div>
		</>
	);
}
