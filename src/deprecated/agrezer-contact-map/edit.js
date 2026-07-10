import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	BaseControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionTitle,
		formAction,
		formMethod,
		namePlaceholder,
		phonePlaceholder,
		emailPlaceholder,
		subjectPlaceholder,
		messagePlaceholder,
		submitButtonText,
		mapEmbedUrl,
		mapIframeTitle,
		sectionBackgroundColor,
		containerBackgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerBorderRadius,
		mapMinHeightDesktop,
		mapMinHeightTablet,
		mapMinHeightMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-agrezer-contact-map-editor',
			style: {
				backgroundColor: sectionBackgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-contact-map-container-bg': containerBackgroundColor,
				'--agrezer-contact-map-radius': `${ containerBorderRadius }px`,
				'--agrezer-map-min-h': `${ mapMinHeightDesktop }px`,
				'--agrezer-map-min-h-md': `${ mapMinHeightTablet }px`,
				'--agrezer-map-min-h-sm': `${ mapMinHeightMobile }px`,
			},
		} ),
		[
			containerBackgroundColor,
			containerBorderRadius,
			mapMinHeightDesktop,
			mapMinHeightMobile,
			mapMinHeightTablet,
			paddingBottom,
			paddingTop,
			sectionBackgroundColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Form', 'mk-builder' ) }
						initialOpen
					>
						<TextControl
							label={ __( 'Form action URL', 'mk-builder' ) }
							value={ formAction }
							onChange={ ( v ) =>
								setAttributes( { formAction: v } )
							}
							help={ __(
								'Endpoint to receive submissions (e.g. Contact Form 7, admin-ajax, or custom REST). Leave empty to use #.',
								'mk-builder'
							) }
						/>

						<SelectControl
							label={ __( 'HTTP method', 'mk-builder' ) }
							value={ formMethod }
							options={ [
								{ label: 'POST', value: 'post' },
								{ label: 'GET', value: 'get' },
							] }
							onChange={ ( v ) =>
								setAttributes( { formMethod: v } )
							}
						/>

						<TextControl
							label={ __(
								'Name field placeholder',
								'mk-builder'
							) }
							value={ namePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { namePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __( 'Phone placeholder', 'mk-builder' ) }
							value={ phonePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { phonePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __( 'Email placeholder', 'mk-builder' ) }
							value={ emailPlaceholder }
							onChange={ ( v ) =>
								setAttributes( { emailPlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Subject placeholder',
								'mk-builder'
							) }
							value={ subjectPlaceholder }
							onChange={ ( v ) =>
								setAttributes( { subjectPlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Message placeholder',
								'mk-builder'
							) }
							value={ messagePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { messagePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Submit button text',
								'mk-builder'
							) }
							value={ submitButtonText }
							onChange={ ( v ) =>
								setAttributes( { submitButtonText: v } )
							}
						/>
					</PanelBody>
					<PanelBody title={ __( 'Map', 'mk-builder' ) }>
						<TextControl
							label={ __( 'Embed URL (https)', 'mk-builder' ) }
							value={ mapEmbedUrl }
							onChange={ ( v ) =>
								setAttributes( { mapEmbedUrl: v } )
							}
							help={ __(
								'Google Maps embed or any https iframe URL.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Iframe title (accessibility)',
								'mk-builder'
							) }
							value={ mapIframeTitle }
							onChange={ ( v ) =>
								setAttributes( { mapIframeTitle: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout & colors', 'mk-builder' ) }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 120 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 40 }
							max={ 160 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container corner radius (px)',
								'mk-builder'
							) }
							value={ containerBorderRadius }
							onChange={ ( v ) =>
								setAttributes( { containerBorderRadius: v } )
							}
							min={ 0 }
							max={ 32 }
						/>

						<BaseControl
							label={ __(
								'Section background',
								'mk-builder'
							) }
						>
							<input
								type="color"
								value={ sectionBackgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										sectionBackgroundColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
						<BaseControl
							label={ __(
								'Card / form area background',
								'mk-builder'
							) }
						>
							<input
								type="color"
								value={ containerBackgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										containerBackgroundColor:
											e.target.value,
									} )
								}
							/>
						</BaseControl>
						<RangeControl
							label={ __(
								'Map min height — desktop (px)',
								'mk-builder'
							) }
							value={ mapMinHeightDesktop }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightDesktop: v } )
							}
							min={ 280 }
							max={ 720 }
						/>

						<RangeControl
							label={ __(
								'Map min height — tablet (px)',
								'mk-builder'
							) }
							value={ mapMinHeightTablet }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightTablet: v } )
							}
							min={ 240 }
							max={ 600 }
						/>

						<RangeControl
							label={ __(
								'Map min height — mobile (px)',
								'mk-builder'
							) }
							value={ mapMinHeightMobile }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightMobile: v } )
							}
							min={ 200 }
							max={ 480 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="agrezer-contact-map__container"
					style={ containerStyle }
				>
					<div className="agrezer-contact-map__form-wrap">
						<RichText
							tagName="h2"
							className="agrezer-contact-map__title"
							value={ sectionTitle }
							onChange={ ( v ) =>
								setAttributes( { sectionTitle: v } )
							}
							placeholder={ __(
								'Section heading…',
								'mk-builder'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<form
							className="agrezer-contact-map__form"
							onSubmit={ ( e ) => e.preventDefault() }
						>
							<input
								type="text"
								name="name"
								placeholder={ namePlaceholder }
								className="agrezer-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="tel"
								name="phone"
								placeholder={ phonePlaceholder }
								className="agrezer-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="email"
								name="email"
								placeholder={ emailPlaceholder }
								className="agrezer-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="text"
								name="subject"
								placeholder={ subjectPlaceholder }
								className="agrezer-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<textarea
								name="message"
								placeholder={ messagePlaceholder }
								className="agrezer-contact-map__textarea"
								rows={ 5 }
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<button
								type="button"
								className="agrezer-contact-map__button"
							>
								{ submitButtonText }
							</button>
						</form>
					</div>
					<div className="agrezer-contact-map__map-wrap">
						{ mapEmbedUrl &&
						/^https?:\/\//i.test( mapEmbedUrl.trim() ) ? (
							<iframe
								className="agrezer-contact-map__iframe"
								title={
									mapIframeTitle ||
									__( 'Map', 'mk-builder' )
								}
								src={ mapEmbedUrl.trim() }
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						) : (
							<div className="agrezer-contact-map__map-placeholder agrezer-contact-map__map-placeholder--editor">
								<p>
									{ __(
										'Add a map embed URL in the sidebar.',
										'mk-builder'
									) }
								</p>
							</div>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
