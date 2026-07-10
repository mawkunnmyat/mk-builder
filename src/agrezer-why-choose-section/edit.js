import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/benefit-point' ];

const POINT_TEMPLATE = [
	[
		'mk/benefit-point',
		{
			slot: 1,
			badgeText: '01',
			pointText: 'Health From of the Earth',
		},
	],
	[
		'mk/benefit-point',
		{
			slot: 2,
			badgeText: '02',
			pointText: 'Rooted in Sustainable Growth',
		},
	],
	[
		'mk/benefit-point',
		{
			slot: 3,
			badgeText: '03',
			pointText: 'Technology Meets the Soil Flow',
		},
	],
	[
		'mk/benefit-point',
		{
			slot: 4,
			badgeText: '04',
			pointText: 'Fields of Shared Prosperity',
		},
	],
	[
		'mk/benefit-point',
		{
			slot: 5,
			badgeText: '05',
			pointText: 'Seeds Sprouting Sustainable',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		taglineLetterSpacing,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleLineHeight,
		bgGradientStartColor,
		bgGradientEndColor,
		centerMediaUrl,
		centerMediaId,
		centerMediaType,
		centerMediaAlt,
		videoAutoplay,
		videoLoop,
		videoMuted,
		mediaBorderRadius,
		mediaDropShadow,
		filterBrightness,
		filterContrast,
		filterGrayscale,
		mediaMaxWidthDesktop,
		mediaMaxWidthMobile,
		imageAnimationType,
		hoverEffectType,
		imageAnimationDuration,
		imageAnimationDelay,
		imageVerticalOffset,
		backgroundOverlayOpacity,
		enableParallax,
		stageMinHeight,
		waveDecorationUrl,
		waveHeightDesktop,
		waveHeightMobile,
		waveOpacity,
		waveFlipHorizontal,
		waveFlipVertical,
	} = attributes;

	const detectMediaType = ( media = {} ) => {
		const url = media?.url || '';
		const mime = media?.mime || '';
		if ( mime.indexOf( 'video' ) === 0 || /\.(mp4|webm)$/i.test( url ) ) {
			return 'video';
		}
		return 'image';
	};

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps( {
		className: `mk-why-choose mk-why-choose-section-editor ${
			waveDecorationUrl ? 'has-wave-decoration' : ''
		}`,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-padding-top-mobile': `${ paddingTopMobile }px`,
			'--mk-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--mk-anim-duration': `${ imageAnimationDuration }s`,
			'--mk-anim-delay': `${ imageAnimationDelay }s`,
			'--mk-image-bottom': `${ imageVerticalOffset }px`,
			'--mk-bg-overlay-opacity': backgroundOverlayOpacity,
			'--mk-parallax-shift': enableParallax ? '-12px' : '0px',
			'--mk-media-radius': `${ mediaBorderRadius }px`,
			'--mk-filter-brightness': `${ filterBrightness }%`,
			'--mk-filter-contrast': `${ filterContrast }%`,
			'--mk-filter-grayscale': `${ filterGrayscale }%`,
			'--mk-media-max-width-desk': `${ mediaMaxWidthDesktop }px`,
			'--mk-media-max-width-mob': `${ mediaMaxWidthMobile }px`,
			'--mk-bg-start': bgGradientStartColor,
			'--mk-bg-end': bgGradientEndColor,
			'--mk-wave-h-desk': `${ waveHeightDesktop }px`,
			'--mk-wave-h-mob': `${ waveHeightMobile }px`,
			'--mk-wave-opacity': waveOpacity,
			'--mk-wave-flip-x': waveFlipHorizontal ? -1 : 1,
			'--mk-wave-flip-y': waveFlipVertical ? -1 : 1,
			'--mk-media-drop-shadow': mediaDropShadow
				? 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.28))'
				: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
			...( shapeVar ? { '--mk-why-choose-shape': shapeVar } : {} ),
		},
	} );

	const containerStyle = {
		width: `min(100% - ${ containerGutter * 2 }px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	const stageProps = {
		className: 'mk-why-choose__stage mk-why-choose__stage-editor',
		style: stageStyle,
	};
	const innerBlocksProps = useInnerBlocksProps( stageProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: POINT_TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Header', 'mk-builder' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Tagline icon (emoji)', 'mk-builder' ) }
							value={ taglineIcon }
							onChange={ ( val ) => setAttributes( { taglineIcon: val } ) }
						/>
						<PanelColorSettings
							title={ __( 'Tagline', 'mk-builder' ) }
							colorSettings={ [
								{ value: taglineColor, onChange: ( val ) => setAttributes( { taglineColor: val } ), label: __( 'Text', 'mk-builder' ) },
								{ value: taglineIconColor, onChange: ( val ) => setAttributes( { taglineIconColor: val } ), label: __( 'Icon tint', 'mk-builder' ) },
							] }
						/>
						<TextControl
							label={ __( 'Tagline letter spacing', 'mk-builder' ) }
							value={ taglineLetterSpacing }
							onChange={ ( val ) =>
								setAttributes( { taglineLetterSpacing: val || 'normal' } )
							}
							help={ __( 'Example: normal, 0.04em, 1px', 'mk-builder' ) }
						/>
						<Divider />
						<PanelColorSettings
							title={ __( 'Title', 'mk-builder' ) }
							colorSettings={ [ { value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Color', 'mk-builder' ) } ] }
						/>
						<RangeControl label={ __( 'Title size (rem)', 'mk-builder' ) } value={ titleFontSize } onChange={ ( val ) => setAttributes( { titleFontSize: val } ) } min={ 1.5 } max={ 4 } step={ 0.05 } />
						<RangeControl label={ __( 'Title weight', 'mk-builder' ) } value={ titleFontWeight } onChange={ ( val ) => setAttributes( { titleFontWeight: val } ) } min={ 400 } max={ 900 } step={ 100 } />
						<RangeControl
							label={ __( 'Title line height', 'mk-builder' ) }
							value={ titleLineHeight }
							onChange={ ( val ) => setAttributes( { titleLineHeight: val } ) }
							min={ 0.8 }
							max={ 2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Background settings', 'mk-builder' ) } initialOpen={ false }>
						<PanelColorSettings
							title={ __( 'Gradient colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: bgGradientStartColor,
									onChange: ( val ) => setAttributes( { bgGradientStartColor: val } ),
									label: __( 'Gradient start', 'mk-builder' ),
								},
								{
									value: bgGradientEndColor,
									onChange: ( val ) => setAttributes( { bgGradientEndColor: val } ),
									label: __( 'Gradient end', 'mk-builder' ),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Background overlay opacity', 'mk-builder' ) }
							value={ backgroundOverlayOpacity }
							onChange={ ( val ) => setAttributes( { backgroundOverlayOpacity: val } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Animations', 'mk-builder' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Image animation type', 'mk-builder' ) }
							value={ imageAnimationType }
							options={ [
								{ label: __( 'None', 'mk-builder' ), value: 'none' },
								{ label: __( 'Spin', 'mk-builder' ), value: 'spin' },
								{ label: __( 'Bounce', 'mk-builder' ), value: 'bounce' },
								{ label: __( 'Float', 'mk-builder' ), value: 'float' },
								{ label: __( 'Pulse', 'mk-builder' ), value: 'pulse' },
								{ label: __( 'Fade Up', 'mk-builder' ), value: 'fade-up' },
								{ label: __( 'Zoom In', 'mk-builder' ), value: 'zoom-in' },
							] }
							onChange={ ( val ) => setAttributes( { imageAnimationType: val } ) }
						/>
						<SelectControl
							label={ __( 'Hover effect', 'mk-builder' ) }
							value={ hoverEffectType }
							options={ [
								{ label: __( 'None', 'mk-builder' ), value: 'none' },
								{ label: __( 'Lift', 'mk-builder' ), value: 'lift' },
								{ label: __( 'Scale Up', 'mk-builder' ), value: 'scale-up' },
								{ label: __( 'Glow', 'mk-builder' ), value: 'glow' },
							] }
							onChange={ ( val ) => setAttributes( { hoverEffectType: val } ) }
						/>
						<RangeControl
							label={ __( 'Animation duration (s)', 'mk-builder' ) }
							value={ imageAnimationDuration }
							onChange={ ( val ) => setAttributes( { imageAnimationDuration: val } ) }
							min={ 0.2 }
							max={ 10 }
							step={ 0.1 }
						/>
						<RangeControl
							label={ __( 'Animation delay (s)', 'mk-builder' ) }
							value={ imageAnimationDelay }
							onChange={ ( val ) => setAttributes( { imageAnimationDelay: val } ) }
							min={ 0 }
							max={ 6 }
							step={ 0.1 }
						/>
						<ToggleControl
							label={ __( 'Enable subtle parallax shift', 'mk-builder' ) }
							checked={ !! enableParallax }
							onChange={ ( val ) => setAttributes( { enableParallax: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Media source', 'mk-builder' ) } initialOpen={ false }>
						<BaseControl label={ __( 'Center media', 'mk-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											centerMediaUrl: media.url,
											centerMediaId: media.id,
											centerMediaType: detectMediaType( media ),
											centerMediaAlt: media.alt || centerMediaAlt,
										} )
									}
									allowedTypes={ [ 'image', 'video' ] }
									value={ centerMediaId }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ centerMediaUrl
												? __( 'Replace media', 'mk-builder' )
												: __( 'Select media', 'mk-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ centerMediaUrl && (
								<Button
									isDestructive
									onClick={ () =>
										setAttributes( {
											centerMediaUrl: '',
											centerMediaId: null,
											centerMediaType: 'image',
										} )
									}
								>
									{ __( 'Remove media', 'mk-builder' ) }
								</Button>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Alt text', 'mk-builder' ) }
							value={ centerMediaAlt }
							onChange={ ( val ) => setAttributes( { centerMediaAlt: val } ) }
						/>
					</PanelBody>

					{ centerMediaType === 'video' && (
						<PanelBody title={ __( 'Video settings', 'mk-builder' ) } initialOpen={ false }>
							<ToggleControl
								label={ __( 'Autoplay', 'mk-builder' ) }
								checked={ !! videoAutoplay }
								onChange={ ( val ) => setAttributes( { videoAutoplay: val } ) }
							/>
							<ToggleControl
								label={ __( 'Loop', 'mk-builder' ) }
								checked={ !! videoLoop }
								onChange={ ( val ) => setAttributes( { videoLoop: val } ) }
							/>
							<ToggleControl
								label={ __( 'Muted', 'mk-builder' ) }
								checked={ !! videoMuted }
								onChange={ ( val ) => setAttributes( { videoMuted: val } ) }
							/>
						</PanelBody>
					) }

					<PanelBody title={ __( 'Media sizing', 'mk-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Desktop max width (px)', 'mk-builder' ) }
							value={ mediaMaxWidthDesktop }
							onChange={ ( val ) => setAttributes( { mediaMaxWidthDesktop: val } ) }
							min={ 200 }
							max={ 900 }
							step={ 10 }
						/>
						<RangeControl
							label={ __( 'Mobile max width (px)', 'mk-builder' ) }
							value={ mediaMaxWidthMobile }
							onChange={ ( val ) => setAttributes( { mediaMaxWidthMobile: val } ) }
							min={ 160 }
							max={ 700 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Media styling & filters', 'mk-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Border radius (px)', 'mk-builder' ) }
							value={ mediaBorderRadius }
							onChange={ ( val ) => setAttributes( { mediaBorderRadius: val } ) }
							min={ 0 }
							max={ 80 }
							step={ 1 }
						/>
						<ToggleControl
							label={ __( 'Enable drop shadow', 'mk-builder' ) }
							checked={ !! mediaDropShadow }
							onChange={ ( val ) => setAttributes( { mediaDropShadow: val } ) }
						/>
						<RangeControl
							label={ __( 'Brightness (%)', 'mk-builder' ) }
							value={ filterBrightness }
							onChange={ ( val ) => setAttributes( { filterBrightness: val } ) }
							min={ 1 }
							max={ 200 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Contrast (%)', 'mk-builder' ) }
							value={ filterContrast }
							onChange={ ( val ) => setAttributes( { filterContrast: val } ) }
							min={ 1 }
							max={ 200 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Grayscale (%)', 'mk-builder' ) }
							value={ filterGrayscale }
							onChange={ ( val ) => setAttributes( { filterGrayscale: val } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Advanced design', 'mk-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Image vertical offset (px)', 'mk-builder' ) }
							value={ imageVerticalOffset }
							onChange={ ( val ) => setAttributes( { imageVerticalOffset: val } ) }
							min={ -120 }
							max={ 200 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Spacing & layout', 'mk-builder' ) } initialOpen={ false }>
						<RangeControl label={ __( 'Min height (px)', 'mk-builder' ) } value={ stageMinHeight } onChange={ ( val ) => setAttributes( { stageMinHeight: val } ) } min={ 400 } max={ 900 } step={ 10 } />
						<RangeControl label={ __( 'Padding top (px)', 'mk-builder' ) } value={ paddingTop } onChange={ ( val ) => setAttributes( { paddingTop: val } ) } min={ 0 } max={ 160 } step={ 4 } />
						<RangeControl label={ __( 'Padding bottom (px)', 'mk-builder' ) } value={ paddingBottom } onChange={ ( val ) => setAttributes( { paddingBottom: val } ) } min={ 0 } max={ 120 } step={ 4 } />
						<RangeControl
							label={ __( 'Padding top mobile (px)', 'mk-builder' ) }
							value={ paddingTopMobile }
							onChange={ ( val ) => setAttributes( { paddingTopMobile: val } ) }
							min={ 0 }
							max={ 160 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Padding bottom mobile (px)', 'mk-builder' ) }
							value={ paddingBottomMobile }
							onChange={ ( val ) => setAttributes( { paddingBottomMobile: val } ) }
							min={ 0 }
							max={ 160 }
							step={ 2 }
						/>
						<RangeControl label={ __( 'Content max width (px)', 'mk-builder' ) } value={ containerMaxWidth } onChange={ ( val ) => setAttributes( { containerMaxWidth: val } ) } min={ 960 } max={ 1440 } step={ 10 } />
						<RangeControl label={ __( 'Side gutter (px)', 'mk-builder' ) } value={ containerGutter } onChange={ ( val ) => setAttributes( { containerGutter: val } ) } min={ 12 } max={ 48 } step={ 2 } />
					</PanelBody>
					<PanelBody title={ __( 'Shape divider settings', 'mk-builder' ) } initialOpen={ false }>
						<BaseControl label={ __( 'Wave / shape image (optional)', 'mk-builder' ) } help={ __( 'Uses theme asset e.g. shape-12.webp, or upload any wide strip.', 'mk-builder' ) }>
							{ ! waveDecorationUrl ? (
								<MediaPlaceholder onSelect={ ( media ) => setAttributes( { waveDecorationUrl: media.url, waveDecorationId: media.id } ) } allowedTypes={ [ 'image' ] } multiple={ false } labels={ { title: __( 'Decoration image', 'mk-builder' ) } } />
							) : (
								<div>
									<img src={ waveDecorationUrl } alt="" style={ { width: '100%', maxHeight: 80, objectFit: 'contain' } } />
									<Button isSecondary isSmall onClick={ () => setAttributes( { waveDecorationUrl: '', waveDecorationId: null } ) }>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
						<RangeControl
							label={ __( 'Wave height desktop (px)', 'mk-builder' ) }
							value={ waveHeightDesktop }
							onChange={ ( val ) => setAttributes( { waveHeightDesktop: val } ) }
							min={ 20 }
							max={ 280 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Wave height mobile (px)', 'mk-builder' ) }
							value={ waveHeightMobile }
							onChange={ ( val ) => setAttributes( { waveHeightMobile: val } ) }
							min={ 20 }
							max={ 220 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Wave opacity', 'mk-builder' ) }
							value={ waveOpacity }
							onChange={ ( val ) => setAttributes( { waveOpacity: val } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
						/>
						<ToggleControl
							label={ __( 'Flip wave horizontally', 'mk-builder' ) }
							checked={ !! waveFlipHorizontal }
							onChange={ ( val ) => setAttributes( { waveFlipHorizontal: val } ) }
						/>
						<ToggleControl
							label={ __( 'Flip wave vertically', 'mk-builder' ) }
							checked={ !! waveFlipVertical }
							onChange={ ( val ) => setAttributes( { waveFlipVertical: val } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } aria-labelledby="mk-why-choose-title">
				<div className="mk-why-choose__container" style={ containerStyle }>
					<div className="mk-why-choose__header">
						<p
							className="mk-why-choose__tagline"
							style={ { color: taglineColor, letterSpacing: taglineLetterSpacing } }
						>
							<span className="mk-why-choose__tagline-icon" style={ { color: taglineIconColor } } aria-hidden="true">{ taglineIcon }</span>
							<RichText tagName="span" value={ taglineText } onChange={ ( val ) => setAttributes( { taglineText: val } ) } placeholder={ __( 'Why Choose Our Farm', 'mk-builder' ) } allowedFormats={ [] } />
						</p>
						<RichText
							tagName="h2"
							id="mk-why-choose-title"
							className="mk-why-choose__title"
							value={ sectionTitle }
							onChange={ ( val ) => setAttributes( { sectionTitle: val } ) }
							placeholder={ __( 'Title…', 'mk-builder' ) }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
								lineHeight: titleLineHeight,
							} }
						/>
					</div>
					<div { ...innerBlocksProps }>
						<div
							className={ `mk-why-choose__center-media-wrapper has-animation-${ imageAnimationType }${
								enableParallax ? ' has-parallax' : ''
							}` }
							data-anim-type={ imageAnimationType || 'none' }
							data-hover-type={ hoverEffectType || 'none' }
						>
							{ ! centerMediaUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											centerMediaUrl: media.url,
											centerMediaId: media.id,
											centerMediaType: detectMediaType( media ),
											centerMediaAlt: media.alt || centerMediaAlt,
										} )
									}
									allowedTypes={ [ 'image', 'video' ] }
									multiple={ false }
									labels={ { title: __( 'Center media', 'mk-builder' ) } }
								/>
							) : (
								centerMediaType === 'video' ? (
									<video
										src={ centerMediaUrl }
										className="mk-why-choose__center-media"
										autoPlay={ !! videoAutoplay }
										loop={ !! videoLoop }
										muted={ !! videoMuted }
										playsInline
									/>
								) : (
									<img
										src={ centerMediaUrl }
										className="mk-why-choose__center-media"
										alt={ centerMediaAlt || '' }
									/>
								)
							) }
						</div>
						{ innerBlocksProps.children }
					</div>
				</div>
				<div
					className="mk-why-choose__shape-divider"
					aria-hidden="true"
				></div>
			</section>
		</>
	);
}
