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
	ToggleControl,
	TextControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/tele-specialty-item' ];
const TEMPLATE = [
	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-stethoscope', title: 'General Medicine' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-allergies', title: 'Dermatology' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-baby', title: 'Pediatrics' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-brain', title: 'Psychology' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-female', title: 'Gynecology' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-carrot', title: 'Nutrition / Diet' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-heartbeat', title: 'Cardiology Follow-up' },
	],

	[
		'mk/tele-specialty-item',
		{ iconClass: 'fas fa-notes-medical', title: 'Report Review' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		sectionHeaderMarginBottom,
		gridGap,
		minItemWidth,
		useFadeUp,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-tele-specialty-section-editor',
			style: {
				paddingTop: `${ sectionPaddingTop }px`,
				paddingBottom: `${ sectionPaddingBottom }px`,
			},
		} ),
		[ sectionPaddingBottom, sectionPaddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
		marginBottom: `${ sectionHeaderMarginBottom }px`,
		maxWidth: '700px',
		marginLeft: 'auto',
		marginRight: 'auto',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ minItemWidth }px, 1fr))`,
		gap: `${ gridGap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
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
								<TextControl
									label={ __( 'Title', 'mk-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<TextControl
									label={ __(
										'Description',
										'mk-builder'
									) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>

								<SelectControl
									label={ __( 'Alignment', 'mk-builder' ) }
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
							label={ __(
								'Add fade-up class (section header)',
								'mk-builder'
							) }
							checked={ useFadeUp }
							onChange={ ( val ) =>
								setAttributes( { useFadeUp: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Title & Description', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: sectionTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionTitleColor: val,
										} ),
									label: __( 'Title Color', 'mk-builder' ),
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
								setAttributes( { sectionTitleFontSize: val } )
							}
							min={ 1.2 }
							max={ 4 }
							step={ 0.1 }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: sectionSubtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionSubtitleColor: val,
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
							value={ sectionSubtitleFontSize }
							onChange={ ( val ) =>
								setAttributes( {
									sectionSubtitleFontSize: val,
								} )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Header Margin Bottom (px)',
								'mk-builder'
							) }
							value={ sectionHeaderMarginBottom }
							onChange={ ( val ) =>
								setAttributes( {
									sectionHeaderMarginBottom: val,
								} )
							}
							min={ 30 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Gap Between Items (px)',
								'mk-builder'
							) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 12 }
							max={ 50 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Min Item Width (px)',
								'mk-builder'
							) }
							value={ minItemWidth }
							onChange={ ( val ) =>
								setAttributes( { minItemWidth: val } )
							}
							min={ 160 }
							max={ 320 }
							step={ 10 }
							help={ __(
								'Used for auto-fill grid: minmax(minItemWidth, 1fr)',
								'mk-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Section & Container', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'mk-builder'
							) }
							value={ sectionPaddingTop }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'mk-builder'
							) }
							value={ sectionPaddingBottom }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingBottom: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 5 }
						/>

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
							max={ 1600 }
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
							min={ 12 }
							max={ 60 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || sectionSubtitle ) && (
						<div
							className={ `section-header ${
								useFadeUp ? 'fade-up' : ''
							}` }
							style={ headerStyle }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Available for Tele-Consultation',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										color: sectionTitleColor,
										marginBottom: '15px',
									} }
								/>
							) }
							{ sectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Not all conditions require…',
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

					<div className="specialty-grid" style={ gridStyle }>
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
