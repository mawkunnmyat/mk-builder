import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
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

const badgeMediaStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: '50%',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		position,
		badgeNum,
		mediaType,
		mediaUrl,
		stepTitle,
		stepText,
		showCta,
		ctaText,
		ctaUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );
	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-process__step mk-process__step--${ position }`,
		} ),
		[ position ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column alignment', 'mk-builder' ) }
							value={ position }
							options={ [
								{
									label: __( 'Left column', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __(
										'Right column',
										'mk-builder'
									),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { position: val } )
							}
							help={ __(
								'Should match block order: left step, center, right step.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Badge number', 'mk-builder' ) }
							value={ badgeNum }
							onChange={ ( val ) =>
								setAttributes( { badgeNum: val } )
							}
						/>

						<SelectControl
							label={ __( 'Badge Type', 'mk-builder' ) }
							value={ mediaType }
							options={ [
								{ label: __( 'Text Number', 'mk-builder' ), value: 'text' },
								{ label: __( 'Custom Image/Video', 'mk-builder' ), value: 'media' },
							] }
							onChange={ ( val ) => setAttributes( { mediaType: val } ) }
						/>

						{ mediaType === 'media' && (
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image', 'video' ] }
									onSelect={ ( media ) =>
										setAttributes( { mediaUrl: media?.url || '' } )
									}
									value={ mediaUrl }
									render={ ( { open } ) => (
										<div>
											<Button variant="secondary" onClick={ open }>
												{ mediaUrl
													? __( 'Replace media', 'mk-builder' )
													: __( 'Upload media', 'mk-builder' ) }
											</Button>
											{ !! mediaUrl && (
												<Button
													variant="link"
													isDestructive
													onClick={ () =>
														setAttributes( { mediaUrl: '' } )
													}
												>
													{ __( 'Remove media', 'mk-builder' ) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						) }

						<ToggleControl
							label={ __( 'Show CTA button', 'mk-builder' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						{ showCta && (
							<>
								<TextControl
									label={ __(
										'Button URL',
										'mk-builder'
									) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
								/>

								<ToggleControl
									label={ __(
										'Show button icon',
										'mk-builder'
									) }
									checked={ showButtonIcon }
									onChange={ ( val ) =>
										setAttributes( { showButtonIcon: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Button icon type',
										'mk-builder'
									) }
									value={ buttonIconType }
									options={ [
										{
											label: __(
												'Diagonal arrow',
												'mk-builder'
											),
											value: 'diagonal-arrow',
										},
										{
											label: __(
												'Arrow right',
												'mk-builder'
											),
											value: 'arrow-right',
										},
										{
											label: __(
												'External link',
												'mk-builder'
											),
											value: 'external',
										},
										{
											label: __( 'Plus', 'mk-builder' ),
											value: 'plus',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { buttonIconType: val } )
									}
									disabled={ ! showButtonIcon }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="mk-process__badge-wrapper">
					<div className="mk-process__badge">
						{ mediaType === 'media' && mediaUrl ? (
							isVideo ? (
								<video
									src={ mediaUrl }
									autoPlay
									loop
									muted
									playsInline
									style={ badgeMediaStyle }
								/>
							) : (
								<img src={ mediaUrl } alt="" style={ badgeMediaStyle } />
							)
						) : (
							<span className="mk-process__badge-num">{ badgeNum }</span>
						) }
					</div>
				</div>
				<RichText
					tagName="h3"
					className="mk-process__step-title"
					value={ stepTitle }
					onChange={ ( val ) => setAttributes( { stepTitle: val } ) }
					placeholder={ __( 'Step title', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					className="mk-process__step-text"
					value={ stepText }
					onChange={ ( val ) => setAttributes( { stepText: val } ) }
					placeholder={ __( 'Description…', 'mk-builder' ) }
				/>

				{ showCta && (
					<div className="mk-process__btn mk-process__btn--editor">
						<RichText
							tagName="span"
							value={ ctaText }
							onChange={ ( val ) =>
								setAttributes( { ctaText: val } )
							}
							placeholder={ __(
								'More Details',
								'mk-builder'
							) }
						/>

						{ showButtonIcon && (
							<span
								className="mk-process__btn-icon"
								aria-hidden="true"
							>
								{ actionIcon }
							</span>
						) }
					</div>
				) }
			</div>
		</>
	);
}
