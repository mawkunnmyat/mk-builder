import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		buttonText,
		buttonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
		responsiveOrder = 'default',
		hideOnMobile = false,
		mobileAlign = '',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];
	const responsiveClasses = [
		responsiveOrder === 'first' ? 'is-order-first-mobile' : '',
		responsiveOrder === 'last' ? 'is-order-last-mobile' : '',
		hideOnMobile ? 'is-hidden-mobile' : '',
		mobileAlign === 'left' ? 'is-mobile-align-left' : '',
		mobileAlign === 'center' ? 'is-mobile-align-center' : '',
		mobileAlign === 'right' ? 'is-mobile-align-right' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	// Use native useBlockProps directly so Gutenberg spacing supports
	// (margin/padding from block.json) are applied to the wrapper in editor.
	const blockProps = useBlockProps( {
		className: [ 'mk-stats__btn-wrap', responsiveClasses ]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show button icon', 'mk-builder' ) }
							checked={ showButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { showButtonIcon: val } )
							}
						/>

						<SelectControl
							label={ __( 'Button icon type', 'mk-builder' ) }
							value={ buttonIconType }
							options={ [
								{
									label: __(
										'Diagonal arrow',
										'mk-builder'
									),
									value: 'diagonal-arrow',
								},
								{
									label: __( 'Arrow right', 'mk-builder' ),
									value: 'arrow-right',
								},
								{
									label: __(
										'External link',
										'mk-builder'
									),
									value: 'external',
								},
								{
									label: __( 'Plus', 'mk-builder' ),
									value: 'plus',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { buttonIconType: val } )
							}
							disabled={ ! showButtonIcon }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Responsive Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Mobile Order', 'mk-builder' ) }
							value={ responsiveOrder }
							options={ [
								{
									label: __( 'Default', 'mk-builder' ),
									value: 'default',
								},
								{
									label: __( 'Move to Top', 'mk-builder' ),
									value: 'first',
								},
								{
									label: __( 'Move to Bottom', 'mk-builder' ),
									value: 'last',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { responsiveOrder: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Hide on Mobile', 'mk-builder' ) }
							checked={ hideOnMobile }
							onChange={ ( val ) =>
								setAttributes( { hideOnMobile: val } )
							}
						/>
						<SelectControl
							label={ __( 'Mobile Alignment', 'mk-builder' ) }
							value={ mobileAlign }
							options={ [
								{
									label: __( 'Default', 'mk-builder' ),
									value: '',
								},
								{
									label: __( 'Left', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center',
								},
								{
									label: __( 'Right', 'mk-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { mobileAlign: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<span className="mk-stats__btn mk-stats__btn--editor">
					<RichText
						tagName="span"
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
						placeholder={ __( 'Get In Touch', 'mk-builder' ) }
					/>

					{ showButtonIcon && (
						<span
							className="mk-stats__btn-icon"
							aria-hidden="true"
						>
							{ actionIcon }
						</span>
					) }
				</span>
			</div>
		</>
	);
}
