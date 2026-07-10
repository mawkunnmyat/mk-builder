import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, alt, statValue, statLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-stats-card',
	} );

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					className="mk-stats-card__image"
					src={ image }
					alt={ alt || '' }
				/>
			) }
			<div className="mk-stats-card__meta">
				<RichText.Content
					tagName="p"
					className="mk-stats-card__value"
					value={ statValue }
				/>
				<RichText.Content
					tagName="p"
					className="mk-stats-card__label"
					value={ statLabel }
				/>
			</div>
		</article>
	);
}
