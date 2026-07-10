import { useStableBlockProps } from '@mk-builder/editor-utils';
import { useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'mk/cta-block',
	'mk/stat-card',
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-stats__col mk-stats-column-editor',
		} ),
		[]
	);

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
