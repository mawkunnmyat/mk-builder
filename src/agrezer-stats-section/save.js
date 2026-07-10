import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		description,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descColor,
		descFontSize,
		headerBorderColor,
		gridGap,
		gridGapTablet = 24,
		gridGapMobile = 16,
	} = attributes;
	const statsGridGap = `${ gridGap }px`;
	const statsGridGapTablet = `${ gridGapTablet }px`;
	const statsGridGapMobile = `${ gridGapMobile }px`;

	const blockProps = useBlockProps.save( {
		className: 'mk-stats mk-stats-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-stats-grid-gap': statsGridGap,
			'--mk-stats-grid-gap-tablet': statsGridGapTablet,
			'--mk-stats-grid-gap-mobile': statsGridGapMobile,
			'--wp--style--block-gap': statsGridGap,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const headerStyle = {
		borderBottomColor: headerBorderColor,
	};

	return (
		<section { ...blockProps } aria-labelledby="mk-stats-title">
			<div className="mk-stats__container" style={ containerStyle }>
				<div className="mk-stats__header" style={ headerStyle }>
					<div className="mk-stats__header-left">
						<p
							className="mk-stats__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="mk-stats__tagline-icon"
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
							id="mk-stats-title"
							className="mk-stats__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>
					<RichText.Content
						tagName="p"
						className="mk-stats__desc"
						value={ description }
						style={ {
							color: descColor,
							fontSize: `${ descFontSize }rem`,
						} }
					/>
				</div>

				<div
					className="mk-stats__grid"
					style={ {
						gap: statsGridGap,
						'--mk-stats-grid-gap': statsGridGap,
						'--mk-stats-grid-gap-tablet': statsGridGapTablet,
						'--mk-stats-grid-gap-mobile': statsGridGapMobile,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
