import { useBlockProps, RichText } from '@wordpress/block-editor';

function renderStars( rating ) {
	const n = Math.min( 5, Math.max( 1, Math.round( Number( rating ) || 5 ) ) );
	const chars = [];
	for ( let i = 0; i < 5; i += 1 ) {
		chars.push( i < n ? '★' : '☆' );
	}
	return chars.join( ' ' );
}

export default function save( { attributes } ) {
	const { quote, authorName, authorRole, rating } = attributes;
	const r = Math.min( 5, Math.max( 1, Math.round( Number( rating ) || 5 ) ) );

	const blockProps = useBlockProps.save( {
		className: 'mk-testimonials__slide',
		'data-rating': String( r ),
	} );

	return (
		<div { ...blockProps }>
			<div className="mk-testimonials__quote-block">
				<div className="mk-testimonials__content">
					<div
						className="mk-testimonials__quote-icon"
						aria-hidden="true"
					>
						&ldquo;
					</div>
					{ quote && (
						<RichText.Content
							tagName="p"
							className="mk-testimonials__text"
							value={ quote }
						/>
					) }
				</div>
			</div>
			<template className="mk-testimonials__author-template">
				<div className="mk-testimonials__author-box">
					{ authorName && (
						<RichText.Content
							tagName="h4"
							className="mk-testimonials__author-name"
							value={ authorName }
						/>
					) }
					{ authorRole && (
						<RichText.Content
							tagName="span"
							className="mk-testimonials__author-role"
							value={ authorRole }
						/>
					) }
					<div
						className="mk-testimonials__stars"
						aria-label={ `${ r } out of 5 stars` }
					>
						{ renderStars( r ) }
					</div>
				</div>
			</template>
		</div>
	);
}
