import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/rad-safety-card' ];

const TEMPLATE = [
	[
		'mk/rad-safety-card',
		{
			iconClass: 'fas fa-shield-alt',
			title: 'Dose Management',
			description:
				'Automated dose tracking for every patient to prevent overexposure.',
		},
	],

	[
		'mk/rad-safety-card',
		{
			iconClass: 'fas fa-child',
			title: 'Pediatric Protocols',
			description:
				'Specialized low-dose settings specifically for children.',
		},
	],

	[
		'mk/rad-safety-card',
		{
			iconClass: 'fas fa-pump-medical',
			title: 'Contrast Safety',
			description:
				'Strict kidney function checks before administering contrast media.',
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
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		imageUrl,
		imageId,
		imageAlt,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-rad-safety-section-editor rad-section',
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

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: '0.8fr 1.2fr',
		gap: '50px',
		alignItems: 'center',
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

						<Divider />

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
						title={ __( 'Section Content', 'mk-builder' ) }
						initialOpen={ false }
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
									min={ 1.8 }
									max={ 3 }
									step={ 0.1 }
								/>
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __( 'Show Subtitle', 'mk-builder' ) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
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
									max={ 1.2 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ imageUrl ? (
							<>
								<img
									src={ imageUrl }
									alt={ imageAlt }
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: '10px',
									} }
								/>

								<TextControl
									label={ __( 'Alt Text', 'mk-builder' ) }
									value={ imageAlt }
									onChange={ ( val ) =>
										setAttributes( { imageAlt: val } )
									}
								/>

								<button
									type="button"
									className="components-button is-secondary is-small"
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: undefined,
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove Image', 'mk-builder' ) }
								</button>
							</>
						) : (
							<MediaPlaceholder
								onSelect={ ( media ) => {
									if ( ! media ) return;
									setAttributes( {
										imageUrl: media.url || '',
										imageId: media.id || 0,
										imageAlt:
											media.alt || media.title || '',
									} );
								} }
								onSelectURL={ ( url ) =>
									setAttributes( {
										imageUrl: url || '',
										imageId: 0,
									} )
								}
								accept="image/*"
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Safety Image',
										'mk-builder'
									),
								} }
							/>
						) }
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
								'Horizontal Padding (px)',
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
								<TextControl
									label={ __(
										'Animation Type CSS Class',
										'mk-builder'
									) }
									help={ __(
										'e.g. fade-up, fadeIn, slideInLeft',
										'mk-builder'
									) }
									value={ animationType }
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
									max={ 400 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="rad-container" style={ containerStyle }>
					<div className="rad-safety-grid" style={ gridStyle }>
						<div className="rad-safety-image fade-up">
							{ imageUrl && (
								<img
									src={ imageUrl }
									alt={ imageAlt }
									style={ {
										borderRadius: 'var(--rad-radius)',
										boxShadow: 'var(--rad-shadow)',
										width: '100%',
									} }
								/>
							) }
						</div>

						<div className="rad-safety-content fade-up">
							{ ( showSectionTitle || showSectionSubtitle ) && (
								<>
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
												'Safety First Approach',
												'mk-builder'
											) }
											style={ {
												fontSize: `${ sectionTitleFontSize }rem`,
												marginBottom: '20px',
												color: sectionTitleColor,
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
												'We adhere to ALARA principles to ensure patient safety…',
												'mk-builder'
											) }
											style={ {
												color: sectionSubtitleColor,
												marginBottom: '30px',
												fontSize: `${ sectionSubtitleFontSize }rem`,
											} }
										/>
									) }
								</>
							) }

							<div className="rad-safety-cards">
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									renderAppender={
										InnerBlocks.ButtonBlockAppender
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
