import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleTextTransform,
		sectionTitleLetterSpacing,
		sectionTitleAlignment,
		titleMarginBottom,
		containerMaxWidth,
		containerPadding,
		gridMinWidth,
		gap,
		logoMaxWidth,
		logoOpacity,
		logoGrayscale,
		logoHoverOpacity,
		logoHoverScale,
		animationOnScroll,
		animationType,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/csr-partner-logo-item' ];
	const TEMPLATE = [
		[ 'mk/csr-partner-logo-item', { placeholderColor: '#f48b2a' } ],
		[ 'mk/csr-partner-logo-item', { placeholderColor: '#e3f2fd' } ],
		[ 'mk/csr-partner-logo-item', { placeholderColor: '#f3e5f5' } ],
		[ 'mk/csr-partner-logo-item', { placeholderColor: '#e8f5e9' } ],
		[ 'mk/csr-partner-logo-item', { placeholderColor: '#fff3e0' } ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-partners-section-editor csr-partners-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ gridMinWidth }px, 1fr))`,
		gap: `${ gap }px`,
		alignItems: 'center',
		justifyItems: 'center',
		marginTop: showSectionTitle ? 0 : `${ titleMarginBottom }px`,
		'--logo-max-width': `${ logoMaxWidth }px`,
		'--logo-opacity': logoOpacity,
		'--logo-grayscale': logoGrayscale ? '100%' : '0%',
		'--logo-hover-opacity': logoHoverOpacity,
		'--logo-hover-scale': logoHoverScale,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Title', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<TextControl
									label={ __(
										'Title Text',
										'mk-builder'
									) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 0.7 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Text Transform',
										'mk-builder'
									) }
									value={ sectionTitleTextTransform }
									options={ [
										{
											label: __(
												'None',
												'mk-builder'
											),
											value: 'none',
										},
										{
											label: __(
												'Uppercase',
												'mk-builder'
											),
											value: 'uppercase',
										},
										{
											label: __(
												'Lowercase',
												'mk-builder'
											),
											value: 'lowercase',
										},
										{
											label: __(
												'Capitalize',
												'mk-builder'
											),
											value: 'capitalize',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleTextTransform: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Letter Spacing (px)',
										'mk-builder'
									) }
									value={ sectionTitleLetterSpacing }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleLetterSpacing: val,
										} )
									}
									min={ 0 }
									max={ 8 }
									step={ 1 }
								/>

								<SelectControl
									label={ __( 'Alignment', 'mk-builder' ) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'mk-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'mk-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Title Margin Bottom (px)',
										'mk-builder'
									) }
									value={ titleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											titleMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 120 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min Logo Width (px)',
								'mk-builder'
							) }
							value={ gridMinWidth }
							onChange={ ( val ) =>
								setAttributes( { gridMinWidth: val } )
							}
							min={ 80 }
							max={ 300 }
							step={ 10 }
							help={ __(
								'Minimum width per grid cell',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Gap Between Logos (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 10 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Logo Max Width (px)',
								'mk-builder'
							) }
							value={ logoMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { logoMaxWidth: val } )
							}
							min={ 80 }
							max={ 250 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Logo Styling', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Logo Opacity', 'mk-builder' ) }
							value={ logoOpacity }
							onChange={ ( val ) =>
								setAttributes( { logoOpacity: val } )
							}
							min={ 0.3 }
							max={ 1 }
							step={ 0.1 }
						/>

						<ToggleControl
							label={ __(
								'Grayscale (color on hover)',
								'mk-builder'
							) }
							checked={ logoGrayscale }
							onChange={ ( val ) =>
								setAttributes( { logoGrayscale: val } )
							}
							help={ __(
								'Logos in grayscale by default, full color on hover.',
								'mk-builder'
							) }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Hover Opacity', 'mk-builder' ) }
							value={ logoHoverOpacity }
							onChange={ ( val ) =>
								setAttributes( { logoHoverOpacity: val } )
							}
							min={ 0.8 }
							max={ 1 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Hover Scale', 'mk-builder' ) }
							value={ logoHoverScale }
							onChange={ ( val ) =>
								setAttributes( { logoHoverScale: val } )
							}
							min={ 1 }
							max={ 1.3 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
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
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'mk-builder'
							) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
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
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<SelectControl
								label={ __(
									'Animation Type',
									'mk-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __(
											'Fade In Up',
											'mk-builder'
										),
										value: 'fadeInUp',
									},
									{
										label: __( 'Fade In', 'mk-builder' ),
										value: 'fadeIn',
									},
									{
										label: __(
											'Slide In Left',
											'mk-builder'
										),
										value: 'slideInLeft',
									},
									{
										label: __(
											'Slide In Right',
											'mk-builder'
										),
										value: 'slideInRight',
									},
									{
										label: __( 'Zoom In', 'mk-builder' ),
										value: 'zoomIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				data-animation={ animationOnScroll }
				data-animation-type={ animationType }
			>
				<div className="jivaka-container" style={ containerStyle }>
					{ showSectionTitle && (
						<RichText
							tagName="h3"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'In Collaboration With',
								'mk-builder'
							) }
							className="csr-partners-title"
							style={ {
								textAlign: sectionTitleAlignment,
								color: sectionTitleColor,
								fontWeight: sectionTitleFontWeight,
								fontSize: `${ sectionTitleFontSize }rem`,
								textTransform: sectionTitleTextTransform,
								letterSpacing: `${ sectionTitleLetterSpacing }px`,
								margin: `0 0 ${ titleMarginBottom }px 0`,
							} }
						/>
					) }
					<div
						className={ `logo-grid${
							animationOnScroll ? ' fade-up' : ''
						} mk-csr-partners-grid` }
						style={ gridStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
