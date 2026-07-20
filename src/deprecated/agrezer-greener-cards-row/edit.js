import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/agrezer-greener-card-item' ];
const TEMPLATE = [
	[
		'mk/agrezer-greener-card-item',
		{
			title: 'Organic Farm Solutions',
			linkText: 'Read More',
			linkUrl: '#',
			image: '',
			alt: 'Organic farm solutions',
		},
	],

	[
		'mk/agrezer-greener-card-item',
		{
			title: 'The Eco-Friendly Farming',
			linkText: 'Read More',
			linkUrl: '#',
			image: '',
			alt: 'Eco-friendly farming',
		},
	],

	[
		'mk/agrezer-greener-card-item',
		{
			title: 'Organic Produce Supply',
			linkText: 'Read More',
			linkUrl: '#',
			image: '',
			alt: 'Organic produce supply',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-greener__cards mk-agrezer-greener-cards-row-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
