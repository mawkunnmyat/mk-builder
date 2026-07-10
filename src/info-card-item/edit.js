import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';

const DEFAULT_ATTRS = {
	iconType: 'fontawesome',
	iconClass: 'fas fa-phone-volume',
	dashicon: 'dashicons-phone',
	iconImageId: 0,
	iconImageUrl: '',
	iconColor: '',
	iconBackground: '',
	title: 'Emergency Cases',
	subtitle: '24/7 Immediate Support',
	secondaryText: '',
	showTitle: true,
	showDescription: true,
	showSecondary: true,
	ctaText: '09-789 101 101',
	ctaUrl: 'tel:09789101101',
	ctaColor: '#dc3545',
	showCTA: true,
	openInNewTab: false,
};

/** Curated WordPress Dashicons for contact/info cards */
const DASHICON_OPTIONS = [
	{ value: 'dashicons-phone', label: __( 'Phone', 'mk-builder' ) },
	{ value: 'dashicons-email', label: __( 'Email', 'mk-builder' ) },
	{ value: 'dashicons-location', label: __( 'Location', 'mk-builder' ) },
	{
		value: 'dashicons-location-alt',
		label: __( 'Location (alt)', 'mk-builder' ),
	},
	{ value: 'dashicons-clock', label: __( 'Clock', 'mk-builder' ) },
	{ value: 'dashicons-calendar', label: __( 'Calendar', 'mk-builder' ) },
	{
		value: 'dashicons-calendar-alt',
		label: __( 'Calendar (alt)', 'mk-builder' ),
	},
	{ value: 'dashicons-heart', label: __( 'Heart', 'mk-builder' ) },
	{ value: 'dashicons-star-filled', label: __( 'Star', 'mk-builder' ) },
	{ value: 'dashicons-awards', label: __( 'Awards', 'mk-builder' ) },
	{ value: 'dashicons-megaphone', label: __( 'Megaphone', 'mk-builder' ) },
	{ value: 'dashicons-groups', label: __( 'Groups', 'mk-builder' ) },
	{ value: 'dashicons-admin-users', label: __( 'Users', 'mk-builder' ) },
	{ value: 'dashicons-building', label: __( 'Building', 'mk-builder' ) },
	{ value: 'dashicons-car', label: __( 'Car', 'mk-builder' ) },
	{ value: 'dashicons-cart', label: __( 'Cart', 'mk-builder' ) },
	{
		value: 'dashicons-admin-generic',
		label: __( 'Generic / Cog', 'mk-builder' ),
	},
	{ value: 'dashicons-yes', label: __( 'Check / Yes', 'mk-builder' ) },
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'mk-builder' ) },
	{ value: 'dashicons-share', label: __( 'Share', 'mk-builder' ) },
	{ value: 'dashicons-facebook', label: __( 'Facebook', 'mk-builder' ) },
	{ value: 'dashicons-twitter', label: __( 'Twitter', 'mk-builder' ) },
	{
		value: 'dashicons-format-status',
		label: __( 'Chat / Status', 'mk-builder' ),
	},
	{ value: 'dashicons-editor-help', label: __( 'Help', 'mk-builder' ) },
];

const ICON_TYPE_OPTIONS = [
	{ value: 'fontawesome', label: __( 'Font Awesome', 'mk-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'mk-builder' ),
	},
	{ value: 'image', label: __( 'Image', 'mk-builder' ) },
];

function IconPreview( { iconType, iconClass, dashicon, iconImageUrl } ) {
	if ( iconType === 'image' && iconImageUrl ) {
		return (
			<img
				src={ iconImageUrl }
				alt=""
				className="info-icon-img"
				style={ {
					maxWidth: '100%',
					maxHeight: '100%',
					objectFit: 'contain',
				} }
			/>
		);
	}
	if ( iconType === 'dashicon' && dashicon ) {
		return (
			<span className={ `dashicons ${ dashicon }` } aria-hidden="true" />
		);
	}
	if ( iconClass ) {
		return <i className={ iconClass } aria-hidden="true" />;
	}
	return <span>?</span>;
}

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		iconType,
		iconClass,
		dashicon,
		iconImageId,
		iconImageUrl,
		iconColor,
		iconBackground,
		title,
		subtitle,
		secondaryText,
		showTitle,
		showDescription,
		showSecondary,
		ctaText,
		ctaUrl,
		ctaColor,
		showCTA,
		openInNewTab,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'info-card animate-stagger',
			style: {
				'--info-card-cta-color': ctaColor,
				...( iconColor && { '--info-card-icon-color': iconColor } ),
				...( iconBackground && {
					'--info-card-icon-bg': iconBackground,
				} ),
			},
		} ),
		[ ctaColor, iconBackground, iconColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Title & Description', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Title', 'mk-builder' ) }
							checked={ showTitle }
							onChange={ ( val ) =>
								setAttributes( { showTitle: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show Description', 'mk-builder' ) }
							checked={ showDescription }
							onChange={ ( val ) =>
								setAttributes( { showDescription: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Icon', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon type', 'mk-builder' ) }
							value={ iconType }
							options={ ICON_TYPE_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconType: val } )
							}
						/>

						{ iconType === 'fontawesome' && (
							<TextControl
								label={ __(
									'Font Awesome class',
									'mk-builder'
								) }
								value={ iconClass }
								onChange={ ( val ) =>
									setAttributes( { iconClass: val } )
								}
								help={ __(
									'e.g. fas fa-phone-volume, fas fa-envelope-open-text',
									'mk-builder'
								) }
							/>
						) }

						{ iconType === 'dashicon' && (
							<SelectControl
								label={ __(
									'WordPress icon (Dashicon)',
									'mk-builder'
								) }
								value={ dashicon }
								options={ DASHICON_OPTIONS }
								onChange={ ( val ) =>
									setAttributes( { dashicon: val } )
								}
							/>
						) }

						{ iconType === 'image' && (
							<div className="info-card-icon-image-control">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												iconImageId: media.id,
												iconImageUrl:
													media.url ||
													media.sizes?.full?.url ||
													'',
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ iconImageId }
										render={ ( { open } ) => (
											<>
												{ iconImageUrl ? (
													<div
														style={ {
															marginBottom: 8,
														} }
													>
														<img
															src={ iconImageUrl }
															alt=""
															style={ {
																maxWidth:
																	'100%',
																height: 'auto',
																display:
																	'block',
																borderRadius: 4,
															} }
														/>

														<div
															style={ {
																marginTop: 8,
																display: 'flex',
																gap: 8,
																flexWrap:
																	'wrap',
															} }
														>
															<Button
																variant="primary"
																onClick={ open }
															>
																{ __(
																	'Replace image',
																	'mk-builder'
																) }
															</Button>
															<Button
																variant="secondary"
																isDestructive
																onClick={ () =>
																	setAttributes(
																		{
																			iconImageId: 0,
																			iconImageUrl:
																				'',
																		}
																	)
																}
															>
																{ __(
																	'Remove',
																	'mk-builder'
																) }
															</Button>
														</div>
													</div>
												) : (
													<Button
														variant="secondary"
														onClick={ open }
														style={ {
															width: '100%',
														} }
													>
														{ __(
															'Choose image',
															'mk-builder'
														) }
													</Button>
												) }
											</>
										) }
									/>
								</MediaUploadCheck>
							</div>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Secondary Line',
								'mk-builder'
							) }
							checked={ showSecondary }
							onChange={ ( val ) =>
								setAttributes( { showSecondary: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'CTA', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show CTA link', 'mk-builder' ) }
							checked={ showCTA }
							onChange={ ( val ) =>
								setAttributes( { showCTA: val } )
							}
						/>

						{ showCTA && (
							<>
								<TextControl
									label={ __( 'CTA Text', 'mk-builder' ) }
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
								/>

								<TextControl
									label={ __( 'CTA URL', 'mk-builder' ) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
									placeholder="tel:09789101101"
								/>

								<ToggleControl
									label={ __(
										'Open in new tab',
										'mk-builder'
									) }
									checked={ openInNewTab }
									onChange={ ( val ) =>
										setAttributes( { openInNewTab: val } )
									}
								/>
							</>
						) }
					</PanelBody>

					{ PanelColorSettings && (
						<PanelColorSettings
							title={ __( 'Icon & CTA Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: iconColor || undefined,
									onChange: ( val ) =>
										setAttributes( {
											iconColor: val || '',
										} ),
									label: __(
										'Icon Color (override)',
										'mk-builder'
									),
								},
								{
									value: iconBackground || undefined,
									onChange: ( val ) =>
										setAttributes( {
											iconBackground: val || '',
										} ),
									label: __(
										'Icon Background (override)',
										'mk-builder'
									),
								},
								{
									value: ctaColor ?? DEFAULT_ATTRS.ctaColor,
									onChange: ( val ) =>
										setAttributes( { ctaColor: val } ),
									label: __(
										'CTA Link Color',
										'mk-builder'
									),
								},
							] }
						/>
					) }
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="info-icon">
					<IconPreview
						iconType={ iconType }
						iconClass={ iconClass }
						dashicon={ dashicon }
						iconImageUrl={ iconImageUrl }
					/>
				</div>

				{ showTitle && (
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Add title…', 'mk-builder' ) }
					/>
				) }

				{ showDescription && (
					<RichText
						tagName="p"
						value={ subtitle }
						onChange={ ( val ) =>
							setAttributes( { subtitle: val } )
						}
						placeholder={ __( 'Primary line…', 'mk-builder' ) }
					/>
				) }

				{ showSecondary && (
					<RichText
						tagName="p"
						value={ secondaryText }
						onChange={ ( val ) =>
							setAttributes( { secondaryText: val } )
						}
						placeholder={ __( 'Secondary line…', 'mk-builder' ) }
					/>
				) }

				{ showCTA && ctaText && (
					<a
						href={ ctaUrl || '#' }
						className="info-card-link"
						target={ openInNewTab ? '_blank' : undefined }
						rel={ openInNewTab ? 'noopener noreferrer' : undefined }
						onClick={ ( event ) => event.preventDefault() }
						style={ { color: ctaColor } }
					>
						{ ctaText }
					</a>
				) }
			</div>
		</>
	);
}
