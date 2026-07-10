import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/agrezer-greener-stat-item' ];
const TEMPLATE = [
	[
		'mk/agrezer-greener-stat-item',
		{
			iconVariant: 'growth',
			title: '80% Pure Growth',
			description:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		},
	],

	[
		'mk/agrezer-greener-stat-item',
		{
			iconVariant: 'organic',
			title: '95% Organic Roots',
			description:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-greener__stats mk-agrezer-greener-stats-row-editor',
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
