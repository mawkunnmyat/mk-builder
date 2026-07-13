import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const DEFAULT_ATTS = {
	backgroundColor: '#f8f9fa',
	paddingTop: 40,
	paddingBottom: 40,
	paddingHorizontal: 40,
	columns: 4,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 30,
	borderRadius: 12,
	boxShadow: true,
	boxShadowColor: 'rgba(0, 0, 0, 0.08)',
	boxShadowBlur: 30,
	boxShadowSpread: 0,
	boxShadowOffsetX: 0,
	boxShadowOffsetY: 10,
	sectionMaxWidth: 1100,
	marginTop: -60,
	containerMaxWidth: 1200,
	containerPadding: 20,
	animationOnScroll: true,
	animationType: 'fadeInUp',
	animationDelay: 100,
};

const ANIMATION_CLASS_MAP = {
	fadeInUp: 'fade-up',
	fadeIn: 'fade-in',
	slideInLeft: 'slide-in-left',
	slideInRight: 'slide-in-right',
	zoomIn: 'zoom-in',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingHorizontal,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		borderRadius,
		boxShadow,
		boxShadowColor,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowOffsetX,
		boxShadowOffsetY,
		sectionMaxWidth,
		marginTop,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const ALLOWED_BLOCKS = [ 'mk/stat-item', 'mk/stat-item' ];
	const TEMPLATE = [
		[
			'mk/stat-item',
			{ statNumber: '50+', statLabel: 'Rural Medical Camps' },
		],

		[
			'mk/stat-item',
			{ statNumber: '10k+', statLabel: 'Patients Screened' },
		],

		[
			'mk/stat-item',
			{ statNumber: '200+', statLabel: 'Free Surgeries' },
		],

		[
			'mk/stat-item',
			{ statNumber: '1.5k', statLabel: 'Units of Blood Donated' },
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-stats-section-editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				zIndex: 10,
				isolation: 'isolate',
				pointerEvents: 'auto',
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const sectionStyle = {
		backgroundColor,
		marginTop: `${ marginTop }px`,
		maxWidth: `${ sectionMaxWidth }px`,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: `${ paddingTop }px ${ paddingHorizontal }px ${ paddingBottom }px`,
		borderRadius: `${ borderRadius }px`,
		boxShadow: boxShadow
			? `${ boxShadowOffsetX }px ${ boxShadowOffsetY }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: 'none',
		position: 'relative',
		zIndex: 5,
	};

	// Negative margin overlaps hero on frontend; keep editor clickable (no overlap).
	const editorSectionStyle = {
		...sectionStyle,
		marginTop: '0px',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
		textAlign: 'center',
		'--csr-stats-columns': columns,
		'--csr-stats-columns-tablet': columnsTablet,
		'--csr-stats-columns-mobile': columnsMobile,
		'--csr-stat-gap': `${ gap }px`,
	};

	const animationClass =
		animationOnScroll && animationType
			? ANIMATION_CLASS_MAP[ animationType ] || 'fade-up'
			: '';

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'stats-grid',
			style: gridStyle,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
					<PanelBody
						title={ __( 'Section Appearance', 'mk-builder' ) }
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

						<Divider />

						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 120 }
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
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Horizontal (px)',
								'mk-builder'
							) }
							value={ paddingHorizontal }
							onChange={ ( val ) =>
								setAttributes( { paddingHorizontal: val } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Section Max Width (px)',
								'mk-builder'
							) }
							value={ sectionMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { sectionMaxWidth: val } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 10 }
							help={ __(
								'Max width of the stats card',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Margin Top (px)', 'mk-builder' ) }
							value={ marginTop }
							onChange={ ( val ) =>
								setAttributes( { marginTop: val } )
							}
							min={ -120 }
							max={ 0 }
							step={ 5 }
							help={ __(
								'Negative value overlaps hero (e.g. -60)',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Border Radius (px)',
								'mk-builder'
							) }
							value={ borderRadius }
							onChange={ ( val ) =>
								setAttributes( { borderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>
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
							max={ 6 }
							step={ 1 }
							help={ __(
								'Number of stat columns on desktop',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'mk-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
							help={ __(
								'Columns at max-width 992px',
								'mk-builder'
							) }
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
							help={ __(
								'Columns at max-width 768px',
								'mk-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Gap Between Items (px)',
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
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Box Shadow', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Enable Box Shadow', 'mk-builder' ) }
							checked={ boxShadow }
							onChange={ ( val ) =>
								setAttributes( { boxShadow: val } )
							}
						/>

						{ boxShadow && (
							<>
								<PanelColorSettings
									title={ __(
										'Shadow Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: boxShadowColor,
											onChange: ( val ) =>
												setAttributes( {
													boxShadowColor: val,
												} ),
											label: __(
												'Shadow Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __( 'Blur (px)', 'mk-builder' ) }
									value={ boxShadowBlur }
									onChange={ ( val ) =>
										setAttributes( { boxShadowBlur: val } )
									}
									min={ 0 }
									max={ 80 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Spread (px)',
										'mk-builder'
									) }
									value={ boxShadowSpread }
									onChange={ ( val ) =>
										setAttributes( {
											boxShadowSpread: val,
										} )
									}
									min={ -20 }
									max={ 20 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset X (px)',
										'mk-builder'
									) }
									value={ boxShadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( {
											boxShadowOffsetX: val,
										} )
									}
									min={ -20 }
									max={ 20 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset Y (px)',
										'mk-builder'
									) }
									value={ boxShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											boxShadowOffsetY: val,
										} )
									}
									min={ -20 }
									max={ 20 }
									step={ 1 }
								/>
							</>
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

			<div { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					<div
						className={ `stats-section mk-csr-stats-grid-container${
							animationClass ? ` ${ animationClass }` : ''
						}` }
						style={ editorSectionStyle }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
						data-animation={ animationOnScroll }
						data-animation-type={ animationType }
						data-animation-delay={ animationDelay }
					>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
