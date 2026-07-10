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
	SelectControl,
	TextControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/before-you-come-item' ];
const TEMPLATE = [
	[
		'mk/before-you-come-item',
		{
			icon: 'fas fa-clock',
			title: 'Fasting',
			description:
				'Please fast for at least 8-10 hours before the checkup. Water is allowed.',
		},
	],

	[
		'mk/before-you-come-item',
		{
			icon: 'fas fa-file-medical',
			title: 'Reports',
			description:
				'Bring any previous medical records and current medication list.',
		},
	],

	[
		'mk/before-you-come-item',
		{
			icon: 'fas fa-calendar-check',
			title: 'Appointment',
			description: 'Booking is recommended to avoid long waiting times.',
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
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionDescription,
		sectionDescription,
		sectionDescriptionColor,
		sectionDescriptionFontSize,
		sectionDescriptionAlignment,
		sectionDescriptionMarginTop,
		sectionDescriptionMarginBottom,
		minColumnWidth,
		gap,
		cardBackgroundColor,
		cardPadding,
		cardBorderRadius,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-before-you-come-section-editor',
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
		zIndex: 2,
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
						title={ __( 'Section Spacing', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Space above (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
							help={ __(
								'Space above the section (gap from the block above).',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Space below (px)', 'mk-builder' ) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
							help={ __(
								'Space below the section.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Title', 'mk-builder' ) }
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
									label={ __(
										'Title Text',
										'mk-builder'
									) }
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
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
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
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
						<ToggleControl
							label={ __(
								'Show Section Description',
								'mk-builder'
							) }
							checked={ showSectionDescription }
							onChange={ ( val ) =>
								setAttributes( { showSectionDescription: val } )
							}
							help={ __(
								'Optional text under the main title.',
								'mk-builder'
							) }
						/>

						{ showSectionDescription && (
							<>
								<PanelColorSettings
									title={ __(
										'Description Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionDescriptionColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionDescriptionColor:
														val,
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
									value={ sectionDescriptionFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionDescriptionFontSize: val,
										} )
									}
									min={ 0.75 }
									max={ 2 }
									step={ 0.1 }
								/>

								<SelectControl
									label={ __(
										'Description Alignment',
										'mk-builder'
									) }
									value={ sectionDescriptionAlignment }
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
											sectionDescriptionAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Gap above description (px)',
										'mk-builder'
									) }
									value={ sectionDescriptionMarginTop }
									onChange={ ( val ) =>
										setAttributes( {
											sectionDescriptionMarginTop: val,
										} )
									}
									min={ 0 }
									max={ 80 }
									step={ 5 }
									help={ __(
										'Space between title and description.',
										'mk-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Gap below description (px)',
										'mk-builder'
									) }
									value={ sectionDescriptionMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionDescriptionMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 80 }
									step={ 5 }
									help={ __(
										'Space below description (before cards).',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Section Background',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'mk-builder' ) }
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
					</PanelBody>

					<PanelBody
						title={ __( 'Grid & Cards', 'mk-builder' ) }
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
							min={ 200 }
							max={ 500 }
							step={ 10 }
							help={ __(
								'Grid uses auto-fit with this min width. Smaller = more columns.',
								'mk-builder'
							) }
						/>

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

						<PanelColorSettings
							title={ __( 'Card Background', 'mk-builder' ) }
							colorSettings={ [
								{
									value: cardBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBackgroundColor: val,
										} ),
									label: __(
										'Card Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Card Padding (px)', 'mk-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 10 }
							max={ 60 }
							step={ 5 }
						/>

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
							max={ 30 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					{ showSectionTitle && (
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
								textAlign: sectionTitleAlignment,
								marginBottom: `${ sectionTitleMarginBottom }px`,
								fontSize: `${ sectionTitleFontSize }rem`,
								fontWeight: sectionTitleFontWeight,
								color: sectionTitleColor,
								marginTop: 0,
							} }
						/>
					) }
					{ showSectionDescription && (
						<RichText
							tagName="p"
							value={ sectionDescription }
							onChange={ ( val ) =>
								setAttributes( { sectionDescription: val } )
							}
							placeholder={ __(
								'Add a short description under the title...',
								'mk-builder'
							) }
							className="before-you-come-description-editor"
							style={ {
								textAlign: sectionDescriptionAlignment,
								marginTop: `${ sectionDescriptionMarginTop }px`,
								marginBottom: `${ sectionDescriptionMarginBottom }px`,
								fontSize: `${ sectionDescriptionFontSize }rem`,
								color: sectionDescriptionColor,
								lineHeight: 1.6,
							} }
						/>
					) }
					<div
						className="mk-before-you-come-grid"
						style={ gridStyle }
						data-min-column-width={ minColumnWidth }
						data-gap={ gap }
						data-card-bg={ cardBackgroundColor }
						data-card-padding={ cardPadding }
						data-card-radius={ cardBorderRadius }
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
