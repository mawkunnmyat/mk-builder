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
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundImage,
		backgroundImageId,
		badgeText,
		title,
		description,
		buttonText,
		buttonUrl,
		minHeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-hero mk-rad-hero-section',
			style: {
				minHeight: `${ minHeight }px`,
			},
		} ),
		[ minHeight ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background image', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ! backgroundImage ? (
							<MediaPlaceholder
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
										'Background image',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ backgroundImage }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: 10,
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
									{ __( 'Remove image', 'mk-builder' ) }
								</Button>
							</div>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Badge text', 'mk-builder' ) }
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
							placeholder={ __(
								'Advanced Diagnostics',
								'mk-builder'
							) }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Minimum height (px)',
								'mk-builder'
							) }
							value={ minHeight }
							onChange={ ( val ) =>
								setAttributes( { minHeight: val } )
							}
							min={ 400 }
							max={ 800 }
							step={ 20 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( val ) =>
								setAttributes( { buttonText: val } )
							}
							placeholder={ __(
								'Book an Appointment',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
							placeholder="#book"
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				{ backgroundImage && (
					<img
						src={ backgroundImage }
						alt=""
						className="rad-hero-bg"
					/>
				) }
				<div className="rad-container rad-hero-content">
					<div className="rad-hero-grid">
						<div className="rad-hero-copy fade-up">
							{ badgeText && (
								<span className="rad-hero-badge">
									{ badgeText }
								</span>
							) }
							<RichText
								tagName="h1"
								className="rad-hero-title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Precision Imaging,\nAccurate Results.',
									'mk-builder'
								) }
							/>

							<RichText
								tagName="p"
								className="rad-hero-description"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									'State-of-the-art Radiology centre equipped with 1.5T MRI and 64-Slice CT Scanners for crystal clear diagnosis.',
									'mk-builder'
								) }
							/>

							{ buttonText && (
								<a
									href={ buttonUrl || '#' }
									className="rad-btn rad-hero-cta"
									onClick={ ( e ) => e.preventDefault() }
								>
									{ buttonText }
								</a>
							) }
						</div>
						<div className="rad-hero-empty" />
					</div>
				</div>
			</header>
		</>
	);
}
