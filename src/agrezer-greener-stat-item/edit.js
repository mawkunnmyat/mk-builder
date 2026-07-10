import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { GreenerStatIcon } from './icons';

const mediaIconStyle = { objectFit: 'contain', display: 'block' };

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		iconVariant,
		title,
		description,
		statNumber,
		statLabel,
		mediaType,
		mediaUrl,
	} = attributes;

	const safeIconVariant = iconVariant ?? 'growth';
	const safeTitle = title ?? statLabel ?? ( statNumber ? String( statNumber ) : '' );
	const safeDescription = description ?? '';
	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );
	const blockProps = useStableBlockProps( () => ( { className: 'mk-greener-stat' } ), [] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Icon', 'mk-builder' ) } initialOpen={ true }>
						<SelectControl
							label={ __( 'Icon Type', 'mk-builder' ) }
							value={ mediaType || 'svg' }
							options={ [
								{ label: __( 'Predefined SVG', 'mk-builder' ), value: 'svg' },
								{ label: __( 'Custom Image/Video', 'mk-builder' ), value: 'media' },
							] }
							onChange={ ( val ) => setAttributes( { mediaType: val } ) }
						/>
						{ ( mediaType || 'svg' ) === 'svg' && (
							<SelectControl
								label={ __( 'Icon style', 'mk-builder' ) }
								value={ iconVariant }
								options={ [
									{ label: __( 'Growth / leaf', 'mk-builder' ), value: 'growth' },
									{ label: __( 'Organic globe', 'mk-builder' ), value: 'organic' },
								] }
								onChange={ ( val ) => setAttributes( { iconVariant: val } ) }
							/>
						) }
						{ mediaType === 'media' && (
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image', 'video' ] }
									onSelect={ ( media ) => setAttributes( { mediaUrl: media?.url || '' } ) }
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

			<article { ...blockProps }>
				{ mediaType === 'media' && mediaUrl ? (
					isVideo ? (
						<video src={ mediaUrl } autoPlay loop muted playsInline className="mk-greener-stat__icon" style={ mediaIconStyle } />
					) : (
						<img src={ mediaUrl } alt="" className="mk-greener-stat__icon" style={ mediaIconStyle } />
					)
				) : (
					<GreenerStatIcon variant={ safeIconVariant } />
				) }
				<RichText tagName="h3" className="mk-greener-stat__title" value={ safeTitle } onChange={ ( val ) => setAttributes( { title: val } ) } placeholder={ __( 'Stat title', 'mk-builder' ) } />
				<RichText tagName="p" className="mk-greener-stat__text" value={ safeDescription } onChange={ ( val ) => setAttributes( { description: val } ) } placeholder={ __( 'Description…', 'mk-builder' ) } />
			</article>
		</>
	);
}
