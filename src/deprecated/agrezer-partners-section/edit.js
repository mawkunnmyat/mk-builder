import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'mk/agrezer-partners-item' ];
const TEMPLATE = [
	[ 'mk/agrezer-partners-item', { name: 'NatureNest' } ],
	[ 'mk/agrezer-partners-item', { name: 'Farming Co' } ],
	[ 'mk/agrezer-partners-item', { name: 'GreenLeaf' } ],
	[ 'mk/agrezer-partners-item', { name: 'PureHarvest' } ],
	[ 'mk/agrezer-partners-item', { name: 'AgroNova' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		ariaLabel,
		marqueePaddingY,
		borderColor,
		trackGap,
		animationDuration,
		enableMarquee,
		pauseOnHover,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-partners mk-agrezer-partners-section-editor',
			style: {
				backgroundColor,
				'--agrezer-partners-py': `${ marqueePaddingY }px`,
				'--agrezer-partners-border': borderColor,
				'--agrezer-partners-gap': `${ trackGap }px`,
				'--agrezer-partners-duration': `${ animationDuration }s`,
			},
			'data-marquee': enableMarquee ? 'true' : 'false',
			'data-pause-hover': pauseOnHover ? 'true' : 'false',
			'aria-label': ariaLabel || __( 'Client logos', 'mk-builder' ),
		} ),
		[
			animationDuration,
			ariaLabel,
			backgroundColor,
			borderColor,
			enableMarquee,
			marqueePaddingY,
			pauseOnHover,
			trackGap,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Accessibility', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Section label (aria-label)',
								'mk-builder'
							) }
							value={ ariaLabel }
							onChange={ ( val ) =>
								setAttributes( { ariaLabel: val } )
							}
							help={ __(
								'Describes the logo strip for screen readers.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Marquee', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Enable infinite scroll',
								'mk-builder'
							) }
							checked={ enableMarquee }
							onChange={ ( val ) =>
								setAttributes( { enableMarquee: val } )
							}
							help={ __(
								'Off: static single row. Respects prefers-reduced-motion when on.',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Pause on hover', 'mk-builder' ) }
							checked={ pauseOnHover }
							onChange={ ( val ) =>
								setAttributes( { pauseOnHover: val } )
							}
						/>

						<RangeControl
							label={ __(
								'Animation duration (seconds)',
								'mk-builder'
							) }
							value={ animationDuration }
							onChange={ ( val ) =>
								setAttributes( { animationDuration: val } )
							}
							min={ 8 }
							max={ 60 }
							step={ 1 }
							disabled={ ! enableMarquee }
						/>

						<RangeControl
							label={ __(
								'Gap between logos (px)',
								'mk-builder'
							) }
							value={ trackGap }
							onChange={ ( val ) =>
								setAttributes( { trackGap: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Style', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Borders', 'mk-builder' ) }
							colorSettings={ [
								{
									value: borderColor,
									onChange: ( val ) =>
										setAttributes( { borderColor: val } ),
									label: __(
										'Top / bottom border',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Vertical padding (px)',
								'mk-builder'
							) }
							value={ marqueePaddingY }
							onChange={ ( val ) =>
								setAttributes( { marqueePaddingY: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="agrezer-partners__marquee">
					<div
						className="agrezer-partners__track mk-agrezer-partners__track-editor"
						style={ {
							gap: `${ trackGap }px`,
						} }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
