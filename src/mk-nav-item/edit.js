import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		label,
		url,
		openInNewTab,
		hasDropdown,
		linkColor,
		linkHoverColor,
		fontSize,
		fontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-nav-item',
			style: {
				'--mk-nav-item-color': linkColor || undefined,
				'--mk-nav-item-hover': linkHoverColor || undefined,
				'--mk-nav-item-size': `${ fontSize }px`,
				'--mk-nav-item-weight': fontWeight,
			},
		} ),
		[ fontSize, fontWeight, linkColor, linkHoverColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Nav Item Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Link URL', 'mk-builder' ) }>
							<URLInput
								value={ url }
								onChange={ ( val ) => setAttributes( { url: val } ) }
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Open in New Tab', 'mk-builder' ) }
							checked={ openInNewTab }
							onChange={ ( val ) =>
								setAttributes( { openInNewTab: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Dropdown Chevron', 'mk-builder' ) }
							checked={ hasDropdown }
							onChange={ ( val ) => setAttributes( { hasDropdown: val } ) }
						/>
						<RangeControl
							label={ __( 'Font Size (px)', 'mk-builder' ) }
							value={ fontSize }
							onChange={ ( val ) => setAttributes( { fontSize: val } ) }
							min={ 12 }
							max={ 30 }
							step={ 1 }
						/>
						<SelectControl
							label={ __( 'Font Weight', 'mk-builder' ) }
							value={ fontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
							] }
							onChange={ ( val ) => setAttributes( { fontWeight: val } ) }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Link Colors', 'mk-builder' ) }
						colorSettings={ [
							{
								label: __( 'Link Color', 'mk-builder' ),
								value: linkColor,
								onChange: ( val ) => setAttributes( { linkColor: val } ),
							},
							{
								label: __( 'Hover Color', 'mk-builder' ),
								value: linkHoverColor,
								onChange: ( val ) =>
									setAttributes( { linkHoverColor: val } ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<a
					className="mk-nav-item__link"
					href={ url || '#' }
					onClick={ ( e ) => e.preventDefault() }
				>
					<RichText
						tagName="span"
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
						placeholder={ __( 'Menu Item', 'mk-builder' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					{ hasDropdown && (
						<span className="mk-nav-item__chevron" aria-hidden="true">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.25"
								strokeLinecap="round"
								strokeLinejoin="round"
								focusable="false"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</span>
					) }
				</a>
			</div>
		</>
	);
}
