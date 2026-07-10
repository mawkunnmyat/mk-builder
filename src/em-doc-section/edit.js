import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/em-doc-card' ];

const TEMPLATE = [
	[
		'mk/em-doc-card',
		{
			imageUrl:
				'https://jivakahospital.com/wp-content/uploads/2025/12/img-team-member-03.jpg',
			role: 'Head of Emergency',
			name: 'Dr. Aung Kyaw',
			specialty: 'Trauma Specialist',
		},
	],

	[
		'mk/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=11',
			role: 'Cardiologist',
			name: 'Dr. Zaw Win',
			specialty: 'Acute Cardiac Care',
		},
	],

	[
		'mk/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=5',
			role: 'Anesthesiologist',
			name: 'Dr. Thida Soe',
			specialty: 'Critical Care',
		},
	],

	[
		'mk/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=33',
			role: 'Physician',
			name: 'Dr. Min Htet',
			specialty: 'Pediatric Emergency',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gap,
		minColumnWidth,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		headerMaxWidth,
		headerMarginBottom,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-em-doc-section-editor em-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: 'center',
		maxWidth: `${ headerMaxWidth }px`,
		margin: `0 auto ${ headerMarginBottom }px`,
	};

	// Editor: fixed 3 columns so cards appear in a row (InnerBlocks + display:contents in SCSS).
	const gridStyle = {
		'--grid-columns': 3,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: `${ gap }px`,
	};

	const headerAnimClass =
		animationOnScroll && animationType ? animationType : '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section background', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
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
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show header', 'mk-builder' ) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<TextControl
									label={ __( 'Title', 'mk-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title color',
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
												'Title color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title font size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 3.5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title font weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 400 }
									max={ 900 }
									step={ 100 }
								/>

								<Divider />
								<ToggleControl
									label={ __(
										'Show subtitle',
										'mk-builder'
									) }
									checked={ showSectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											showSectionSubtitle: val,
										} )
									}
								/>

								{ showSectionSubtitle && (
									<>
										<TextControl
											label={ __(
												'Subtitle',
												'mk-builder'
											) }
											value={ sectionSubtitle }
											onChange={ ( val ) =>
												setAttributes( {
													sectionSubtitle: val,
												} )
											}
										/>

										<PanelColorSettings
											title={ __(
												'Subtitle color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: sectionSubtitleColor,
													onChange: ( val ) =>
														setAttributes( {
															sectionSubtitleColor:
																val,
														} ),
													label: __(
														'Subtitle color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Subtitle font size (rem)',
												'mk-builder'
											) }
											value={ sectionSubtitleFontSize }
											onChange={ ( val ) =>
												setAttributes( {
													sectionSubtitleFontSize:
														val,
												} )
											}
											min={ 0.8 }
											max={ 1.3 }
											step={ 0.05 }
										/>
									</>
								) }
								<RangeControl
									label={ __(
										'Header max width (px)',
										'mk-builder'
									) }
									value={ headerMaxWidth }
									onChange={ ( val ) =>
										setAttributes( { headerMaxWidth: val } )
									}
									min={ 480 }
									max={ 900 }
									step={ 10 }
								/>

								<RangeControl
									label={ __(
										'Header margin bottom (px)',
										'mk-builder'
									) }
									value={ headerMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											headerMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Grid layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min column width (px)',
								'mk-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( val ) =>
								setAttributes( { minColumnWidth: val } )
							}
							min={ 200 }
							max={ 360 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Gap between cards (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 16 }
							max={ 60 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<SelectControl
								label={ __(
									'Animation type',
									'mk-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __( 'Fade up', 'mk-builder' ),
										value: 'fade-up',
									},
									{
										label: __( 'Fade in', 'mk-builder' ),
										value: 'fadeIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="em-container" style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className={ `em-header ${ headerAnimClass }` }
							style={ headerStyle }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Emergency Specialists',
									'mk-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									marginBottom: showSectionSubtitle ? 10 : 0,
									marginTop: 0,
								} }
							/>

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
										'Add optional subtitle…',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										color: sectionSubtitleColor,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }
					<div
						className="em-doc-grid mk-em-doc-grid-container"
						style={ gridStyle }
						data-columns={ 3 }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
