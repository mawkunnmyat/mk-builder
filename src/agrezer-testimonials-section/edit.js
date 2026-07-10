import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	useInnerBlocksProps,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/testimonial' ];
const TEMPLATE = [
	[
		'mk/testimonial',
		{
			quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
			authorName: 'Alex Robin',
			authorRole: 'Co-Founder',
			rating: 5,
		},
	],
	[
		'mk/testimonial',
		{
			quote: 'We saw measurable growth after switching to their organic program — clear communication and real results.',
			authorName: 'Jordan Lee',
			authorRole: 'Operations Director',
			rating: 5,
		},
	],
	[
		'mk/testimonial',
		{
			quote: 'Reliable partners who understand both sustainability and scale. Highly recommended for any agri business.',
			authorName: 'Sam Rivera',
			authorRole: 'Farm Manager',
			rating: 4,
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		columnGap,
		mainImage,
		mainImageId,
		mainImageAlt,
		showBadge,
		badgeNum,
		badgeText,
		tagIcon,
		tagIconId,
		tagIconAlt,
		tagline,
		title,
		loopCarousel,
		prevLabel,
		nextLabel,
	} = attributes;

	const widthPercent = Math.max(
		50,
		100 - ( Number( containerGutter ) || 0 ) * 2
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-testimonials mk-testimonials-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--mk-testimonials-max': `${ containerMaxWidth }px`,
				'--mk-testimonials-width-pct': `${ widthPercent }%`,
				'--mk-testimonials-gap': `${ columnGap }px`,
			},
		} ),
		[
			backgroundColor,
			columnGap,
			containerMaxWidth,
			paddingBottom,
			paddingTop,
			widthPercent,
		]
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'mk-testimonials__slides mk-testimonials__slides--editor' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Side inset (% each side)',
								'mk-builder'
							) }
							value={ containerGutter }
							onChange={ ( val ) =>
								setAttributes( { containerGutter: val } )
							}
							min={ 0 }
							max={ 15 }
							step={ 1 }
							help={ __(
								'Container width ≈ 100% minus twice this value.',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Column gap (px)', 'mk-builder' ) }
							value={ columnGap }
							onChange={ ( val ) =>
								setAttributes( { columnGap: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Left image & badge', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Main image alt text',
								'mk-builder'
							) }
							value={ mainImageAlt }
							onChange={ ( val ) =>
								setAttributes( { mainImageAlt: val } )
							}
						/>

						{ ! mainImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										mainImage: media.url,
										mainImageId: media.id,
										mainImageAlt: media.alt || mainImageAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Testimonial main photo',
										'mk-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ mainImage }
									alt=""
									style={ {
										width: '100%',
										maxHeight: 200,
										objectFit: 'cover',
										borderRadius: 8,
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											mainImage: '',
											mainImageId: null,
										} )
									}
								>
									{ __( 'Remove image', 'mk-builder' ) }
								</Button>
							</>
						) }
						<ToggleControl
							label={ __(
								'Show experience badge',
								'mk-builder'
							) }
							checked={ showBadge }
							onChange={ ( val ) =>
								setAttributes( { showBadge: val } )
							}
						/>

						{ showBadge && (
							<TextControl
								label={ __( 'Badge number', 'mk-builder' ) }
								value={ badgeNum }
								onChange={ ( val ) =>
									setAttributes( { badgeNum: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline icon', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt text', 'mk-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						{ ! tagIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										tagIcon: media.url,
										tagIconId: media.id,
										tagIconAlt: media.alt || tagIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Small tagline icon',
										'mk-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									style={ { width: 32, height: 32 } }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											tagIcon: '',
											tagIconId: null,
										} )
									}
								>
									{ __( 'Remove icon', 'mk-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Carousel', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Loop slides', 'mk-builder' ) }
							checked={ loopCarousel }
							onChange={ ( val ) =>
								setAttributes( { loopCarousel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Previous button label (screen readers)',
								'mk-builder'
							) }
							value={ prevLabel }
							onChange={ ( val ) =>
								setAttributes( { prevLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Next button label (screen readers)',
								'mk-builder'
							) }
							value={ nextLabel }
							onChange={ ( val ) =>
								setAttributes( { nextLabel: val } )
							}
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'mk-builder' ) }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'mk-builder'
								),
							},
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="mk-testimonials__container">
					<div className="mk-testimonials__left">
						<div className="mk-testimonials__img-box">
							{ mainImage ? (
								<img
									src={ mainImage }
									className="mk-testimonials__img"
									alt=""
								/>
							) : (
								<MediaPlaceholder
									icon="format-image"
									onSelect={ ( media ) =>
										setAttributes( {
											mainImage: media.url,
											mainImageId: media.id,
											mainImageAlt:
												media.alt || mainImageAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Main testimonial image',
											'mk-builder'
										),
									} }
								/>
							) }
							{ showBadge && (
								<div className="mk-testimonials__badge">
									<span className="mk-testimonials__badge-num">
										{ badgeNum }
									</span>
									<RichText
										tagName="span"
										className="mk-testimonials__badge-text"
										value={ badgeText }
										onChange={ ( val ) =>
											setAttributes( { badgeText: val } )
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
											'core/underline',
										] }
										placeholder={ __(
											'Badge line…',
											'mk-builder'
										) }
										multiline="br"
									/>
								</div>
							) }
						</div>
					</div>

					<div className="mk-testimonials__right">
						<div className="mk-testimonials__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt=""
									className="mk-testimonials__tag-icon"
								/>
							) }
							<RichText
								tagName="span"
								value={ tagline }
								onChange={ ( val ) =>
									setAttributes( { tagline: val } )
								}
								placeholder={ __( 'Tagline', 'mk-builder' ) }
								allowedFormats={ [] }
							/>
						</div>

						<RichText
							tagName="h2"
							className="mk-testimonials__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								'Section title',
								'mk-builder'
							) }
						/>

						<div className="mk-testimonials__quote-region mk-testimonials__quote-region--editor">
							<div { ...innerBlocksProps } />
						</div>

						<div className="mk-testimonials__bottom mk-testimonials__bottom--editor">
							<p className="mk-testimonials__editor-hint">
								{ __(
									'Author for each slide appears here on the site when visitors change slides.',
									'mk-builder'
								) }
							</p>
							<div className="mk-testimonials__controls">
								<button
									type="button"
									className="mk-testimonials__control-btn"
									disabled
								>
									←
								</button>
								<button
									type="button"
									className="mk-testimonials__control-btn"
									disabled
								>
									→
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
