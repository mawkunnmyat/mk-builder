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
	TextControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/faq-accordion-item' ];
const TEMPLATE = [
	[
		'mk/faq-accordion-item',
		{
			question:
				'What products does Shwe Myanmar Foodstuff Industry make?',
			answer: 'We specialize in premium butter (ထောပတ်) and ghee under the Shwe Myanmar (ရွှေမြန်မာ) brand. Our flagship product is available in multiple sizes including the 10 Viss bulk pack (≈ 16.33 kg).',
			isOpenByDefault: true,
		},
	],
	[
		'mk/faq-accordion-item',
		{
			question: "What does '10 Viss' mean?",
			answer: 'Viss is a traditional Burmese unit of weight. 10 Viss equals approximately 16.33 kg (36 lbs). Our 10 Viss pack is designed for wholesale, restaurants, and commercial kitchens.',
			isOpenByDefault: false,
		},
	],
	[
		'mk/faq-accordion-item',
		{
			question: 'How can I place an order?',
			answer: 'Contact us by phone: 095-2-55122, 095-2-55123, or 095-9-200 1227. Our team in Mandalay will assist with retail and wholesale orders.',
			isOpenByDefault: false,
		},
	],
	[
		'mk/faq-accordion-item',
		{
			question: 'Where is Shwe Myanmar produced?',
			answer: 'All Shwe Myanmar butter and ghee products are produced by Shwe Myanmar Foodstuff Industry in Mandalay, Myanmar.',
			isOpenByDefault: false,
		},
	],
	[
		'mk/faq-accordion-item',
		{
			question: 'How should I store butter and ghee?',
			answer: 'Store in a cool, dry place away from direct sunlight. Once opened, refrigerate and use within the recommended period printed on the packaging.',
			isOpenByDefault: false,
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		eyebrow,
		title,
		contactText,
		contactLinkLabel,
		contactHref,
		backgroundColor,
		padding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-faq-accordion-section faq mk-faq-accordion-section-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingBlock: `${ padding }px`,
			},
		} ),
		[ backgroundColor, padding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Contact Link', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Contact URL', 'mk-builder' ) }
							value={ contactHref }
							onChange={ ( val ) =>
								setAttributes( { contactHref: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
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
						<RangeControl
							label={ __( 'Section Padding (px)', 'mk-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } data-block="faq">
				<div className="faq__inner l-section">
					<header className="section-head">
						<RichText
							tagName="p"
							className="section-head__eyebrow"
							value={ eyebrow }
							onChange={ ( val ) =>
								setAttributes( { eyebrow: val } )
							}
							placeholder={ __( 'Eyebrow…', 'mk-builder' ) }
						/>
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __( 'Title…', 'mk-builder' ) }
						/>
					</header>
					<div className="faq__list" data-list="items">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
					<p className="faq__contact">
						<RichText
							tagName="span"
							value={ contactText }
							onChange={ ( val ) =>
								setAttributes( { contactText: val } )
							}
							placeholder={ __(
								'Contact prompt…',
								'mk-builder'
							) }
						/>{ ' ' }
						<RichText
							tagName="a"
							value={ contactLinkLabel }
							onChange={ ( val ) =>
								setAttributes( { contactLinkLabel: val } )
							}
							placeholder={ __(
								'Contact link…',
								'mk-builder'
							) }
						/>
					</p>
				</div>
			</section>
		</>
	);
}
