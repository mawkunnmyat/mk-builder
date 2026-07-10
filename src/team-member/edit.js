import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelColorSettings, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { name, role, accentColor } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-team-member',
			style: {
				'--mk-team-member-accent': accentColor || undefined,
			},
		} ),
		[ accentColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Team member', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Name', 'mk-builder' ) }
							value={ name || '' }
							onChange={ ( val ) => setAttributes( { name: val } ) }
						/>

						<TextControl
							label={ __( 'Role', 'mk-builder' ) }
							value={ role || '' }
							onChange={ ( val ) => setAttributes( { role: val } ) }
						/>

						<PanelColorSettings
							title={ __( 'Accent color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: accentColor,
									onChange: ( val ) =>
										setAttributes( { accentColor: val } ),
									label: __( 'Accent', 'mk-builder' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="p"
					className="mk-team-member__name"
					value={ name }
					onChange={ ( val ) => setAttributes( { name: val } ) }
					placeholder={ __( 'Name', 'mk-builder' ) }
					allowedFormats={ [] }
				/>
				<RichText
					tagName="span"
					className="mk-team-member__role"
					value={ role }
					onChange={ ( val ) => setAttributes( { role: val } ) }
					placeholder={ __( 'Role', 'mk-builder' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}

