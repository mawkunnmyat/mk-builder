import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { label, url, hasDropdown } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-brand-header__nav-link mk-brand-nav-item',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Nav Item', 'mk-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Link URL', 'mk-builder' ) }>
							<URLInput
								value={ url }
								onChange={ ( val ) => setAttributes( { url: val } ) }
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Show Dropdown Chevron', 'mk-builder' ) }
							checked={ hasDropdown }
							onChange={ ( val ) =>
								setAttributes( { hasDropdown: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<a
				{ ...blockProps }
				href={ url || '#' }
				onClick={ ( e ) => e.preventDefault() }
			>
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( val ) => setAttributes( { label: val } ) }
					placeholder={ __( 'Menu Item', 'mk-builder' ) }
					allowedFormats={ [] }
				/>
				{ hasDropdown && (
					<span className="icon-chevron" aria-hidden="true" />
				) }
			</a>
		</>
	);
}
