import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/doctor-card-item' ];
const TEMPLATE = [
	[ 'mk/doctor-card-item', {} ],
	[ 'mk/doctor-card-item', {} ],
	[ 'mk/doctor-card-item', {} ],
	[ 'mk/doctor-card-item', {} ],
];

const DEFAULT_ATTS = {
	backgroundColor: '#ffffff',
	paddingTop: 0,
	paddingBottom: 80,
	columns: 4,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 30,
	containerMaxWidth: 1200,
	containerPadding: 30,
	noResultsHeading: 'No doctors found matching your criteria.',
	noResultsMessage: 'Please try adjusting your filters or search term.',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		containerMaxWidth,
		containerPadding,
		noResultsHeading,
		noResultsMessage,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-doctor-directory-section-editor',
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

	const gridStyle = {
		'--grid-columns': columns,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Background', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
							help={ __(
								'Number of columns on desktop screens',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'mk-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'mk-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Gap Between Items (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'mk-builder' ) }
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
							max={ 100 }
							step={ 5 }
						/>

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
						title={ __( 'No Results Message', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Heading', 'mk-builder' ) }
							value={ noResultsHeading }
							onChange={ ( val ) =>
								setAttributes( { noResultsHeading: val } )
							}
							help={ __(
								'Shown when no doctors match the current filters.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Message', 'mk-builder' ) }
							value={ noResultsMessage }
							onChange={ ( val ) =>
								setAttributes( { noResultsMessage: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div
						className="mk-doctor-directory-grid-container"
						style={ gridStyle }
						data-columns={ columns }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
					<div
						className="no-results-editor-placeholder"
						style={ {
							display: 'none',
							gridColumn: '1 / -1',
							textAlign: 'center',
							padding: '30px',
							background: '#f5f5f5',
							borderRadius: '8px',
							marginTop: '20px',
							fontSize: '13px',
							color: '#666',
						} }
					>
						{ __(
							'No results message (shown on frontend when filters match nothing)',
							'mk-builder'
						) }
					</div>
				</div>
			</div>
		</>
	);
}
