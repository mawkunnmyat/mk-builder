/**
 * Mk Blog Section – Editor
 * Blog layout with featured post, grid, sidebar widgets, and pagination.
 * Uses dynamic PHP render (ServerSideRender), similar to updates-section.
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
		postsPerPage,
		orderBy,
		order,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showFeatured,
		featuredPostId,
		showGrid,
		showSidebar,
		showPagination,
		showSearchWidget,
		searchTitle,
		showCategoriesWidget,
		categoriesTitle,
		showRecentWidget,
		recentTitle,
		recentItems,
		recentSource,
		recentCategoryId,
		recentPostIds,
		showTagsWidget,
		tagsTitle,
		categoriesInclude,
		tagsInclude,
		excerptLength,
		readMoreLabel,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-blog-section-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Query Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __(
								'Posts per page (grid)',
								'mk-builder'
							) }
							value={ postsPerPage }
							onChange={ ( val ) =>
								setAttributes( { postsPerPage: val } )
							}
							min={ 1 }
							max={ 12 }
						/>

						<SelectControl
							label={ __( 'Order by', 'mk-builder' ) }
							value={ orderBy }
							options={ [
								{
									label: __( 'Date', 'mk-builder' ),
									value: 'date',
								},
								{
									label: __( 'Title', 'mk-builder' ),
									value: 'title',
								},
								{
									label: __(
										'Comment count',
										'mk-builder'
									),
									value: 'comment_count',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { orderBy: val } )
							}
						/>

						<SelectControl
							label={ __( 'Order', 'mk-builder' ) }
							value={ order }
							options={ [
								{
									label: __( 'Descending', 'mk-builder' ),
									value: 'DESC',
								},
								{
									label: __( 'Ascending', 'mk-builder' ),
									value: 'ASC',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { order: val } )
							}
						/>

						<TextControl
							label={ __(
								'Featured post ID (optional)',
								'mk-builder'
							) }
							value={
								featuredPostId ? String( featuredPostId ) : ''
							}
							onChange={ ( val ) =>
								setAttributes( {
									featuredPostId: val
										? parseInt( val, 10 ) || 0
										: 0,
								} )
							}
							help={ __(
								'Leave empty to use the latest post as featured.',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Excerpt length (words)',
								'mk-builder'
							) }
							value={ excerptLength }
							onChange={ ( val ) =>
								setAttributes( { excerptLength: val } )
							}
							min={ 10 }
							max={ 80 }
							step={ 5 }
						/>

						<TextControl
							label={ __( 'Read more label', 'mk-builder' ) }
							value={ readMoreLabel }
							onChange={ ( val ) =>
								setAttributes( { readMoreLabel: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show featured post',
								'mk-builder'
							) }
							checked={ showFeatured }
							onChange={ ( val ) =>
								setAttributes( { showFeatured: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show post grid', 'mk-builder' ) }
							checked={ showGrid }
							onChange={ ( val ) =>
								setAttributes( { showGrid: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show sidebar', 'mk-builder' ) }
							checked={ showSidebar }
							onChange={ ( val ) =>
								setAttributes( { showSidebar: val } )
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
							label={ __( 'Max width (px)', 'mk-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Sidebar Widgets', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show search', 'mk-builder' ) }
							checked={ showSearchWidget }
							onChange={ ( val ) =>
								setAttributes( { showSearchWidget: val } )
							}
						/>

						{ showSearchWidget && (
							<TextControl
								label={ __( 'Search title', 'mk-builder' ) }
								value={ searchTitle }
								onChange={ ( val ) =>
									setAttributes( { searchTitle: val } )
								}
							/>
						) }

						<Divider />

						<ToggleControl
							label={ __( 'Show categories', 'mk-builder' ) }
							checked={ showCategoriesWidget }
							onChange={ ( val ) =>
								setAttributes( { showCategoriesWidget: val } )
							}
						/>

						{ showCategoriesWidget && (
							<TextControl
								label={ __(
									'Categories title',
									'mk-builder'
								) }
								value={ categoriesTitle }
								onChange={ ( val ) =>
									setAttributes( { categoriesTitle: val } )
								}
								help={ __(
									'Heading for the categories widget.',
									'mk-builder'
								) }
							/>
						) }
						{ showCategoriesWidget && (
							<TextControl
								label={ __(
									'Limit categories (IDs, comma separated)',
									'mk-builder'
								) }
								value={ categoriesInclude }
								onChange={ ( val ) =>
									setAttributes( { categoriesInclude: val } )
								}
								help={ __(
									'Optional: show only these category IDs. Leave empty for all.',
									'mk-builder'
								) }
							/>
						) }

						<Divider />

						<ToggleControl
							label={ __( 'Show recent posts', 'mk-builder' ) }
							checked={ showRecentWidget }
							onChange={ ( val ) =>
								setAttributes( { showRecentWidget: val } )
							}
						/>

						{ showRecentWidget && (
							<>
								<TextControl
									label={ __(
										'Recent posts title',
										'mk-builder'
									) }
									value={ recentTitle }
									onChange={ ( val ) =>
										setAttributes( { recentTitle: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Recent posts source',
										'mk-builder'
									) }
									value={ recentSource }
									options={ [
										{
											label: __(
												'Latest posts',
												'mk-builder'
											),
											value: 'latest',
										},
										{
											label: __(
												'By category',
												'mk-builder'
											),
											value: 'category',
										},
										{
											label: __(
												'Specific posts (IDs)',
												'mk-builder'
											),
											value: 'ids',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { recentSource: val } )
									}
								/>

								{ recentSource !== 'ids' && (
									<RangeControl
										label={ __(
											'Number of recent posts',
											'mk-builder'
										) }
										value={ recentItems }
										onChange={ ( val ) =>
											setAttributes( {
												recentItems: val,
											} )
										}
										min={ 1 }
										max={ 6 }
									/>
								) }
								{ recentSource === 'category' && (
									<TextControl
										label={ __(
											'Recent category ID',
											'mk-builder'
										) }
										value={
											recentCategoryId
												? String( recentCategoryId )
												: ''
										}
										onChange={ ( val ) =>
											setAttributes( {
												recentCategoryId: val
													? parseInt( val, 10 ) || 0
													: 0,
											} )
										}
										help={ __(
											'Filter recent posts widget by a single category ID.',
											'mk-builder'
										) }
									/>
								) }
								{ recentSource === 'ids' && (
									<TextControl
										label={ __(
											'Recent post IDs (comma separated)',
											'mk-builder'
										) }
										value={ recentPostIds }
										onChange={ ( val ) =>
											setAttributes( {
												recentPostIds: val,
											} )
										}
										help={ __(
											'Specify exact posts for the recent widget. Ignores count above.',
											'mk-builder'
										) }
									/>
								) }
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __( 'Show tags cloud', 'mk-builder' ) }
							checked={ showTagsWidget }
							onChange={ ( val ) =>
								setAttributes( { showTagsWidget: val } )
							}
						/>

						{ showTagsWidget && (
							<TextControl
								label={ __( 'Tags title', 'mk-builder' ) }
								value={ tagsTitle }
								onChange={ ( val ) =>
									setAttributes( { tagsTitle: val } )
								}
								help={ __(
									'Heading for the tags widget.',
									'mk-builder'
								) }
							/>
						) }
						{ showTagsWidget && (
							<TextControl
								label={ __(
									'Limit tags (IDs or slugs, comma separated)',
									'mk-builder'
								) }
								value={ tagsInclude }
								onChange={ ( val ) =>
									setAttributes( { tagsInclude: val } )
								}
								help={ __(
									'Optional: show only these tags. Leave empty for popular tags by count.',
									'mk-builder'
								) }
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<input
							type="color"
							value={ backgroundColor }
							onChange={ ( event ) =>
								setAttributes( {
									backgroundColor: event.target.value,
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
