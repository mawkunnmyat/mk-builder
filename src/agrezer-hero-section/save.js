import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const HERO_OVERLAY_TRANSPARENT_GRADIENT =
	'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

function TaglineIcon() {
	return (
		<svg
			className="mk-hero__tagline-icon"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M12 22v-6.4" />
			<path d="M12 15.6c-4.8 0-8.4-2.4-9.6-6.4 3.7.2 6.5 1.1 8.4 2.8 1.2-2.4 1.3-5.1.3-8 4 1.1 6.7 3.6 8 7.4-1.7 2.7-4.1 4.1-7.1 4.2Z" />
		</svg>
	);
}

export default function save( { attributes } ) {
	const {
		taglineText,
		title,
		description,
		buttonText,
		buttonMediaUrl,
		buttonMediaType,
		buttonUrl,
		buttonLinkTarget,
		backgroundImage,
		overlayColor,
		overlayGradient,
		overlayOpacity,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		featuresGap,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const buttonIconSvg = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

	const href =
		buttonUrl && String( buttonUrl ).trim() !== '' ? buttonUrl : '#';

	const overlayGradientCss =
		overlayGradient && String( overlayGradient ).trim() !== ''
			? overlayGradient
			: HERO_OVERLAY_TRANSPARENT_GRADIENT;

	const blockProps = useBlockProps.save( {
		className: 'mk-hero mk-hero--bg',
		style: {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-container-max-width': `${ containerMaxWidth }px`,
			'--mk-container-padding': `${ containerPadding }px`,
			'--mk-features-gap': `${ featuresGap }px`,
			'--mk-hero-btn-bg': buttonBgColor,
			'--mk-hero-btn-text': buttonTextColor,
			'--mk-hero-btn-radius': `${ buttonBorderRadius }px`,
			'--mk-padding-top-mobile': `${ paddingTopMobile }px`,
			'--mk-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--mk-hero-overlay-gradient': overlayGradientCss,
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="mk-hero__overlay"
				style={ {
					'--mk-hero-overlay-color': overlayColor,
					'--mk-hero-overlay-opacity': overlayOpacity,
					'--mk-hero-overlay-gradient': overlayGradientCss,
				} }
			/>
			<div className="mk-hero__container">
				<div className="mk-hero__content">
					<div className="mk-hero__tagline">
						<TaglineIcon />
						<RichText.Content
							tagName="span"
							className="mk-hero__tagline-text"
							value={ taglineText }
						/>
					</div>
					<RichText.Content
						tagName="h1"
						className="mk-hero__title mk-hero__title"
						value={ title }
					/>
					<RichText.Content
						tagName="p"
						className="mk-hero__desc"
						value={ description }
					/>
					<a
						href={ href }
						className="mk-hero__btn"
						target={ buttonLinkTarget ? '_blank' : undefined }
						rel={
							buttonLinkTarget ? 'noopener noreferrer' : undefined
						}
					>
						<RichText.Content tagName="span" value={ buttonText } />
						{ ! buttonMediaUrl && showButtonIcon && (
							<span
								className="mk-hero__btn-icon"
								aria-hidden="true"
							>
								{ buttonIconSvg }
							</span>
						) }
						{ buttonMediaUrl && buttonMediaType === 'video' && (
							<video
								className="mk-hero__btn-media"
								src={ buttonMediaUrl }
								autoPlay
								muted
								loop
								playsInline
								aria-hidden="true"
							/>
						) }
						{ buttonMediaUrl && buttonMediaType !== 'video' && (
							<img
								className="mk-hero__btn-media"
								src={ buttonMediaUrl }
								alt=""
								aria-hidden="true"
							/>
						) }
					</a>
				</div>

				<div className="mk-hero__features-wrapper">
					<div className="mk-hero__features-track">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
