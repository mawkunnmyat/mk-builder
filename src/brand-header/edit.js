import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/brand-nav-item' ];

const NAV_TEMPLATE = [
	[ 'mk/brand-nav-item', { label: 'Home', url: '/', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'Shop', url: '/shop', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'About', url: '/about', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'Blog', url: '/blog', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'Wholesale', url: '/wholesale', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'FAQ', url: '/faq', hasDropdown: false } ],
	[ 'mk/brand-nav-item', { label: 'Contact', url: '/contact', hasDropdown: false } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		logoImage,
		logoImageId,
		brandName,
		homeUrl,
		hotlineLabel,
		phone,
		showSearch,
		backgroundColor,
		stickyHeader,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-brand-header mk-brand-header--editor${
				stickyHeader ? ' mk-brand-header--sticky' : ''
			}`,
			style: {
				'--mk-brand-header-bg': backgroundColor || '#ffffff',
			},
		} ),
		[ backgroundColor, stickyHeader ]
	);

	const phoneDigits = ( phone || '' ).replace( /\D/g, '' );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Sticky Header', 'mk-builder' ) }
							checked={ stickyHeader }
							onChange={ ( val ) =>
								setAttributes( { stickyHeader: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Search Icon', 'mk-builder' ) }
							checked={ showSearch }
							onChange={ ( val ) =>
								setAttributes( { showSearch: val } )
							}
						/>
						<PanelColorSettings
							title={ __( 'Background', 'mk-builder' ) }
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
						title={ __( 'Brand & Logo', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Brand Name', 'mk-builder' ) }
							value={ brandName }
							onChange={ ( val ) =>
								setAttributes( { brandName: val } )
							}
						/>
						<BaseControl label={ __( 'Home URL', 'mk-builder' ) }>
							<URLInput
								value={ homeUrl }
								onChange={ ( val ) =>
									setAttributes( { homeUrl: val } )
								}
							/>
						</BaseControl>
						<BaseControl label={ __( 'Logo Image', 'mk-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									value={ logoImageId }
									onSelect={ ( media ) =>
										setAttributes( {
											logoImage: media?.url || '',
											logoImageId: media?.id || null,
										} )
									}
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ logoImage
												? __( 'Replace Logo', 'mk-builder' )
												: __( 'Upload Logo', 'mk-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ logoImage && (
								<>
									<img
										src={ logoImage }
										alt=""
										style={ {
											display: 'block',
											maxWidth: 200,
											marginTop: 12,
										} }
									/>
									<Button
										variant="link"
										isDestructive
										onClick={ () =>
											setAttributes( {
												logoImage: '',
												logoImageId: null,
											} )
										}
									>
										{ __( 'Remove Logo', 'mk-builder' ) }
									</Button>
								</>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Hotline', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Hotline Label', 'mk-builder' ) }
							value={ hotlineLabel }
							onChange={ ( val ) =>
								setAttributes( { hotlineLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Phone Number', 'mk-builder' ) }
							value={ phone }
							onChange={ ( val ) =>
								setAttributes( { phone: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps } data-block="mk/brand-header">
				<div className="mk-brand-header__main">
					<div className="mk-brand-header__inner l-section">
						<a
							className="mk-brand-header__brand"
							href={ homeUrl || '/' }
							onClick={ ( e ) => e.preventDefault() }
							aria-label={ `${ brandName || 'Shwe Myanmar' } home` }
						>
							{ logoImage ? (
								<img
									className="mk-brand-header__brand-logo"
									src={ logoImage }
									alt={ brandName || 'Shwe Myanmar' }
									width="560"
									height="290"
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
							aria-label={ __( 'Main navigation', 'mk-builder' ) }
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ NAV_TEMPLATE }
								templateLock={ false }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</nav>

						<div className="mk-brand-header__actions">
							{ showSearch && (
								<button
									type="button"
									className="mk-brand-header__icon-btn"
									aria-label={ __( 'Search', 'mk-builder' ) }
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
									<p className="mk-brand-header__hotline-label">
										{ hotlineLabel }
									</p>
									<a
										className="mk-brand-header__hotline-phone"
										href={ phoneDigits ? `tel:${ phoneDigits }` : '#' }
										onClick={ ( e ) => e.preventDefault() }
									>
										{ phone }
									</a>
								</div>
							</div>

							<button
								className="mk-brand-header__toggle"
								type="button"
								data-action="menu-toggle"
								aria-expanded="false"
								aria-controls="header-nav"
							>
								<span className="u-hidden">
									{ __( 'Menu', 'mk-builder' ) }
								</span>
								<span
									className="mk-brand-header__toggle-bar"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
