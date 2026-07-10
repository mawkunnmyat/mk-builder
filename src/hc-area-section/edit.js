import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'mk/hc-area-tag' ];
const TEMPLATE = [
	[ 'mk/hc-area-tag', { label: 'Chanayethazan' } ],
	[ 'mk/hc-area-tag', { label: 'Chanmyathazi' } ],
	[ 'mk/hc-area-tag', { label: 'Maha Aungmye' } ],
	[ 'mk/hc-area-tag', { label: 'Aungmyethazan' } ],
	[ 'mk/hc-area-tag', { label: 'Pyigyidagun' } ],
	[ 'mk/hc-area-tag', { label: 'Amarapura' } ],
	[ 'mk/hc-area-tag', { label: 'Patheingyi' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		sectionTitle,
		sectionSubtitle,
		titleColor,
		subtitleColor,
		gap,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'hc-section hc-area-section mk-hc-area-section-editor',
			style: {
				backgroundColor: backgroundColor || '#212121',
				color: '#fff',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		textAlign: 'center',
	};

	const gridStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: `${ gap }px`,
		marginTop: 30,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Background', 'mk-builder' ) }
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
						) }
						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 20 }
							max={ 120 }
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
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
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
						title={ __( 'Header', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Text colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value: titleColor,
										onChange: ( val ) =>
											setAttributes( {
												titleColor: val,
											} ),
										label: __(
											'Title color',
											'mk-builder'
										),
									},
									{
										value: subtitleColor,
										onChange: ( val ) =>
											setAttributes( {
												subtitleColor: val,
											} ),
										label: __(
											'Subtitle color',
											'mk-builder'
										),
									},
								] }
							/>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Gap between tags (px)',
								'mk-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Animation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Animation on scroll',
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
									'Animation class',
									'mk-builder'
								) }
								value={ animationType }
								onChange={ ( val ) =>
									setAttributes( {
										animationType: val || 'fade-up',
									} )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className={ `hc-container ${
						animationOnScroll ? animationType : ''
					}` }
					style={ containerStyle }
				>
					<RichText
						tagName="h2"
						value={ sectionTitle }
						onChange={ ( val ) =>
							setAttributes( { sectionTitle: val } )
						}
						placeholder={ __(
							'Service Coverage Areas',
							'mk-builder'
						) }
						style={ {
							color: titleColor || '#fff',
							marginBottom: 0,
						} }
					/>

					<RichText
						tagName="p"
						value={ sectionSubtitle }
						onChange={ ( val ) =>
							setAttributes( { sectionSubtitle: val } )
						}
						placeholder={ __(
							'We currently provide home care services in the following townships:',
							'mk-builder'
						) }
						style={ {
							opacity: 0.8,
							marginBottom: 30,
							marginTop: 10,
							color: subtitleColor || 'rgba(255,255,255,0.8)',
						} }
					/>

					<div className="hc-area-grid" style={ gridStyle }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
