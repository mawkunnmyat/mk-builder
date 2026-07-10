import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		ctaTitle,
		ctaDescription,
		ctaButtonText,
		ctaButtonUrl,
		ctaButtonIcon,
		ctaBackgroundStart,
		ctaBackgroundEnd,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-career-cta-section-editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
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
							value={ ctaButtonText }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonText: val } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ ctaButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonUrl: val } )
							}
							help={ __(
								'e.g. mailto:hr@example.com',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Button Icon Class', 'mk-builder' ) }
							value={ ctaButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonIcon: val } )
							}
							help={ __(
								'Font Awesome class. Leave empty for no icon.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Gradient Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: ctaBackgroundStart,
									onChange: ( val ) =>
										setAttributes( {
											ctaBackgroundStart: val,
										} ),
									label: __(
										'Gradient Start',
										'mk-builder'
									),
								},
								{
									value: ctaBackgroundEnd,
									onChange: ( val ) =>
										setAttributes( {
											ctaBackgroundEnd: val,
										} ),
									label: __(
										'Gradient End',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
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
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 30 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 30 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'mk-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 24 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'mk-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 24 }
							max={ 80 }
							step={ 5 }
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
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div
						className="career-cta fade-up"
						style={ {
							background: `linear-gradient(135deg, ${ ctaBackgroundStart } 0%, ${ ctaBackgroundEnd } 100%)`,
							borderRadius: '12px',
							padding: '60px 40px',
							textAlign: 'center',
							color: '#fff',
							position: 'relative',
							overflow: 'hidden',
						} }
					>
						<RichText
							tagName="h2"
							value={ ctaTitle }
							onChange={ ( val ) =>
								setAttributes( { ctaTitle: val } )
							}
							placeholder={ __(
								'CTA title...',
								'mk-builder'
							) }
							style={ {
								margin: '0 0 15px 0',
								fontSize: '2rem',
								color: '#fff',
							} }
						/>

						<RichText
							tagName="p"
							value={ ctaDescription }
							onChange={ ( val ) =>
								setAttributes( { ctaDescription: val } )
							}
							placeholder={ __(
								'CTA description...',
								'mk-builder'
							) }
							style={ {
								color: 'rgba(255, 255, 255, 0.7)',
								marginBottom: '30px',
								maxWidth: '600px',
								marginLeft: 'auto',
								marginRight: 'auto',
							} }
						/>

						<div contentEditable={ false }>
							<a
								href={ ctaButtonUrl }
								className="jivaka-btn btn-primary career-cta-btn"
								style={ {
									background: '#fff',
									color: 'var(--primary-orange, #f48b2a)',
								} }
							>
								{ ctaButtonIcon && (
									<i
										className={ ctaButtonIcon }
										aria-hidden="true"
										style={ { marginRight: '8px' } }
									/>
								) }
								{ ctaButtonText }
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
