import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const { imageUrl = '', imageId, caption = '' } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'tech-item mk-dept-tech-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Tech Item', 'mk-builder' ) }>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( m ) =>
									setAttributes( {
										imageUrl: m.url,
										imageId: m.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __( 'Tech Image', 'mk-builder' ),
								} }
							/>
						) : (
							<div>
								<img
									src={ imageUrl }
									alt=""
									style={ {
										maxWidth: '100%',
										marginBottom: 8,
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Remove', 'mk-builder' ) }
								</Button>
							</div>
						) }
						<TextControl
							label={ __( 'Caption', 'mk-builder' ) }
							value={ caption }
							onChange={ ( v ) =>
								setAttributes( { caption: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ imageUrl ? (
					<img src={ imageUrl } alt={ caption || '' } />
				) : (
					<div style={ { height: 280, background: '#eee' } } />
				) }
				<div className="tech-caption">{ caption }</div>
			</div>
		</>
	);
}
