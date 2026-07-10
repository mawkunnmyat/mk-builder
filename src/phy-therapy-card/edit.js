import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { imageUrl, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-service-card mk-phy-therapy-card-editor',
			style: {
				position: 'relative',
				overflow: 'hidden',
				borderRadius: '20px',
				backgroundImage: imageUrl ? `url(${ imageUrl })` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				padding: '30px',
			},
		} ),
		[ imageUrl ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Therapy card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<MediaPlaceholder
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media?.url || '',
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

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title || '' }
							onChange={ ( val ) =>
								setAttributes( {
									title: val || 'Manual Therapy',
								} )
							}
						/>

						<TextControl
							label={ __( 'Description', 'mk-builder' ) }
							value={ description || '' }
							onChange={ ( val ) =>
								setAttributes( { description: val || '' } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="phy-svc-content">
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) =>
							setAttributes( { title: val || 'Manual Therapy' } )
						}
						placeholder={ __( 'Manual Therapy', 'mk-builder' ) }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Therapy description…',
							'mk-builder'
						) }
					/>
				</div>
			</div>
		</>
	);
}
