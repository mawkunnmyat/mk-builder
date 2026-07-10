import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	useInnerBlocksProps,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'mk/features-grid',
	'mk/images-grid',
];

const TEMPLATE = [
	[ 'mk/features-grid', {} ],
	[ 'mk/images-grid', {} ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const titleId = useInstanceId( Edit, 'mk-about-title' );

	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		labelText,
		labelIcon,
		sectionTitle,
		labelColor,
		labelIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-about mk-about-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--mk-about-max-width': `${ containerMaxWidth }px`,
				'--mk-about-gutter': `${ containerGutter }px`,
			},
		} ),
		[
			backgroundColor,
			containerGutter,
			containerMaxWidth,
			paddingBottom,
			paddingTop,
		]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'mk-about-section__inner-blocks',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: 'all',
		}
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Label icon (emoji)',
								'mk-builder'
							) }
							value={ labelIcon }
							onChange={ ( val ) =>
								setAttributes( { labelIcon: val } )
							}
							help={ __(
								'Single emoji or short symbol.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Label text', 'mk-builder' ) }
							value={ labelText }
							onChange={ ( val ) =>
								setAttributes( { labelText: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Label color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: labelColor,
									onChange: ( val ) =>
										setAttributes( { labelColor: val } ),
									label: __(
										'Label text color',
										'mk-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Label icon tint', 'mk-builder' ) }
							colorSettings={ [
								{
									value: labelIconColor,
									onChange: ( val ) =>
										setAttributes( {
											labelIconColor: val,
										} ),
									label: __( 'Icon color', 'mk-builder' ),
								},
							] }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Title color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __(
										'Heading color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Title size (rem)', 'mk-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 4.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Max content width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 960 }
							max={ 1440 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Side gutter (px)', 'mk-builder' ) }
							value={ containerGutter }
							onChange={ ( val ) =>
								setAttributes( { containerGutter: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
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
							max={ 160 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				aria-labelledby={ titleId }
			>
				<div
					className="mk-about__container"
					style={ containerStyle }
				>
					<div className="mk-about__header">
						<div className="mk-about__heading">
							<p
								className="mk-about__label"
								style={ { color: labelColor } }
							>
								<span
									className="mk-about__label-icon"
									style={ { color: labelIconColor } }
									aria-hidden="true"
								>
									{ labelIcon }
								</span>
								<RichText
									tagName="span"
									value={ labelText }
									onChange={ ( val ) =>
										setAttributes( { labelText: val } )
									}
									placeholder={ __(
										'About Us',
										'mk-builder'
									) }
									allowedFormats={ [] }
								/>
							</p>
							<RichText
								tagName="h2"
								id={ titleId }
								className="mk-about__title"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title…',
									'mk-builder'
								) }
								style={ {
									color: titleColor,
									fontSize: `${ titleFontSize }rem`,
									fontWeight: titleFontWeight,
								} }
							/>
						</div>
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
