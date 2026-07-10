import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Button } from '@wordpress/components';

const mediaIconStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'contain',
	borderRadius: '50%',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { slot, badgeText, pointText, mediaType, mediaUrl } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-why-choose__point mk-why-choose__point--${ slot }`,
		} ),
		[ slot ]
	);

	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Position', 'mk-builder' ) } initialOpen={ true }>
						<SelectControl
							label={ __( 'Stage slot (layout)', 'mk-builder' ) }
							value={ String( slot ) }
							options={ [
								{ label: __( '1 — left lower', 'mk-builder' ), value: '1' },
								{ label: __( '2 — left upper', 'mk-builder' ), value: '2' },
								{ label: __( '3 — top center', 'mk-builder' ), value: '3' },
								{ label: __( '4 — right upper', 'mk-builder' ), value: '4' },
								{ label: __( '5 — right lower', 'mk-builder' ), value: '5' },
							] }
							onChange={ ( val ) => {
								const n = parseInt( val, 10 );
								setAttributes( { slot: n, badgeText: String( n ).padStart( 2, '0' ) } );
							} }
						/>
						<TextControl label={ __( 'Badge text', 'mk-builder' ) } value={ badgeText } onChange={ ( val ) => setAttributes( { badgeText: val } ) } help={ __( 'Usually 01, 02, …', 'mk-builder' ) } />
						<SelectControl
							label={ __( 'Icon Type', 'mk-builder' ) }
							value={ mediaType }
							options={ [
								{ label: __( 'Text Badge', 'mk-builder' ), value: 'text' },
								{ label: __( 'Custom Media', 'mk-builder' ), value: 'media' },
							] }
							onChange={ ( val ) => setAttributes( { mediaType: val } ) }
						/>
						{ mediaType === 'media' && (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { mediaUrl: media?.url || '' } ) }
									allowedTypes={ [ 'image', 'video' ] }
									value={ mediaUrl }
									render={ ( { open } ) => (
										<div>
											<Button variant="secondary" onClick={ open }>
												{ mediaUrl ? __( 'Replace media', 'mk-builder' ) : __( 'Upload media', 'mk-builder' ) }
											</Button>
											{ !! mediaUrl && (
												<Button variant="link" isDestructive onClick={ () => setAttributes( { mediaUrl: '' } ) }>
													{ __( 'Remove media', 'mk-builder' ) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="mk-why-choose__point-icon">
					{ mediaType === 'media' && mediaUrl ? (
						isVideo ? (
							<video src={ mediaUrl } autoPlay loop muted playsInline style={ mediaIconStyle } />
						) : (
							<img src={ mediaUrl } alt="" style={ mediaIconStyle } />
						)
					) : (
						badgeText
					) }
				</div>
				<RichText tagName="p" className="mk-why-choose__point-text" value={ pointText } onChange={ ( val ) => setAttributes( { pointText: val } ) } placeholder={ __( 'Point text…', 'mk-builder' ) } />
			</div>
		</>
	);
}
