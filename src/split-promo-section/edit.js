import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		eyebrow,
		title,
		features,
		primaryCtaHref,
		primaryCtaLabel,
		secondaryCtaHref,
		secondaryCtaLabel,
		imageUrl,
		imageId,
		imageAlt,
		backgroundColor,
		padding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-split-promo-section app-promo mk-split-promo-section-editor',
			style: {
				backgroundColor: backgroundColor || '#f7fcff',
				paddingBlock: `${ padding }px`,
			},
		} ),
		[ backgroundColor, padding ]
	);

	const updateFeature = ( index, value ) => {
		const next = [ ...( features || [] ) ];
		next[ index ] = value;
		setAttributes( { features: next } );
	};

	const addFeature = () => {
		setAttributes( { features: [ ...( features || [] ), '' ] } );
	};

	const removeFeature = ( index ) => {
		setAttributes( {
			features: ( features || [] ).filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || imageAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __( 'Promo Image', 'mk-builder' ),
								} }
							/>
						) : (
							<>
								<img
									src={ imageUrl }
									alt={ imageAlt }
									style={ { width: '100%', display: 'block' } }
								/>
								<Button
									isSecondary
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
										} )
									}
									style={ { marginTop: 8 } }
								>
									{ __( 'Remove Image', 'mk-builder' ) }
								</Button>
							</>
						) }
						<TextControl
							label={ __( 'Image Alt Text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Features', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ ( features || [] ).map( ( feature, index ) => (
							<div
								key={ index }
								style={ {
									marginBottom: 12,
									paddingBottom: 12,
									borderBottom: '1px solid #ddd',
								} }
							>
								<TextControl
									label={ `${ __(
										'Feature',
										'mk-builder'
									) } ${ index + 1 }` }
									value={ feature }
									onChange={ ( val ) =>
										updateFeature( index, val )
									}
								/>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeFeature( index ) }
								>
									{ __( 'Remove', 'mk-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addFeature }>
							{ __( 'Add feature', 'mk-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'CTAs', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Primary CTA Label', 'mk-builder' ) }
							value={ primaryCtaLabel }
							onChange={ ( val ) =>
								setAttributes( { primaryCtaLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Primary CTA URL', 'mk-builder' ) }
							value={ primaryCtaHref }
							onChange={ ( val ) =>
								setAttributes( { primaryCtaHref: val } )
							}
						/>
						<Divider />
						<TextControl
							label={ __(
								'Secondary CTA Label',
								'mk-builder'
							) }
							value={ secondaryCtaLabel }
							onChange={ ( val ) =>
								setAttributes( { secondaryCtaLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Secondary CTA URL', 'mk-builder' ) }
							value={ secondaryCtaHref }
							onChange={ ( val ) =>
								setAttributes( { secondaryCtaHref: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
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
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Section Padding (px)', 'mk-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } data-block="app-promo">
				<div className="app-promo__inner l-section">
					<div className="app-promo__grid">
						<div className="app-promo__visual">
							{ imageUrl ? (
								<img src={ imageUrl } alt={ imageAlt } />
							) : (
								<div
									style={ {
										background: '#eee',
										minHeight: 240,
										borderRadius: 8,
									} }
								/>
							) }
						</div>
						<div className="app-promo__content">
							<RichText
								tagName="p"
								className="section-head__eyebrow"
								value={ eyebrow }
								onChange={ ( val ) =>
									setAttributes( { eyebrow: val } )
								}
								placeholder={ __(
									'Eyebrow…',
									'mk-builder'
								) }
							/>
							<RichText
								tagName="h2"
								className="section-head__title app-promo__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Title…', 'mk-builder' ) }
							/>
							<ul className="app-promo__features">
								{ ( features || [] ).map( ( feature, index ) => (
									<li
										key={ index }
										className="app-promo__feature"
									>
										<span
											className="app-promo__check"
											aria-hidden="true"
										>
											✓
										</span>
										{ feature }
									</li>
								) ) }
							</ul>
							<div className="app-promo__stores">
								<span className="app-promo__store btn btn--dark">
									{ primaryCtaLabel }
								</span>
								<span className="app-promo__store btn btn--dark">
									{ secondaryCtaLabel }
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
