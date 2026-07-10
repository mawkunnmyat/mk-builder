import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		source,
		productCategoryId,
		numberOfItems,
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		containerMaxWidth,
		containerPadding,
		showAddToCart,
		addToCartLabel,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'ph-section mk-ph-popular-products-section',
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

	const categoryOptions = useMemo( () => {
		const opts = [
			{ label: __( '— Any Category —', 'mk-builder' ), value: 0 },
		];

		if ( productCategories && productCategories.length ) {
			productCategories.forEach( ( term ) => {
				opts.push( { label: term.name, value: term.id } );
			} );
		}
		return opts;
	}, [ productCategories ] );

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
						title={ __( 'Products Source', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Source', 'mk-builder' ) }
							value={ source }
							options={ [
								{
									label: __(
										'Featured products',
										'mk-builder'
									),
									value: 'featured',
								},
								{
									label: __( 'On sale', 'mk-builder' ),
									value: 'on_sale',
								},
								{
									label: __(
										'From a category',
										'mk-builder'
									),
									value: 'category',
								},
								{
									label: __(
										'Recent products',
										'mk-builder'
									),
									value: 'recent',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { source: val } )
							}
						/>

						{ source === 'category' && (
							<SelectControl
								label={ __(
									'Product Category',
									'mk-builder'
								) }
								value={ productCategoryId }
								options={ categoryOptions }
								onChange={ ( val ) =>
									setAttributes( {
										productCategoryId:
											parseInt( val, 10 ) || 0,
									} )
								}
							/>
						) }

						<RangeControl
							label={ __(
								'Number of products',
								'mk-builder'
							) }
							value={ numberOfItems }
							onChange={ ( val ) =>
								setAttributes( { numberOfItems: val } )
							}
							min={ 1 }
							max={ 10 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Product Card', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show "Add to Cart" button',
								'mk-builder'
							) }
							checked={ showAddToCart }
							onChange={ ( val ) =>
								setAttributes( { showAddToCart: val } )
							}
						/>

						{ showAddToCart && (
							<TextControl
								label={ __( 'Button label', 'mk-builder' ) }
								value={ addToCartLabel }
								onChange={ ( val ) =>
									setAttributes( { addToCartLabel: val } )
								}
							/>
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
									'e.g. stagger-up, fade-up',
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
						block="mk/ph-popular-products-section"
						attributes={ attributes }
					/>
				</div>
			</section>
		</>
	);
}
