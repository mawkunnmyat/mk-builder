import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{ label: __( 'Shield', 'mk-builder' ), value: 'fas fa-shield-alt' },
	{ label: __( 'Umbrella', 'mk-builder' ), value: 'fas fa-umbrella' },
	{ label: __( 'Leaf', 'mk-builder' ), value: 'fas fa-leaf' },
	{ label: __( 'Building', 'mk-builder' ), value: 'fas fa-building' },
	{ label: __( 'Landmark', 'mk-builder' ), value: 'fas fa-landmark' },
	{
		label: __( 'Hand Holding Heart', 'mk-builder' ),
		value: 'fas fa-hand-holding-heart',
	},
	{ label: __( 'Globe Asia', 'mk-builder' ), value: 'fas fa-globe-asia' },
	{
		label: __( 'File Medical', 'mk-builder' ),
		value: 'fas fa-file-medical',
	},
	{ label: __( 'Heart', 'mk-builder' ), value: 'fas fa-heart' },
	{ label: __( 'Handshake', 'mk-builder' ), value: 'fas fa-handshake' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		partnerName,
		iconClass,
		partnerNameColor,
		partnerNameFontSize,
		partnerNameFontWeight,
		partnerNameTextTransform,
		iconColor,
		iconSize,
		cardBgColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPadding,
		cardMinHeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-insurance-partner-item-editor insurance-card',
			style: {
				borderRadius: `${ cardBorderRadius }px`,
				minHeight: `${ cardMinHeight }px`,
				padding: `${ cardPadding }px`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
			},
		} ),
		[ cardBorderRadius, cardMinHeight, cardPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Partner Name', 'mk-builder' ) }
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

						<Divider />
						<PanelColorSettings
							title={ __( 'Text Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: partnerNameColor,
									onChange: ( val ) =>
										setAttributes( {
											partnerNameColor: val,
										} ),
									label: __(
										'Partner Name',
										'mk-builder'
									),
								},
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Name Font Size (rem)',
								'mk-builder'
							) }
							value={ partnerNameFontSize }
							onChange={ ( val ) =>
								setAttributes( { partnerNameFontSize: val } )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ partnerNameFontWeight }
							onChange={ ( val ) =>
								setAttributes( { partnerNameFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<SelectControl
							label={ __( 'Text Transform', 'mk-builder' ) }
							value={ partnerNameTextTransform }
							options={ [
								{
									label: __( 'None', 'mk-builder' ),
									value: 'none',
								},
								{
									label: __( 'Uppercase', 'mk-builder' ),
									value: 'uppercase',
								},
								{
									label: __( 'Capitalize', 'mk-builder' ),
									value: 'capitalize',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									partnerNameTextTransform: val,
								} )
							}
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
							] }
						/>

						<RangeControl
							label={ __( 'Border Width (px)', 'mk-builder' ) }
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
								'Border Radius (px)',
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
							label={ __( 'Padding (px)', 'mk-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 10 }
							max={ 40 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Min Height (px)', 'mk-builder' ) }
							value={ cardMinHeight }
							onChange={ ( val ) =>
								setAttributes( { cardMinHeight: val } )
							}
							min={ 100 }
							max={ 220 }
							step={ 10 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="partner-logo"
					style={ {
						fontSize: `${ partnerNameFontSize }rem`,
						fontWeight: partnerNameFontWeight,
						color: partnerNameColor,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '10px',
						textTransform: partnerNameTextTransform,
						textAlign: 'center',
					} }
				>
					<i
						className={ iconClass }
						style={ {
							fontSize: `${ iconSize }rem`,
							color: iconColor,
							transition: '0.3s',
						} }
						aria-hidden="true"
					/>

					<RichText
						tagName="span"
						value={ partnerName }
						onChange={ ( val ) =>
							setAttributes( { partnerName: val } )
						}
						placeholder={ __( 'Partner name...', 'mk-builder' ) }
						withoutInteractiveFormatting
					/>
				</div>
			</div>
		</>
	);
}
