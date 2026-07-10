import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
	RepeaterControl,
} from '@wordpress/components';

const LAYOUT_OPTIONS = [
	{
		label: __( 'Content Left, Image Right', 'mk-builder' ),
		value: 'content-left',
	},
	{
		label: __( 'Image Left, Content Right', 'mk-builder' ),
		value: 'content-right',
	},
];

const OBJECT_FIT_OPTIONS = [
	{ label: __( 'Cover', 'mk-builder' ), value: 'cover' },
	{ label: __( 'Contain', 'mk-builder' ), value: 'contain' },
	{ label: __( 'Fill', 'mk-builder' ), value: 'fill' },
	{ label: __( 'None', 'mk-builder' ), value: 'none' },
];

const OBJECT_POSITION_OPTIONS = [
	{ label: __( 'Center', 'mk-builder' ), value: 'center' },
	{ label: __( 'Top', 'mk-builder' ), value: 'top' },
	{ label: __( 'Bottom', 'mk-builder' ), value: 'bottom' },
	{ label: __( 'Left', 'mk-builder' ), value: 'left' },
	{ label: __( 'Right', 'mk-builder' ), value: 'right' },
];

const TEXT_TRANSFORM_OPTIONS = [
	{ label: __( 'None', 'mk-builder' ), value: 'none' },
	{ label: __( 'Uppercase', 'mk-builder' ), value: 'uppercase' },
	{ label: __( 'Lowercase', 'mk-builder' ), value: 'lowercase' },
	{ label: __( 'Capitalize', 'mk-builder' ), value: 'capitalize' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		layout,
		showLabel,
		label,
		labelColor,
		labelFontSize,
		labelFontWeight,
		labelTextTransform,
		heading,
		headingColor,
		headingFontSize,
		headingFontWeight,
		headingLineHeight,
		showDescription,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		showStats,
		stats,
		statsBarGap,
		statsBarMarginTop,
		statsBarPaddingTop,
		statsBarBorderColor,
		statValueColor,
		statValueFontSize,
		statValueFontWeight,
		statLabelColor,
		statLabelFontSize,
		statLabelFontWeight,
		statLabelTextTransform,
		image,
		imageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		imageBorderRadius,
		imageBoxShadow,
		imageBoxShadowColor,
		imageBoxShadowBlur,
		imageBoxShadowSpread,
		imageBoxShadowOffsetX,
		imageBoxShadowOffsetY,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		imageHoverEffect,
		imageHoverScale,
	} = attributes;

	const addStat = useCallback( () => {
		const newStats = [
			...stats,
			{
				value: '0',
				suffix: '+',
				label: __( 'New Stat', 'mk-builder' ),
			},
		];
		setAttributes( { stats: newStats } );
	}, [ stats, setAttributes ] );

	const updateStat = useCallback(
		( index, field, value ) => {
			const newStats = [ ...stats ];
			newStats[ index ] = { ...newStats[ index ], [ field ]: value };
			setAttributes( { stats: newStats } );
		},
		[ stats, setAttributes ]
	);

	const removeStat = useCallback(
		( index ) => {
			const newStats = stats.filter( ( _, i ) => i !== index );
			setAttributes( { stats: newStats } );
		},
		[ stats, setAttributes ]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-story-item-editor story-item layout-${ layout }`,
			style: {
				display: 'flex',
				flexDirection:
					layout === 'content-left' ? 'row' : 'row-reverse',
				gap: '40px',
				alignItems: 'flex-start',
				width: '100%',
				minHeight: '400px',
				boxSizing: 'border-box',
				padding: '24px',
				paddingBottom: '60px',
				overflow: 'visible',
				position: 'relative',
			},
		} ),
		[ layout ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Layout', 'mk-builder' ) }
							value={ layout }
							options={ LAYOUT_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { layout: val } )
							}
							help={ __(
								'Choose content and image position',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Label', 'mk-builder' ) }
							checked={ showLabel }
							onChange={ ( val ) =>
								setAttributes( { showLabel: val } )
							}
						/>

						{ showLabel && (
							<>
								<TextControl
									label={ __(
										'Label Text',
										'mk-builder'
									) }
									value={ label }
									onChange={ ( val ) =>
										setAttributes( { label: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Label Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: labelColor,
											onChange: ( val ) =>
												setAttributes( {
													labelColor: val,
												} ),
											label: __(
												'Label Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Label Font Size (rem)',
										'mk-builder'
									) }
									value={ labelFontSize }
									onChange={ ( val ) =>
										setAttributes( { labelFontSize: val } )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Label Font Weight',
										'mk-builder'
									) }
									value={ labelFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											labelFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Label Text Transform',
										'mk-builder'
									) }
									value={ labelTextTransform }
									options={ TEXT_TRANSFORM_OPTIONS }
									onChange={ ( val ) =>
										setAttributes( {
											labelTextTransform: val,
										} )
									}
								/>
							</>
						) }

						<Divider />

						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) =>
								setAttributes( { heading: val } )
							}
							placeholder={ __(
								'Enter heading...',
								'mk-builder'
							) }
							style={ {
								fontSize: `${ headingFontSize }rem`,
								fontWeight: headingFontWeight,
								color: headingColor,
								lineHeight: headingLineHeight,
								marginBottom: '20px',
							} }
						/>

						<PanelColorSettings
							title={ __( 'Heading Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: headingColor,
									onChange: ( val ) =>
										setAttributes( { headingColor: val } ),
									label: __(
										'Heading Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Heading Font Size (rem)',
								'mk-builder'
							) }
							value={ headingFontSize }
							onChange={ ( val ) =>
								setAttributes( { headingFontSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Heading Font Weight',
								'mk-builder'
							) }
							value={ headingFontWeight }
							onChange={ ( val ) =>
								setAttributes( { headingFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Heading Line Height',
								'mk-builder'
							) }
							value={ headingLineHeight }
							onChange={ ( val ) =>
								setAttributes( { headingLineHeight: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.1 }
						/>

						<Divider />

						<ToggleControl
							label={ __(
								'Show Description on Frontend',
								'mk-builder'
							) }
							checked={ showDescription }
							onChange={ ( val ) =>
								setAttributes( { showDescription: val } )
							}
							help={ __(
								'Toggle to show/hide description on the frontend.',
								'mk-builder'
							) }
						/>

						<TextareaControl
							label={ __( 'Description', 'mk-builder' ) }
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							help={ __(
								'Enter the description text. HTML tags are supported (e.g., <strong>, <em>, <a>, <h1>-<h6>, <ul>, <li>, <p>). You can also edit this directly in the main editor area below by clicking on the text.',
								'mk-builder'
							) }
							rows={ 6 }
						/>

						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description Font Size (rem)',
								'mk-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __(
								'Description Line Height',
								'mk-builder'
							) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1.2 }
							max={ 2 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Stats Bar', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Stats Bar', 'mk-builder' ) }
							checked={ showStats }
							onChange={ ( val ) =>
								setAttributes( { showStats: val } )
							}
						/>

						{ showStats && (
							<>
								{ stats.map( ( stat, index ) => (
									<div
										key={ index }
										style={ {
											marginBottom: '15px',
											padding: '15px',
											border: '1px solid #e0e0e0',
											borderRadius: '4px',
										} }
									>
										<TextControl
											label={ __(
												'Value',
												'mk-builder'
											) }
											value={ stat.value }
											onChange={ ( val ) =>
												updateStat(
													index,
													'value',
													val
												)
											}
										/>
										<TextControl
											label={ __(
												'Suffix',
												'mk-builder'
											) }
											value={ stat.suffix }
											onChange={ ( val ) =>
												updateStat(
													index,
													'suffix',
													val
												)
											}
											help={ __(
												'e.g., +, %, etc.',
												'mk-builder'
											) }
										/>
										<TextControl
											label={ __(
												'Label',
												'mk-builder'
											) }
											value={ stat.label }
											onChange={ ( val ) =>
												updateStat(
													index,
													'label',
													val
												)
											}
										/>
										<Button
											isDestructive
											isSmall
											onClick={ () =>
												removeStat( index )
											}
											style={ { marginTop: '10px' } }
										>
											{ __(
												'Remove Stat',
												'mk-builder'
											) }
										</Button>
									</div>
								) ) }

								<Button
									isPrimary
									isSmall
									onClick={ addStat }
									style={ { marginTop: '10px' } }
								>
									{ __( 'Add Stat', 'mk-builder' ) }
								</Button>

								<Divider />

								<RangeControl
									label={ __(
										'Stats Bar Gap (px)',
										'mk-builder'
									) }
									value={ statsBarGap }
									onChange={ ( val ) =>
										setAttributes( { statsBarGap: val } )
									}
									min={ 10 }
									max={ 60 }
									step={ 5 }
								/>

								<RangeControl
									label={ __(
										'Stats Bar Margin Top (px)',
										'mk-builder'
									) }
									value={ statsBarMarginTop }
									onChange={ ( val ) =>
										setAttributes( {
											statsBarMarginTop: val,
										} )
									}
									min={ 0 }
									max={ 80 }
									step={ 5 }
								/>

								<RangeControl
									label={ __(
										'Stats Bar Padding Top (px)',
										'mk-builder'
									) }
									value={ statsBarPaddingTop }
									onChange={ ( val ) =>
										setAttributes( {
											statsBarPaddingTop: val,
										} )
									}
									min={ 0 }
									max={ 60 }
									step={ 5 }
								/>

								<PanelColorSettings
									title={ __(
										'Stats Bar Border Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: statsBarBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													statsBarBorderColor: val,
												} ),
											label: __(
												'Border Color',
												'mk-builder'
											),
										},
									] }
								/>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Stat Value Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: statValueColor,
											onChange: ( val ) =>
												setAttributes( {
													statValueColor: val,
												} ),
											label: __(
												'Value Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Stat Value Font Size (rem)',
										'mk-builder'
									) }
									value={ statValueFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											statValueFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Stat Value Font Weight',
										'mk-builder'
									) }
									value={ statValueFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											statValueFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Stat Label Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: statLabelColor,
											onChange: ( val ) =>
												setAttributes( {
													statLabelColor: val,
												} ),
											label: __(
												'Label Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Stat Label Font Size (rem)',
										'mk-builder'
									) }
									value={ statLabelFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											statLabelFontSize: val,
										} )
									}
									min={ 0.6 }
									max={ 1.2 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Stat Label Font Weight',
										'mk-builder'
									) }
									value={ statLabelFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											statLabelFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Stat Label Text Transform',
										'mk-builder'
									) }
									value={ statLabelTextTransform }
									options={ TEXT_TRANSFORM_OPTIONS }
									onChange={ ( val ) =>
										setAttributes( {
											statLabelTextTransform: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Image Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl label={ __( 'Image', 'mk-builder' ) }>
							{ ! image ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											image: media.url,
											imageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Story Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ image }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
											borderRadius: `${ imageBorderRadius }px`,
										} }
									/>
									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												image: '',
												imageId: null,
											} )
										}
									>
										{ __(
											'Remove Image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>

						{ image && (
							<>
								<RangeControl
									label={ __(
										'Image Height (px)',
										'mk-builder'
									) }
									value={ imageHeight }
									onChange={ ( val ) =>
										setAttributes( { imageHeight: val } )
									}
									min={ 200 }
									max={ 800 }
									step={ 10 }
								/>

								<SelectControl
									label={ __(
										'Object Fit',
										'mk-builder'
									) }
									value={ imageObjectFit }
									options={ OBJECT_FIT_OPTIONS }
									onChange={ ( val ) =>
										setAttributes( { imageObjectFit: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Object Position',
										'mk-builder'
									) }
									value={ imageObjectPosition }
									options={ OBJECT_POSITION_OPTIONS }
									onChange={ ( val ) =>
										setAttributes( {
											imageObjectPosition: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'mk-builder'
									) }
									value={ imageBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											imageBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>

								<Divider />

								<ToggleControl
									label={ __(
										'Enable Box Shadow',
										'mk-builder'
									) }
									checked={ imageBoxShadow }
									onChange={ ( val ) =>
										setAttributes( { imageBoxShadow: val } )
									}
								/>

								{ imageBoxShadow && (
									<>
										<PanelColorSettings
											title={ __(
												'Shadow Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: imageBoxShadowColor,
													onChange: ( val ) =>
														setAttributes( {
															imageBoxShadowColor:
																val,
														} ),
													label: __(
														'Shadow Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Blur (px)',
												'mk-builder'
											) }
											value={ imageBoxShadowBlur }
											onChange={ ( val ) =>
												setAttributes( {
													imageBoxShadowBlur: val,
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Spread (px)',
												'mk-builder'
											) }
											value={ imageBoxShadowSpread }
											onChange={ ( val ) =>
												setAttributes( {
													imageBoxShadowSpread: val,
												} )
											}
											min={ -50 }
											max={ 50 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Offset X (px)',
												'mk-builder'
											) }
											value={ imageBoxShadowOffsetX }
											onChange={ ( val ) =>
												setAttributes( {
													imageBoxShadowOffsetX: val,
												} )
											}
											min={ -50 }
											max={ 50 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Offset Y (px)',
												'mk-builder'
											) }
											value={ imageBoxShadowOffsetY }
											onChange={ ( val ) =>
												setAttributes( {
													imageBoxShadowOffsetY: val,
												} )
											}
											min={ -50 }
											max={ 50 }
											step={ 1 }
										/>
									</>
								) }

								<Divider />

								<ToggleControl
									label={ __(
										'Show Image Overlay',
										'mk-builder'
									) }
									checked={ showImageOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											showImageOverlay: val,
										} )
									}
								/>

								{ showImageOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: imageOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															imageOverlayColor:
																val,
														} ),
													label: __(
														'Overlay Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Overlay Opacity',
												'mk-builder'
											) }
											value={ imageOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													imageOverlayOpacity: val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }

								<Divider />

								<ToggleControl
									label={ __(
										'Enable Hover Effect',
										'mk-builder'
									) }
									checked={ imageHoverEffect }
									onChange={ ( val ) =>
										setAttributes( {
											imageHoverEffect: val,
										} )
									}
								/>

								{ imageHoverEffect && (
									<RangeControl
										label={ __(
											'Hover Scale',
											'mk-builder'
										) }
										value={ imageHoverScale }
										onChange={ ( val ) =>
											setAttributes( {
												imageHoverScale: val,
											} )
										}
										min={ 1 }
										max={ 1.2 }
										step={ 0.01 }
									/>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="story-content"
					style={ {
						flex: '1 1 50%',
						minWidth: '300px',
						maxWidth: '100%',
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
						zIndex: 10,
						overflow: 'visible',
						boxSizing: 'border-box',
					} }
				>
					{ showLabel && (
						<span
							style={ {
								color: labelColor,
								fontSize: `${ labelFontSize }rem`,
								fontWeight: labelFontWeight,
								textTransform: labelTextTransform,
								display: 'block',
								marginBottom: '10px',
							} }
						>
							{ label }
						</span>
					) }

					<div style={ { marginBottom: '30px' } }>
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) =>
								setAttributes( { heading: val } )
							}
							placeholder={ __(
								'Enter heading...',
								'mk-builder'
							) }
							style={ {
								fontSize: `${ headingFontSize }rem`,
								fontWeight: headingFontWeight,
								color: headingColor,
								lineHeight: headingLineHeight,
								margin: 0,
								minHeight: '2em',
								padding: '4px 0',
								borderBottom: '2px solid transparent',
							} }
						/>
					</div>

					{ /* Description Section - ALWAYS VISIBLE AND PROMINENT */ }
					<div
						className="story-description-section"
						style={ {
							position: 'relative',
							width: '100%',
							marginTop: '30px',
							marginBottom: showStats
								? `${ statsBarMarginTop }px`
								: '30px',
							padding: '20px',
							backgroundColor: '#f8f9fa',
							border: '2px solid #2271b1',
							borderRadius: '8px',
							boxShadow: '0 2px 8px rgba(34, 113, 177, 0.1)',
						} }
					>
						{ /* Prominent Section Label */ }
						<div
							style={ {
								fontSize: '0.9rem',
								fontWeight: 700,
								color: '#2271b1',
								textTransform: 'uppercase',
								letterSpacing: '1px',
								marginBottom: '16px',
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								paddingBottom: '12px',
								borderBottom: '2px solid #2271b1',
							} }
						>
							<span
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '24px',
									height: '24px',
									borderRadius: '4px',
									backgroundColor: '#2271b1',
									color: '#fff',
									fontSize: '14px',
									fontWeight: 700,
								} }
							>
								📝
							</span>
							<span>
								{ __( 'DESCRIPTION', 'mk-builder' ) }
							</span>
							{ ! showDescription && (
								<span
									style={ {
										fontSize: '0.7rem',
										color: '#d63638',
										fontStyle: 'italic',
										textTransform: 'none',
										marginLeft: 'auto',
										padding: '2px 8px',
										backgroundColor: '#ffeaea',
										borderRadius: '4px',
									} }
								>
									{ __(
										'Hidden on frontend',
										'mk-builder'
									) }
								</span>
							) }
						</div>

						{ /* Description Input Field - EXTREMELY VISIBLE */ }
						<div style={ { position: 'relative', width: '100%' } }>
							{ ! description && (
								<div
									className="story-description-placeholder"
									style={ {
										position: 'absolute',
										top: '20px',
										left: '20px',
										right: '20px',
										color: '#2271b1',
										fontSize: `${ Math.max(
											descriptionFontSize,
											1.05
										) }rem`,
										pointerEvents: 'none',
										zIndex: 1,
										fontStyle: 'normal',
										lineHeight: descriptionLineHeight,
										fontWeight: 500,
										opacity: 0.7,
									} }
								>
									{ __(
										'✏️ Click here to enter your story description...',
										'mk-builder'
									) }
								</div>
							) }
							<RichText
								tagName="div"
								value={ description }
								onChange={ ( val ) => {
									setAttributes( { description: val } );
									// Auto-enable showDescription when user adds content
									if ( val && ! showDescription ) {
										setAttributes( {
											showDescription: true,
										} );
									}
								} }
								placeholder={ __(
									'Click here to enter your story description...',
									'mk-builder'
								) }
								multiline={ true }
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/link',
									'core/strikethrough',
									'core/text-color',
									'core/subscript',
									'core/superscript',
									'core/underline',
									'core/code',
									'core/keyboard',
								] }
								preserveWhiteSpace={ false }
								className="story-description-wrapper story-description-editor-field"
								style={ {
									fontSize: `${ descriptionFontSize }rem`,
									color: descriptionColor || '#212121',
									lineHeight: descriptionLineHeight,
									minHeight: '180px',
									padding: '20px',
									border: description
										? '3px solid #2271b1'
										: '3px dashed #2271b1',
									borderRadius: '6px',
									backgroundColor: description
										? '#ffffff'
										: '#f0f6fc',
									transition: 'all 0.3s ease',
									width: '100%',
									boxSizing: 'border-box',
									cursor: 'text',
									position: 'relative',
									zIndex: 2,
									display: 'block',
									fontWeight: description ? 'normal' : '500',
								} }
							/>
						</div>

						{ /* Helper text - More prominent */ }
						{ ! description && (
							<div
								style={ {
									fontSize: '0.85rem',
									color: '#2271b1',
									marginTop: '12px',
									padding: '12px',
									backgroundColor: '#e7f3ff',
									borderRadius: '6px',
									border: '1px solid #b3d9ff',
									fontWeight: 500,
								} }
							>
								<strong>
									💡 { __( 'Tip:', 'mk-builder' ) }
								</strong>{ ' ' }
								{ __(
									'Add a detailed description to tell your story. This will appear below the heading on the frontend.',
									'mk-builder'
								) }
							</div>
						) }
					</div>

					{ showStats && stats.length > 0 && (
						<div
							className="stats-bar"
							style={ {
								display: 'flex',
								gap: `${ statsBarGap }px`,
								marginTop: `${ statsBarMarginTop }px`,
								paddingTop: `${ statsBarPaddingTop }px`,
								borderTop: `1px solid ${ statsBarBorderColor }`,
							} }
						>
							{ stats.map( ( stat, index ) => (
								<div key={ index } className="stat-item">
									<h3
										style={ {
											fontSize: `${ statValueFontSize }rem`,
											color: statValueColor,
											fontWeight: statValueFontWeight,
											margin: 0,
										} }
									>
										<span
											className="counter"
											data-target={ stat.value }
										>
											{ stat.value }
										</span>
										{ stat.suffix }
									</h3>
									<p
										style={ {
											fontSize: `${ statLabelFontSize }rem`,
											color: statLabelColor,
											fontWeight: statLabelFontWeight,
											textTransform:
												statLabelTextTransform,
											margin: '5px 0 0',
											lineHeight: 1.4,
										} }
									>
										{ stat.label }
									</p>
								</div>
							) ) }
						</div>
					) }
				</div>

				<div
					className="story-img-wrapper"
					style={ {
						flex: '1 1 50%',
						minWidth: '300px',
						maxWidth: '100%',
						position: 'relative',
						zIndex: 0,
						overflow: 'visible',
						boxSizing: 'border-box',
					} }
				>
					{ image ? (
						<div
							style={ {
								position: 'relative',
								borderRadius: `${ imageBorderRadius }px`,
								overflow: 'hidden',
							} }
						>
							<img
								src={ image }
								alt={ heading || '' }
								style={ {
									width: '100%',
									height: `${ imageHeight }px`,
									objectFit: imageObjectFit,
									objectPosition: imageObjectPosition,
									display: 'block',
									borderRadius: `${ imageBorderRadius }px`,
									boxShadow: imageBoxShadow
										? `${ imageBoxShadowOffsetX }px ${ imageBoxShadowOffsetY }px ${ imageBoxShadowBlur }px ${ imageBoxShadowSpread }px ${ imageBoxShadowColor }`
										: 'none',
									transition: imageHoverEffect
										? 'transform 0.5s ease'
										: 'none',
								} }
							/>
							{ showImageOverlay && (
								<div
									style={ {
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: imageOverlayColor,
										opacity: imageOverlayOpacity,
										borderRadius: `${ imageBorderRadius }px`,
										pointerEvents: 'none',
									} }
								/>
							) }
						</div>
					) : (
						<MediaPlaceholder
							onSelect={ ( media ) =>
								setAttributes( {
									image: media.url,
									imageId: media.id,
								} )
							}
							allowedTypes={ [ 'image' ] }
							multiple={ false }
							labels={ {
								title: __( 'Story Image', 'mk-builder' ),
							} }
							style={ { minHeight: `${ imageHeight }px` } }
						/>
					) }
				</div>
			</div>
		</>
	);
}
