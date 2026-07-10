import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Previous save output (conditional wrappers) kept for block validation of
 * existing posts until they are re-saved with the current save().
 *
 * @param {Object} props            Props passed to the deprecated save.
 * @param {Object} props.attributes Block attributes.
 */
export default function saveDeprecated( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		gridGap,
		columns,
		headerMarginBottom,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
	} = attributes;

	const cols = Math.min( 4, Math.max( 1, parseInt( columns, 10 ) || 3 ) );

	const blockProps = useBlockProps.save( {
		className: 'mk-team-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-team-max': `${ containerMaxWidth }px`,
			'--mk-team-width-pct': `${ containerWidthPct }%`,
			'--mk-team-gap': `${ gridGap }px`,
			'--mk-team-cols': String( cols ),
			'--mk-team-header-mb': `${ headerMarginBottom }px`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'mk-team-section__grid',
	} );

	return (
		<section { ...blockProps }>
			<div className="mk-team-section__container">
				<div className="mk-team-section__header">
					{ ( tagline || tagIcon ) && (
						<div className="mk-team-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="mk-team-section__tag-icon"
									width="20"
									height="20"
									loading="lazy"
									decoding="async"
								/>
							) }
							{ tagline && (
								<RichText.Content
									tagName="span"
									value={ tagline }
								/>
							) }
						</div>
					) }
					{ title && (
						<RichText.Content
							tagName="h2"
							className="mk-team-section__title"
							value={ title }
						/>
					) }
				</div>

				<div { ...innerBlocksProps } />
			</div>
		</section>
	);
}
