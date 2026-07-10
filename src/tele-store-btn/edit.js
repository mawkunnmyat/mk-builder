import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	MediaPlaceholder,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	BaseControl,
	Button,
	RangeControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageId, alt, url, linkTarget, linkRel, imageHeight } =
		attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-tele-store-btn-editor',
		} ),
		[]
	);

	const linkProps = url
		? { href: url, target: linkTarget, rel: linkRel }
		: { href: '#', role: 'button', 'aria-disabled': 'true' };

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Link', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'URL', 'mk-builder' ) }>
							<URLInput
								value={ url }
								onChange={ ( value ) =>
									setAttributes( { url: value || '' } )
								}
								placeholder={ __(
									'https://...',
									'mk-builder'
								) }
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Open in new tab', 'mk-builder' ) }
							checked={ linkTarget === '_blank' }
							onChange={ ( checked ) =>
								setAttributes( {
									linkTarget: checked ? '_blank' : '_self',
								} )
							}
						/>

						<TextControl
							label={ __( 'Link rel', 'mk-builder' ) }
							value={ linkRel }
							onChange={ ( val ) =>
								setAttributes( {
									linkRel: val || 'noopener noreferrer',
								} )
							}
							help={ __(
								'e.g. noopener noreferrer',
								'mk-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Alt text', 'mk-builder' ) }
							value={ alt }
							onChange={ ( val ) =>
								setAttributes( { alt: val } )
							}
							help={ __(
								'Accessibility description for the badge image',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Image height (px)', 'mk-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) =>
								setAttributes( { imageHeight: val } )
							}
							min={ 32 }
							max={ 80 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								alt: alt || media.alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'App store badge', 'mk-builder' ),
							instructions: __(
								'Upload or select a badge image (e.g. App Store, Google Play)',
								'mk-builder'
							),
						} }
					/>
				) : (
					<div style={ { display: 'inline-block' } }>
						<a
							{ ...linkProps }
							className="store-btn store-btn-image"
							style={ {
								pointerEvents: url ? 'none' : 'auto',
								display: 'inline-block',
							} }
						>
							<img
								src={ image }
								alt={ alt || '' }
								className="store-btn-img"
								style={ {
									height: `${ imageHeight }px`,
									width: 'auto',
									display: 'block',
								} }
							/>
						</a>
						<Button
							isSecondary
							isSmall
							onClick={ () =>
								setAttributes( { image: '', imageId: null } )
							}
							style={ { marginTop: 8 } }
						>
							{ __( 'Replace image', 'mk-builder' ) }
						</Button>
					</div>
				) }
			</div>
		</>
	);
}
