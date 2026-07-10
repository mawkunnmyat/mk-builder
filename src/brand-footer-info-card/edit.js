import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { INFO_ICONS } from './icons';

const ICON_OPTIONS = [
	{ label: __( 'Phone', 'mk-builder' ), value: 'phone' },
	{ label: __( 'Location', 'mk-builder' ), value: 'pin' },
	{ label: __( 'Clock', 'mk-builder' ), value: 'clock' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { label, lines, icon } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'footer__info-card mk-brand-footer-info-card-editor',
		} ),
		[]
	);

	const updateLine = ( index, value ) => {
		const next = [ ...( lines || [] ) ];
		next[ index ] = value;
		setAttributes( { lines: next } );
	};

	const addLine = () => {
		setAttributes( { lines: [ ...( lines || [] ), '' ] } );
	};

	const removeLine = ( index ) => {
		setAttributes( {
			lines: ( lines || [] ).filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Info Card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon', 'mk-builder' ) }
							value={ icon || 'phone' }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
						/>
						{ ( lines || [] ).map( ( line, index ) => (
							<div key={ index } style={ { marginBottom: 8 } }>
								<TextControl
									label={ `${ __(
										'Line',
										'mk-builder'
									) } ${ index + 1 }` }
									value={ line }
									onChange={ ( val ) =>
										updateLine( index, val )
									}
								/>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeLine( index ) }
								>
									{ __( 'Remove line', 'mk-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addLine }>
							{ __( 'Add line', 'mk-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="footer__info-text">
					<RichText
						tagName="p"
						className="footer__info-label"
						value={ label }
						onChange={ ( val ) =>
							setAttributes( { label: val } )
						}
						placeholder={ __( 'Label…', 'mk-builder' ) }
					/>
					<div className="footer__info-lines">
						{ ( lines || [] ).map( ( line, index ) => (
							<span key={ index }>{ line }</span>
						) ) }
					</div>
				</div>
				<span className="footer__info-icon" aria-hidden="true">
					{ INFO_ICONS[ icon ] || INFO_ICONS.phone }
				</span>
			</div>
		</>
	);
}
