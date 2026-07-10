import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'mk/agrezer-stats-cta',
	'mk/agrezer-stats-card',
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-stats__col mk-agrezer-stats-column-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
