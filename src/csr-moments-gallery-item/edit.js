import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	BaseControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { imageUrl, imageId, imageAlt, spanTwoColumns } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-csr-moments-gallery-item-editor gallery-item stagger-img ${
				spanTwoColumns ? 'span-two' : ''
			}`,

			style: {
				position: 'relative',
				borderRadius: '12px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#f0f0f0',
				minHeight: '180px',
			},
			'data-span-two': spanTwoColumns,
		} ),
		[ spanTwoColumns ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Gallery Image', 'mk-builder' ) }
						>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt: media.alt || '',
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Select Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ imageUrl }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
											borderRadius: '8px',
											maxHeight: '200px',
											objectFit: 'cover',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: null,
												imageAlt: '',
											} )
										}
									>
										{ __(
											'Remove Image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Alt Text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
							help={ __(
								'Accessibility and SEO',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Span 2 Columns', 'mk-builder' ) }
							checked={ spanTwoColumns }
							onChange={ ( val ) =>
								setAttributes( { spanTwoColumns: val } )
							}
							help={ __(
								'Make this item span two grid columns (featured/large)',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ imageUrl ? (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						decoding="async"
						style={ {
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							display: 'block',
							minHeight: '180px',
						} }
					/>
				) : (
					<div
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '180px',
							color: '#999',
							fontSize: '0.9rem',
						} }
					>
						{ __( 'Add image in sidebar', 'mk-builder' ) }
					</div>
				) }
			</div>
		</>
	);
}
