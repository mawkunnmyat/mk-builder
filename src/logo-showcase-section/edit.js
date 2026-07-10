import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/logo-showcase-item' ];
const TEMPLATE = [
	[
		'mk/logo-showcase-item',
		{
			name: 'Mandalay Region',
			imageUrl:
				'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Mandalay Region — Shwe Myanmar',
		},
	],
	[
		'mk/logo-showcase-item',
		{
			name: 'Yangon Region',
			imageUrl:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Yangon Region — Shwe Myanmar',
		},
	],
	[
		'mk/logo-showcase-item',
		{
			name: 'Sagaing Region',
			imageUrl:
				'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Sagaing Region — Shwe Myanmar',
		},
	],
	[
		'mk/logo-showcase-item',
		{
			name: 'Shan State',
			imageUrl:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Shan State — Shwe Myanmar',
		},
	],
	[
		'mk/logo-showcase-item',
		{
			name: 'Magway Region',
			imageUrl:
				'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Magway Region — Shwe Myanmar',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		eyebrow,
		title,
		descriptionBold,
		description,
		readMoreLabel,
		readMoreHref,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'partners mk-logo-showcase-section mk-logo-showcase-section-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Read more link', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Link URL', 'mk-builder' ) }
							value={ readMoreHref || '' }
							onChange={ ( val ) =>
								setAttributes( { readMoreHref: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="partners__inner l-section">
					<div className="partners__top">
						<header className="partners__head">
							<RichText
								tagName="p"
								className="section-head__eyebrow"
								value={ eyebrow }
								onChange={ ( val ) =>
									setAttributes( { eyebrow: val } )
								}
								placeholder={ __(
									'DISTRIBUTION NETWORK',
									'mk-builder'
								) }
							/>
							<RichText
								tagName="h2"
								className="section-head__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Serving Customers Across Myanmar.',
									'mk-builder'
								) }
							/>
						</header>
						<div className="partners__desc">
							<p>
								<RichText
									tagName="strong"
									value={ descriptionBold }
									onChange={ ( val ) =>
										setAttributes( {
											descriptionBold: val,
										} )
									}
									placeholder={ __(
										'From Mandalay to every region,',
										'mk-builder'
									) }
								/>
								<RichText
									tagName="span"
									value={ description }
									onChange={ ( val ) =>
										setAttributes( { description: val } )
									}
									placeholder={ __(
										'Description text…',
										'mk-builder'
									) }
								/>
							</p>
							<p className="partners__more">
								{ __(
									'For more information about brands.',
									'mk-builder'
								) }{ ' ' }
								<RichText
									tagName="a"
									value={ readMoreLabel }
									onChange={ ( val ) =>
										setAttributes( { readMoreLabel: val } )
									}
									placeholder={ __(
										'Contact us',
										'mk-builder'
									) }
									href={ readMoreHref || '#' }
									onClick={ ( e ) => e.preventDefault() }
								/>
							</p>
						</div>
					</div>
					<div className="partners__logos">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
