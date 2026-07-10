import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { quote, authorName, authorRole, rating } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-testimonials__slide mk-testimonials__slide--editor',
		} ),
		[]
	);

	const r = Math.min( 5, Math.max( 1, Number( rating ) || 5 ) );
	const stars = Array.from( { length: 5 }, ( _, i ) =>
		i < r ? '★' : '☆'
	).join( ' ' );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Rating', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Stars (1–5)', 'mk-builder' ) }
							value={ rating }
							onChange={ ( val ) =>
								setAttributes( { rating: val ?? 5 } )
							}
							min={ 1 }
							max={ 5 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="mk-testimonials__content">
					<div
						className="mk-testimonials__quote-icon"
						aria-hidden="true"
					>
						&ldquo;
					</div>
					<RichText
						tagName="p"
						className="mk-testimonials__text"
						value={ quote }
						onChange={ ( val ) => setAttributes( { quote: val } ) }
						placeholder={ __(
							'Testimonial quote…',
							'mk-builder'
						) }
					/>
				</div>
				<div className="mk-testimonials__author-box">
					<RichText
						tagName="h4"
						className="mk-testimonials__author-name"
						value={ authorName }
						onChange={ ( val ) =>
							setAttributes( { authorName: val } )
						}
						placeholder={ __( 'Author name', 'mk-builder' ) }
						allowedFormats={ [] }
					/>

					<RichText
						tagName="span"
						className="mk-testimonials__author-role"
						value={ authorRole }
						onChange={ ( val ) =>
							setAttributes( { authorRole: val } )
						}
						placeholder={ __( 'Role / title', 'mk-builder' ) }
						allowedFormats={ [] }
					/>

					<div
						className="mk-testimonials__stars"
						aria-label={ __(
							'Star rating preview',
							'mk-builder'
						) }
					>
						{ stars }
					</div>
				</div>
			</div>
		</>
	);
}
