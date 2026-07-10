import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, description, listItems } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'paed-service-card paed-stagger mk-paed-service-card-editor',
		} ),
		[]
	);

	const addListItem = () => {
		setAttributes( {
			listItems: [
				...( listItems || [] ),
				__( 'New item', 'mk-builder' ),
			],
		} );
	};

	const updateListItem = ( index, value ) => {
		const next = [ ...( listItems || [] ) ];
		next[ index ] = value;
		setAttributes( { listItems: next } );
	};

	const removeListItem = ( index ) => {
		const next = ( listItems || [] ).filter( ( _, i ) => i !== index );
		setAttributes( { listItems: next } );
	};

	const items = Array.isArray( listItems ) ? listItems : [];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Service card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon class (Font Awesome)',
								'mk-builder'
							) }
							value={ iconClass || '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-baby-carriage',
								} )
							}
							help={ __(
								'e.g. fas fa-baby-carriage, fas fa-syringe, fas fa-heartbeat',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title || '' }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
						/>

						<TextControl
							label={ __( 'Description', 'mk-builder' ) }
							value={ description || '' }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							help={ __(
								'Short paragraph below the title',
								'mk-builder'
							) }
						/>

						<PanelBody
							title={ __( 'List items', 'mk-builder' ) }
							initialOpen={ true }
						>
							{ items.map( ( item, index ) => (
								<div
									key={ index }
									style={ {
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
										marginBottom: '8px',
									} }
								>
									<TextControl
										value={ item }
										onChange={ ( val ) =>
											updateListItem( index, val )
										}
										placeholder={ __(
											'List item',
											'mk-builder'
										) }
										style={ { flex: 1 } }
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeListItem( index )
										}
										icon="no-alt"
										aria-label={ __(
											'Remove item',
											'mk-builder'
										) }
									/>
								</div>
							) ) }
							<Button isSecondary isSmall onClick={ addListItem }>
								{ __( 'Add item', 'mk-builder' ) }
							</Button>
						</PanelBody>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="paed-svc-icon">
					{ iconClass && (
						<i className={ iconClass } aria-hidden="true" />
					) }
				</div>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Service title…', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description…', 'mk-builder' ) }
				/>

				{ items.length > 0 && (
					<ul className="paed-svc-list">
						{ items.map( ( item, index ) => (
							<li key={ index }>{ item }</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
