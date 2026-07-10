import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps.save( {
		className: `mk-why-choose mk-why-choose-section ${
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
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="mk-why-choose-title">
			<div
				className="mk-why-choose__container"
				style={ containerStyle }
			>
				<div className="mk-why-choose__header">
					<p
						className="mk-why-choose__tagline"
						style={ { color: taglineColor, letterSpacing: taglineLetterSpacing } }
					>
						<span
							className="mk-why-choose__tagline-icon"
							style={ { color: taglineIconColor } }
							aria-hidden="true"
						>
							{ taglineIcon }
						</span>
						<RichText.Content
							tagName="span"
							value={ taglineText }
						/>
					</p>
					<RichText.Content
						tagName="h2"
						id="mk-why-choose-title"
						className="mk-why-choose__title"
						value={ sectionTitle }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							lineHeight: titleLineHeight,
						} }
					/>
				</div>

				<div className="mk-why-choose__stage" style={ stageStyle }>
					<div
						className={ `mk-why-choose__center-media-wrapper has-animation-${ imageAnimationType }${
							enableParallax ? ' has-parallax' : ''
						}` }
						data-anim-type={ imageAnimationType || 'none' }
						data-hover-type={ hoverEffectType || 'none' }
					>
						{ centerMediaUrl &&
							( centerMediaType === 'video' ? (
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
							) ) }
					</div>
					<InnerBlocks.Content />
				</div>
			</div>
				<div
					className="mk-why-choose__shape-divider"
					aria-hidden="true"
				></div>
		</section>
	);
}
