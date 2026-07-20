import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/agrezer-stats-column' ];

const TEMPLATE = [
	[
		'mk/agrezer-stats-column',
		{},
		[
			[
				'mk/agrezer-stats-card',
				{
					image: '',
					alt: 'Corn cobs and leaves',
					statValue: '80%',
					statLabel: 'Efficiency',
				},
			],
		],
	],

	[
		'mk/agrezer-stats-column',
		{},
		[
			[
				'mk/agrezer-stats-cta',
				{
					buttonText: 'Get In Touch',
					buttonUrl: '#',
				},
			],

			[
				'mk/agrezer-stats-card',
				{
					image: '',
					alt: 'Scattered corn grains',
					statValue: '98%',
					statLabel: 'Increase in Yields',
				},
			],
		],
	],

	[
		'mk/agrezer-stats-column',
		{},
		[
			[
				'mk/agrezer-stats-card',
				{
					image: '',
					alt: 'Corn stalk growth',
					statValue: '50%',
					statLabel: 'Farm Growth',
				},
			],
		],
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
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
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-stats mk-agrezer-stats-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-stats-grid-gap': `${ gridGap }px`,
			},
		} ),
		[ backgroundColor, gridGap, paddingBottom, paddingTop ]
	);

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
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Tagline icon (emoji)',
								'mk-builder'
							) }
							value={ taglineIcon }
							onChange={ ( val ) =>
								setAttributes( { taglineIcon: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Tagline', 'mk-builder' ) }
							colorSettings={ [
								{
									value: taglineColor,
									onChange: ( val ) =>
										setAttributes( { taglineColor: val } ),
									label: __(
										'Tagline text',
										'mk-builder'
									),
								},
								{
									value: taglineIconColor,
									onChange: ( val ) =>
										setAttributes( {
											taglineIconColor: val,
										} ),
									label: __(
										'Tagline icon',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Title', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Title size (rem)', 'mk-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Title weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Description', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descColor,
									onChange: ( val ) =>
										setAttributes( { descColor: val } ),
									label: __(
										'Description color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description size (rem)',
								'mk-builder'
							) }
							value={ descFontSize }
							onChange={ ( val ) =>
								setAttributes( { descFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.25 }
							step={ 0.01 }
						/>

						<PanelColorSettings
							title={ __( 'Header border', 'mk-builder' ) }
							colorSettings={ [
								{
									value: headerBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											headerBorderColor: val,
										} ),
									label: __(
										'Border color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Section background',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 960 }
							max={ 1440 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Side gutter (px)', 'mk-builder' ) }
							value={ containerGutter }
							onChange={ ( val ) =>
								setAttributes( { containerGutter: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
						/>

						<RangeControl
							label={ __( 'Grid gap (px)', 'mk-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } aria-labelledby="agrezer-stats-title">
				<div
					className="agrezer-stats__container"
					style={ containerStyle }
				>
					<div
						className="agrezer-stats__header"
						style={ headerStyle }
					>
						<div className="agrezer-stats__header-left">
							<p
								className="agrezer-stats__tagline"
								style={ { color: taglineColor } }
							>
								<span
									className="agrezer-stats__tagline-icon"
									style={ { color: taglineIconColor } }
									aria-hidden="true"
								>
									{ taglineIcon }
								</span>
								<RichText
									tagName="span"
									value={ taglineText }
									onChange={ ( val ) =>
										setAttributes( { taglineText: val } )
									}
									placeholder={ __(
										'Sustainable Farming',
										'mk-builder'
									) }
									allowedFormats={ [] }
								/>
							</p>
							<RichText
								tagName="h2"
								id="agrezer-stats-title"
								className="agrezer-stats__title"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title…',
									'mk-builder'
								) }
								style={ {
									color: titleColor,
									fontSize: `${ titleFontSize }rem`,
									fontWeight: titleFontWeight,
								} }
							/>
						</div>
						<RichText
							tagName="p"
							className="agrezer-stats__desc"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Description…',
								'mk-builder'
							) }
							style={ {
								color: descColor,
								fontSize: `${ descFontSize }rem`,
							} }
						/>
					</div>

					<div
						className="agrezer-stats__grid mk-agrezer-stats__grid-editor"
						style={ { gap: `${ gridGap }px` } }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock="all"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
