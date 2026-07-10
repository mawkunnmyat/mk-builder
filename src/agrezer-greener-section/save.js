import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		mainColumnGap,
		mainImage,
		mainImageAlt,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-greener mk-greener-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-greener-gap': `${ mainColumnGap }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
		gap: `${ mainColumnGap }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="mk-greener-title">
			<div
				className="mk-greener__container"
				style={ containerStyle }
			>
				<div className="mk-greener__left">
					{ mainImage && (
						<img
							src={ mainImage }
							className="mk-greener__main-img"
							alt={ mainImageAlt || '' }
						/>
					) }
				</div>

				<div className="mk-greener__right">
					<header className="mk-greener__header">
						<p
							className="mk-greener__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="mk-greener__tagline-icon"
								style={ { color: taglineIconColor } }
								aria-hidden="true"
							>
								{ taglineIcon }
							</span>
							<RichText.Content
								tagName="span"
								value={ taglineText }
							/>
						</p>
						<RichText.Content
							tagName="h2"
							id="mk-greener-title"
							className="mk-greener__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</header>

					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
