import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		icon,
		title,
		description,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		descriptionMarginTop,
		descriptionMarginBottom,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-before-you-come-item-editor before-you-come-item-card',
			style: {
				borderRadius: '8px',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				padding: 25,
				display: 'flex',
				flexDirection: 'column',
			},
		} ),
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
						<TextControl
							label={ __(
								'Font Awesome Icon Class',
								'mk-builder'
							) }
							value={ icon }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
							help={ __(
								'e.g. fas fa-clock, fas fa-file-medical, fas fa-calendar-check',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
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
							min={ 0.8 }
							max={ 2 }
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
							min={ 0.75 }
							max={ 1.3 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'mk-builder' ) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1.2 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Gap above description (px)',
								'mk-builder'
							) }
							value={ descriptionMarginTop }
							onChange={ ( val ) =>
								setAttributes( { descriptionMarginTop: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 2 }
							help={ __(
								'Space between title and description.',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Gap below description (px)',
								'mk-builder'
							) }
							value={ descriptionMarginBottom }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionMarginBottom: val,
								} )
							}
							min={ 0 }
							max={ 60 }
							step={ 2 }
							help={ __(
								'Space below the description.',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="item-icon-title"
					style={ {
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						margin: '0 0 10px',
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
					} }
				>
					<i
						className={ icon }
						aria-hidden
						style={ { flexShrink: 0, fontSize: '1.1em' } }
					/>

					<RichText
						tagName="h4"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Title...', 'mk-builder' ) }
						style={ { margin: 0 } }
					/>
				</div>
				<RichText
					tagName="p"
					className="item-description"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description...', 'mk-builder' ) }
					style={ {
						margin: `${ descriptionMarginTop }px 0 ${ descriptionMarginBottom }px 0`,
						color: descriptionColor,
						fontSize: `${ descriptionFontSize }rem`,
						lineHeight: descriptionLineHeight,
					} }
				/>
			</div>
		</>
	);
}
