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

const ALLOWED_BLOCKS = [ 'mk/gm-review-card' ];
const TEMPLATE = [
	[
		'mk/gm-review-card',
		{
			reviewText:
				'"Dr. Thida Win is incredibly patient and thorough. She explained my condition clearly and the treatment plan has worked wonders for my diabetes management."',
			reviewerName: 'U Kyaw Zin',
			reviewerLabel: 'Diabetes Patient',
		},
	],

	[
		'mk/gm-review-card',
		{
			reviewText:
				'"I always come here for my family\'s check-ups. The nursing staff is friendly, and the doctors are top-notch. Highly recommended for general care."',
			reviewerName: 'Daw Aye Aye',
			reviewerLabel: 'Regular Check-up',
		},
	],

	[
		'mk/gm-review-card',
		{
			reviewText:
				'"The Hypertension clinic helped me get my blood pressure under control. The follow-up system is excellent."',
			reviewerName: 'U Myint Soe',
			reviewerLabel: 'Hypertension Patient',
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
				'mk-gm-testimonials-section mk-gm-testimonials-section-editor jivaka-gm-section',
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
										'Patient Stories',
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
										'What our patients say...',
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
							className="jivaka-gm-header-center gm-anim-fade"
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
										'Patient Stories',
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
										'What our patients say...',
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

					<div className="jivaka-gm-testimonials" style={ gridStyle }>
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
