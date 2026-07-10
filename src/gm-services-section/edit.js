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
	SelectControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/gm-service-item' ];
const TEMPLATE = [
	[
		'mk/gm-service-item',
		{ icon: 'fas fa-thermometer-half', title: 'Acute Illnesses' },
	],

	[
		'mk/gm-service-item',
		{ icon: 'fas fa-heartbeat', title: 'Chronic Management' },
	],

	[
		'mk/gm-service-item',
		{ icon: 'fas fa-user-shield', title: 'Preventative Care' },
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
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		gridGap,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-gm-services-section mk-gm-services-section-editor jivaka-gm-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
	};

	const gridStyle = {
		gap: `${ gridGap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Content', 'mk-builder' ) }
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
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Our General Medicine Services',
										'mk-builder'
									) }
								/>

								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Section description...',
										'mk-builder'
									) }
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
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Typography & Colors', 'mk-builder' ) }
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
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>

						<PanelColorSettings
							title={ __( 'Subtitle Color', 'mk-builder' ) }
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
							min={ 0.9 }
							max={ 2 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
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
							max={ 80 }
							step={ 4 }
						/>

						<RangeControl
							label={ __( 'Grid Gap (px)', 'mk-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 10 }
							max={ 60 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
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
								'Padding Bottom (px)',
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
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
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
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-gm-container" style={ containerStyle }>
					{ ( showSectionTitle || sectionSubtitle ) && (
						<div
							className="jivaka-gm-header-center"
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
										'Our General Medicine Services',
										'mk-builder'
									) }
									style={ {
										color: sectionTitleColor,
										fontSize: `${ sectionTitleFontSize }rem`,
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
										'Section description...',
										'mk-builder'
									) }
									style={ {
										color: sectionSubtitleColor,
										fontSize: `${ sectionSubtitleFontSize }rem`,
									} }
								/>
							) }
						</div>
					) }

					<div
						className="jivaka-gm-services-grid"
						style={ gridStyle }
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
