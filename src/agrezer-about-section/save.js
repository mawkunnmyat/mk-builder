import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		labelText,
		labelIcon,
		sectionTitle,
		labelColor,
		labelIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-about mk-about-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--mk-about-max-width': `${ containerMaxWidth }px`,
			'--mk-about-gutter': `${ containerGutter }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	return (
		<section { ...blockProps }>
			<div className="mk-about__container" style={ containerStyle }>
				<div className="mk-about__header">
					<div className="mk-about__heading">
						<p
							className="mk-about__label"
							style={ { color: labelColor } }
						>
							<span
								className="mk-about__label-icon"
								style={ { color: labelIconColor } }
								aria-hidden="true"
							>
								{ labelIcon }
							</span>
							<RichText.Content
								tagName="span"
								value={ labelText }
							/>
						</p>
						<RichText.Content
							tagName="h2"
							className="mk-about__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>
				</div>

				<InnerBlocks.Content />
			</div>
		</section>
	);
}
