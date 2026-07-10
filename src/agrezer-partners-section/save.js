import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		ariaLabel,
		marqueePaddingY,
		borderColor,
		trackGap,
		animationDuration,
		enableMarquee,
		pauseOnHover,
	} = attributes;

	const gapHalf = `${ trackGap / 2 }px`;

	const blockProps = useBlockProps.save( {
		className: 'mk-partners mk-partners-section',
		style: {
			backgroundColor,
			'--mk-partners-py': `${ marqueePaddingY }px`,
			'--mk-partners-border': borderColor,
			'--mk-partners-gap': `${ trackGap }px`,
			'--mk-partners-gap-half': gapHalf,
			'--mk-partners-duration': `${ animationDuration }s`,
		},
		'data-marquee': enableMarquee ? 'true' : 'false',
		'data-pause-hover': pauseOnHover ? 'true' : 'false',
		'aria-label': ariaLabel || undefined,
	} );

	return (
		<section { ...blockProps }>
			<div className="mk-partners__marquee">
				<div className="mk-partners__track">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
