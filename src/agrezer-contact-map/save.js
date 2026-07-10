import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Allow only http(s) embed URLs for the iframe.
 *
 * @param {string} url Raw URL.
 * @return {string}
 */
function safeIframeSrc( url ) {
	if ( ! url || typeof url !== 'string' ) {
		return '';
	}
	const t = url.trim();
	if ( /^https?:\/\//i.test( t ) ) {
		return t;
	}
	return '';
}

export default function save( { attributes } ) {
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

	const iframeSrc = safeIframeSrc( mapEmbedUrl );

	const blockProps = useBlockProps.save( {
		className: 'mk-contact-map',
		style: {
			backgroundColor: sectionBackgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-contact-map-container-bg': containerBackgroundColor,
			'--mk-contact-map-radius': `${ containerBorderRadius }px`,
			'--mk-map-min-h': `${ mapMinHeightDesktop }px`,
			'--mk-map-min-h-md': `${ mapMinHeightTablet }px`,
			'--mk-map-min-h-sm': `${ mapMinHeightMobile }px`,
		},
	} );

	const formActionAttr =
		formAction && formAction.trim() !== '' ? formAction : '#';

	return (
		<section { ...blockProps }>
			<div
				className="mk-contact-map__container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
				} }
			>
				<div className="mk-contact-map__form-wrap">
					<RichText.Content
						tagName="h2"
						className="mk-contact-map__title"
						value={ sectionTitle }
					/>
					<form
						className="mk-contact-map__form"
						action={ formActionAttr }
						method={ formMethod === 'get' ? 'get' : 'post' }
					>
						<input
							type="text"
							name="name"
							placeholder={ namePlaceholder }
							className="mk-contact-map__input"
							required
							autoComplete="name"
							aria-label={ namePlaceholder }
						/>
						<input
							type="tel"
							name="phone"
							placeholder={ phonePlaceholder }
							className="mk-contact-map__input"
							autoComplete="tel"
							aria-label={ phonePlaceholder }
						/>
						<input
							type="email"
							name="email"
							placeholder={ emailPlaceholder }
							className="mk-contact-map__input"
							required
							autoComplete="email"
							aria-label={ emailPlaceholder }
						/>
						<input
							type="text"
							name="subject"
							placeholder={ subjectPlaceholder }
							className="mk-contact-map__input"
							required
							aria-label={ subjectPlaceholder }
						/>
						<textarea
							name="message"
							placeholder={ messagePlaceholder }
							className="mk-contact-map__textarea"
							rows={ 5 }
							aria-label={ messagePlaceholder }
						/>
						<button
							type="submit"
							className="mk-contact-map__button"
						>
							{ submitButtonText }
						</button>
					</form>
				</div>
				<div className="mk-contact-map__map-wrap">
					{ iframeSrc ? (
						<iframe
							className="mk-contact-map__iframe"
							title={
								mapIframeTitle ||
								__( 'Map location', 'mk-builder' )
							}
							src={ iframeSrc }
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							allowFullScreen
						/>
					) : (
						<div
							className="mk-contact-map__map-placeholder"
							role="img"
							aria-hidden="true"
						/>
					) }
				</div>
			</div>
		</section>
	);
}
