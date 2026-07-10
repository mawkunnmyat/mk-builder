import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
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

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleFontWeight,
		sectionSubtitleMarginBottom,
		checklistItems,
		imageUrl,
		imageId,
		imageAlt,
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
		gridGap,
		boxBorderRadius,
		boxPadding,
		checkboxAccentColor,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-health-check-checklist-editor chk-section chk-checklist-section',
			style: {
				backgroundColor: backgroundImage
					? 'transparent'
					: backgroundColor || '#f4f8fb',
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				'--chk-primary': checkboxAccentColor || '#f48b2a',
				'--chk-radius': `${ boxBorderRadius }px`,
			},
		} ),
		[
			backgroundColor,
			backgroundImage,
			boxBorderRadius,
			checkboxAccentColor,
			paddingBottom,
			paddingTop,
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
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: `${ gridGap }px`,
		alignItems: 'center',
	};

	const items = Array.isArray( checklistItems ) ? checklistItems : [];
	const addItem = () =>
		setAttributes( {
			checklistItems: [
				...items,
				__( 'New checklist item', 'mk-builder' ),
			],
		} );
	const updateItem = ( index, value ) => {
		const next = [ ...items ];
		next[ index ] = value;
		setAttributes( { checklistItems: next } );
	};
	const removeItem = ( index ) =>
		setAttributes( {
			checklistItems: items.filter( ( _, i ) => i !== index ),
		} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Section Title & Subtitle',
							'mk-builder'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

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

								<RangeControl
									label={ __(
										'Title Margin Bottom (px)',
										'mk-builder'
									) }
									value={ sectionTitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 5 }
								/>
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __(
								'Show Section Subtitle',
								'mk-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionSubtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionSubtitleColor: val,
												} ),
											label: __(
												'Subtitle Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Weight',
										'mk-builder'
									) }
									value={ sectionSubtitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Margin Bottom (px)',
										'mk-builder'
									) }
									value={ sectionSubtitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 60 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Checklist Items', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ items.map( ( item, index ) => (
							<div
								key={ index }
								style={ {
									display: 'flex',
									gap: 8,
									alignItems: 'center',
									marginBottom: 8,
								} }
							>
								<TextControl
									value={ item }
									onChange={ ( v ) => updateItem( index, v ) }
									placeholder={ __(
										'Checklist item text',
										'mk-builder'
									) }
									style={ { flex: 1 } }
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeItem( index ) }
									icon="no-alt"
									aria-label={ __(
										'Remove item',
										'mk-builder'
									) }
								/>
							</div>
						) ) }
						<Button
							isSecondary
							isSmall
							onClick={ addItem }
							icon="plus"
						>
							{ __( 'Add checklist item', 'mk-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Right Column Image', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl label={ __( 'Image', 'mk-builder' ) }>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt:
												media.alt ||
												__( 'Doctor', 'mk-builder' ),
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Right column image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ imageUrl }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: 10,
											borderRadius: 8,
										} }
									/>

									<TextControl
										label={ __(
											'Alt text',
											'mk-builder'
										) }
										value={ imageAlt || '' }
										onChange={ ( v ) =>
											setAttributes( { imageAlt: v } )
										}
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: null,
												imageAlt: '',
											} )
										}
										style={ { marginTop: 8 } }
									>
										{ __(
											'Remove image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Background Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Background Type', 'mk-builder' ) }
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
											marginBottom: 10,
											borderRadius: 4,
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

						{ ! backgroundImage && (
							<PanelColorSettings
								title={ __(
									'Background Color',
									'mk-builder'
								) }
								colorSettings={ [
									{
										value: backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
								] }
							/>
						) }

						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Enable Overlay',
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
						title={ __( 'Container & Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
							help={ __(
								'Maximum width of the content container',
								'mk-builder'
							) }
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
							label={ __( 'Grid Gap (px)', 'mk-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
							help={ __(
								'Space between checklist column and image',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Checklist Box Border Radius (px)',
								'mk-builder'
							) }
							value={ boxBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { boxBorderRadius: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Checklist Box Padding (px)',
								'mk-builder'
							) }
							value={ boxPadding }
							onChange={ ( val ) =>
								setAttributes( { boxPadding: val } )
							}
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'mk-builder'
							) }
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
								'Section Padding Bottom (px)',
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
						title={ __( 'Checklist Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Checkbox Accent Color',
								'mk-builder'
							) }
							colorSettings={ [
								{
									value: checkboxAccentColor,
									onChange: ( val ) =>
										setAttributes( {
											checkboxAccentColor: val,
										} ),
									label: __(
										'Checkbox accent (focus/check)',
										'mk-builder'
									),
								},
							] }
						/>
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
							help={ __(
								'Animate columns when they scroll into view',
								'mk-builder'
							) }
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

			<section { ...blockProps }>
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

				<div className="chk-container" style={ containerStyle }>
					<div
						className="editor-label"
						style={ {
							textAlign: 'center',
							padding: '10px',
							background: '#2271b1',
							color: '#fff',
							fontWeight: '600',
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: '20px',
							borderRadius: '4px',
						} }
					>
						{ __(
							'Health Check Checklist Section (Editor View)',
							'mk-builder'
						) }
					</div>

					<div className="chk-checklist-grid" style={ gridStyle }>
						<div className="fade-up">
							{ ( showSectionTitle || showSectionSubtitle ) && (
								<div
									className="section-header"
									style={ {
										textAlign: sectionTitleAlignment,
										marginBottom: showSectionSubtitle
											? `${ sectionSubtitleMarginBottom }px`
											: `${ sectionTitleMarginBottom }px`,
									} }
								>
									{ showSectionTitle && (
										<RichText
											tagName="h2"
											value={ sectionTitle }
											onChange={ ( val ) =>
												setAttributes( {
													sectionTitle: val,
												} )
											}
											placeholder={ __(
												'Are You Due for a Checkup?',
												'mk-builder'
											) }
											style={ {
												fontSize: `${ sectionTitleFontSize }rem`,
												fontWeight:
													sectionTitleFontWeight,
												color: sectionTitleColor,
												marginBottom:
													showSectionSubtitle
														? `${ sectionTitleMarginBottom }px`
														: 0,
												marginTop: 0,
											} }
										/>
									) }
									{ showSectionSubtitle && (
										<RichText
											tagName="p"
											value={ sectionSubtitle }
											onChange={ ( val ) =>
												setAttributes( {
													sectionSubtitle: val,
												} )
											}
											placeholder={ __(
												"If you check more than 2 boxes, it's time to book an appointment.",
												'mk-builder'
											) }
											style={ {
												fontSize: `${ sectionSubtitleFontSize }rem`,
												fontWeight:
													sectionSubtitleFontWeight,
												color:
													sectionSubtitleColor ||
													'#666',
												margin: 0,
											} }
										/>
									) }
								</div>
							) }
							<div
								className="chk-checklist-box"
								style={ {
									background: '#fff',
									padding: `${ boxPadding }px`,
									borderRadius: `${ boxBorderRadius }px`,
									boxShadow:
										'0 15px 40px rgba(0, 95, 115, 0.1)',
								} }
							>
								{ items.length > 0 ? (
									items.map( ( item, index ) => (
										<label
											key={ index }
											className="chk-checklist-item"
										>
											<input
												type="checkbox"
												readOnly
												disabled
											/>

											{ item }
										</label>
									) )
								) : (
									<p style={ { color: '#999', margin: 0 } }>
										{ __(
											'Add checklist items in the sidebar.',
											'mk-builder'
										) }
									</p>
								) }
							</div>
						</div>
						<div className="fade-up">
							{ imageUrl ? (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									className="chk-checklist-img"
									style={ {
										width: '100%',
										borderRadius: `${ boxBorderRadius }px`,
										boxShadow:
											'0 15px 40px rgba(0, 95, 115, 0.1)',
									} }
								/>
							) : (
								<div
									className="chk-checklist-img chk-checklist-img-placeholder"
									style={ {
										width: '100%',
										minHeight: 300,
										background: '#f0f0f0',
										borderRadius: `${ boxBorderRadius }px`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#999',
									} }
								>
									{ __(
										'Add image in sidebar',
										'mk-builder'
									) }
								</div>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
