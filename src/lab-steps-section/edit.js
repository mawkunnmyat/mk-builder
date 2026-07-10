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
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/lab-step-item' ];
const TEMPLATE = [
	[
		'mk/lab-step-item',
		{
			stepNumber: '1',
			title: 'Book a Test',
			description: 'Call us or book online.',
		},
	],

	[
		'mk/lab-step-item',
		{
			stepNumber: '2',
			title: 'Sample Collection',
			description: 'Quick and painless collection.',
		},
	],

	[
		'mk/lab-step-item',
		{
			stepNumber: '3',
			title: 'Analysis',
			description: 'Processed in ISO lab.',
		},
	],

	[
		'mk/lab-step-item',
		{
			stepNumber: '4',
			title: 'Report',
			description: 'Sent via Email/SMS.',
		},
	],
];

const DEFAULT_ATTRS = {
	backgroundColor: '#fafafa',
	paddingTop: 100,
	paddingBottom: 100,
	containerMaxWidth: 1200,
	containerPadding: 20,
	stepsContainerMaxWidth: 800,
	stepsGap: 40,
	showSectionTitle: true,
	sectionTitle: 'How It Works',
	sectionTitleColor: '#000000',
	sectionTitleFontSize: 2.5,
	sectionTitleFontWeight: 700,
	sectionTitleAlignment: 'center',
	showSectionSubtitle: false,
	sectionSubtitle: '',
	sectionSubtitleColor: '#666666',
	sectionSubtitleFontSize: 1.1,
	animationOnScroll: true,
	animationType: 'stagger-up',
	animationDelay: 100,
	primaryColor: '#f48b2a',
	stepNumTextColor: '#ffffff',
	stepContentBgColor: '#ffffff',
	stepTitleColor: '#000000',
	stepDescColor: '#666666',
	lineColor: '#eeeeee',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		stepsContainerMaxWidth,
		stepsGap,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		animationOnScroll,
		animationType,
		animationDelay,
		primaryColor,
		stepNumTextColor,
		stepContentBgColor,
		stepTitleColor,
		stepDescColor,
		lineColor,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'lab-section mk-lab-steps-section-editor lab-steps-section-editor',
			style: {
				backgroundColor:
					backgroundColor || DEFAULT_ATTRS.backgroundColor,
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
				'--lab-primary': primaryColor,
				'--lab-step-num-text': stepNumTextColor,
				'--lab-step-content-bg': stepContentBgColor,
				'--lab-step-title-color': stepTitleColor,
				'--lab-step-desc-color': stepDescColor,
				'--lab-step-line-color': lineColor,
			},
		} ),
		[
			DEFAULT_ATTRS,
			backgroundColor,
			lineColor,
			paddingBottom,
			paddingTop,
			primaryColor,
			stepContentBgColor,
			stepDescColor,
			stepNumTextColor,
			stepTitleColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const stepsContainerStyle = {
		maxWidth: `${ Number( stepsContainerMaxWidth ) }px`,
		margin: '0 auto',
		position: 'relative',
		gap: `${ Number( stepsGap ) }px`,
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
									label: __(
										'Section background',
										'mk-builder'
									),
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
									value: sectionSubtitleColor,
									onChange: ( v ) =>
										setAttributes( {
											sectionSubtitleColor:
												v ?? undefined,
										} ),
									label: __(
										'Section subtitle',
										'mk-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Steps', 'mk-builder' ) }
							colorSettings={ [
								{
									value: primaryColor,
									onChange: ( v ) =>
										setAttributes( {
											primaryColor: v ?? undefined,
										} ),
									label: __(
										'Step number circle',
										'mk-builder'
									),
								},
								{
									value: stepNumTextColor,
									onChange: ( v ) =>
										setAttributes( {
											stepNumTextColor: v ?? undefined,
										} ),
									label: __(
										'Step number text',
										'mk-builder'
									),
								},
								{
									value: stepContentBgColor,
									onChange: ( v ) =>
										setAttributes( {
											stepContentBgColor: v ?? undefined,
										} ),
									label: __(
										'Step card background',
										'mk-builder'
									),
								},
								{
									value: stepTitleColor,
									onChange: ( v ) =>
										setAttributes( {
											stepTitleColor: v ?? undefined,
										} ),
									label: __( 'Step title', 'mk-builder' ),
								},
								{
									value: stepDescColor,
									onChange: ( v ) =>
										setAttributes( {
											stepDescColor: v ?? undefined,
										} ),
									label: __(
										'Step description',
										'mk-builder'
									),
								},
								{
									value: lineColor,
									onChange: ( v ) =>
										setAttributes( {
											lineColor: v ?? undefined,
										} ),
									label: __(
										'Timeline line',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Section background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<Divider />
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
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
								'Padding bottom (px)',
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
						title={ __( 'Section title', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
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
									min={ 1.25 }
									max={ 4 }
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

								<SelectControl
									label={ __(
										'Title alignment',
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
							label={ __(
								'Show section subtitle',
								'mk-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<RangeControl
									label={ __(
										'Subtitle font size (rem)',
										'mk-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.85 }
									max={ 1.5 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Steps area max width (px)',
								'mk-builder'
							) }
							value={ stepsContainerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { stepsContainerMaxWidth: val } )
							}
							min={ 400 }
							max={ 1000 }
							step={ 10 }
							help={ __(
								'Narrower than container for timeline layout.',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Gap between steps (px)',
								'mk-builder'
							) }
							value={ stepsGap }
							onChange={ ( val ) =>
								setAttributes( { stepsGap: val } )
							}
							min={ 20 }
							max={ 80 }
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
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation type',
										'mk-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Stagger up',
												'mk-builder'
											),
											value: 'stagger-up',
										},
										{
											label: __(
												'Fade up',
												'mk-builder'
											),
											value: 'fade-up',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation delay (ms)',
										'mk-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 400 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="lab-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="lab-header fade-up"
							style={ {
								marginBottom: '60px',
								textAlign: sectionTitleAlignment,
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'How It Works',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? '15px'
											: 0,
										marginTop: 0,
										textAlign: sectionTitleAlignment,
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
										'Section subtitle…',
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
						className="lab-steps-container"
						style={ stepsContainerStyle }
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
