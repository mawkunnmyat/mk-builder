import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	URLInput,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const DEFAULT_FEATURE = { label: '', text: '' };

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		imagePosition,
		title,
		description,
		featureItems,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		titleColor,
		titleFontSize,
		descriptionColor,
		splitGap,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: [
				'mk-gm-split-section',
				'mk-gm-split-section-editor',
				'jivaka-gm-section',
				imagePosition === 'left'
					? 'gm-split-image-left'
					: 'gm-split-image-right',
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, imagePosition, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		display: 'grid',
		gridTemplateColumns: imagePosition === 'left' ? '1fr 1fr' : '1fr 1fr',
		gap: `${ splitGap }px`,
		alignItems: 'center',
	};

	const addFeature = () => {
		setAttributes( {
			featureItems: [ ...( featureItems || [] ), { ...DEFAULT_FEATURE } ],
		} );
	};

	const removeFeature = ( index ) => {
		const next = ( featureItems || [] ).filter( ( _, i ) => i !== index );
		setAttributes( { featureItems: next } );
	};

	const updateFeature = ( index, field, value ) => {
		const next = [ ...( featureItems || [] ) ];
		if ( ! next[ index ] ) next[ index ] = { ...DEFAULT_FEATURE };
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes( { featureItems: next } );
	};

	const imageCol = (
		<div className="jivaka-gm-img-wrapper gm-anim-fade gm-split-image-col">
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
					labels={ { title: __( 'Section Image', 'mk-builder' ) } }
				/>
			) : (
				<>
					<img
						src={ imageUrl }
						alt={ imageAlt }
						style={ {
							width: '100%',
							height: 'auto',
							display: 'block',
							borderRadius: 12,
						} }
					/>

					<Button
						isSecondary
						isSmall
						onClick={ () =>
							setAttributes( { imageUrl: '', imageId: null } )
						}
						style={ { marginTop: 8 } }
					>
						{ __( 'Remove Image', 'mk-builder' ) }
					</Button>
				</>
			) }
		</div>
	);

	const contentCol = (
		<div className="gm-anim-fade gm-split-content-col">
			<RichText
				tagName="h2"
				value={ title }
				onChange={ ( val ) => setAttributes( { title: val } ) }
				placeholder={ __( 'Why Choose Jivaka?', 'mk-builder' ) }
				style={ {
					fontSize: `${ titleFontSize }rem`,
					marginBottom: 20,
					color: titleColor,
				} }
			/>

			<RichText
				tagName="p"
				value={ description }
				onChange={ ( val ) => setAttributes( { description: val } ) }
				placeholder={ __( 'Description...', 'mk-builder' ) }
				style={ {
					color: descriptionColor,
					marginBottom: 24,
					lineHeight: 1.6,
				} }
			/>

			<ul className="jivaka-gm-feature-list">
				{ ( featureItems || [] ).map( ( item, i ) => (
					<li key={ i }>
						<strong>
							{ item.label || __( 'Label', 'mk-builder' ) }
						</strong>{ ' ' }
						{ item.text || __( 'Text', 'mk-builder' ) }
					</li>
				) ) }
			</ul>
			{ showButton !== false ? (
				<span
					className="jivaka-gm-btn jivaka-gm-btn-primary"
					style={ { pointerEvents: 'none', cursor: 'default' } }
				>
					{ buttonText || __( 'Contact Us Today', 'mk-builder' ) }
				</span>
			) : (
				<span
					className="jivaka-gm-btn-placeholder"
					style={ {
						display: 'inline-block',
						padding: '10px 16px',
						fontSize: '13px',
						color: '#757575',
						border: '1px dashed #ccc',
						borderRadius: 4,
						backgroundColor: '#fafafa',
					} }
				>
					{ __(
						'Button hidden (toggle on in sidebar to show)',
						'mk-builder'
					) }
				</span>
			) }
		</div>
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __(
								'Image & text layout',
								'mk-builder'
							) }
							value={ imagePosition }
							options={ [
								{
									label: __(
										'Image left, text right',
										'mk-builder'
									),
									value: 'left',
								},
								{
									label: __(
										'Image right, text left',
										'mk-builder'
									),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imagePosition: val } )
							}
							help={ __(
								'Swap the side of the image and the text content.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Image Alt Text', 'mk-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Feature List', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ ( featureItems || [] ).map( ( item, i ) => (
							<div
								key={ i }
								style={ {
									marginBottom: 16,
									paddingBottom: 16,
									borderBottom: '1px solid #ddd',
								} }
							>
								<TextControl
									label={ `${ __(
										'Label',
										'mk-builder'
									) } ${ i + 1 }` }
									value={ item.label || '' }
									onChange={ ( v ) =>
										updateFeature( i, 'label', v )
									}
								/>

								<TextControl
									label={ `${ __(
										'Text',
										'mk-builder'
									) } ${ i + 1 }` }
									value={ item.text || '' }
									onChange={ ( v ) =>
										updateFeature( i, 'text', v )
									}
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeFeature( i ) }
									style={ { marginTop: 4 } }
								>
									{ __( 'Remove', 'mk-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addFeature }>
							{ __( 'Add feature item', 'mk-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show CTA button', 'mk-builder' ) }
							checked={ showButton !== false }
							onChange={ ( v ) =>
								setAttributes( { showButton: v } )
							}
							help={ __(
								'Display the call-to-action button below the feature list. Turn off to hide it.',
								'mk-builder'
							) }
						/>

						{ showButton !== false && (
							<>
								<Divider />
								<TextControl
									label={ __(
										'Button Text',
										'mk-builder'
									) }
									value={ buttonText }
									onChange={ ( v ) =>
										setAttributes( { buttonText: v } )
									}
									placeholder={ __(
										'Contact Us Today',
										'mk-builder'
									) }
								/>

								<BaseControl
									label={ __(
										'Button URL',
										'mk-builder'
									) }
									help={ __(
										'Link destination when the button is clicked.',
										'mk-builder'
									) }
								>
									<URLInput
										value={ buttonUrl }
										onChange={ ( url ) =>
											setAttributes( {
												buttonUrl: url || '#contact',
											} )
										}
									/>
								</BaseControl>
								<ToggleControl
									label={ __(
										'Open in new tab',
										'mk-builder'
									) }
									checked={ buttonTarget }
									onChange={ ( v ) =>
										setAttributes( { buttonTarget: v } )
									}
									help={ __(
										'Add target="_blank" and rel="noopener noreferrer".',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Typography', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( v ) =>
										setAttributes( { titleColor: v } ),
									label: __( 'Title Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( v ) =>
								setAttributes( { titleFontSize: v } )
							}
							min={ 1.5 }
							max={ 3.5 }
							step={ 0.1 }
						/>

						<PanelColorSettings
							title={ __( 'Description Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( v ) =>
										setAttributes( {
											descriptionColor: v,
										} ),
									label: __(
										'Description Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Image & text side', 'mk-builder' ) }
							value={ imagePosition }
							options={ [
								{
									label: __( 'Image left', 'mk-builder' ),
									value: 'left',
								},
								{
									label: __( 'Image right', 'mk-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imagePosition: val } )
							}
							help={ __(
								'Choose which side the image appears on.',
								'mk-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'mk-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
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
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Gap between columns (px)',
								'mk-builder'
							) }
							value={ splitGap }
							onChange={ ( v ) =>
								setAttributes( { splitGap: v } )
							}
							min={ 40 }
							max={ 120 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Padding Top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
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
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( v ) =>
										setAttributes( { backgroundColor: v } ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="jivaka-gm-container jivaka-gm-split"
					style={ containerStyle }
				>
					{ imagePosition === 'left' ? (
						<>
							{ imageCol }
							{ contentCol }
						</>
					) : (
						<>
							{ contentCol }
							{ imageCol }
						</>
					) }
				</div>
			</section>
		</>
	);
}
