import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/package-item' ];
const TEMPLATE = [
	[
		'mk/package-item',
		{ packageName: 'Basic Health', category: 'general' },
	],

	[
		'mk/package-item',
		{
			packageName: 'Executive Checkup',
			category: 'general',
			isRecommended: true,
		},
	],

	[
		'mk/package-item',
		{ packageName: 'Healthy Heart', category: 'heart' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showFilterSection,
		filterTabs,
		filterBgColor,
		filterActiveBgColor,
		filterActiveTextColor,
		filterTextColor,
		filterBorderRadius,
		filterSectionMarginBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		cardBorderRadius,
		cardBoxShadow,
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationDelay,
		animationType,
		layoutStyle,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleAlignment,
		showWaveDivider,
		waveColor,
		labSectionBgColor,
		labFeatureTextColor,
		labCurrencyColor,
		primaryColor,
		cardTitleColor,
		cardPriceColor,
		cardDescColor,
		featureIconColor,
		featureTextColor,
		buttonBgColor,
		buttonTextColor,
		ribbonBgColor,
		ribbonTextColor,
		labPrimaryColor,
		labSecondaryColor,
		labHeaderBgColor,
		labHeaderTextColor,
		labCardBgColor,
		labFeatureIconColor,
		labButtonBgColor,
		labButtonTextColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: [
				'mk-packages-section-editor',
				layoutStyle === 'lab'
					? 'lab-section lab-price-section is-lab-style'
					: '',
				layoutStyle === 'lab' && showWaveDivider
					? 'has-wave-divider'
					: '',
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				backgroundColor: backgroundImage
					? 'transparent'
					: backgroundColor,
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				overflow: 'visible',
				...( layoutStyle === 'lab' && showWaveDivider && waveColor
					? { '--wave-fill': waveColor }
					: {} ),
				'--primary-orange': primaryColor || '#f48b2a',
				'--dark-grey': cardTitleColor || '#212121',
				'--medium-grey': cardDescColor || '#666666',
				'--pkg-price-color': cardPriceColor || '#f48b2a',
				'--feature-icon-color': featureIconColor || '#2ecc71',
				'--feature-text-color': featureTextColor || '#555555',
				'--button-bg': buttonBgColor || '#f48b2a',
				'--button-text': buttonTextColor || '#ffffff',
				'--ribbon-bg': ribbonBgColor || '#f48b2a',
				'--ribbon-text': ribbonTextColor || '#ffffff',
				'--lab-primary': labPrimaryColor || '#0284c7',
				'--lab-secondary': labSecondaryColor || '#0f172a',
				'--lab-header-bg': labHeaderBgColor || '#0f172a',
				'--lab-header-text': labHeaderTextColor || '#ffffff',
				'--lab-white': labCardBgColor || '#ffffff',
				'--lab-light':
					layoutStyle === 'lab'
						? labSectionBgColor || '#f0f9ff'
						: undefined,
				'--lab-feature-icon': labFeatureIconColor || '#0284c7',
				'--lab-feature-text':
					layoutStyle === 'lab'
						? labFeatureTextColor || '#555555'
						: undefined,
				'--lab-currency':
					layoutStyle === 'lab'
						? labCurrencyColor || '#94a3b8'
						: undefined,
				'--lab-btn-bg': labButtonBgColor || '#0284c7',
				'--lab-btn-text': labButtonTextColor || '#ffffff',
			},
		} ),
		[
			backgroundColor,
			backgroundImage,
			buttonBgColor,
			buttonTextColor,
			cardDescColor,
			cardPriceColor,
			cardTitleColor,
			featureIconColor,
			featureTextColor,
			labButtonBgColor,
			labButtonTextColor,
			labCardBgColor,
			labCurrencyColor,
			labFeatureIconColor,
			labFeatureTextColor,
			labHeaderBgColor,
			labHeaderTextColor,
			labPrimaryColor,
			labSecondaryColor,
			labSectionBgColor,
			layoutStyle,
			paddingBottom,
			paddingTop,
			primaryColor,
			ribbonBgColor,
			ribbonTextColor,
			showWaveDivider,
			undefined,
			waveColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const gridStyle = {
		'--grid-columns': columns,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
	};

	const addFilterTab = () => {
		setAttributes( {
			filterTabs: [
				...filterTabs,
				{ label: __( 'New Tab', 'mk-builder' ), value: 'new' },
			],
		} );
	};

	const updateFilterTab = ( index, field, value ) => {
		const updated = [ ...filterTabs ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { filterTabs: updated } );
	};

	const removeFilterTab = ( index ) => {
		if ( filterTabs.length <= 1 ) return;
		const filtered = filterTabs.filter( ( _, i ) => i !== index );
		setAttributes( { filterTabs: filtered } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Colors', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Section', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( v ) =>
										setAttributes( {
											backgroundColor: v ?? undefined,
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: sectionTitleColor,
									onChange: ( v ) =>
										setAttributes( {
											sectionTitleColor: v ?? undefined,
										} ),
									label: __(
										'Section title',
										'mk-builder'
									),
								},
								{
									value: waveColor,
									onChange: ( v ) =>
										setAttributes( {
											waveColor: v ?? undefined,
										} ),
									label: __(
										'Wave fill (Lab)',
										'mk-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Filter tabs', 'mk-builder' ) }
							colorSettings={ [
								{
									value: filterBgColor,
									onChange: ( v ) =>
										setAttributes( {
											filterBgColor: v ?? undefined,
										} ),
									label: __(
										'Tabs background',
										'mk-builder'
									),
								},
								{
									value: filterActiveBgColor,
									onChange: ( v ) =>
										setAttributes( {
											filterActiveBgColor: v ?? undefined,
										} ),
									label: __(
										'Active tab background',
										'mk-builder'
									),
								},
								{
									value: filterActiveTextColor,
									onChange: ( v ) =>
										setAttributes( {
											filterActiveTextColor:
												v ?? undefined,
										} ),
									label: __(
										'Active tab text',
										'mk-builder'
									),
								},
								{
									value: filterTextColor,
									onChange: ( v ) =>
										setAttributes( {
											filterTextColor: v ?? undefined,
										} ),
									label: __( 'Tab text', 'mk-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Default cards', 'mk-builder' ) }
							colorSettings={ [
								{
									value: primaryColor,
									onChange: ( v ) =>
										setAttributes( {
											primaryColor: v ?? undefined,
										} ),
									label: __(
										'Primary / accent',
										'mk-builder'
									),
								},
								{
									value: cardTitleColor,
									onChange: ( v ) =>
										setAttributes( {
											cardTitleColor: v ?? undefined,
										} ),
									label: __( 'Card title', 'mk-builder' ),
								},
								{
									value: cardPriceColor,
									onChange: ( v ) =>
										setAttributes( {
											cardPriceColor: v ?? undefined,
										} ),
									label: __( 'Card price', 'mk-builder' ),
								},
								{
									value: cardDescColor,
									onChange: ( v ) =>
										setAttributes( {
											cardDescColor: v ?? undefined,
										} ),
									label: __(
										'Card description',
										'mk-builder'
									),
								},
								{
									value: featureIconColor,
									onChange: ( v ) =>
										setAttributes( {
											featureIconColor: v ?? undefined,
										} ),
									label: __(
										'Feature icon',
										'mk-builder'
									),
								},
								{
									value: featureTextColor,
									onChange: ( v ) =>
										setAttributes( {
											featureTextColor: v ?? undefined,
										} ),
									label: __(
										'Feature text',
										'mk-builder'
									),
								},
								{
									value: buttonBgColor,
									onChange: ( v ) =>
										setAttributes( {
											buttonBgColor: v ?? undefined,
										} ),
									label: __(
										'Button background',
										'mk-builder'
									),
								},
								{
									value: buttonTextColor,
									onChange: ( v ) =>
										setAttributes( {
											buttonTextColor: v ?? undefined,
										} ),
									label: __( 'Button text', 'mk-builder' ),
								},
								{
									value: ribbonBgColor,
									onChange: ( v ) =>
										setAttributes( {
											ribbonBgColor: v ?? undefined,
										} ),
									label: __(
										'Ribbon background',
										'mk-builder'
									),
								},
								{
									value: ribbonTextColor,
									onChange: ( v ) =>
										setAttributes( {
											ribbonTextColor: v ?? undefined,
										} ),
									label: __( 'Ribbon text', 'mk-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Lab style', 'mk-builder' ) }
							colorSettings={ [
								{
									value: labSectionBgColor,
									onChange: ( v ) =>
										setAttributes( {
											labSectionBgColor: v ?? undefined,
										} ),
									label: __(
										'Lab section background',
										'mk-builder'
									),
								},
								{
									value: waveColor,
									onChange: ( v ) =>
										setAttributes( {
											waveColor: v ?? undefined,
										} ),
									label: __( 'Wave fill', 'mk-builder' ),
								},
								{
									value: sectionTitleColor,
									onChange: ( v ) =>
										setAttributes( {
											sectionTitleColor: v ?? undefined,
										} ),
									label: __(
										'Section title (Lab)',
										'mk-builder'
									),
								},
								{
									value: labPrimaryColor,
									onChange: ( v ) =>
										setAttributes( {
											labPrimaryColor: v ?? undefined,
										} ),
									label: __(
										'Lab primary / featured',
										'mk-builder'
									),
								},
								{
									value: labSecondaryColor,
									onChange: ( v ) =>
										setAttributes( {
											labSecondaryColor: v ?? undefined,
										} ),
									label: __(
										'Lab secondary',
										'mk-builder'
									),
								},
								{
									value: labHeaderBgColor,
									onChange: ( v ) =>
										setAttributes( {
											labHeaderBgColor: v ?? undefined,
										} ),
									label: __(
										'Card header background',
										'mk-builder'
									),
								},
								{
									value: labHeaderTextColor,
									onChange: ( v ) =>
										setAttributes( {
											labHeaderTextColor: v ?? undefined,
										} ),
									label: __(
										'Card header text',
										'mk-builder'
									),
								},
								{
									value: labCurrencyColor,
									onChange: ( v ) =>
										setAttributes( {
											labCurrencyColor: v ?? undefined,
										} ),
									label: __(
										'Currency (MMK) color',
										'mk-builder'
									),
								},
								{
									value: labCardBgColor,
									onChange: ( v ) =>
										setAttributes( {
											labCardBgColor: v ?? undefined,
										} ),
									label: __(
										'Card body background',
										'mk-builder'
									),
								},
								{
									value: labFeatureIconColor,
									onChange: ( v ) =>
										setAttributes( {
											labFeatureIconColor: v ?? undefined,
										} ),
									label: __(
										'Feature list icon',
										'mk-builder'
									),
								},
								{
									value: labFeatureTextColor,
									onChange: ( v ) =>
										setAttributes( {
											labFeatureTextColor: v ?? undefined,
										} ),
									label: __(
										'Feature list text',
										'mk-builder'
									),
								},
								{
									value: labButtonBgColor,
									onChange: ( v ) =>
										setAttributes( {
											labButtonBgColor: v ?? undefined,
										} ),
									label: __(
										'Button background',
										'mk-builder'
									),
								},
								{
									value: labButtonTextColor,
									onChange: ( v ) =>
										setAttributes( {
											labButtonTextColor: v ?? undefined,
										} ),
									label: __( 'Button text', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout / Design', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Design Style', 'mk-builder' ) }
							value={ layoutStyle || 'default' }
							options={ [
								{
									label: __(
										'Default Packages Grid',
										'mk-builder'
									),
									value: 'default',
								},
								{
									label: __(
										'Lab Pricing (Wave Header)',
										'mk-builder'
									),
									value: 'lab',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { layoutStyle: val } )
							}
							help={ __(
								'Choose the visual style for this packages section.',
								'mk-builder'
							) }
						/>

						<Divider />
						<ToggleControl
							label={ __(
								'Show Section Header',
								'mk-builder'
							) }
							checked={ !! showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<BaseControl
									label={ __(
										'Section Title',
										'mk-builder'
									) }
								>
									<RichText
										tagName="h2"
										value={ sectionTitle }
										onChange={ ( val ) =>
											setAttributes( {
												sectionTitle: val,
											} )
										}
										placeholder={ __(
											'Health Packages',
											'mk-builder'
										) }
										style={ {
											fontSize: '2.2rem',
											fontWeight: 700,
											textAlign: sectionTitleAlignment,
											color: sectionTitleColor,
										} }
									/>
								</BaseControl>
								<SelectControl
									label={ __(
										'Title Alignment',
										'mk-builder'
									) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'mk-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'mk-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __( 'Show Wave Divider', 'mk-builder' ) }
							checked={ !! showWaveDivider }
							onChange={ ( val ) =>
								setAttributes( { showWaveDivider: val } )
							}
							help={ __(
								'Adds a decorative wave SVG at the top of the section (Lab style).',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<Divider />
						<BaseControl
							label={ __( 'Background Image', 'mk-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											backgroundImage: media.url,
											backgroundImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Background Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImage }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												backgroundImage: '',
												backgroundImageId: null,
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
						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Show Overlay',
										'mk-builder'
									) }
									checked={ backgroundOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundOverlay: val,
										} )
									}
								/>

								{ backgroundOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: backgroundOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															backgroundOverlayColor:
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
											value={ backgroundOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													backgroundOverlayOpacity:
														val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Filter Tabs', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Filter Section',
								'mk-builder'
							) }
							checked={ showFilterSection }
							onChange={ ( val ) =>
								setAttributes( { showFilterSection: val } )
							}
						/>

						{ showFilterSection && (
							<>
								<BaseControl
									label={ __(
										'Filter Tabs',
										'mk-builder'
									) }
									help={ __(
										'First tab should have value "all" for "All" filter.',
										'mk-builder'
									) }
								>
									{ filterTabs.map( ( tab, index ) => (
										<div
											key={ index }
											style={ {
												marginBottom: '12px',
												padding: '10px',
												border: '1px solid #e0e0e0',
												borderRadius: '4px',
											} }
										>
											<TextControl
												label={ __(
													'Label',
													'mk-builder'
												) }
												value={ tab.label }
												onChange={ ( val ) =>
													updateFilterTab(
														index,
														'label',
														val
													)
												}
											/>

											<TextControl
												label={ __(
													'Value (slug)',
													'mk-builder'
												) }
												value={ tab.value }
												onChange={ ( val ) =>
													updateFilterTab(
														index,
														'value',
														val
													)
												}
												help={ __(
													'Use "all" for "Show all" tab. Must match category on package items.',
													'mk-builder'
												) }
											/>

											{ filterTabs.length > 1 && (
												<Button
													isDestructive
													isSmall
													onClick={ () =>
														removeFilterTab( index )
													}
													style={ {
														marginTop: '8px',
													} }
												>
													{ __(
														'Remove Tab',
														'mk-builder'
													) }
												</Button>
											) }
										</div>
									) ) }
									<Button
										isPrimary
										isSmall
										onClick={ addFilterTab }
									>
										{ __(
											'Add Filter Tab',
											'mk-builder'
										) }
									</Button>
								</BaseControl>
								<RangeControl
									label={ __(
										'Tabs Border Radius (px)',
										'mk-builder'
									) }
									value={ filterBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											filterBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Filter Section Margin Bottom (px)',
										'mk-builder'
									) }
									value={ filterSectionMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											filterSectionMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'mk-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'mk-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Gap Between Cards (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Card Border Radius (px)',
								'mk-builder'
							) }
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>

						<ToggleControl
							label={ __( 'Enable Box Shadow', 'mk-builder' ) }
							checked={ cardBoxShadow }
							onChange={ ( val ) =>
								setAttributes( { cardBoxShadow: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Hover Effects', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Hover Effects',
								'mk-builder'
							) }
							checked={ hoverEffect }
							onChange={ ( val ) =>
								setAttributes( { hoverEffect: val } )
							}
						/>

						{ hoverEffect && (
							<RangeControl
								label={ __(
									'Translate Y (px)',
									'mk-builder'
								) }
								value={ hoverTranslateY }
								onChange={ ( val ) =>
									setAttributes( { hoverTranslateY: val } )
								}
								min={ -20 }
								max={ 0 }
								step={ 1 }
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Animation Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation Type',
										'mk-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade In Up',
												'mk-builder'
											),
											value: 'fadeInUp',
										},
										{
											label: __(
												'Fade In',
												'mk-builder'
											),
											value: 'fadeIn',
										},
										{
											label: __(
												'Slide In Left',
												'mk-builder'
											),
											value: 'slideInLeft',
										},
										{
											label: __(
												'Slide In Right',
												'mk-builder'
											),
											value: 'slideInRight',
										},
										{
											label: __(
												'Zoom In',
												'mk-builder'
											),
											value: 'zoomIn',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation Delay (ms)',
										'mk-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ layoutStyle === 'lab' && showWaveDivider && (
					<div className="wave-divider" aria-hidden="true">
						<svg
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1200 120"
							preserveAspectRatio="none"
						>
							<path
								d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
								className="wave-fill"
								style={ { fill: waveColor || '#f0f9ff' } }
							/>
						</svg>
					</div>
				) }
				{ backgroundImage && backgroundOverlay && (
					<div
						className="background-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 1,
						} }
					/>
				) }
				<div
					className={ `jivaka-container${
						layoutStyle === 'lab' ? ' lab-container' : ''
					}` }
					style={ containerStyle }
				>
					{ layoutStyle === 'lab' && showSectionHeader && (
						<div
							className="lab-header fade-up"
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: '40px',
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Health Packages',
									'mk-builder'
								) }
								style={ {
									fontSize: '2.5rem',
									fontWeight: 700,
									color: sectionTitleColor,
									margin: 0,
								} }
							/>
						</div>
					) }
					{ showFilterSection &&
						filterTabs &&
						filterTabs.length > 0 && (
							<div
								className="filter-section"
								style={ {
									padding: '20px 0',
									textAlign: 'center',
									marginBottom: `${ filterSectionMarginBottom }px`,
								} }
							>
								<div
									className="filter-tabs"
									style={ {
										display: 'inline-flex',
										flexWrap: 'wrap',
										justifyContent: 'center',
										gap: '10px',
										background: filterBgColor,
										padding: '5px',
										borderRadius: `${ filterBorderRadius }px`,
									} }
								>
									{ filterTabs.map( ( tab, index ) => (
										<button
											key={ index }
											type="button"
											className={ `filter-btn ${
												index === 0 ? 'active' : ''
											}` }
											data-filter={ tab.value }
											style={ {
												padding: '10px 25px',
												border: 'none',
												background:
													index === 0
														? filterActiveBgColor
														: 'transparent',
												borderRadius: '30px',
												fontWeight: 700,
												color:
													index === 0
														? filterActiveTextColor
														: filterTextColor,
												cursor: 'pointer',
												fontSize: '0.9rem',
											} }
										>
											{ tab.label }
										</button>
									) ) }
								</div>
							</div>
						) }
					<div
						className={ `mk-packages-grid-container packages-grid${
							layoutStyle === 'lab' ? ' lab-price-grid' : ''
						}` }
						style={ gridStyle }
						data-columns={ columns }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
