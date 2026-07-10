import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	SelectControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const DEFAULT_CRUMBS = [
	{ label: 'Home', url: '/' },
	{ label: 'About Us', url: '' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		backgroundImage,
		backgroundImageId,
		backgroundPosition,
		overlayColor,
		graphicImage,
		graphicImageId,
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
		fallbackBgColor,
	} = attributes;

	const crumbs =
		Array.isArray( breadcrumbs ) && breadcrumbs.length
			? breadcrumbs
			: DEFAULT_CRUMBS;

	const updateCrumb = ( index, field, value ) => {
		const next = crumbs.map( ( c, i ) =>
			i === index ? { ...c, [ field ]: value } : c
		);
		setAttributes( { breadcrumbs: next } );
	};

	const addCrumb = () => {
		setAttributes( {
			breadcrumbs: [
				...crumbs,
				{ label: __( 'New item', 'mk-builder' ), url: '' },
			],
		} );
	};

	const removeCrumb = ( index ) => {
		if ( crumbs.length < 2 ) {
			return;
		}
		setAttributes( {
			breadcrumbs: crumbs.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-page-header mk-agrezer-page-header-section-editor',
			style: {
				backgroundColor: fallbackBgColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-page-header-overlay': overlayColor,
				'--agrezer-page-header-max': `${ containerMaxWidth }px`,
				'--agrezer-page-header-width-pct': `${ containerWidthPct }%`,
				'--agrezer-page-header-min-h': `${ containerMinHeight }px`,
			},
			'data-tractor-anim': enableTractorAnimation ? 'true' : 'false',
		} ),
		[
			containerMaxWidth,
			containerMinHeight,
			containerWidthPct,
			enableTractorAnimation,
			fallbackBgColor,
			overlayColor,
			paddingBottom,
			paddingTop,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Title', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Page title', 'mk-builder' ) }
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							help={ __(
								'Shown as the main heading (agrezer-page-header__title). You can also click the title in the preview.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ ! backgroundImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: media.url,
										backgroundImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Header background',
										'mk-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ backgroundImage }
									alt=""
									style={ {
										width: '100%',
										maxHeight: 140,
										objectFit: 'cover',
										borderRadius: 6,
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											backgroundImage: '',
											backgroundImageId: null,
										} )
									}
								>
									{ __(
										'Remove background',
										'mk-builder'
									) }
								</Button>
							</>
						) }
						<SelectControl
							label={ __(
								'Background position',
								'mk-builder'
							) }
							value={ backgroundPosition }
							options={ [
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center center',
								},
								{
									label: __( 'Top', 'mk-builder' ),
									value: 'center top',
								},
								{
									label: __( 'Bottom', 'mk-builder' ),
									value: 'center bottom',
								},
								{
									label: __( 'Left', 'mk-builder' ),
									value: 'left center',
								},
								{
									label: __( 'Right', 'mk-builder' ),
									value: 'right center',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { backgroundPosition: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Overlay & fallback', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Photo overlay (CSS)',
								'mk-builder'
							) }
							value={ overlayColor }
							onChange={ ( val ) =>
								setAttributes( { overlayColor: val } )
							}
							help={ __(
								'e.g. rgba(12, 38, 20, 0.85)',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Fallback background (CSS)',
								'mk-builder'
							) }
							value={ fallbackBgColor }
							onChange={ ( val ) =>
								setAttributes( { fallbackBgColor: val } )
							}
							help={ __(
								'Shown behind overlay when no image is set.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Graphic (e.g. tractor)',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Image alt text', 'mk-builder' ) }
							value={ graphicAlt }
							onChange={ ( val ) =>
								setAttributes( { graphicAlt: val } )
							}
						/>

						{ ! graphicImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										graphicImage: media.url,
										graphicImageId: media.id,
										graphicAlt: media.alt || graphicAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Side graphic (PNG/SVG)',
										'mk-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ graphicImage }
									alt=""
									style={ {
										maxWidth: graphicMaxWidth,
										height: 'auto',
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											graphicImage: '',
											graphicImageId: null,
										} )
									}
								>
									{ __( 'Remove graphic', 'mk-builder' ) }
								</Button>
							</>
						) }
						<RangeControl
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ graphicMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { graphicMaxWidth: val } )
							}
							min={ 200 }
							max={ 640 }
							step={ 10 }
						/>

						<ToggleControl
							label={ __(
								'Slide-in animation',
								'mk-builder'
							) }
							checked={ enableTractorAnimation }
							onChange={ ( val ) =>
								setAttributes( { enableTractorAnimation: val } )
							}
							help={ __(
								'Still respects visitor “reduce motion” settings.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Breadcrumb', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Separator', 'mk-builder' ) }
							value={ separatorChar }
							onChange={ ( val ) =>
								setAttributes( { separatorChar: val } )
							}
						/>

						<p className="components-base-control__help">
							{ __(
								'Leave URL empty for the current page (shown in green, not linked).',
								'mk-builder'
							) }
						</p>
						{ crumbs.map( ( crumb, index ) => (
							<div
								key={ index }
								style={ {
									marginBottom: 12,
									paddingBottom: 12,
									borderBottom: '1px solid #ddd',
								} }
							>
								<TextControl
									label={ __( 'Label', 'mk-builder' ) }
									value={ crumb.label }
									onChange={ ( val ) =>
										updateCrumb( index, 'label', val )
									}
								/>

								<TextControl
									label={ __(
										'URL (empty = current)',
										'mk-builder'
									) }
									value={ crumb.url }
									onChange={ ( val ) =>
										updateCrumb( index, 'url', val )
									}
									placeholder="/"
								/>

								<Button
									isDestructive
									isSmall
									disabled={ crumbs.length < 2 }
									onClick={ () => removeCrumb( index ) }
								>
									{ __( 'Remove', 'mk-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addCrumb }>
							{ __( 'Add crumb', 'mk-builder' ) }
						</Button>
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

						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 60 }
							max={ 280 }
							step={ 4 }
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
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Content row min height (px)',
								'mk-builder'
							) }
							value={ containerMinHeight }
							onChange={ ( val ) =>
								setAttributes( { containerMinHeight: val } )
							}
							min={ 120 }
							max={ 400 }
							step={ 10 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="agrezer-page-header__bg"
					style={
						backgroundImage
							? {
									backgroundImage: `url(${ backgroundImage })`,
									backgroundPosition,
							  }
							: undefined
					}
				/>

				<div className="agrezer-page-header__container">
					<div className="agrezer-page-header__content">
						<RichText
							tagName="h1"
							className="agrezer-page-header__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __( 'Page title', 'mk-builder' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<ul className="agrezer-page-header__breadcrumb">
							{ crumbs.map( ( crumb, index ) => {
								const isCurrent =
									String( crumb.url || '' ).trim() === '';
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
												isCurrent ? 'active' : undefined
											}
										>
											{ ! isCurrent ? (
												<a
													href={ crumb.url }
													onClick={ ( e ) =>
														e.preventDefault()
													}
												>
													{ crumb.label }
												</a>
											) : (
												crumb.label
											) }
										</li>
									</Fragment>
								);
							} ) }
						</ul>
					</div>

					{ graphicImage ? (
						<div className="agrezer-page-header__graphic">
							<img
								src={ graphicImage }
								alt=""
								className="agrezer-page-header__img"
								style={ { maxWidth: `${ graphicMaxWidth }px` } }
							/>
						</div>
					) : (
						<div className="agrezer-page-header__graphic agrezer-page-header__graphic--placeholder">
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										graphicImage: media.url,
										graphicImageId: media.id,
										graphicAlt: media.alt || graphicAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __( 'Graphic', 'mk-builder' ),
								} }
							/>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
