import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/agrezer-about-image-card' ];
const TEMPLATE = [
	[
		'mk/agrezer-about-image-card',
		{
			variant: 'simple',
			image: '',
			alt: 'Tractor in field',
		},
	],

	[
		'mk/agrezer-about-image-card',
		{
			variant: 'overlay',
			image: '',
			alt: 'Farmer in corn field',
			overlayText:
				'Agriculture nurtures life through organic growth, sustainable farming.',
			overlayButtonText: 'About Us',
			overlayButtonUrl: '#',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-about__images-grid mk-agrezer-about-images-grid-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
