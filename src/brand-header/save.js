import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		logoImage,
		brandName,
		homeUrl,
		hotlineLabel,
		phone,
		showSearch,
		backgroundColor,
		stickyHeader,
	} = attributes;

	const phoneDigits = ( phone || '' ).replace( /\D/g, '' );

	const blockProps = useBlockProps.save( {
		className: `mk-brand-header${
			stickyHeader ? ' mk-brand-header--sticky' : ''
		}`,
		style: {
			'--mk-brand-header-bg': backgroundColor || '#ffffff',
		},
		'data-block': 'mk/brand-header',
		'data-sticky': stickyHeader ? 'true' : 'false',
	} );

	return (
		<header { ...blockProps }>
			<div className="mk-brand-header__main">
				<div className="mk-brand-header__inner l-section">
					<a
						className="mk-brand-header__brand"
						href={ homeUrl || '/' }
						aria-label={ `${ brandName || 'Shwe Myanmar' } home` }
					>
						{ logoImage ? (
							<img
								className="mk-brand-header__brand-logo"
								src={ logoImage }
								alt={ brandName || 'Shwe Myanmar' }
								width="560"
								height="290"
								loading="eager"
								decoding="async"
							/>
						) : (
							<span className="mk-brand-header__brand-text">
								{ brandName || 'Shwe Myanmar' }
							</span>
						) }
					</a>

					<nav
						id="header-nav"
						className="mk-brand-header__nav"
						aria-label="Main navigation"
					>
						<InnerBlocks.Content />
					</nav>

					<div className="mk-brand-header__actions">
						{ showSearch && (
							<button
								type="button"
								className="mk-brand-header__icon-btn"
								aria-label="Search"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<circle cx="11" cy="11" r="8" />
									<path d="m21 21-4.3-4.3" />
								</svg>
							</button>
						) }

						<div className="mk-brand-header__hotline">
							<span
								className="mk-brand-header__hotline-icon"
								aria-hidden="true"
							>
								<svg
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
								>
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
								</svg>
							</span>
							<div>
								{ hotlineLabel && (
									<p className="mk-brand-header__hotline-label">
										{ hotlineLabel }
									</p>
								) }
								{ phone && (
									<a
										className="mk-brand-header__hotline-phone"
										href={
											phoneDigits ? `tel:${ phoneDigits }` : '#'
										}
									>
										{ phone }
									</a>
								) }
							</div>
						</div>

						<button
							className="mk-brand-header__toggle"
							type="button"
							data-action="menu-toggle"
							aria-expanded="false"
							aria-controls="header-nav"
						>
							<span className="u-hidden">Menu</span>
							<span
								className="mk-brand-header__toggle-bar"
								aria-hidden="true"
							/>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
