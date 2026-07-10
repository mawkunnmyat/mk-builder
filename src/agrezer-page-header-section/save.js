import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export default function save( { attributes } ) {
	const {
		title,
		anchor,
		backgroundType,
		backgroundVideo,
		backgroundImage,
		backgroundColor,
		overlayOpacity,
		titleColor,
		titleFontSize,
		breadcrumbColor,
		breadcrumbActiveColor,
		backgroundPosition,
		graphicImage,
		graphicAlt,
		graphicMaxWidth,
		breadcrumbs,
		separatorChar,
		containerMaxWidth,
		containerWidthPct,
		paddingTop,
		paddingBottom,
		containerMinHeight,
		enableTractorAnimation,
	} = attributes;

	const crumbs =
		Array.isArray( breadcrumbs ) && breadcrumbs.length ? breadcrumbs : [];

	const blockProps = useBlockProps.save( {
		className: 'mk-page-header mk-page-header-section',
		style: {
			'--tw-bg-color': backgroundColor,
			'--tw-overlay-opacity': `${ overlayOpacity / 100 }`,
			'--tw-title-size': `${ titleFontSize }px`,
			'--tw-title-color': titleColor,
			'--tw-crumb-color': breadcrumbColor,
			'--tw-crumb-active-color': breadcrumbActiveColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-page-header-max': `${ containerMaxWidth }px`,
			'--mk-page-header-width-pct': `${ containerWidthPct }%`,
			'--mk-page-header-min-h': `${ containerMinHeight }px`,
		},
		'data-tractor-anim': enableTractorAnimation ? 'true' : 'false',
	} );

	const titleId = anchor ? `${ anchor }-title` : undefined;

	return (
		<section { ...blockProps } aria-labelledby={ titleId || undefined }>
			{ backgroundType === 'video' && backgroundVideo && (
				<div className="mk-page-header__video-layer" aria-hidden="true">
					<video src={ backgroundVideo } autoPlay muted loop playsInline />
				</div>
			) }
			{ backgroundType === 'image' && backgroundImage && (
				<div
					className="mk-page-header__image-layer"
					style={ {
						backgroundImage: `url(${ backgroundImage })`,
						backgroundPosition,
					} }
					aria-hidden="true"
				/>
			) }
			<div className="mk-page-header__bg-overlay" aria-hidden="true" />

			<div className="mk-page-header__container">
				<div className="mk-page-header__content">
					<RichText.Content
						tagName="h1"
						id={ titleId }
						className="mk-page-header__title"
						value={ title }
					/>

					{ crumbs.length > 0 && (
						<nav
							className="mk-page-header__breadcrumb-nav"
							aria-label="Breadcrumb"
						>
							<ul className="mk-page-header__breadcrumb">
								{ crumbs.map( ( crumb, index ) => {
									const label = crumb?.label ?? '';
									const url = crumb?.url ?? '';
									const isCurrent =
										String( url ).trim() === '';

									return (
										<Fragment key={ index }>
											{ index > 0 && (
												<li
													className="separator"
													aria-hidden="true"
												>
													{ separatorChar || '•' }
												</li>
											) }
											<li
												className={
													isCurrent
														? 'active'
														: undefined
												}
												{ ...( isCurrent
													? { 'aria-current': 'page' }
													: {} ) }
											>
												{ ! isCurrent ? (
													<a href={ url }>
														{ label }
													</a>
												) : (
													label
												) }
											</li>
										</Fragment>
									);
								} ) }
							</ul>
						</nav>
					) }
				</div>

				{ graphicImage && (
					<div
						className="mk-page-header__graphic"
						aria-hidden="true"
					>
						<img
							src={ graphicImage }
							alt={ graphicAlt || '' }
							className="mk-page-header__img"
							style={ { maxWidth: `${ graphicMaxWidth }px` } }
							loading="lazy"
							decoding="async"
						/>
					</div>
				) }
			</div>
		</section>
	);
}
