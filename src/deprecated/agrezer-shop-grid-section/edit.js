/**
 * Agrezer Shop Grid — editor (ServerSideRender + Inspector).
 */
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		categoryTitle,
		productsTitle,
		contactTitle,
		showCategoryWidget,
		showMiniProductsWidget,
		showContactWidget,
		categoriesHideEmpty,
		categoriesLimit,
		categoriesTopLevelOnly,
		miniProductsCount,
		miniProductsSource,
		productsPerPage,
		gridColumns,
		gridColumnsTablet,
		gridColumnsMobile,
		defaultOrderby,
		showToolbar,
		showPagination,
		mainCategoryId,
		contactAddress,
		contactPhone,
		contactEmail,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-agrezer-shop-grid-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Sidebar — WooCommerce', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show category list',
								'mk-builder'
							) }
							checked={ showCategoryWidget }
							onChange={ ( val ) =>
								setAttributes( { showCategoryWidget: val } )
							}
						/>

						{ showCategoryWidget && (
							<>
								<TextControl
									label={ __(
										'Category widget title',
										'mk-builder'
									) }
									value={ categoryTitle }
									onChange={ ( val ) =>
										setAttributes( { categoryTitle: val } )
									}
								/>

								<ToggleControl
									label={ __(
										'Hide empty categories',
										'mk-builder'
									) }
									checked={ categoriesHideEmpty }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesHideEmpty: val,
										} )
									}
								/>

								<ToggleControl
									label={ __(
										'Top-level categories only',
										'mk-builder'
									) }
									checked={ categoriesTopLevelOnly }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesTopLevelOnly: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Max categories (0 = all)',
										'mk-builder'
									) }
									value={ categoriesLimit }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesLimit: val,
										} )
									}
									min={ 0 }
									max={ 50 }
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show mini products',
								'mk-builder'
							) }
							checked={ showMiniProductsWidget }
							onChange={ ( val ) =>
								setAttributes( { showMiniProductsWidget: val } )
							}
						/>

						{ showMiniProductsWidget && (
							<>
								<TextControl
									label={ __(
										'Products widget title',
										'mk-builder'
									) }
									value={ productsTitle }
									onChange={ ( val ) =>
										setAttributes( { productsTitle: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Number of mini products',
										'mk-builder'
									) }
									value={ miniProductsCount }
									onChange={ ( val ) =>
										setAttributes( {
											miniProductsCount: val,
										} )
									}
									min={ 1 }
									max={ 12 }
								/>

								<SelectControl
									label={ __(
										'Mini products source',
										'mk-builder'
									) }
									value={ miniProductsSource }
									options={ [
										{
											label: __(
												'By average rating',
												'mk-builder'
											),
											value: 'rating',
										},
										{
											label: __(
												'Featured products',
												'mk-builder'
											),
											value: 'featured',
										},
										{
											label: __(
												'On sale',
												'mk-builder'
											),
											value: 'on_sale',
										},
										{
											label: __(
												'Popularity (sales)',
												'mk-builder'
											),
											value: 'popularity',
										},
										{
											label: __(
												'Recent',
												'mk-builder'
											),
											value: 'recent',
										},
										{
											label: __(
												'Random',
												'mk-builder'
											),
											value: 'rand',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											miniProductsSource: val,
										} )
									}
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show contact widget',
								'mk-builder'
							) }
							checked={ showContactWidget }
							onChange={ ( val ) =>
								setAttributes( { showContactWidget: val } )
							}
						/>

						{ showContactWidget && (
							<>
								<TextControl
									label={ __(
										'Contact widget title',
										'mk-builder'
									) }
									value={ contactTitle }
									onChange={ ( val ) =>
										setAttributes( { contactTitle: val } )
									}
								/>

								<TextControl
									label={ __( 'Address', 'mk-builder' ) }
									value={ contactAddress }
									onChange={ ( val ) =>
										setAttributes( { contactAddress: val } )
									}
								/>

								<TextControl
									label={ __( 'Phone', 'mk-builder' ) }
									value={ contactPhone }
									onChange={ ( val ) =>
										setAttributes( { contactPhone: val } )
									}
								/>

								<TextControl
									label={ __( 'Email', 'mk-builder' ) }
									value={ contactEmail }
									onChange={ ( val ) =>
										setAttributes( { contactEmail: val } )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Main grid — WooCommerce',
							'mk-builder'
						) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Products per page', 'mk-builder' ) }
							value={ productsPerPage }
							onChange={ ( val ) =>
								setAttributes( { productsPerPage: val } )
							}
							min={ 1 }
							max={ 48 }
						/>

						<TextControl
							label={ __(
								'Filter by category ID (0 = all products)',
								'mk-builder'
							) }
							value={
								mainCategoryId ? String( mainCategoryId ) : ''
							}
							onChange={ ( val ) =>
								setAttributes( {
									mainCategoryId: val
										? parseInt( val, 10 ) || 0
										: 0,
								} )
							}
							help={ __(
								'Restrict the main grid to one WooCommerce product category.',
								'mk-builder'
							) }
						/>

						<SelectControl
							label={ __(
								'Default sort (frontend can override)',
								'mk-builder'
							) }
							value={ defaultOrderby }
							options={ [
								{
									label: __(
										'Default (menu order)',
										'mk-builder'
									),
									value: 'default',
								},
								{
									label: __( 'Newest', 'mk-builder' ),
									value: 'date',
								},
								{
									label: __(
										'Price: low to high',
										'mk-builder'
									),
									value: 'price',
								},
								{
									label: __(
										'Price: high to low',
										'mk-builder'
									),
									value: 'price-desc',
								},
								{
									label: __( 'Popularity', 'mk-builder' ),
									value: 'popularity',
								},
								{
									label: __(
										'Average rating',
										'mk-builder'
									),
									value: 'rating',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { defaultOrderby: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Show toolbar (results + sort)',
								'mk-builder'
							) }
							checked={ showToolbar }
							onChange={ ( val ) =>
								setAttributes( { showToolbar: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show pagination', 'mk-builder' ) }
							checked={ showPagination }
							onChange={ ( val ) =>
								setAttributes( { showPagination: val } )
							}
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Grid columns (desktop)',
								'mk-builder'
							) }
							value={ gridColumns }
							onChange={ ( val ) =>
								setAttributes( { gridColumns: val } )
							}
							min={ 1 }
							max={ 6 }
						/>

						<RangeControl
							label={ __(
								'Grid columns (tablet)',
								'mk-builder'
							) }
							value={ gridColumnsTablet }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Grid columns (mobile)',
								'mk-builder'
							) }
							value={ gridColumnsMobile }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout & background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 900 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>

						<p className="components-base-control__help">
							{ __( 'Background color:', 'mk-builder' ) }
						</p>
						<input
							type="color"
							value={ backgroundColor }
							onChange={ ( e ) =>
								setAttributes( {
									backgroundColor: e.target.value,
								} )
							}
							aria-label={ __(
								'Background color',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
