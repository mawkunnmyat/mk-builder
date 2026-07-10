import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/paediatrics-condition-card' ];
const TEMPLATE = [
	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-lungs',
			title: 'Respiratory Issues',
			subtitle: 'Asthma, Pneumonia',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-temperature-high',
			title: 'Infectious Diseases',
			subtitle: 'Dengue, Typhoid',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-allergies',
			title: 'Allergies & Skin',
			subtitle: 'Eczema, Rashes',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-utensils',
			title: 'Nutritional Health',
			subtitle: 'Malnutrition, Obesity',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-brain',
			title: 'Development',
			subtitle: 'Autism, Speech Delay',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-baby',
			title: 'Neonatal Care',
			subtitle: 'Jaundice, Preterm',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-heartbeat',
			title: 'Congenital Heart',
			subtitle: 'Defects, Murmurs',
		},
	],

	[
		'mk/paediatrics-condition-card',
		{
			iconClass: 'fas fa-bone',
			title: 'Orthopaedics',
			subtitle: 'Fractures, Clubfoot',
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
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		minColumnWidth,
		gap,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'paed-section paed-conditions-section mk-paed-conditions-section-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ Number(
			minColumnWidth
		) }px, 1fr))`,
		gap: `${ Number( gap ) }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section header',
								'mk-builder'
							) }
							checked={ !! showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<PanelColorSettings
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( v ) =>
												setAttributes( {
													sectionTitleColor:
														v ?? undefined,
												} ),
											label: __(
												'Title color',
												'mk-builder'
											),
										},
										{
											value: sectionSubtitleColor,
											onChange: ( v ) =>
												setAttributes( {
													sectionSubtitleColor:
														v ?? undefined,
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
										'Title font size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( v ) =>
										setAttributes( {
											sectionTitleFontSize: v,
										} )
									}
									min={ 1.5 }
									max={ 3.5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle font size (rem)',
										'mk-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( v ) =>
										setAttributes( {
											sectionSubtitleFontSize: v,
										} )
									}
									min={ 0.9 }
									max={ 1.4 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Colors', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( v ) =>
										setAttributes( {
											backgroundColor: v ?? undefined,
										} ),
									label: __(
										'Section background',
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
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Min column width (px)',
								'mk-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( v ) =>
								setAttributes( { minColumnWidth: v } )
							}
							min={ 180 }
							max={ 400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Gap between cards (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 10 }
							max={ 50 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Animation on scroll',
								'mk-builder'
							) }
							checked={ !! animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="paed-container" style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className="paed-header paed-fade-up"
							style={ { marginBottom: '60px' } }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Conditions We Treat',
									'mk-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									color: sectionTitleColor,
									marginBottom: '15px',
									marginTop: 0,
									textAlign: 'center',
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'Expert care for…',
									'mk-builder'
								) }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
									textAlign: 'center',
								} }
							/>
						</div>
					) }
					<div className="paed-conditions-grid" style={ gridStyle }>
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
