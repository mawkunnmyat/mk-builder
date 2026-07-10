import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'core/list', 'core/navigation' ];
const TEMPLATE = [
	[
		'core/list',
		{},
		[
			[ 'core/list-item', { content: 'About Us' } ],
			[ 'core/list-item', { content: 'Our Products' } ],
			[ 'core/list-item', { content: 'Fresh Blog' } ],
			[ 'core/list-item', { content: 'Contact' } ],
		],
	],
];

function normalizeSocialItem( item = {} ) {
	return {
		type: item.type === 'image' ? 'image' : 'icon',
		iconClass: item.iconClass || 'dashicons dashicons-share',
		imageUrl: item.imageUrl || '',
		url: item.url || '#',
	};
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		bgType = 'color',
		bgMediaUrl = '',
		bgColor = '#133a22',
		bgOverlay = 'rgba(19, 58, 34, 0.95)',
		columnCount = 3,
		logoText,
		description,
		col2Heading,
		col3Heading,
		col4Heading,
		col4Text,
		col5Heading,
		col5Text,
		showNewsletter = true,
		newsletterActionUrl = '#',
		socialLinks = [],
		copyrightText,
	} = attributes;

	const normalizedSocialLinks = socialLinks.map( normalizeSocialItem );

	// Strict background logic:
	// - color => background color only, no overlay
	// - image => bg image + overlay
	// - video => no bg style + video + overlay
	const sectionStyle =
		bgType === 'color'
			? { backgroundColor: bgColor }
			: bgType === 'image'
			? {
					backgroundImage: bgMediaUrl ? `url(${ bgMediaUrl })` : undefined,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
			  }
			: undefined;

	const blockProps = useBlockProps( {
		className: 'avocado-footer',
		style: sectionStyle,
	} );

	const topStyle = { '--footer-cols': columnCount };

	const mediaTypes = bgType === 'video' ? [ 'video' ] : [ 'image' ];

	const updateSocialItem = ( index, patch ) => {
		const next = normalizedSocialLinks.map( ( item, i ) =>
			i === index ? { ...item, ...patch } : item
		);
		setAttributes( { socialLinks: next } );
	};

	const addSocialItem = () => {
		setAttributes( {
			socialLinks: [
				...normalizedSocialLinks,
				{
					type: 'icon',
					iconClass: 'dashicons dashicons-share',
					imageUrl: '',
					url: '#',
				},
			],
		} );
	};

	const removeSocialItem = ( index ) => {
		setAttributes( {
			socialLinks: normalizedSocialLinks.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Background Type', 'mk-builder' ) }
							value={ bgType }
							options={ [
								{ label: __( 'Color', 'mk-builder' ), value: 'color' },
								{ label: __( 'Image/GIF', 'mk-builder' ), value: 'image' },
								{ label: __( 'Video', 'mk-builder' ), value: 'video' },
							] }
							onChange={ ( val ) =>
								setAttributes( { bgType: val, bgMediaUrl: '' } )
							}
						/>

						{ bgType === 'color' && (
							<PanelColorSettings
								colorSettings={ [
									{
										value: bgColor,
										onChange: ( val ) =>
											setAttributes( { bgColor: val } ),
										label: __( 'Background color', 'mk-builder' ),
									},
								] }
							/>
						) }

						{ bgType !== 'color' && (
							<>
								{ ! bgMediaUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( { bgMediaUrl: media.url } )
										}
										allowedTypes={ mediaTypes }
										multiple={ false }
										labels={ {
											title:
												bgType === 'video'
													? __( 'Background video', 'mk-builder' )
													: __( 'Background image/GIF', 'mk-builder' ),
										} }
									/>
								) : (
									<>
										{ bgType === 'video' ? (
											<video src={ bgMediaUrl } style={ { width: '100%' } } muted />
										) : (
											<img src={ bgMediaUrl } alt="" style={ { width: '100%' } } />
										) }
										<MediaUpload
											onSelect={ ( media ) =>
												setAttributes( { bgMediaUrl: media.url } )
											}
											allowedTypes={ mediaTypes }
											render={ ( { open } ) => (
												<Button isSecondary onClick={ open }>
													{ __( 'Replace media', 'mk-builder' ) }
												</Button>
											) }
										/>
										<Button
											isDestructive
											onClick={ () =>
												setAttributes( { bgMediaUrl: '' } )
											}
										>
											{ __( 'Remove media', 'mk-builder' ) }
										</Button>
									</>
								) }
								<PanelColorSettings
									colorSettings={ [
										{
											value: bgOverlay,
											onChange: ( val ) =>
												setAttributes( { bgOverlay: val } ),
											label: __( 'Overlay color', 'mk-builder' ),
										},
									] }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns', 'mk-builder' ) }
							value={ columnCount }
							onChange={ ( val ) =>
								setAttributes( { columnCount: val } )
							}
							min={ 3 }
							max={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Newsletter', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show newsletter form', 'mk-builder' ) }
							checked={ showNewsletter }
							onChange={ ( val ) =>
								setAttributes( { showNewsletter: val } )
							}
						/>
						<TextControl
							label={ __( 'Newsletter action URL', 'mk-builder' ) }
							value={ newsletterActionUrl }
							onChange={ ( val ) =>
								setAttributes( { newsletterActionUrl: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Social Links', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ normalizedSocialLinks.map( ( item, index ) => (
							<div key={ index } style={ { marginBottom: '16px' } }>
								<SelectControl
									label={ __( 'Icon Type', 'mk-builder' ) }
									value={ item.type }
									options={ [
										{
											label: __( 'Icon Class', 'mk-builder' ),
											value: 'icon',
										},
										{
											label: __( 'Image', 'mk-builder' ),
											value: 'image',
										},
									] }
									onChange={ ( val ) =>
										updateSocialItem( index, { type: val } )
									}
								/>

								{ item.type === 'icon' && (
									<TextControl
										label={ __( 'Icon Class', 'mk-builder' ) }
										value={ item.iconClass }
										onChange={ ( val ) =>
											updateSocialItem( index, { iconClass: val } )
										}
										help={ __(
											'Example: fab fa-facebook or dashicons dashicons-twitter',
											'mk-builder'
										) }
									/>
								) }

								{ item.type === 'image' && (
									<div>
										{ ! item.imageUrl ? (
											<MediaPlaceholder
												onSelect={ ( media ) =>
													updateSocialItem( index, {
														imageUrl: media.url,
													} )
												}
												allowedTypes={ [ 'image' ] }
												multiple={ false }
												labels={ {
													title: __( 'Social image', 'mk-builder' ),
												} }
											/>
										) : (
											<>
												<img
													src={ item.imageUrl }
													alt=""
													style={ { width: '64px', height: '64px', objectFit: 'contain' } }
												/>
												<MediaUpload
													onSelect={ ( media ) =>
														updateSocialItem( index, {
															imageUrl: media.url,
														} )
													}
													allowedTypes={ [ 'image' ] }
													render={ ( { open } ) => (
														<Button isSecondary onClick={ open }>
															{ __( 'Replace image', 'mk-builder' ) }
														</Button>
													) }
												/>
												<Button
													isDestructive
													onClick={ () =>
														updateSocialItem( index, { imageUrl: '' } )
													}
												>
													{ __( 'Remove Image', 'mk-builder' ) }
												</Button>
											</>
										) }
									</div>
								) }

								<TextControl
									label={ __( 'URL', 'mk-builder' ) }
									value={ item.url }
									onChange={ ( val ) =>
										updateSocialItem( index, { url: val } )
									}
								/>

								<Button isDestructive onClick={ () => removeSocialItem( index ) }>
									{ __( 'Remove', 'mk-builder' ) }
								</Button>
							</div>
						) ) }
						<Button variant="primary" onClick={ addSocialItem }>
							{ __( 'Add social item', 'mk-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<footer { ...blockProps }>
				{ bgType === 'video' && bgMediaUrl && (
					<video
						className="avocado-footer__video-bg"
						src={ bgMediaUrl }
						autoPlay
						loop
						muted
						playsInline
					/>
				) }

				{ ( bgType === 'image' || bgType === 'video' ) && (
					<div
						className="avocado-footer__overlay"
						style={ { backgroundColor: bgOverlay } }
					/>
				) }

				<div className="avocado-footer__container">
					<div className="avocado-footer__top" style={ topStyle }>
						<div className="avocado-footer__col">
							<span className="avocado-footer__logo">
								<span className="avocado-footer__logo-mark" aria-hidden="true">
									🥑
								</span>
								<RichText
									tagName="span"
									className="avocado-footer__logo-text"
									value={ logoText }
									onChange={ ( val ) =>
										setAttributes( { logoText: val } )
									}
									allowedFormats={ [] }
								/>
							</span>
							<RichText
								tagName="p"
								className="avocado-footer__desc"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
							/>
						</div>

						<div className="avocado-footer__col">
							<RichText
								tagName="h3"
								className="avocado-footer__heading"
								value={ col2Heading }
								onChange={ ( val ) =>
									setAttributes( { col2Heading: val } )
								}
								allowedFormats={ [] }
							/>
							<div className="avocado-footer__list">
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									templateLock={ false }
									renderAppender={ InnerBlocks.ButtonBlockAppender }
								/>
							</div>
						</div>

						<div className="avocado-footer__col avocado-footer__col--newsletter">
							<h3 className="avocado-footer__heading">
								<span className="avocado-footer__dot" aria-hidden="true"></span>
								<RichText
									tagName="span"
									value={ col3Heading }
									onChange={ ( val ) =>
										setAttributes( { col3Heading: val } )
									}
									allowedFormats={ [] }
								/>
							</h3>

							{ showNewsletter && (
								<div className="avocado-footer__newsletter">
									<input
										type="email"
										className="avocado-footer__input"
										placeholder={ __( 'Email Address', 'mk-builder' ) }
										disabled
									/>
									<span
										className="avocado-footer__submit"
										style={ {
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										} }
									>
										➤
									</span>
								</div>
							) }

							<div className="avocado-footer__socials">
								{ socialLinks.map( ( item, index ) => (
									<span
										key={ index }
										className="avocado-footer__social-link-preview"
										style={ {
											width: '36px',
											height: '36px',
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											background: 'rgba(255, 255, 255, 0.1)',
											borderRadius: '50%',
											color: '#fff',
										} }
									>
										{ item.type === 'image' && item.imageUrl ? (
											<img
												src={ item.imageUrl }
												alt="social"
												style={ {
													width: '18px',
													height: '18px',
													objectFit: 'contain',
												} }
											/>
										) : item.type === 'icon' && item.iconClass ? (
											<i
												className={ item.iconClass }
												aria-hidden="true"
												style={ { fontSize: '18px' } }
											></i>
										) : (
											item.icon || '•'
										) }
									</span>
								) ) }
							</div>
						</div>

						{ columnCount >= 4 && (
							<div className="avocado-footer__col">
								<RichText
									tagName="h3"
									className="avocado-footer__heading"
									value={ col4Heading }
									onChange={ ( val ) =>
										setAttributes( { col4Heading: val } )
									}
									allowedFormats={ [] }
								/>
								<RichText
									tagName="p"
									className="avocado-footer__desc"
									value={ col4Text }
									onChange={ ( val ) =>
										setAttributes( { col4Text: val } )
									}
								/>
							</div>
						) }

						{ columnCount >= 5 && (
							<div className="avocado-footer__col">
								<RichText
									tagName="h3"
									className="avocado-footer__heading"
									value={ col5Heading }
									onChange={ ( val ) =>
										setAttributes( { col5Heading: val } )
									}
									allowedFormats={ [] }
								/>
								<RichText
									tagName="p"
									className="avocado-footer__desc"
									value={ col5Text }
									onChange={ ( val ) =>
										setAttributes( { col5Text: val } )
									}
								/>
							</div>
						) }
					</div>

					<div className="avocado-footer__bottom">
						<RichText
							tagName="p"
							value={ copyrightText }
							onChange={ ( val ) =>
								setAttributes( { copyrightText: val } )
							}
						/>
						<span className="avocado-footer__flower" aria-hidden="true">
							🥑
						</span>
					</div>
				</div>
			</footer>
		</>
	);
}
