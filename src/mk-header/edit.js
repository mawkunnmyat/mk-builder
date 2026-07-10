import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useState } from '@wordpress/element';
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
	ButtonGroup,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

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

const ALLOWED_BLOCKS = [ 'mk/nav-item' ];
const TEMPLATE = [
	[ 'mk/nav-item', { label: 'Home', url: '#' } ],
	[ 'mk/nav-item', { label: 'About', url: '#' } ],
	[ 'mk/nav-item', { label: 'Services', url: '#', hasDropdown: true } ],
	[ 'mk/nav-item', { label: 'Contact', url: '#' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const [ previewMode, setPreviewMode ] = useState( 'desktop' );

	const {
		isSticky,
		backgroundColor,
		textColor,
		hoverColor,
		headerHeight,
		containerMaxWidth,
		navAlignment,
		logoType,
		logoIcon,
		logoText,
		logoImage,
		logoImageId,
		showSearchIcon,
		showCtaButton,
		ctaText,
		ctaUrl,
		showCtaIcon,
		ctaIconType,
		ctaBgColor,
		ctaTextColor,
		ctaBorderRadius,
		boxShadow,
	} = attributes;

	const ctaIcon = ICONS[ ctaIconType ] || ICONS[ 'diagonal-arrow' ];
	const navJustifyMap = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	const navJustify = navJustifyMap[ navAlignment ] || 'center';
	const editorIsMobilePreview = previewMode === 'mobile';

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-header mk-header--editor${
				editorIsMobilePreview ? ' is-active mk-header--preview-mobile' : ''
			}`,
			style: {
				'--mk-header-bg': backgroundColor,
				'--mk-header-text': textColor,
				'--mk-header-hover': hoverColor,
				'--mk-header-height': `${ headerHeight }px`,
				'--mk-header-container-max': `${ containerMaxWidth }px`,
				'--mk-header-nav-justify': navJustify,
				'--mk-header-cta-bg': ctaBgColor,
				'--mk-header-cta-text': ctaTextColor,
				'--mk-header-cta-radius': `${ ctaBorderRadius }px`,
				'--mk-header-shadow': boxShadow
					? '0 8px 30px rgba(0, 0, 0, 0.08)'
					: 'none',
			},
		} ),
		[
			backgroundColor,
			boxShadow,
			containerMaxWidth,
			ctaBgColor,
			ctaBorderRadius,
			ctaTextColor,
			headerHeight,
			hoverColor,
			navJustify,
			editorIsMobilePreview,
			textColor,
		]
	);

	const renderLogo = () => {
		const textNode = (
			<RichText
				tagName="span"
				value={ logoText }
				onChange={ ( val ) => setAttributes( { logoText: val } ) }
				placeholder={ __( 'Logo text', 'mk-builder' ) }
			/>
		);
		const imageNode =
			logoImage ? <img src={ logoImage } alt="" /> : null;
		const iconNode = <span className="mk-header__logo-icon">{ logoIcon || '🥑' }</span>;

		switch ( logoType ) {
			case 'icon-text':
				return (
					<>
						{ iconNode }
						{textNode}
					</>
				);
			case 'image-text':
				return (
					<>
						{ imageNode }
						{textNode}
					</>
				);
			case 'image':
				return imageNode || textNode;
			case 'text':
			default:
				return textNode;
		}
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Editor Preview', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Preview Mode', 'mk-builder' ) }
						>
							<ButtonGroup>
								<Button
									isPressed={ previewMode === 'desktop' }
									onClick={ () => setPreviewMode( 'desktop' ) }
								>
									{ __( 'Desktop', 'mk-builder' ) }
								</Button>
								<Button
									isPressed={ previewMode === 'mobile' }
									onClick={ () => setPreviewMode( 'mobile' ) }
								>
									{ __( 'Mobile', 'mk-builder' ) }
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Header Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Sticky Header', 'mk-builder' ) }
							checked={ isSticky }
							onChange={ ( val ) => setAttributes( { isSticky: val } ) }
						/>
						<ToggleControl
							label={ __( 'Enable Header Shadow', 'mk-builder' ) }
							checked={ boxShadow }
							onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
						/>
						<RangeControl
							label={ __( 'Header Height (px)', 'mk-builder' ) }
							value={ headerHeight }
							onChange={ ( val ) => setAttributes( { headerHeight: val } ) }
							min={ 56 }
							max={ 140 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Container Max Width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 900 }
							max={ 1920 }
							step={ 10 }
						/>
						<SelectControl
							label={ __( 'Menu Alignment', 'mk-builder' ) }
							value={ navAlignment }
							options={ [
								{ label: __( 'Left', 'mk-builder' ), value: 'left' },
								{ label: __( 'Center', 'mk-builder' ), value: 'center' },
								{ label: __( 'Right', 'mk-builder' ), value: 'right' },
							] }
							onChange={ ( val ) => setAttributes( { navAlignment: val } ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Logo Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Logo Type', 'mk-builder' ) }
							value={ logoType }
							options={ [
								{ label: __( 'Text Logo', 'mk-builder' ), value: 'text' },
								{
									label: __( 'Icon + Text Logo', 'mk-builder' ),
									value: 'icon-text',
								},
								{
									label: __( 'Image + Text Logo', 'mk-builder' ),
									value: 'image-text',
								},
								{ label: __( 'Image Logo', 'mk-builder' ), value: 'image' },
							] }
							onChange={ ( val ) => setAttributes( { logoType: val } ) }
						/>

						{ ( logoType === 'text' || logoType === 'icon-text' || logoType === 'image-text' ) && (
							<TextControl
								label={ __( 'Logo Text', 'mk-builder' ) }
								value={ logoText }
								onChange={ ( val ) => setAttributes( { logoText: val } ) }
							/>
						) }

						{ logoType === 'icon-text' && (
							<TextControl
								label={ __( 'Logo Icon', 'mk-builder' ) }
								value={ logoIcon }
								onChange={ ( val ) => setAttributes( { logoIcon: val } ) }
								help={ __( 'Emoji or short icon text.', 'mk-builder' ) }
							/>
						) }

						{ ( logoType === 'image' || logoType === 'image-text' ) && (
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
									<Button
										variant="link"
										isDestructive
										onClick={ () =>
											setAttributes( { logoImage: '', logoImageId: null } )
										}
									>
										{ __( 'Remove Logo', 'mk-builder' ) }
									</Button>
								) }
							</BaseControl>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'CTA & Actions', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Search Icon', 'mk-builder' ) }
							checked={ showSearchIcon }
							onChange={ ( val ) =>
								setAttributes( { showSearchIcon: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show CTA Button', 'mk-builder' ) }
							checked={ showCtaButton }
							onChange={ ( val ) =>
								setAttributes( { showCtaButton: val } )
							}
						/>

						{ showCtaButton && (
							<>
								<TextControl
									label={ __( 'CTA Text', 'mk-builder' ) }
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
								/>
								<BaseControl label={ __( 'CTA URL', 'mk-builder' ) }>
									<URLInput
										value={ ctaUrl }
										onChange={ ( val ) =>
											setAttributes( { ctaUrl: val } )
										}
									/>
								</BaseControl>
								<Divider />
								<ToggleControl
									label={ __( 'Show CTA Icon', 'mk-builder' ) }
									checked={ showCtaIcon }
									onChange={ ( val ) =>
										setAttributes( { showCtaIcon: val } )
									}
								/>
								<SelectControl
									label={ __( 'CTA Icon Type', 'mk-builder' ) }
									value={ ctaIconType }
									disabled={ ! showCtaIcon }
									options={ [
										{
											label: __( 'Diagonal Arrow', 'mk-builder' ),
											value: 'diagonal-arrow',
										},
										{
											label: __( 'Arrow Right', 'mk-builder' ),
											value: 'arrow-right',
										},
										{
											label: __( 'External', 'mk-builder' ),
											value: 'external',
										},
										{ label: __( 'Plus', 'mk-builder' ), value: 'plus' },
									] }
									onChange={ ( val ) =>
										setAttributes( { ctaIconType: val } )
									}
								/>
								<RangeControl
									label={ __( 'CTA Border Radius (px)', 'mk-builder' ) }
									value={ ctaBorderRadius }
									onChange={ ( val ) =>
										setAttributes( { ctaBorderRadius: val } )
									}
									min={ 0 }
									max={ 60 }
									step={ 1 }
								/>
							</>
						) }
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'mk-builder' ) }
						colorSettings={ [
							{
								label: __( 'Header Background', 'mk-builder' ),
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
							},
							{
								label: __( 'Text Color', 'mk-builder' ),
								value: textColor,
								onChange: ( val ) => setAttributes( { textColor: val } ),
							},
							{
								label: __( 'Hover Color', 'mk-builder' ),
								value: hoverColor,
								onChange: ( val ) => setAttributes( { hoverColor: val } ),
							},
							{
								label: __( 'CTA Background', 'mk-builder' ),
								value: ctaBgColor,
								onChange: ( val ) => setAttributes( { ctaBgColor: val } ),
							},
							{
								label: __( 'CTA Text Color', 'mk-builder' ),
								value: ctaTextColor,
								onChange: ( val ) => setAttributes( { ctaTextColor: val } ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				<div className="mk-header__preview-badge" aria-hidden="true">
					{ previewMode === 'mobile'
						? __( '📱 Mobile Preview', 'mk-builder' )
						: __( '💻 Desktop Preview', 'mk-builder' ) }
				</div>
				<div className="mk-header__container">
					<div className="mk-header__logo">
						{ renderLogo() }
					</div>

					<nav className="mk-header__nav">
						<div className="mk-header__nav-list">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</div>
					</nav>

					<div className="mk-header__actions">
						{ showSearchIcon && (
							<button
								type="button"
								className="mk-header__search"
								aria-label={ __( 'Search', 'mk-builder' ) }
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.25"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
									focusable="false"
								>
									<circle cx="11" cy="11" r="7" />
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
								</svg>
							</button>
						) }

						{ showCtaButton && (
							<a href={ ctaUrl || '#' } className="mk-header__cta">
								<span className="mk-header__cta-label">
									{ ctaText || __( 'Get In Touch', 'mk-builder' ) }
								</span>
								{ showCtaIcon && (
									<span className="mk-header__cta-icon" aria-hidden="true">
										{ ctaIcon }
									</span>
								) }
							</a>
						) }

						<button
							type="button"
							className="mk-header__hamburger"
							aria-expanded="false"
							aria-label={ __( 'Toggle menu', 'mk-builder' ) }
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>
		</>
	);
}
