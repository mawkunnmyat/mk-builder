import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, alt, maxWidth } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-process__center',
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

						<RangeControl
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ maxWidth }
							onChange={ ( val ) =>
								setAttributes( { maxWidth: val } )
							}
							min={ 280 }
							max={ 720 }
							step={ 10 }
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
								alt: media.alt || alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __(
								'Process wheel / diagram',
								'mk-builder'
							),
						} }
					/>
				) : (
					<>
						<img
							src={ image }
							className="agrezer-process__img"
							alt=""
							style={ { maxWidth: `${ maxWidth }px` } }
						/>

						<Button
							isSecondary
							isSmall
							onClick={ () =>
								setAttributes( { image: '', imageId: null } )
							}
						>
							{ __( 'Replace image', 'mk-builder' ) }
						</Button>
					</>
				) }
			</div>
		</>
	);
}
