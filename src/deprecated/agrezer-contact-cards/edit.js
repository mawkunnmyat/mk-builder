import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		gap,
		iconWrapBgColor,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'mk/agrezer-contact-card-item' ];
	const TEMPLATE = [
		[
			'mk/agrezer-contact-card-item',
			{
				title: __( 'Mobile', 'mk-builder' ),
				subtitle: __( 'Free Dial Number', 'mk-builder' ),
				contentType: 'link',
				linkUrl: 'tel:+15284567592',
				linkText: __( '✆ + (528) 456-7592', 'mk-builder' ),
				iconAlt: __( 'Phone', 'mk-builder' ),
			},
		],

		[
			'mk/agrezer-contact-card-item',
			{
				title: __( 'Email', 'mk-builder' ),
				subtitle: __( 'Feel Free to Mail', 'mk-builder' ),
				contentType: 'link',
				linkUrl: 'mailto:info@agrezen.com',
				linkText: __( '✉ info@agrezen.com', 'mk-builder' ),
				iconAlt: __( 'Email', 'mk-builder' ),
			},
		],

		[
			'mk/agrezer-contact-card-item',
			{
				title: __( 'Address', 'mk-builder' ),
				subtitle: __( 'Our form Address', 'mk-builder' ),
				contentType: 'text',
				plainText: __(
					'132, Tic St, Kingston, NY, USA',
					'mk-builder'
				),
				iconAlt: __( 'Address', 'mk-builder' ),
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-agrezer-contact-cards-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const gridStyle = {
		'--agrezer-contact-cols': columns,
		'--agrezer-contact-cols-md': columnsTablet,
		'--agrezer-contact-gap': `${ gap }px`,
		'--agrezer-icon-wrap-bg': iconWrapBgColor,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'mk-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Columns (desktop)', 'mk-builder' ) }
							value={ columns }
							onChange={ ( v ) =>
								setAttributes( { columns: v } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Columns (tablet & below)',
								'mk-builder'
							) }
							value={ columnsTablet }
							onChange={ ( v ) =>
								setAttributes( { columnsTablet: v } )
							}
							min={ 1 }
							max={ 3 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'mk-builder' ) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 0 }
							max={ 48 }
						/>

						<BaseControl
							label={ __(
								'Icon circle background',
								'mk-builder'
							) }
						>
							<input
								type="color"
								value={ iconWrapBgColor }
								onChange={ ( e ) =>
									setAttributes( {
										iconWrapBgColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
						<BaseControl
							label={ __(
								'Section background',
								'mk-builder'
							) }
						>
							<input
								type="color"
								value={ backgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										backgroundColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="agrezer-contact-cards__container"
					style={ gridStyle }
				>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</section>
		</>
	);
}
