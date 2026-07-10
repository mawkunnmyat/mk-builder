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

const ALLOWED_BLOCKS = [ 'mk/hc-faq-item' ];
const TEMPLATE = [
	[
		'mk/hc-faq-item',
		{
			question: 'Is the service available 24/7?',
			answer: 'Yes, our nursing and doctor visit services can be arranged for any time of the day, depending on availability.',
		},
	],

	[
		'mk/hc-faq-item',
		{
			question: 'Do you bring your own equipment?',
			answer: 'Yes, our team comes equipped with basic diagnostic tools (BP machine, Oximeter, etc.). For specialized equipment like Oxygen concentrators, we offer rental services.',
		},
	],

	[
		'mk/hc-faq-item',
		{
			question: 'How do I pay?',
			answer: 'We accept cash, KPay, WavePay, and major credit cards upon completion of the service or via advance booking.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		contentMaxWidth,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-section mk-hc-faq-section-editor',
			style: {
				backgroundColor: backgroundColor || '#fafafa',
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
	};

	const innerStyle = {
		maxWidth: `${ contentMaxWidth }px`,
		margin: '0 auto',
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

						<RangeControl
							label={ __(
								'FAQ list max width (px)',
								'mk-builder'
							) }
							value={ contentMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { contentMaxWidth: val } )
							}
							min={ 400 }
							max={ 1000 }
							step={ 20 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Header', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section title',
								'mk-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Title color', 'mk-builder' ) }
								colorSettings={ [
									{
										value: sectionTitleColor,
										onChange: ( val ) =>
											setAttributes( {
												sectionTitleColor: val,
											} ),
										label: __(
											'Title color',
											'mk-builder'
										),
									},
								] }
							/>
						) }
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
				<div className="hc-container" style={ containerStyle }>
					{ showSectionTitle && (
						<div
							className={ `hc-header ${
								animationOnScroll ? animationType : ''
							}` }
							style={ { textAlign: 'center', marginBottom: 30 } }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Frequently Asked Questions',
									'mk-builder'
								) }
								style={ {
									color: sectionTitleColor || '#212121',
								} }
							/>
						</div>
					) }
					<div style={ innerStyle }>
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
