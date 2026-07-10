import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	SelectControl,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		subtitle,
		buttonText,
		buttonUrl,
		openInNewTab,
		backgroundColor,
		backgroundImage,
		backgroundImageId,
		padding,
		borderRadius,
		textAlign,
		titleColor,
		subtitleColor,
		subtitleOpacity,
		buttonBackgroundColor,
		buttonTextColor,
		marginBottom,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-health-check-cta-section-editor',
			style: {
				marginBottom: `${ marginBottom }px`,
			},
		} ),
		[ marginBottom ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const ctaBoxStyle = {
		background: backgroundColor || '#005f73',
		backgroundImage: backgroundImage ? `url(${ backgroundImage })` : 'none',
		backgroundSize: 'auto',
		backgroundPosition: 'center',
		backgroundRepeat: 'repeat',
		color: subtitleColor || '#fff',
		padding: `${ padding }px`,
		borderRadius: `${ borderRadius }px`,
		textAlign: textAlign || 'center',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Button Text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( val ) =>
								setAttributes( { buttonText: val } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
							help={ __(
								'e.g. appointment.html or https://...',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __(
								'Open link in new tab',
								'mk-builder'
							) }
							checked={ openInNewTab }
							onChange={ ( val ) =>
								setAttributes( { openInNewTab: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />
						<BaseControl
							label={ __(
								'Pattern / Texture Image URL',
								'mk-builder'
							) }
						>
							<TextControl
								value={ backgroundImage || '' }
								onChange={ ( val ) =>
									setAttributes( {
										backgroundImage: val || '',
									} )
								}
								placeholder="https://..."
								help={ __(
									'Optional. Leave empty for solid color.',
									'mk-builder'
								) }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Container & Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Section Margin Bottom (px)',
								'mk-builder'
							) }
							value={ marginBottom }
							onChange={ ( val ) =>
								setAttributes( { marginBottom: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 16 }
							max={ 60 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'CTA Box Padding (px)',
								'mk-builder'
							) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 24 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Border Radius (px)',
								'mk-builder'
							) }
							value={ borderRadius }
							onChange={ ( val ) =>
								setAttributes( { borderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 5 }
						/>

						<SelectControl
							label={ __( 'Text Alignment', 'mk-builder' ) }
							value={ textAlign }
							options={ [
								{
									label: __( 'Left', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center',
								},
								{
									label: __( 'Right', 'mk-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { textAlign: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Typography & Colors', 'mk-builder' ) }
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

						<PanelColorSettings
							title={ __( 'Subtitle Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: subtitleColor,
									onChange: ( val ) =>
										setAttributes( { subtitleColor: val } ),
									label: __(
										'Subtitle Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Subtitle Opacity', 'mk-builder' ) }
							value={ subtitleOpacity }
							onChange={ ( val ) =>
								setAttributes( { subtitleOpacity: val } )
							}
							min={ 0.3 }
							max={ 1 }
							step={ 0.1 }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Button', 'mk-builder' ) }
							colorSettings={ [
								{
									value: buttonBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											buttonBackgroundColor: val,
										} ),
									label: __(
										'Button Background',
										'mk-builder'
									),
								},
								{
									value: buttonTextColor,
									onChange: ( val ) =>
										setAttributes( {
											buttonTextColor: val,
										} ),
									label: __(
										'Button Text Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Fade up on scroll', 'mk-builder' ) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="chk-container" style={ containerStyle }>
					<div
						className="chk-cta-box fade-up"
						style={ ctaBoxStyle }
						data-animation={ animationOnScroll }
					>
						<RichText
							tagName="h2"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
							placeholder={ __(
								'Book Your Slot Today',
								'mk-builder'
							) }
							style={ {
								color: titleColor || '#fff',
								marginTop: 0,
								marginBottom: 15,
							} }
						/>

						<RichText
							tagName="p"
							value={ subtitle }
							onChange={ ( v ) =>
								setAttributes( { subtitle: v } )
							}
							placeholder={ __(
								"Health is wealth. Don't delay your check-up.",
								'mk-builder'
							) }
							style={ {
								color: subtitleColor || '#fff',
								opacity: subtitleOpacity,
								marginBottom: 30,
							} }
						/>

						{ buttonText ? (
							<a
								href={ buttonUrl || '#' }
								className="chk-btn chk-cta-btn"
								style={ {
									background: buttonBackgroundColor || '#fff',
									color: buttonTextColor || '#005f73',
									pointerEvents: 'none',
								} }
								onClick={ ( e ) => e.preventDefault() }
								rel={
									openInNewTab
										? 'noopener noreferrer'
										: undefined
								}
								target={ openInNewTab ? '_blank' : undefined }
							>
								{ buttonText }
							</a>
						) : (
							<span
								className="chk-cta-btn-placeholder"
								style={ { opacity: 0.7 } }
							>
								{ __(
									'Add button text in sidebar',
									'mk-builder'
								) }
							</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
