import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/agrezer-why-choose-point-item' ];

const POINT_TEMPLATE = [
	[
		'mk/agrezer-why-choose-point-item',
		{
			slot: 1,
			badgeText: '01',
			pointText: 'Health From of the Earth',
		},
	],

	[
		'mk/agrezer-why-choose-point-item',
		{
			slot: 2,
			badgeText: '02',
			pointText: 'Rooted in Sustainable Growth',
		},
	],

	[
		'mk/agrezer-why-choose-point-item',
		{
			slot: 3,
			badgeText: '03',
			pointText: 'Technology Meets the Soil Flow',
		},
	],

	[
		'mk/agrezer-why-choose-point-item',
		{
			slot: 4,
			badgeText: '04',
			pointText: 'Fields of Shared Prosperity',
		},
	],

	[
		'mk/agrezer-why-choose-point-item',
		{
			slot: 5,
			badgeText: '05',
			pointText: 'Seeds Sprouting Sustainable',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		tractorImage,
		tractorAlt,
		tractorMaxWidth,
		stageMinHeight,
		waveDecorationUrl,
	} = attributes;

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `agrezer-why-choose mk-agrezer-why-choose-section-editor ${
				waveDecorationUrl ? 'has-wave-decoration' : ''
			}`,

			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				...( shapeVar
					? { '--agrezer-why-choose-shape': shapeVar }
					: {} ),
			},
		} ),
		[ paddingBottom, paddingTop, shapeVar, waveDecorationUrl ]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
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
									label: __( 'Text', 'mk-builder' ),
								},
								{
									value: taglineIconColor,
									onChange: ( val ) =>
										setAttributes( {
											taglineIconColor: val,
										} ),
									label: __( 'Icon tint', 'mk-builder' ),
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
									label: __( 'Color', 'mk-builder' ),
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
					</PanelBody>

					<PanelBody
						title={ __( 'Tractor image', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Alt text', 'mk-builder' ) }
							value={ tractorAlt }
							onChange={ ( val ) =>
								setAttributes( { tractorAlt: val } )
							}
						/>

						<RangeControl
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ tractorMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { tractorMaxWidth: val } )
							}
							min={ 280 }
							max={ 800 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Stage', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Min height (px)', 'mk-builder' ) }
							value={ stageMinHeight }
							onChange={ ( val ) =>
								setAttributes( { stageMinHeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 10 }
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
							max={ 120 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Content max width (px)',
								'mk-builder'
							) }
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
					</PanelBody>

					<PanelBody
						title={ __( 'Bottom decoration', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Wave / shape image (optional)',
								'mk-builder'
							) }
							help={ __(
								'Uses theme asset e.g. shape-12.webp, or upload any wide strip.',
								'mk-builder'
							) }
						>
							{ ! waveDecorationUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											waveDecorationUrl: media.url,
											waveDecorationId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Decoration image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ waveDecorationUrl }
										alt=""
										style={ {
											width: '100%',
											maxHeight: 80,
											objectFit: 'contain',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												waveDecorationUrl: '',
												waveDecorationId: null,
											} )
										}
									>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				aria-labelledby="agrezer-why-choose-title"
			>
				<div
					className="agrezer-why-choose__container"
					style={ containerStyle }
				>
					<div className="agrezer-why-choose__header">
						<p
							className="agrezer-why-choose__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="agrezer-why-choose__tagline-icon"
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
									'Why Choose Our Farm',
									'mk-builder'
								) }
								allowedFormats={ [] }
							/>
						</p>
						<RichText
							tagName="h2"
							id="agrezer-why-choose-title"
							className="agrezer-why-choose__title"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __( 'Title…', 'mk-builder' ) }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>

					<div
						className="agrezer-why-choose__stage mk-agrezer-why-choose__stage-editor"
						style={ stageStyle }
					>
						<div className="agrezer-why-choose__tractor-wrapper">
							{ ! tractorImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											tractorImage: media.url,
											tractorImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Tractor image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<img
									src={ tractorImage }
									className="agrezer-why-choose__tractor"
									alt=""
									style={ {
										maxWidth: `${ tractorMaxWidth }px`,
									} }
								/>
							) }
						</div>

						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ POINT_TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
