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

const ALLOWED_BLOCKS = [ 'mk/lab-tech-item' ];
const TEMPLATE = [
	[ 'mk/lab-tech-item', {} ],
	[ 'mk/lab-tech-item', {} ],
];

const DEFAULT_COLORS = {
	primaryColor: '#f48b2a',
	itemTagBgColor: '#f0f4f8',
	itemTagColor: '#f48b2a',
	itemTitleColor: '#000000',
	itemDescriptionColor: '#666666',
	itemBulletColor: '#444444',
	itemBulletIconColor: '#f48b2a',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_COLORS, ...attributes };
	const {
		backgroundColor,
		primaryColor,
		itemTagBgColor,
		itemTagColor,
		itemTitleColor,
		itemDescriptionColor,
		itemBulletColor,
		itemBulletIconColor,
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
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'lab-section mk-lab-tech-section-editor lab-tech-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--lab-primary': primaryColor,
				'--lab-item-tag-bg': itemTagBgColor,
				'--lab-item-tag-color': itemTagColor,
				'--lab-item-title': itemTitleColor,
				'--lab-item-description': itemDescriptionColor,
				'--lab-item-bullet': itemBulletColor,
				'--lab-item-bullet-icon': itemBulletIconColor,
			},
			'data-animation': animationOnScroll,
			'data-animation-type': animationType,
			'data-animation-delay': animationDelay,
		} ),
		[
			animationDelay,
			animationOnScroll,
			animationType,
			backgroundColor,
			itemBulletColor,
			itemBulletIconColor,
			itemDescriptionColor,
			itemTagBgColor,
			itemTagColor,
			itemTitleColor,
			paddingBottom,
			paddingTop,
			primaryColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Layout', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
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
								'Padding Bottom (px)',
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

						<Divider />

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
							step={ 20 }
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
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Section', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val ?? undefined,
										} ),
									label: __(
										'Section background',
										'mk-builder'
									),
								},
								{
									value: sectionTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionTitleColor: val ?? undefined,
										} ),
									label: __(
										'Section title (H2)',
										'mk-builder'
									),
								},
								{
									value: sectionSubtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionSubtitleColor:
												val ?? undefined,
										} ),
									label: __(
										'Section subtitle',
										'mk-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Technology items', 'mk-builder' ) }
							colorSettings={ [
								{
									value: primaryColor,
									onChange: ( val ) =>
										setAttributes( {
											primaryColor: val ?? undefined,
										} ),
									label: __(
										'Primary / accent',
										'mk-builder'
									),
								},
								{
									value: itemTagBgColor,
									onChange: ( val ) =>
										setAttributes( {
											itemTagBgColor: val ?? undefined,
										} ),
									label: __(
										'Tag background',
										'mk-builder'
									),
								},
								{
									value: itemTagColor,
									onChange: ( val ) =>
										setAttributes( {
											itemTagColor: val ?? undefined,
										} ),
									label: __( 'Tag text', 'mk-builder' ),
								},
								{
									value: itemTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											itemTitleColor: val ?? undefined,
										} ),
									label: __(
										'Item title (H3)',
										'mk-builder'
									),
								},
								{
									value: itemDescriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											itemDescriptionColor:
												val ?? undefined,
										} ),
									label: __(
										'Item description',
										'mk-builder'
									),
								},
								{
									value: itemBulletColor,
									onChange: ( val ) =>
										setAttributes( {
											itemBulletColor: val ?? undefined,
										} ),
									label: __( 'Bullet text', 'mk-builder' ),
								},
								{
									value: itemBulletIconColor,
									onChange: ( val ) =>
										setAttributes( {
											itemBulletIconColor:
												val ?? undefined,
										} ),
									label: __( 'Bullet icon', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Header', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Title', 'mk-builder' ) }
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
										'Section title…',
										'mk-builder'
									) }
									style={ { marginBottom: '8px' } }
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
									max={ 3.5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
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
									label={ __( 'Alignment', 'mk-builder' ) }
									value={ sectionTitleAlignment }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
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
									max={ 1.5 }
									step={ 0.05 }
								/>
							</>
						) }
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
								<SelectControl
									label={ __(
										'Animation Type',
										'mk-builder'
									) }
									value={ animationType }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
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
									] }
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
			) }

			<section { ...blockProps }>
				<div className="lab-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="lab-header fade-up"
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: '40px',
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
										'Section title…',
										'mk-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										margin: 0,
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
										marginTop: '10px',
										marginBottom: 0,
									} }
								/>
							) }
						</div>
					) }

					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</section>
		</>
	);
}
