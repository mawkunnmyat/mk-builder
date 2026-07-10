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
		value: 'dashicons-arrow-down-alt2',
		label: __( 'Arrow down', 'mk-builder' ),
	},
	{
		value: 'dashicons-arrow-down',
		label: __( 'Arrow down (alt)', 'mk-builder' ),
	},
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right', 'mk-builder' ),
	},
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'mk-builder' ) },
];

function FaqAccordionIconRender( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
} ) {
	const wrap = ( content ) => (
		<span
			className="centre-icon-wrap faq-accordion-icon"
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

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const {
		question = '',
		answer = '',
		accordionIconType,
		accordionIcon,
		accordionDashicon,
		accordionIconImageUrl,
		accordionIconImageId,
		accordionIconVideoUrl,
		accordionIconVideoId,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'faq-item mk-centre-faq-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'FAQ', 'mk-builder' ) }>
						<TextControl
							label={ __( 'Question', 'mk-builder' ) }
							value={ question }
							onChange={ ( v ) =>
								setAttributes( { question: v } )
							}
						/>

						<TextControl
							label={ __( 'Answer', 'mk-builder' ) }
							value={ answer }
							onChange={ ( v ) => setAttributes( { answer: v } ) }
							multiline
						/>

						<BaseControl
							label={ __( 'Accordion icon', 'mk-builder' ) }
							help={ __(
								'Icon shown next to the question (e.g. chevron).',
								'mk-builder'
							) }
						>
							<SelectControl
								label={ __( 'Icon type', 'mk-builder' ) }
								value={ accordionIconType || 'fontawesome' }
								options={ ICON_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { accordionIconType: v } )
								}
							/>

							{ ( accordionIconType || 'fontawesome' ) ===
								'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'mk-builder'
									) }
									value={
										accordionIcon || 'fas fa-chevron-down'
									}
									onChange={ ( v ) =>
										setAttributes( {
											accordionIcon:
												v || 'fas fa-chevron-down',
										} )
									}
								/>
							) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'dashicon' && (
								<SelectControl
									label={ __( 'Dashicon', 'mk-builder' ) }
									value={
										accordionDashicon ||
										'dashicons-arrow-down-alt2'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( {
											accordionDashicon: v,
										} )
									}
								/>
							) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'image' &&
								( ! accordionIconImageUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												accordionIconImageUrl:
													media.url,
												accordionIconImageId: media.id,
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
											src={ accordionIconImageUrl }
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
													accordionIconImageUrl: '',
													accordionIconImageId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'video' &&
								( ! accordionIconVideoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												accordionIconVideoUrl:
													media.url,
												accordionIconVideoId: media.id,
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
											src={ accordionIconVideoUrl }
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
													accordionIconVideoUrl: '',
													accordionIconVideoId:
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
				<button type="button" className="faq-btn" disabled>
					{ question }{ ' ' }
					<FaqAccordionIconRender
						iconType={ accordionIconType || 'fontawesome' }
						faClass={ accordionIcon || 'fas fa-chevron-down' }
						dashicon={ accordionDashicon }
						imageUrl={ accordionIconImageUrl }
						videoUrl={ accordionIconVideoUrl }
					/>
				</button>
				<div
					className="faq-content"
					style={ { maxHeight: 'none', overflow: 'visible' } }
				>
					<p style={ { marginBottom: 20 } }>{ answer }</p>
				</div>
			</div>
		</>
	);
}
