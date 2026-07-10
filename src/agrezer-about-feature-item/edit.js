import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { AboutFeatureIcon } from './icons';

const mediaIconStyle = {
	width: '50px',
	height: '50px',
	objectFit: 'contain',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		description,
		iconVariant,
		iconType,
		mediaUrl,
		mediaId,
		mediaType,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'mk-about-feature' } ),
		[]
	);

	const onSelectMedia = ( media ) => {
		if ( ! media || ! media.url ) {
			return;
		}
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaType: media.type === 'video' ? 'video' : 'image',
		} );
	};

	const clearMedia = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			mediaType: 'image',
		} );
	};

	const renderIconPreview = () => {
		if ( iconType !== 'media' || ! mediaUrl ) {
			return <AboutFeatureIcon variant={ iconVariant } />;
		}
		if ( mediaType === 'video' ) {
			return (
				<video
					className="mk-about-feature__icon"
					src={ mediaUrl }
					autoPlay
					loop
					muted
					playsInline
					style={ mediaIconStyle }
				/>
			);
		}
		return (
			<img
				className="mk-about-feature__icon"
				src={ mediaUrl }
				alt=""
				style={ mediaIconStyle }
			/>
		);
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon & media', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon source', 'mk-builder' ) }
							value={ iconType }
							options={ [
								{
									label: __(
										'Predefined SVG',
										'mk-builder'
									),
									value: 'svg',
								},
								{
									label: __(
										'Custom media',
										'mk-builder'
									),
									value: 'media',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconType: val } )
							}
						/>

						{ iconType === 'svg' && (
							<SelectControl
								label={ __( 'Icon style', 'mk-builder' ) }
								value={ iconVariant }
								options={ [
									{
										label: __(
											'Growth / arrow',
											'mk-builder'
										),
										value: 'growth',
									},
									{
										label: __( 'Barn', 'mk-builder' ),
										value: 'barn',
									},
									{
										label: __(
											'Soil / tools',
											'mk-builder'
										),
										value: 'soil',
									},
									{
										label: __(
											'Organic plant',
											'mk-builder'
										),
										value: 'organic',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { iconVariant: val } )
								}
							/>
						) }

						{ iconType === 'media' && (
							<>
								{ ! mediaUrl ? (
									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __(
												'Feature icon media',
												'mk-builder'
											),
											instructions: __(
												'Upload an image, GIF, or short video.',
												'mk-builder'
											),
										} }
										onSelect={ onSelectMedia }
										accept="image/*,video/*"
										allowedTypes={ [ 'image', 'video' ] }
									/>
								) : (
									<>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectMedia }
												allowedTypes={ [
													'image',
													'video',
												] }
												value={ mediaId }
												render={ ( { open } ) => (
													<Button
														variant="secondary"
														onClick={ open }
														style={ {
															marginBottom: 8,
														} }
													>
														{ __(
															'Replace media',
															'mk-builder'
														) }
													</Button>
												) }
											/>
										</MediaUploadCheck>
										<Button
											variant="link"
											isDestructive
											onClick={ clearMedia }
										>
											{ __(
												'Remove media',
												'mk-builder'
											) }
										</Button>
									</>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="mk-about-feature__icon-wrap">
					{ renderIconPreview() }
				</div>
				<RichText
					tagName="h3"
					className="mk-about-feature__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					className="mk-about-feature__desc"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description', 'mk-builder' ) }
				/>
			</article>
		</>
	);
}
