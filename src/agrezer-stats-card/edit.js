import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, alt, statValue, statLabel } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-stats-card',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
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
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								alt: media.alt || alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Stat card image', 'mk-builder' ),
						} }
					/>
				) : (
					<>
						<img
							className="mk-stats-card__image"
							src={ image }
							alt=""
						/>

						<div className="mk-stats-card__editor-bar">
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
						</div>
					</>
				) }
				<div className="mk-stats-card__meta">
					<RichText
						tagName="p"
						className="mk-stats-card__value"
						value={ statValue }
						onChange={ ( val ) =>
							setAttributes( { statValue: val } )
						}
						placeholder={ __( '80%', 'mk-builder' ) }
					/>

					<RichText
						tagName="p"
						className="mk-stats-card__label"
						value={ statLabel }
						onChange={ ( val ) =>
							setAttributes( { statLabel: val } )
						}
						placeholder={ __( 'Label', 'mk-builder' ) }
					/>
				</div>
			</article>
		</>
	);
}
