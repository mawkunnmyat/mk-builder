import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

// Must match the actual child block name (see src/agrezer-third-section-card/block.json).
const ALLOWED_BLOCKS = [ 'mk/stat-image-card' ];
const TEMPLATE = [
	[
		'mk/stat-image-card',
		{
			cardAlign: 'left',
			stat: '80%',
			label: 'Efficiency',
		},
	],

	[
		'mk/stat-image-card',
		{
			cardAlign: 'center',
			stat: '98%',
			label: 'Increase in Yields',
		},
	],

	[
		'mk/stat-image-card',
		{
			cardAlign: 'right',
			stat: '50%',
			label: 'Farm Growth',
		},
	],
];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		backgroundColor = '#f4f4f0',
		paddingTop = 110,
		paddingBottom = 120,
		titleColor = '#131313',
		titleFontSize = 48,
		subtitleColor = '#f48b2a',
		subtitleFontSize = 16,
		descriptionColor = '#4c4c4c',
		descriptionFontSize = 17,
		ctaBgColor = '#d7e84f',
		ctaTextColor = '#1a1a1a',
		overlayOpacity = 0,
		containerMaxWidth,
		containerWidthPct,
		topGridGap,
		topMarginBottom,
		cardsGap,
		cardsMarginTop,
		tagIcon,
		tagIconId,
		tagIconAlt,
		tagline,
		title,
		description,
		ctaText,
		ctaUrl,
		ctaOpenInNewTab,
		showCta,
	} = attributes;

	const overlayRaw = Number( overlayOpacity );
	const overlayAlpha = Number.isFinite( overlayRaw )
		? Math.min( 1, Math.max( 0, overlayRaw / 100 ) )
		: 0;
	const uniqueClass = `mk-third-${ clientId }`;

	const dynamicStyles = `
    .${ uniqueClass } {
        background-color: ${ backgroundColor } !important;
        padding-top: ${ paddingTop }px !important;
        padding-bottom: ${ paddingBottom }px !important;
        --mk-third-max: ${ containerMaxWidth }px;
        --mk-third-width-pct: ${ containerWidthPct }%;
        --mk-third-top-gap: ${ topGridGap }px;
        --mk-third-top-mb: ${ topMarginBottom }px;
        --mk-third-cards-gap: ${ cardsGap }px;
        --mk-third-cards-mt: ${ cardsMarginTop }px;
        --tw-third-title-color: ${ titleColor };
        --tw-third-title-size: ${ titleFontSize }px;
        --tw-third-sub-color: ${ subtitleColor };
        --tw-third-sub-size: ${ subtitleFontSize }px;
        --tw-third-desc-color: ${ descriptionColor };
        --tw-third-desc-size: ${ descriptionFontSize }px;
        --tw-third-cta-bg: ${ ctaBgColor };
        --tw-third-cta-color: ${ ctaTextColor };
        --tw-third-overlay: ${ overlayAlpha };
    }
`;

	const blockProps = useBlockProps( {
		className: `mk-third-section mk-third-section-editor ${ uniqueClass }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'mk-third-section__cards',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const urlTrim = String( ctaUrl || '' ).trim();
	const isRealLink = urlTrim !== '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Typography', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Title font size (px)', 'mk-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 24 }
							max={ 96 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Subtitle font size (px)',
								'mk-builder'
							) }
							value={ subtitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { subtitleFontSize: val } )
							}
							min={ 10 }
							max={ 32 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Description font size (px)',
								'mk-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionFontSize: val,
								} )
							}
							min={ 12 }
							max={ 32 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'mk-builder' ) }
						colorSettings={ [
							{
								value: titleColor,
								onChange: ( val ) =>
									setAttributes( { titleColor: val } ),
								label: __( 'Title', 'mk-builder' ),
							},
							{
								value: subtitleColor,
								onChange: ( val ) =>
									setAttributes( { subtitleColor: val } ),
								label: __( 'Subtitle', 'mk-builder' ),
							},
							{
								value: descriptionColor,
								onChange: ( val ) =>
									setAttributes( {
										descriptionColor: val,
									} ),
								label: __( 'Description', 'mk-builder' ),
							},
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'mk-builder'
								),
							},
						] }
					/>

					<PanelBody
						title={ __( 'Overlay', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Dark overlay opacity (%)',
								'mk-builder'
							) }
							value={ overlayOpacity }
							onChange={ ( val ) =>
								setAttributes( { overlayOpacity: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
							help={ __(
								'Adds a subtle dark layer over the section background.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>
						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>
						<RangeControl
							label={ __(
								'Top row column gap (px)',
								'mk-builder'
							) }
							value={ topGridGap }
							onChange={ ( val ) =>
								setAttributes( { topGridGap: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
						<RangeControl
							label={ __(
								'Space below top row (px)',
								'mk-builder'
							) }
							value={ topMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { topMarginBottom: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
						<RangeControl
							label={ __( 'Cards gap (px)', 'mk-builder' ) }
							value={ cardsGap }
							onChange={ ( val ) =>
								setAttributes( { cardsGap: val } )
							}
							min={ 8 }
							max={ 40 }
						/>
						<RangeControl
							label={ __(
								'Cards top margin (px)',
								'mk-builder'
							) }
							value={ cardsMarginTop }
							onChange={ ( val ) =>
								setAttributes( { cardsMarginTop: val } )
							}
							min={ 0 }
							max={ 120 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Container width (%)',
								'mk-builder'
							) }
							value={ containerWidthPct }
							onChange={ ( val ) =>
								setAttributes( { containerWidthPct: val } )
							}
							min={ 70 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Call to action', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Button colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: ctaBgColor,
									onChange: ( val ) =>
										setAttributes( {
											ctaBgColor: val,
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: ctaTextColor,
									onChange: ( val ) =>
										setAttributes( {
											ctaTextColor: val,
										} ),
									label: __( 'Text', 'mk-builder' ),
								},
							] }
						/>

						<ToggleControl
							label={ __( 'Show CTA', 'mk-builder' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						{ showCta && (
							<>
								<TextControl
									label={ __(
										'Button text',
										'mk-builder'
									) }
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
								/>

								<TextControl
									label={ __( 'URL', 'mk-builder' ) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
									help={ __(
										'Leave empty for a non-clickable button. Any URL (including #) becomes a link.',
										'mk-builder'
									) }
								/>

								<ToggleControl
									label={ __(
										'Open in new tab',
										'mk-builder'
									) }
									checked={ ctaOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											ctaOpenInNewTab: val,
										} )
									}
									disabled={ ! isRealLink }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline icon', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt text', 'mk-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						{ ! tagIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										tagIcon: media.url,
										tagIconId: media.id,
										tagIconAlt: media.alt || tagIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Tagline icon',
										'mk-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									className="mk-third-section__tag-icon"
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											tagIcon: '',
											tagIconId: null,
										} )
									}
								>
									{ __( 'Remove icon', 'mk-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

				</InspectorControls>
			) }

			<style
				dangerouslySetInnerHTML={ { __html: dynamicStyles } }
			/>
			<section { ...blockProps }>
				<div className="mk-third-section__container">
					<div className="mk-third-section__top">
						<div className="mk-third-section__intro">
							<div className="mk-third-section__tagline">
								{ tagIcon && (
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												tagIcon: media.url,
												tagIconId: media.id,
												tagIconAlt:
													media.alt || tagIconAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ tagIconId }
										render={ ( { open } ) => (
											<img
												src={ tagIcon }
												alt={ tagIconAlt || '' }
												className="mk-third-section__tag-icon"
												onClick={ open }
												role="button"
												tabIndex={ 0 }
												onKeyDown={ ( event ) => {
													if (
														event.key ===
															'Enter' ||
														event.key === ' '
													) {
														event.preventDefault();
														open();
													}
												} }
											/>
										) }
									/>
								) }
								<RichText
									tagName="span"
									className="mk-third-section__subtitle"
									value={ tagline }
									onChange={ ( val ) =>
										setAttributes( { tagline: val } )
									}
									placeholder={ __(
										'Subtitle',
										'mk-builder'
									) }
									allowedFormats={ [
										'core/bold',
										'core/italic',
									] }
								/>
							</div>
							<RichText
								tagName="h2"
								className="mk-third-section__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Heading', 'mk-builder' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/underline',
								] }
							/>
						</div>

						<div className="mk-third-section__side">
							<RichText
								tagName="p"
								className="mk-third-section__desc"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									'Description…',
									'mk-builder'
								) }
							/>

							{ showCta && (
								<>
									{ isRealLink ? (
										<a
											href={ urlTrim }
											className="mk-third-section__cta"
											onClick={ ( e ) =>
												e.preventDefault()
											}
										>
											<span>{ ctaText }</span>
											<span aria-hidden="true">↗</span>
										</a>
									) : (
										<span className="mk-third-section__cta mk-third-section__cta--static">
											<span>{ ctaText }</span>
											<span aria-hidden="true">↗</span>
										</span>
									) }
								</>
							) }
						</div>
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
