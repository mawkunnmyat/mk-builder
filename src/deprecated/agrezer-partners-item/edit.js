import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageAlt, name } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-partners__item',
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
							label={ __( 'Icon alt text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
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
						multiple={ false }
						labels={ {
							title: __( 'Partner icon', 'mk-builder' ),
						} }
					/>
				) : (
					<div className="agrezer-partners__item-media">
						<img
							src={ image }
							className="agrezer-partners__icon"
							alt=""
						/>

						<Button
							isSecondary
							isSmall
							onClick={ () =>
								setAttributes( { image: '', imageId: null } )
							}
						>
							{ __( 'Replace', 'mk-builder' ) }
						</Button>
					</div>
				) }
				<RichText
					tagName="span"
					className="agrezer-partners__name"
					value={ name }
					onChange={ ( val ) => setAttributes( { name: val } ) }
					placeholder={ __( 'Partner name', 'mk-builder' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
