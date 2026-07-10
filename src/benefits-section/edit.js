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
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		minColumnWidth,
		gap,
		gapMobile,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleMaxWidth,
		showHeaderLine,
		headerLineColor,
		headerMarginBottom,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/benefit-item' ];
	const TEMPLATE = [
		[
			'mk/benefit-item',
			{
				icon: 'fas fa-user-md',
				title: 'Professional Growth',
				description:
					'Continuous learning opportunities, workshops, and international training programs.',
			},
		],

		[
			'mk/benefit-item',
			{
				icon: 'fas fa-heartbeat',
				title: 'Work-Life Balance',
				description:
					'Flexible shift schedules and leave policies to help you maintain a healthy lifestyle.',
			},
		],

		[
			'mk/benefit-item',
			{
				icon: 'fas fa-users',
				title: 'Inclusive Culture',
				description:
					'A collaborative environment where every voice is heard and teamwork is celebrated.',
			},
		],

		[
			'mk/benefit-item',
			{
				icon: 'fas fa-briefcase-medical',
				title: 'Modern Facilities',
				description:
					'Work with state-of-the-art medical technology and advanced infrastructure.',
			},
		],

		[
			'mk/benefit-item',
			{
				icon: 'fas fa-hand-holding-usd',
				title: 'Competitive Benefits',
				description:
					'Attractive salary packages, health insurance, and performance-based bonuses.',
			},
		],

		[
			'mk/benefit-item',
			{
				icon: 'fas fa-globe-asia',
				title: 'Community Impact',
				description:
					'Participate in CSR initiatives and medical outreach programs across Myanmar.',
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-benefits-section-editor',
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

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ minColumnWidth }px, 1fr))`,
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Background', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
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
					</PanelBody>

					<PanelBody
						title={ __( 'Section Header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Header',
								'mk-builder'
							) }
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
									max={ 3 }
									step={ 0.1 }
								/>

								<Divider />
								<TextControl
									label={ __( 'Subtitle', 'mk-builder' ) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>

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
										'Subtitle Max Width (px)',
										'mk-builder'
									) }
									value={ sectionSubtitleMaxWidth }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMaxWidth: val,
										} )
									}
									min={ 400 }
									max={ 800 }
									step={ 50 }
								/>

								<Divider />
								<ToggleControl
									label={ __(
										'Show Decorative Line',
										'mk-builder'
									) }
									checked={ showHeaderLine }
									onChange={ ( val ) =>
										setAttributes( { showHeaderLine: val } )
									}
								/>

								{ showHeaderLine && (
									<PanelColorSettings
										title={ __(
											'Line Color',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: headerLineColor,
												onChange: ( val ) =>
													setAttributes( {
														headerLineColor: val,
													} ),
												label: __(
													'Line Color',
													'mk-builder'
												),
											},
										] }
									/>
								) }
								<RangeControl
									label={ __(
										'Header Margin Bottom (px)',
										'mk-builder'
									) }
									value={ headerMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											headerMarginBottom: val,
										} )
									}
									min={ 30 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min Column Width (px)',
								'mk-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( val ) =>
								setAttributes( { minColumnWidth: val } )
							}
							min={ 220 }
							max={ 400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'mk-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Gap Mobile (px)', 'mk-builder' ) }
							value={ gapMobile }
							onChange={ ( val ) =>
								setAttributes( { gapMobile: val } )
							}
							min={ 12 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Padding', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 150 }
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
							min={ 40 }
							max={ 150 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'mk-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 40 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'mk-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 40 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
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
									max={ 300 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className="section-header fade-up"
							style={ {
								textAlign: 'center',
								marginBottom: `${ headerMarginBottom }px`,
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title...',
									'mk-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									margin: '0 0 15px 0',
									color: sectionTitleColor,
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'Subtitle...',
									'mk-builder'
								) }
								style={ {
									color: sectionSubtitleColor,
									fontSize: `${ sectionSubtitleFontSize }rem`,
									maxWidth: `${ sectionSubtitleMaxWidth }px`,
									margin: '0 auto',
								} }
							/>

							{ showHeaderLine && (
								<div
									className="line"
									style={ {
										width: '60px',
										height: '4px',
										background: headerLineColor,
										margin: '20px auto 0',
										borderRadius: '2px',
									} }
								/>
							) }
						</div>
					) }

					<div
						className="mk-benefits-grid benefits-grid"
						style={ gridStyle }
						data-min-column-width={ minColumnWidth }
						data-gap={ gap }
						data-gap-mobile={ gapMobile }
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
