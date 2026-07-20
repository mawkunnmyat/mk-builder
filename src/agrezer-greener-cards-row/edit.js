import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/image-link-card' ];
const TEMPLATE = [
	[
		'mk/image-link-card',
		{
			title: 'Organic Farm Solutions',
			linkText: 'Read More',
			linkUrl: '#',
			image: '',
			alt: 'Organic farm solutions',
		},
	],
	[
		'mk/image-link-card',
		{
			title: 'The Eco-Friendly Farming',
			linkText: 'Read More',
			linkUrl: '#',
			image: '',
			alt: 'Eco-friendly farming',
		},
	],
	[
		'mk/image-link-card',
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
		() => ( { className: 'mk-greener__cards mk-greener-cards-row-editor' } ),
		[]
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );
	return <div { ...innerBlocksProps } />;
}
