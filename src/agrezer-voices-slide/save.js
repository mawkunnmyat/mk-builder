import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		quote,
		authorImage,
		authorImageAlt,
		authorName,
		authorRole,
		quoteMark,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-voices-section__slide',
	} );

	return (
		<article { ...blockProps }>
			{ quote && (
				<RichText.Content
					tagName="p"
					className="mk-voices-section__quote"
					value={ quote }
				/>
			) }
			<div className="mk-voices-section__author-row">
				<div className="mk-voices-section__author">
					{ authorImage && (
						<img
							src={ authorImage }
							alt={ authorImageAlt || '' }
							className="mk-voices-section__author-img"
							loading="lazy"
							decoding="async"
						/>
					) }
					<div>
						{ authorName && (
							<RichText.Content
								tagName="h4"
								className="mk-voices-section__author-name"
								value={ authorName }
							/>
						) }
						{ authorRole && (
							<RichText.Content
								tagName="p"
								className="mk-voices-section__author-role"
								value={ authorRole }
							/>
						) }
					</div>
				</div>
				<span
					className="mk-voices-section__quote-mark"
					aria-hidden="true"
				>
					{ quoteMark || '❝' }
				</span>
			</div>
		</article>
	);
}
