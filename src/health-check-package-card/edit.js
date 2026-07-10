import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	SelectControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		category,
		title,
		price,
		currency,
		listItems,
		buttonText,
		buttonUrl,
		isPopular,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `chk-pkg-card stagger-up mk-chk-pkg-card-editor ${
				isPopular ? 'popular' : ''
			}`,

			'data-category': category || 'basic',
		} ),
		[ category, isPopular ]
	);

	const addItem = () => {
		setAttributes( {
			listItems: [
				...( listItems || [] ),
				__( 'New item', 'mk-builder' ),
			],
		} );
	};

	const updateItem = ( index, value ) => {
		const next = [ ...( listItems || [] ) ];
		next[ index ] = value;
		setAttributes( { listItems: next } );
	};

	const removeItem = ( index ) => {
		setAttributes( {
			listItems: ( listItems || [] ).filter( ( _, i ) => i !== index ),
		} );
	};

	const items = Array.isArray( listItems ) ? listItems : [];
	const categoryOptions = [
		{ label: __( 'General Wellness', 'mk-builder' ), value: 'basic' },
		{ label: __( 'Specialized', 'mk-builder' ), value: 'special' },
		{ label: __( 'Men & Women', 'mk-builder' ), value: 'gender' },
	];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Package card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Tab / Category', 'mk-builder' ) }
							value={ category || 'basic' }
							options={ categoryOptions }
							onChange={ ( v ) =>
								setAttributes( { category: v } )
							}
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title || '' }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>

						<TextControl
							label={ __( 'Price', 'mk-builder' ) }
							value={ price || '' }
							onChange={ ( v ) => setAttributes( { price: v } ) }
							help={ __( 'e.g. 45,000', 'mk-builder' ) }
						/>

						<TextControl
							label={ __( 'Currency', 'mk-builder' ) }
							value={ currency || '' }
							onChange={ ( v ) =>
								setAttributes( { currency: v } )
							}
						/>

						<ToggleControl
							label={ __(
								'Popular / Recommended',
								'mk-builder'
							) }
							checked={ !! isPopular }
							onChange={ ( v ) =>
								setAttributes( { isPopular: v } )
							}
						/>

						<TextControl
							label={ __( 'Button text', 'mk-builder' ) }
							value={ buttonText || '' }
							onChange={ ( v ) =>
								setAttributes( { buttonText: v } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl || '' }
							onChange={ ( v ) =>
								setAttributes( { buttonUrl: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'List items', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ items.map( ( item, index ) => (
							<div
								key={ index }
								style={ {
									display: 'flex',
									gap: 8,
									alignItems: 'center',
									marginBottom: 8,
								} }
							>
								<TextControl
									value={ item }
									onChange={ ( v ) => updateItem( index, v ) }
									style={ { flex: 1 } }
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeItem( index ) }
									icon="no-alt"
									aria-label={ __(
										'Remove',
										'mk-builder'
									) }
								/>
							</div>
						) ) }
						<Button isSecondary isSmall onClick={ addItem }>
							{ __( 'Add item', 'mk-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Package name', 'mk-builder' ) }
				/>

				<div className="chk-price">
					{ price || '0' } <span>{ currency || 'MMK' }</span>
				</div>
				{ items.length > 0 && (
					<ul className="chk-list">
						{ items.map( ( item, index ) => (
							<li key={ index }>
								<i
									className="fas fa-check"
									aria-hidden="true"
								/>

								{ item }
							</li>
						) ) }
					</ul>
				) }
				{ buttonText && (
					<a
						href={ buttonUrl || '#' }
						className={ `chk-btn ${
							isPopular ? '' : 'chk-btn-outline'
						}` }
						style={
							isPopular
								? {}
								: {
										background: 'transparent',
										border: '2px solid var(--chk-primary)',
										color: 'var(--chk-primary)',
								  }
						}
						onClick={ ( e ) => e.preventDefault() }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</>
	);
}
