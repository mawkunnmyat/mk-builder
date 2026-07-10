import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showViewAllLink,
		viewAllText,
		viewAllUrl,
		viewAllOpensInNewTab,
		viewAllLinkColor,
		viewAllLinkFontWeight,
		headerMarginBottom,
		gridColumns,
		gridColumnsTablet,
		gridColumnsMobile,
		gridGap,
		itemHeight,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationDelay,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/csr-moments-gallery-item' ];
	const TEMPLATE = [
		[
			'mk/csr-moments-gallery-item',
			{
				imageUrl:
					'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
				imageAlt: 'Community 1',
				spanTwoColumns: true,
			},
		],

		[
			'mk/csr-moments-gallery-item',
			{
				imageUrl:
					'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=80',
				imageAlt: 'Community 2',
			},
		],

		[
			'mk/csr-moments-gallery-item',
			{
				imageUrl:
					'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80',
				imageAlt: 'Community 3',
			},
		],

		[
			'mk/csr-moments-gallery-item',
			{
				imageUrl:
					'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=500&q=80',
				imageAlt: 'Community 4',
			},
		],

		[
			'mk/csr-moments-gallery-item',
			{
				imageUrl:
					'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80',
				imageAlt: 'Community 5',
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-moments-gallery-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const headerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: `${ headerMarginBottom }px`,
		flexWrap: 'wrap',
		gap: '15px',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ gridColumns }, 1fr)`,
		gap: `${ gridGap }px`,
		gridAutoRows: `${ itemHeight }px`,
		marginTop: '40px',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<TextControl
									label={ __(
										'Title Text',
										'mk-builder'
									) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
										'mk-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.2 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 300 }
									max={ 900 }
									step={ 100 }
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show View All Link',
								'mk-builder'
							) }
							checked={ showViewAllLink }
							onChange={ ( val ) =>
								setAttributes( { showViewAllLink: val } )
							}
						/>

						{ showViewAllLink && (
							<>
								<TextControl
									label={ __( 'Link Text', 'mk-builder' ) }
									value={ viewAllText }
									onChange={ ( val ) =>
										setAttributes( { viewAllText: val } )
									}
								/>

								<BaseControl
									label={ __( 'Link URL', 'mk-builder' ) }
								>
									<URLInput
										value={ viewAllUrl }
										onChange={ ( val ) =>
											setAttributes( { viewAllUrl: val } )
										}
									/>
								</BaseControl>
								<ToggleControl
									label={ __(
										'Open in New Tab',
										'mk-builder'
									) }
									checked={ viewAllOpensInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											viewAllOpensInNewTab: val,
										} )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Link Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: viewAllLinkColor,
											onChange: ( val ) =>
												setAttributes( {
													viewAllLinkColor: val,
												} ),
											label: __(
												'Link Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Link Font Weight',
										'mk-builder'
									) }
									value={ viewAllLinkFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											viewAllLinkFontWeight: val,
										} )
									}
									min={ 400 }
									max={ 900 }
									step={ 100 }
								/>
							</>
						) }
						<Divider />
						<RangeControl
							label={ __(
								'Header Margin Bottom (px)',
								'mk-builder'
							) }
							value={ headerMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { headerMarginBottom: val } )
							}
							min={ 10 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Grid Columns (Desktop)',
								'mk-builder'
							) }
							value={ gridColumns }
							onChange={ ( val ) =>
								setAttributes( { gridColumns: val } )
							}
							min={ 2 }
							max={ 6 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Grid Columns (Tablet)',
								'mk-builder'
							) }
							value={ gridColumnsTablet }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Grid Columns (Mobile)',
								'mk-builder'
							) }
							value={ gridColumnsMobile }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Grid Gap (px)', 'mk-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Item Height (px)', 'mk-builder' ) }
							value={ itemHeight }
							onChange={ ( val ) =>
								setAttributes( { itemHeight: val } )
							}
							min={ 150 }
							max={ 400 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'mk-builder' ) }
						initialOpen={ false }
					>
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
								'Container Padding (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Section Padding', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
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
								'Padding Bottom (px)',
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
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<RangeControl
								label={ __(
									'Animation Delay (ms)',
									'mk-builder'
								) }
								value={ animationDelay }
								onChange={ ( val ) =>
									setAttributes( { animationDelay: val } )
								}
								min={ 0 }
								max={ 300 }
								step={ 20 }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || showViewAllLink ) && (
						<div
							className="moments-gallery-header"
							style={ headerStyle }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section Title...',
										'mk-builder'
									) }
									style={ {
										margin: 0,
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
									} }
								/>
							) }
							{ showViewAllLink && (
								<a
									href={ viewAllUrl || '#' }
									target={
										viewAllOpensInNewTab
											? '_blank'
											: '_self'
									}
									rel={
										viewAllOpensInNewTab
											? 'noopener noreferrer'
											: undefined
									}
									style={ {
										color: viewAllLinkColor,
										fontWeight: viewAllLinkFontWeight,
										textDecoration: 'none',
									} }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ viewAllText }{ ' ' }
									<i
										className="fas fa-arrow-right"
										aria-hidden="true"
									/>
								</a>
							) }
						</div>
					) }

					<div
						className="gallery-grid mk-csr-moments-gallery-grid"
						style={ gridStyle }
						data-columns={ gridColumns }
						data-columns-tablet={ gridColumnsTablet }
						data-columns-mobile={ gridColumnsMobile }
						data-item-height={ itemHeight }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
