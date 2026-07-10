import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	BaseControl,
	CheckboxControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		source,
		parentCategoryId,
		categoryIds = [],
		numberOfItems,
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-ph-shop-category-section ph-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const productCategories = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'taxonomy', 'product_cat', {
				per_page: -1,
				hide_empty: false,
				orderby: 'name',
				order: 'asc',
			} ),
		[]
	);

	const parentOptions = useMemo( () => {
		const opts = [
			{ label: __( '— Any Parent —', 'mk-builder' ), value: 0 },
		];

		if ( productCategories && productCategories.length ) {
			productCategories
				.filter( ( term ) => term.parent === 0 )
				.forEach( ( term ) => {
					opts.push( { label: term.name, value: term.id } );
				} );
		}
		return opts;
	}, [ productCategories ] );

	const selectableCategories = useMemo( () => {
		if ( ! productCategories ) return [];
		return productCategories.map( ( term ) => ( {
			id: term.id,
			label:
				term.parent && productCategories
					? `${ term.name } (${ term.slug })`
					: term.name,
		} ) );
	}, [ productCategories ] );

	const toggleCategory = ( id, checked ) => {
		const currentIds = Array.isArray( categoryIds )
			? [ ...categoryIds ]
			: [];
		const numericId = parseInt( id, 10 );
		if ( checked ) {
			if ( ! currentIds.includes( numericId ) ) {
				currentIds.push( numericId );
			}
		} else {
			const idx = currentIds.indexOf( numericId );
			if ( idx !== -1 ) {
				currentIds.splice( idx, 1 );
			}
		}
		setAttributes( { categoryIds: currentIds } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Layout', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Max Width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal Padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Header', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Section Header',
								'mk-builder'
							) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<TextControl
									label={ __( 'Title', 'mk-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<TextControl
									label={ __( 'Subtitle', 'mk-builder' ) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Category Source', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Source', 'mk-builder' ) }
							value={ source }
							options={ [
								{
									label: __(
										'Top-level categories',
										'mk-builder'
									),
									value: 'top',
								},
								{
									label: __(
										'Children of a parent',
										'mk-builder'
									),
									value: 'children',
								},
								{
									label: __(
										'Select specific categories',
										'mk-builder'
									),
									value: 'selected',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { source: val } )
							}
						/>

						{ ( source === 'top' || source === 'children' ) && (
							<>
								{ source === 'children' && (
									<SelectControl
										label={ __(
											'Parent category',
											'mk-builder'
										) }
										value={ parentCategoryId }
										options={ parentOptions }
										onChange={ ( val ) =>
											setAttributes( {
												parentCategoryId:
													parseInt( val, 10 ) || 0,
											} )
										}
									/>
								) }
								<RangeControl
									label={ __(
										'Number of categories',
										'mk-builder'
									) }
									value={ numberOfItems }
									onChange={ ( val ) =>
										setAttributes( { numberOfItems: val } )
									}
									min={ 1 }
									max={ 8 }
									step={ 1 }
								/>
							</>
						) }

						{ source === 'selected' && (
							<BaseControl
								label={ __(
									'Select categories to display',
									'mk-builder'
								) }
								help={ __(
									'Tick the WooCommerce product categories you want to show.',
									'mk-builder'
								) }
							>
								{ selectableCategories &&
								selectableCategories.length > 0 ? (
									<div
										style={ {
											maxHeight: '220px',
											overflowY: 'auto',
											padding: '8px 0',
										} }
									>
										{ selectableCategories.map( ( cat ) => (
											<CheckboxControl
												key={ cat.id }
												label={ cat.label }
												checked={ categoryIds.includes(
													cat.id
												) }
												onChange={ ( checked ) =>
													toggleCategory(
														cat.id,
														checked
													)
												}
											/>
										) ) }
									</div>
								) : (
									<p
										style={ {
											fontSize: '13px',
											color: '#666',
										} }
									>
										{ __(
											'No product categories found. Make sure WooCommerce is active.',
											'mk-builder'
										) }
									</p>
								) }
							</BaseControl>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<TextControl
								label={ __(
									'Animation type CSS class',
									'mk-builder'
								) }
								help={ __(
									'e.g. fade-up, fadeInUp',
									'mk-builder'
								) }
								value={ animationType }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="ph-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<ServerSideRender
						block="mk/ph-shop-category-section"
						attributes={ attributes }
					/>
				</div>
			</section>
		</>
	);
}
