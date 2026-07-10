import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, alt, title, linkText, linkUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mk-greener-card',
	} );

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					className="mk-greener-card__img"
					src={ image }
					alt={ alt || '' }
				/>
			) }
			<RichText.Content
				tagName="h4"
				className="mk-greener-card__title"
				value={ title }
			/>
			<a className="mk-greener-card__link" href={ linkUrl || '#' }>
				<RichText.Content tagName="span" value={ linkText } />
				<span aria-hidden="true">-&gt;</span>
			</a>
		</article>
	);
}
