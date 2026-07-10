import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'Certificate', 'mk-builder' ),
		value: 'fas fa-certificate',
	},
	{ label: __( 'Globe', 'mk-builder' ), value: 'fas fa-globe' },
	{ label: __( 'Shield Alt', 'mk-builder' ), value: 'fas fa-shield-alt' },
	{ label: __( 'Award', 'mk-builder' ), value: 'fas fa-award' },
	{ label: __( 'Medal', 'mk-builder' ), value: 'fas fa-medal' },
	{ label: __( 'Star', 'mk-builder' ), value: 'fas fa-star' },
	{
		label: __( 'Check Circle', 'mk-builder' ),
		value: 'fas fa-check-circle',
	},
	{ label: __( 'Hospital', 'mk-builder' ), value: 'fas fa-hospital' },
	{ label: __( 'Heartbeat', 'mk-builder' ), value: 'fas fa-heartbeat' },
	{ label: __( 'Ribbon', 'mk-builder' ), value: 'fas fa-ribbon' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		iconClass,
		certTitle,
		certBadge,
		certDescription,
		iconColor,
		iconSize,
		iconBgColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		badgeBgColor,
		badgeTextColor,
		badgeFontSize,
		badgeFontWeight,
		badgeBorderRadius,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		cardPadding,
		cardPaddingHorizontal,
		cardBorderRadius,
		cardBorderColor,
		cardBorderWidth,
		cardBgColor,
		showTopBarOnHover,
		topBarColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-accreditation-cert-card-editor cert-card stagger-up',
			style: {
				padding: `${ cardPadding }px ${ cardPaddingHorizontal }px`,
				borderRadius: `${ cardBorderRadius }px`,
				border: `2px dashed #e0e0e0`,
				background: '#fafafa',
				textAlign: 'center',
			},
		} ),
		[ cardBorderRadius, cardPadding, cardPaddingHorizontal ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon', 'mk-builder' ) }
							value={ iconClass }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
						/>

						<TextControl
							label={ __(
								'Certification Title',
								'mk-builder'
							) }
							value={ certTitle }
							onChange={ ( val ) =>
								setAttributes( { certTitle: val } )
							}
							help={ __(
								'e.g., ISO 9001:2015, JCI Accreditation',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Badge Text', 'mk-builder' ) }
							value={ certBadge }
							onChange={ ( val ) =>
								setAttributes( { certBadge: val } )
							}
							help={ __(
								'e.g., Certified Since 2018, Gold Seal of Approval',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Description', 'mk-builder' ) }
							value={ certDescription }
							onChange={ ( val ) =>
								setAttributes( { certDescription: val } )
							}
							help={ __(
								'Short description of the certification',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Icon Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Icon Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon Background',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'mk-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'mk-builder' ) }
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
						title={ __( 'Badge Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Badge Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: badgeBgColor,
									onChange: ( val ) =>
										setAttributes( { badgeBgColor: val } ),
									label: __(
										'Badge Background',
										'mk-builder'
									),
								},
								{
									value: badgeTextColor,
									onChange: ( val ) =>
										setAttributes( {
											badgeTextColor: val,
										} ),
									label: __( 'Badge Text', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Badge Font Size (rem)',
								'mk-builder'
							) }
							value={ badgeFontSize }
							onChange={ ( val ) =>
								setAttributes( { badgeFontSize: val } )
							}
							min={ 0.6 }
							max={ 1.2 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Badge Font Weight', 'mk-builder' ) }
							value={ badgeFontWeight }
							onChange={ ( val ) =>
								setAttributes( { badgeFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Badge Border Radius (px)',
								'mk-builder'
							) }
							value={ badgeBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { badgeBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
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
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.3 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'mk-builder' ) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1.2 }
							max={ 2 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Card Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: cardBgColor,
									onChange: ( val ) =>
										setAttributes( { cardBgColor: val } ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: cardBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBorderColor: val,
										} ),
									label: __( 'Border', 'mk-builder' ),
								},
								{
									value: topBarColor,
									onChange: ( val ) =>
										setAttributes( { topBarColor: val } ),
									label: __(
										'Hover Top Bar',
										'mk-builder'
									),
								},
							] }
						/>

						<ToggleControl
							label={ __(
								'Show Top Bar on Hover',
								'mk-builder'
							) }
							checked={ showTopBarOnHover }
							onChange={ ( val ) =>
								setAttributes( { showTopBarOnHover: val } )
							}
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
							max={ 24 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Card Border Width (px)',
								'mk-builder'
							) }
							value={ cardBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { cardBorderWidth: val } )
							}
							min={ 0 }
							max={ 5 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Padding Vertical (px)',
								'mk-builder'
							) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Horizontal (px)',
								'mk-builder'
							) }
							value={ cardPaddingHorizontal }
							onChange={ ( val ) =>
								setAttributes( { cardPaddingHorizontal: val } )
							}
							min={ 15 }
							max={ 50 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="cert-icon"
					style={ {
						width: '80px',
						height: '80px',
						margin: '0 auto 25px',
						background: iconBgColor,
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: `${ iconSize }rem`,
						color: iconColor,
					} }
				>
					<i className={ iconClass } aria-hidden="true" />
				</div>
				<RichText
					tagName="h3"
					value={ certTitle }
					onChange={ ( val ) => setAttributes( { certTitle: val } ) }
					placeholder={ __(
						'Certification title...',
						'mk-builder'
					) }
					style={ {
						margin: '0 0 10px',
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
					} }
				/>

				<RichText
					tagName="span"
					value={ certBadge }
					onChange={ ( val ) => setAttributes( { certBadge: val } ) }
					placeholder={ __( 'Badge text...', 'mk-builder' ) }
					style={ {
						display: 'inline-block',
						background: badgeBgColor,
						color: badgeTextColor,
						padding: '4px 12px',
						borderRadius: `${ badgeBorderRadius }px`,
						fontSize: `${ badgeFontSize }rem`,
						fontWeight: badgeFontWeight,
						marginBottom: '15px',
					} }
				/>

				<RichText
					tagName="p"
					value={ certDescription }
					onChange={ ( val ) =>
						setAttributes( { certDescription: val } )
					}
					placeholder={ __( 'Description...', 'mk-builder' ) }
					style={ {
						margin: 0,
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						lineHeight: descriptionLineHeight,
					} }
				/>
			</div>
		</>
	);
}
