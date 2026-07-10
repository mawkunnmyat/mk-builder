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
	ToggleControl,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		dateDay,
		dateMonth,
		title,
		location,
		time,
		buttonText,
		buttonUrl,
		buttonOpensInNewTab,
		dateBgColor,
		dateTextColor,
		titleColor,
		infoColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-event-item-editor event-card stagger-event',
			style: {
				display: 'flex',
				flexDirection: 'row',
				minHeight: '120px',
				width: '100%',
				background: '#fff',
				border: '2px dashed #e0e0e0',
				borderRadius: '12px',
				overflow: 'hidden',
				marginBottom: '20px',
				boxSizing: 'border-box',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Event Date', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Day', 'mk-builder' ) }
							value={ dateDay }
							onChange={ ( val ) =>
								setAttributes( { dateDay: val || '15' } )
							}
							help={ __( 'e.g., 15', 'mk-builder' ) }
						/>

						<TextControl
							label={ __( 'Month', 'mk-builder' ) }
							value={ dateMonth }
							onChange={ ( val ) =>
								setAttributes( { dateMonth: val || 'Nov' } )
							}
							help={ __( 'e.g., Nov', 'mk-builder' ) }
						/>

						<PanelColorSettings
							title={ __( 'Date Block Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: dateBgColor,
									onChange: ( val ) =>
										setAttributes( { dateBgColor: val } ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value: dateTextColor,
									onChange: ( val ) =>
										setAttributes( { dateTextColor: val } ),
									label: __( 'Text', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Event Info', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Location', 'mk-builder' ) }
							value={ location }
							onChange={ ( val ) =>
								setAttributes( { location: val } )
							}
							help={ __(
								'e.g., Kyaukse Township',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Time', 'mk-builder' ) }
							value={ time }
							onChange={ ( val ) =>
								setAttributes( { time: val } )
							}
							help={ __(
								'e.g., 8:00 AM – 4:00 PM',
								'mk-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Text Colors', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'mk-builder' ),
								},
								{
									value: infoColor,
									onChange: ( val ) =>
										setAttributes( { infoColor: val } ),
									label: __(
										'Location/Time Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button Text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( val ) =>
								setAttributes( { buttonText: val } )
							}
							help={ __(
								'e.g., Volunteer, Register',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl || '' }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val || '#' } )
							}
							placeholder="#"
							help={ __(
								'e.g. https://example.com/register or #',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Open in New Tab', 'mk-builder' ) }
							checked={ buttonOpensInNewTab }
							onChange={ ( val ) =>
								setAttributes( { buttonOpensInNewTab: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="event-date"
					style={ {
						background: dateBgColor,
						color: dateTextColor,
						width: '100px',
						minWidth: '100px',
						flexShrink: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '20px',
						textAlign: 'center',
					} }
				>
					<span
						className="date-day"
						style={ {
							display: 'block',
							fontSize: '1.8rem',
							fontWeight: 900,
							lineHeight: 1,
						} }
					>
						{ dateDay }
					</span>
					<span
						className="date-month"
						style={ {
							display: 'block',
							fontSize: '0.9rem',
							textTransform: 'uppercase',
							fontWeight: 500,
						} }
					>
						{ dateMonth }
					</span>
				</div>
				<div
					className="event-details"
					style={ {
						flexGrow: 1,
						padding: '25px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'wrap',
						gap: '20px',
						minWidth: 0,
					} }
				>
					<div className="event-info">
						<RichText
							tagName="h4"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								'Event title...',
								'mk-builder'
							) }
							style={ {
								margin: '0 0 5px 0',
								fontSize: '1.2rem',
								color: titleColor,
							} }
						/>

						<p
							style={ {
								margin: 0,
								color: infoColor,
								fontSize: '0.95rem',
							} }
						>
							<i
								className="fas fa-map-marker-alt"
								aria-hidden="true"
								style={ { marginRight: '6px' } }
							/>
							{ location } &nbsp;|&nbsp;{ ' ' }
							<i
								className="fas fa-clock"
								aria-hidden="true"
								style={ { marginRight: '6px' } }
							/>
							{ time }
						</p>
					</div>
					<a
						href={ buttonUrl || '#' }
						className="jivaka-btn btn-primary"
						style={ { fontSize: '0.75rem', padding: '10px 20px' } }
						onClick={ ( e ) => e.preventDefault() }
					>
						{ buttonText || __( 'Register', 'mk-builder' ) }
					</a>
				</div>
			</div>
		</>
	);
}
