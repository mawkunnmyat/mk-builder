import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

const MEDIA_TYPE_OPTIONS = [
	{ value: 'image', label: __( 'Image / GIF', 'mk-builder' ) },
	{ value: 'video', label: __( 'Video', 'mk-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'mk-builder' ),
	},
	{ value: 'fontawesome', label: __( 'Font Awesome', 'mk-builder' ) },
];

const DASHICON_OPTIONS = [
	{
		value: 'dashicons-admin-generic',
		label: __( 'Cog / Generic', 'mk-builder' ),
	},
	{
		value: 'dashicons-performance',
		label: __( 'Performance', 'mk-builder' ),
	},
	{ value: 'dashicons-camera', label: __( 'Camera', 'mk-builder' ) },
	{ value: 'dashicons-heart', label: __( 'Heart', 'mk-builder' ) },
	{ value: 'dashicons-awards', label: __( 'Awards', 'mk-builder' ) },
];

function TechItemMediaRender( {
	mediaType,
	imageUrl,
	imageAlt,
	videoUrl,
	iconClass,
	dashicon,
	caption,
} ) {
	const captionEl = caption ? (
		<div className="tech-caption">{ caption }</div>
	) : null;
	if ( mediaType === 'image' && imageUrl ) {
		return (
			<>
				<img
					src={ imageUrl }
					alt={ imageAlt || caption || '' }
					className="tech-item-media"
					decoding="async"
				/>

				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'video' && videoUrl ) {
		return (
			<>
				<video
					src={ videoUrl }
					className="tech-item-media"
					muted
					loop
					playsInline
					autoPlay
					aria-hidden="true"
				/>

				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'dashicon' && dashicon ) {
		return (
			<>
				<span
					className={ `tech-item-icon dashicons ${ dashicon }` }
					aria-hidden="true"
				/>

				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'fontawesome' && iconClass ) {
		return (
			<>
				<i
					className={ `tech-item-icon ${ iconClass }` }
					aria-hidden="true"
				/>

				{ captionEl }
			</>
		);
	}
	return (
		<>
			<div className="tech-item-placeholder" aria-hidden="true" />
			{ captionEl }
		</>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		mediaType,
		imageUrl,
		imageId,
		imageAlt,
		videoUrl,
		videoId,
		iconClass,
		dashicon,
		caption,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'tech-item mk-centre-technology-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Media / Icon', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Media type', 'mk-builder' ) }
							help={ __(
								'Image, video, or WordPress/FA icon.',
								'mk-builder'
							) }
						>
							<SelectControl
								label={ __( 'Type', 'mk-builder' ) }
								value={ mediaType || 'image' }
								options={ MEDIA_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { mediaType: v } )
								}
							/>

							{ ( mediaType || 'image' ) === 'image' &&
								( ! imageUrl ? (
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
												'Technology image / GIF',
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
												maxWidth: '100%',
												height: 'auto',
												marginBottom: 8,
											} }
										/>

										<TextControl
											label={ __(
												'Alt text',
												'mk-builder'
											) }
											value={ imageAlt }
											onChange={ ( v ) =>
												setAttributes( { imageAlt: v } )
											}
										/>

										<Button
											variant="secondary"
											size="small"
											onClick={ () =>
												setAttributes( {
													imageUrl: '',
													imageId: undefined,
													imageAlt: '',
												} )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( mediaType || 'image' ) === 'video' &&
								( ! videoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												videoUrl: media.url,
												videoId: media.id,
											} )
										}
										allowedTypes={ [ 'video' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Technology video',
												'mk-builder'
											),
										} }
									/>
								) : (
									<div>
										<video
											src={ videoUrl }
											style={ {
												maxWidth: '100%',
												marginBottom: 8,
											} }
											muted
											loop
											playsInline
											width={ 200 }
										/>

										<Button
											variant="secondary"
											size="small"
											onClick={ () =>
												setAttributes( {
													videoUrl: '',
													videoId: undefined,
												} )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( mediaType || 'image' ) === 'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'mk-builder'
									) }
									value={ iconClass || 'fas fa-microscope' }
									onChange={ ( v ) =>
										setAttributes( {
											iconClass: v || 'fas fa-microscope',
										} )
									}
									help={ __(
										'e.g. fas fa-microscope',
										'mk-builder'
									) }
								/>
							) }
							{ ( mediaType || 'image' ) === 'dashicon' && (
								<SelectControl
									label={ __(
										'WordPress Dashicon',
										'mk-builder'
									) }
									value={
										dashicon || 'dashicons-admin-generic'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( { dashicon: v } )
									}
								/>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Caption', 'mk-builder' ) }
							value={ caption }
							onChange={ ( v ) =>
								setAttributes( { caption: v } )
							}
							help={ __(
								'Shown over the image/video or below icon.',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<TechItemMediaRender
					mediaType={ mediaType || 'image' }
					imageUrl={ imageUrl }
					imageAlt={ imageAlt }
					videoUrl={ videoUrl }
					iconClass={ iconClass }
					dashicon={ dashicon }
					caption={ caption }
				/>
			</div>
		</>
	);
}
