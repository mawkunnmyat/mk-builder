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
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		wardName,
		timeSlot,
		iconClass,
		wardNameColor,
		wardNameFontSize,
		wardNameFontWeight,
		timeSlotColor,
		timeSlotFontSize,
		timeSlotBgColor,
		iconColor,
		rowPaddingVertical,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-visiting-hours-item-editor hours-row',
			style: {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: `${ rowPaddingVertical }px 0`,
				borderBottom: '1px dashed #eee',
				gap: '16px',
				flexWrap: 'wrap',
			},
		} ),
		[ rowPaddingVertical ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Ward / Area', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Ward Name', 'mk-builder' ) }
							value={ wardName }
							onChange={ ( val ) =>
								setAttributes( { wardName: val } )
							}
							help={ __(
								'e.g. General Ward, ICU / CCU',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Icon Class', 'mk-builder' ) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
							help={ __(
								'Font Awesome class, e.g. fas fa-procedures, fas fa-heartbeat',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Ward Name Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: wardNameColor,
									onChange: ( val ) =>
										setAttributes( { wardNameColor: val } ),
									label: __( 'Text Color', 'mk-builder' ),
								},
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ wardNameFontSize }
							onChange={ ( val ) =>
								setAttributes( { wardNameFontSize: val } )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ wardNameFontWeight }
							onChange={ ( val ) =>
								setAttributes( { wardNameFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Time Slot', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Time Slot Text', 'mk-builder' ) }
							value={ timeSlot }
							onChange={ ( val ) =>
								setAttributes( { timeSlot: val } )
							}
							help={ __(
								'e.g. 10:00 AM – 8:00 PM or 24 Hours Allowed',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Time Slot Styling', 'mk-builder' ) }
							colorSettings={ [
								{
									value: timeSlotColor,
									onChange: ( val ) =>
										setAttributes( { timeSlotColor: val } ),
									label: __( 'Text Color', 'mk-builder' ),
								},
								{
									value: timeSlotBgColor,
									onChange: ( val ) =>
										setAttributes( {
											timeSlotBgColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'mk-builder' ) }
							value={ timeSlotFontSize }
							onChange={ ( val ) =>
								setAttributes( { timeSlotFontSize: val } )
							}
							min={ 0.75 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Row Spacing', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Padding Vertical (px)',
								'mk-builder'
							) }
							value={ rowPaddingVertical }
							onChange={ ( val ) =>
								setAttributes( { rowPaddingVertical: val } )
							}
							min={ 8 }
							max={ 30 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<span
					className="ward-name"
					style={ {
						fontWeight: wardNameFontWeight,
						fontSize: `${ wardNameFontSize }rem`,
						color: wardNameColor,
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						flex: 1,
						minWidth: 0,
					} }
				>
					{ iconClass && (
						<i
							className={ iconClass }
							style={ { color: iconColor, flexShrink: 0 } }
							aria-hidden="true"
						/>
					) }
					<RichText
						tagName="span"
						value={ wardName }
						onChange={ ( val ) =>
							setAttributes( { wardName: val } )
						}
						placeholder={ __( 'Ward name...', 'mk-builder' ) }
						style={ { border: 'none', background: 'none' } }
					/>
				</span>
				<span
					className="time-slot"
					style={ {
						fontWeight: 500,
						color: timeSlotColor,
						background: timeSlotBgColor,
						padding: '5px 15px',
						borderRadius: '20px',
						fontSize: `${ timeSlotFontSize }rem`,
						flexShrink: 0,
					} }
				>
					<RichText
						tagName="span"
						value={ timeSlot }
						onChange={ ( val ) =>
							setAttributes( { timeSlot: val } )
						}
						placeholder={ __( 'Time slot...', 'mk-builder' ) }
						style={ { border: 'none', background: 'none' } }
					/>
				</span>
			</div>
		</>
	);
}
