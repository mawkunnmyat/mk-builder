import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

const ICON_TYPE_OPTIONS = [
	{ value: 'fontawesome', label: __( 'Font Awesome', 'mk-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'mk-builder' ),
	},
	{ value: 'image', label: __( 'Image / GIF', 'mk-builder' ) },
	{ value: 'video', label: __( 'Video', 'mk-builder' ) },
];

const DASHICON_OPTIONS = [
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right', 'mk-builder' ),
	},
	{
		value: 'dashicons-arrow-right',
		label: __( 'Arrow (alt)', 'mk-builder' ),
	},
	{ value: 'dashicons-external', label: __( 'External', 'mk-builder' ) },
	{ value: 'dashicons-admin-links', label: __( 'Link', 'mk-builder' ) },
];

function ViewAllIconRender( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
} ) {
	const wrap = ( content ) => (
		<span
			className="centre-icon-wrap centre-view-all-icon"
			aria-hidden="true"
		>
			{ content }
		</span>
	);

	if ( iconType === 'image' && imageUrl )
		return wrap(
			<img src={ imageUrl } alt="" className="centre-icon-img" />
		);
	if ( iconType === 'video' && videoUrl )
		return wrap(
			<video
				src={ videoUrl }
				className="centre-icon-video"
				muted
				loop
				playsInline
				autoPlay
				aria-hidden="true"
			/>
		);
	if ( iconType === 'dashicon' && dashicon )
		return wrap( <span className={ `dashicons ${ dashicon }` } /> );
	if ( faClass ) return wrap( <i className={ faClass } /> );
	return null;
}

const ALLOWED_BLOCKS = [ 'mk/centre-doctor-card' ];
const TEMPLATE = [
	[
		'mk/centre-doctor-card',
		{ name: 'Dr. Susan May', specialization: 'Neurosurgeon' },
	],

	[
		'mk/centre-doctor-card',
		{ name: 'Dr. Nilar', specialization: 'Neurologist' },
	],

	[
		'mk/centre-doctor-card',
		{ name: 'Dr. Zaw Win', specialization: 'Spine Surgeon' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionId,
		title,
		viewAllText,
		viewAllUrl,
		viewAllIconType,
		viewAllIcon,
		viewAllDashicon,
		viewAllIconImageUrl,
		viewAllIconImageId,
		viewAllIconVideoUrl,
		viewAllIconVideoId,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section fade-up mk-centre-doctors-editor',
			id: sectionId,
		} ),
		[ sectionId ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Section ID (anchor)',
								'mk-builder'
							) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( {
									sectionId: v || 'specialists',
								} )
							}
							help={ __(
								'e.g. #specialists for anchor links',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'View All link text',
								'mk-builder'
							) }
							value={ viewAllText }
							onChange={ ( v ) =>
								setAttributes( { viewAllText: v } )
							}
						/>

						<TextControl
							label={ __( 'View All URL', 'mk-builder' ) }
							value={ viewAllUrl }
							onChange={ ( v ) =>
								setAttributes( { viewAllUrl: v || '#' } )
							}
						/>

						<BaseControl
							label={ __(
								'View All link icon',
								'mk-builder'
							) }
							help={ __(
								'Icon shown after the link text.',
								'mk-builder'
							) }
						>
							<SelectControl
								label={ __( 'Icon type', 'mk-builder' ) }
								value={ viewAllIconType || 'fontawesome' }
								options={ ICON_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { viewAllIconType: v } )
								}
							/>

							{ ( viewAllIconType || 'fontawesome' ) ===
								'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'mk-builder'
									) }
									value={
										viewAllIcon || 'fas fa-arrow-right'
									}
									onChange={ ( v ) =>
										setAttributes( {
											viewAllIcon:
												v || 'fas fa-arrow-right',
										} )
									}
								/>
							) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'dashicon' && (
								<SelectControl
									label={ __( 'Dashicon', 'mk-builder' ) }
									value={
										viewAllDashicon ||
										'dashicons-arrow-right-alt2'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( { viewAllDashicon: v } )
									}
								/>
							) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'image' &&
								( ! viewAllIconImageUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												viewAllIconImageUrl: media.url,
												viewAllIconImageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Icon image / GIF',
												'mk-builder'
											),
										} }
									/>
								) : (
									<div>
										<img
											src={ viewAllIconImageUrl }
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
													viewAllIconImageUrl: '',
													viewAllIconImageId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'video' &&
								( ! viewAllIconVideoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												viewAllIconVideoUrl: media.url,
												viewAllIconVideoId: media.id,
											} )
										}
										allowedTypes={ [ 'video' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Icon video',
												'mk-builder'
											),
										} }
									/>
								) : (
									<div>
										<video
											src={ viewAllIconVideoUrl }
											style={ {
												maxWidth: '100%',
												marginBottom: 8,
											} }
											muted
											loop
											playsInline
											width={ 120 }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													viewAllIconVideoUrl: '',
													viewAllIconVideoId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</div>
								) ) }
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="centre-doctors-header">
					<RichText
						tagName="h2"
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
						placeholder={ __(
							'Our Neuro Specialists',
							'mk-builder'
						) }
						className="centre-doctors-title"
					/>

					<a
						href={ viewAllUrl || '#' }
						className="centre-view-all-link"
						onClick={ ( e ) => e.preventDefault() }
						role="presentation"
						aria-label={
							viewAllText
								? undefined
								: __( 'View all specialists', 'mk-builder' )
						}
					>
						{ viewAllText || __( 'View All', 'mk-builder' ) }{ ' ' }
						<ViewAllIconRender
							iconType={ viewAllIconType || 'fontawesome' }
							faClass={ viewAllIcon || 'fas fa-arrow-right' }
							dashicon={ viewAllDashicon }
							imageUrl={ viewAllIconImageUrl }
							videoUrl={ viewAllIconVideoUrl }
						/>
					</a>
				</div>
				<div className="dept-doctors">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</>
	);
}
