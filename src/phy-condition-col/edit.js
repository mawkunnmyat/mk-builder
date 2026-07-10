import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, heading, items = [] } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-cond-col mk-phy-condition-col-editor',
		} ),
		[]
	);

	const updateItem = ( index, value ) => {
		const next = [ ...( items || [] ) ];
		next[ index ] = value;
		setAttributes( { items: next } );
	};

	const addItem = () => {
		setAttributes( {
			items: [
				...( items || [] ),
				__( 'New condition…', 'mk-builder' ),
			],
		} );
	};

	const removeItem = ( index ) => {
		const next = [ ...( items || [] ) ];
		next.splice( index, 1 );
		setAttributes( { items: next } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Condition column', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon CSS class (Font Awesome)',
								'mk-builder'
							) }
							value={ iconClass || '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-bone',
								} )
							}
							help={ __(
								'e.g. fas fa-bone, fas fa-running, fas fa-brain',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Heading', 'mk-builder' ) }
							value={ heading || '' }
							onChange={ ( val ) =>
								setAttributes( {
									heading: val || 'Orthopedic',
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Conditions list', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ( items || [] ).map( ( item, index ) => (
							<div
								key={ index }
								style={ {
									display: 'flex',
									gap: 8,
									marginBottom: 8,
								} }
							>
								<TextControl
									value={ item }
									onChange={ ( val ) =>
										updateItem( index, val )
									}
									placeholder={ __(
										'Condition…',
										'mk-builder'
									) }
									style={ { flex: 1 } }
								/>

								<Button
									icon="no-alt"
									label={ __( 'Remove', 'mk-builder' ) }
									isDestructive
									isSmall
									onClick={ () => removeItem( index ) }
								/>
							</div>
						) ) }
						<Button variant="secondary" isSmall onClick={ addItem }>
							{ __( 'Add condition', 'mk-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<h3>
					{ iconClass && (
						<i className={ iconClass } aria-hidden="true" />
					) }{ ' ' }
					<RichText
						tagName="span"
						value={ heading }
						onChange={ ( val ) =>
							setAttributes( { heading: val || 'Orthopedic' } )
						}
						placeholder={ __( 'Heading…', 'mk-builder' ) }
					/>
				</h3>
				<ul className="phy-cond-list">
					{ ( items || [] ).map( ( item, index ) => (
						<li key={ index }>
							<i className="fas fa-check" aria-hidden="true" />
							<span>
								<RichText
									tagName="span"
									value={ item }
									onChange={ ( val ) =>
										updateItem( index, val )
									}
									placeholder={ __(
										'Condition…',
										'mk-builder'
									) }
								/>
							</span>
						</li>
					) ) }
					{ ( ! items || items.length === 0 ) && (
						<li>
							<i className="fas fa-check" aria-hidden="true" />
							<span>
								{ __( 'Example condition', 'mk-builder' ) }
							</span>
						</li>
					) }
				</ul>
			</div>
		</>
	);
}
