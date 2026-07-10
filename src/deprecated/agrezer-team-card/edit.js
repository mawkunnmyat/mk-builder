import { __ } from '@wordpress/i18n';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageId,
		imageAlt,
		name,
		role,
		profileUrl,
		profileOpenInNewTab,
		actionAriaLabel,
	} = attributes;

	const urlTrim = String( profileUrl || '' ).trim();
	const isRealLink = urlTrim !== '';

	const blockProps = useBlockProps( {
		className: 'agrezer-team-card',
	} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Profile link', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Profile URL', 'mk-builder' ) }
							value={ profileUrl }
							onChange={ ( val ) =>
								setAttributes( { profileUrl: val } )
							}
							help={ __(
								'Leave empty to show the arrow as non-clickable (decorative).',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Open in new tab', 'mk-builder' ) }
							checked={ profileOpenInNewTab }
							onChange={ ( val ) =>
								setAttributes( { profileOpenInNewTab: val } )
							}
							disabled={ ! isRealLink }
						/>

						<TextControl
							label={ __(
								'Arrow button label (screen readers)',
								'mk-builder'
							) }
							value={ actionAriaLabel }
							onChange={ ( val ) =>
								setAttributes( { actionAriaLabel: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Photo', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Image alt text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>

						{ image && (
							<Button
								isSecondary
								isSmall
								onClick={ () =>
									setAttributes( {
										image: '',
										imageId: null,
									} )
								}
							>
								{ __( 'Remove image', 'mk-builder' ) }
							</Button>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						icon="format-image"
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								imageAlt: media.alt || imageAlt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						labels={ {
							title: __( 'Team member photo', 'mk-builder' ),
						} }
					/>
				) : (
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								imageAlt: media.alt || imageAlt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						value={ imageId }
						render={ ( { open } ) => (
							<img
								src={ image }
								alt={ imageAlt || '' }
								className="agrezer-team-card__img"
								onClick={ open }
								role="button"
								tabIndex={ 0 }
								onKeyDown={ ( event ) => {
									if (
										event.key === 'Enter' ||
										event.key === ' '
									) {
										event.preventDefault();
										open();
									}
								} }
							/>
						) }
					/>
				) }

				{ isRealLink ? (
					<a
						href={ urlTrim }
						className="agrezer-team-card__action"
						aria-label={ actionAriaLabel || 'View profile' }
						onClick={ ( e ) => e.preventDefault() }
					>
						<span aria-hidden="true">↗</span>
					</a>
				) : (
					<span
						className="agrezer-team-card__action agrezer-team-card__action--static"
						aria-hidden="true"
					>
						<span aria-hidden="true">↗</span>
					</span>
				) }

				<div className="agrezer-team-card__content">
					<RichText
						tagName="h3"
						className="agrezer-team-card__name"
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
						placeholder={ __( 'Name', 'mk-builder' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>

					<RichText
						tagName="p"
						className="agrezer-team-card__role"
						value={ role }
						onChange={ ( val ) => setAttributes( { role: val } ) }
						placeholder={ __( 'Role', 'mk-builder' ) }
						allowedFormats={ [] }
					/>
				</div>
			</article>
		</>
	);
}
