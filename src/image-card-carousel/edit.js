import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/image-card-slide' ];
const TEMPLATE = [
	[
		'mk/image-card-slide',
		{
			title: 'Butter & Ghee Production',
			ctaLabel: 'Learn more',
			href: '#categories',
			imageUrl:
				'',
			imageAlt: 'Premium butter production',
		},
	],
	[
		'mk/image-card-slide',
		{
			title: 'Quality Control',
			ctaLabel: 'Learn more',
			href: '/pages/quality.html',
			imageUrl:
				'',
			imageAlt: 'Quality inspection of dairy products',
		},
	],
	[
		'mk/image-card-slide',
		{
			title: 'Nationwide Distribution',
			ctaLabel: 'Learn more',
			href: '/pages/where-to-buy.html',
			imageUrl:
				'',
			imageAlt: 'Product distribution and logistics',
		},
	],
	[
		'mk/image-card-slide',
		{
			title: 'Traditional Craft',
			ctaLabel: 'Learn more',
			href: '/pages/about.html#story',
			imageUrl:
				'',
			imageAlt: 'Traditional butter making craft',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionEyebrow,
		sectionTitle,
		autoplayMs,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'image-card-carousel mk-image-card-carousel-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ padding }px`,
				paddingBottom: `${ padding }px`,
			},
		} ),
		[ backgroundColor, padding ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Background', 'mk-builder' ) }
								colorSettings={ [
									{
										value: backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
								] }
							/>
						) }
						<RangeControl
							label={ __( 'Padding (px)', 'mk-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 20 }
							max={ 160 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Carousel', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Autoplay (ms)', 'mk-builder' ) }
							value={ autoplayMs }
							onChange={ ( val ) =>
								setAttributes( { autoplayMs: val } )
							}
							min={ 0 }
							max={ 15000 }
							step={ 500 }
							help={ __(
								'Set to 0 to disable autoplay.',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="image-card-carousel__inner l-section"
					style={ containerStyle }
				>
					<header className="section-head">
						<RichText
							tagName="p"
							className="section-head__eyebrow"
							value={ sectionEyebrow }
							onChange={ ( val ) =>
								setAttributes( { sectionEyebrow: val } )
							}
							placeholder={ __(
								'Section eyebrow…',
								'mk-builder'
							) }
						/>
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'Section title…',
								'mk-builder'
							) }
						/>
					</header>

					<div
						className="image-card-carousel__stage"
						role="region"
						aria-label={ sectionTitle || __( 'Services', 'mk-builder' ) }
					>
						<div
							className="image-card-carousel__track"
							data-list="items"
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
								renderAppender={
									InnerBlocks.ButtonBlockAppender
								}
							/>
						</div>
					</div>

					<div className="carousel-nav" aria-hidden="true">
						<div className="carousel-dots image-card-carousel__dots" />
					</div>
				</div>
			</section>
		</>
	);
}
