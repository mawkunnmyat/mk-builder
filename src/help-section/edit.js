import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const DEFAULT_OPTION = {
	value: '',
	label: __( 'Select Department', 'mk-builder' ),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		metaTitle,
		mainTitleLine1,
		mainTitleHighlight,
		mainTitleLine2,
		mainDescription,
		subText,
		iconClass,
		bookingMetaTitle,
		bookingTitle,
		bookingDescription,
		selectOptions,
		selectName,
		selectAriaLabel,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		highlightColor,
		cardBgColor,
		cardBorderColor,
		cardPadding,
		bookingTitleColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-help-section-editor help-section jivaka-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				width: '100%',
				boxSizing: 'border-box',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		width: '100%',
		boxSizing: 'border-box',
	};

	const gridStyle = {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		gap: `${ gridGap }px`,
		width: '100%',
		boxSizing: 'border-box',
	};

	const leftColumnStyle = {
		flex: '0 1 55%',
		minWidth: 0,
		boxSizing: 'border-box',
	};

	const rightColumnStyle = {
		flex: '0 1 45%',
		minWidth: 0,
		boxSizing: 'border-box',
	};

	const cardStyle = {
		backgroundColor: cardBgColor,
		border: `1px solid ${ cardBorderColor }`,
		padding: `${ cardPadding }px`,
		borderRadius: '5px',
	};

	const addSelectOption = () => {
		const next = [ ...( selectOptions || [] ) ];
		next.push( {
			value: `opt-${ Date.now() }`,
			label: __( 'New option', 'mk-builder' ),
		} );
		setAttributes( { selectOptions: next } );
	};

	const updateSelectOption = ( index, field, value ) => {
		const next = [ ...( selectOptions || [] ) ];
		if ( ! next[ index ] ) next[ index ] = { value: '', label: '' };
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes( { selectOptions: next } );
	};

	const removeSelectOption = ( index ) => {
		const next = ( selectOptions || [] ).filter( ( _, i ) => i !== index );
		setAttributes( {
			selectOptions: next.length ? next : [ DEFAULT_OPTION ],
		} );
	};

	const options =
		Array.isArray( selectOptions ) && selectOptions.length
			? selectOptions
			: [ DEFAULT_OPTION ];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Left column (Intro)', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Meta title', 'mk-builder' ) }
							value={ metaTitle }
							onChange={ ( v ) =>
								setAttributes( { metaTitle: v } )
							}
						/>

						<TextControl
							label={ __( 'Title line 1', 'mk-builder' ) }
							value={ mainTitleLine1 }
							onChange={ ( v ) =>
								setAttributes( { mainTitleLine1: v } )
							}
						/>

						<TextControl
							label={ __(
								'Title highlight word',
								'mk-builder'
							) }
							value={ mainTitleHighlight }
							onChange={ ( v ) =>
								setAttributes( { mainTitleHighlight: v } )
							}
						/>

						<TextControl
							label={ __( 'Title line 2', 'mk-builder' ) }
							value={ mainTitleLine2 }
							onChange={ ( v ) =>
								setAttributes( { mainTitleLine2: v } )
							}
						/>

						<TextControl
							label={ __( 'Main description', 'mk-builder' ) }
							value={ mainDescription }
							onChange={ ( v ) =>
								setAttributes( { mainDescription: v } )
							}
							multiline
							rows={ 4 }
						/>

						<TextControl
							label={ __(
								'Sub text (with icon)',
								'mk-builder'
							) }
							value={ subText }
							onChange={ ( v ) =>
								setAttributes( { subText: v } )
							}
						/>

						<TextControl
							label={ __(
								'Icon class (e.g. fas fa-mobile-alt)',
								'mk-builder'
							) }
							value={ iconClass }
							onChange={ ( v ) =>
								setAttributes( { iconClass: v } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Booking card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Card meta title', 'mk-builder' ) }
							value={ bookingMetaTitle }
							onChange={ ( v ) =>
								setAttributes( { bookingMetaTitle: v } )
							}
						/>

						<TextControl
							label={ __( 'Card title', 'mk-builder' ) }
							value={ bookingTitle }
							onChange={ ( v ) =>
								setAttributes( { bookingTitle: v } )
							}
						/>

						<TextControl
							label={ __( 'Card description', 'mk-builder' ) }
							value={ bookingDescription }
							onChange={ ( v ) =>
								setAttributes( { bookingDescription: v } )
							}
							multiline
							rows={ 3 }
						/>

						<Divider />
						<BaseControl
							label={ __(
								'Select dropdown options',
								'mk-builder'
							) }
							help={ __(
								'First option is used as placeholder. Value is submitted; label is shown.',
								'mk-builder'
							) }
						>
							{ ( options || [] ).map( ( opt, i ) => (
								<div
									key={ i }
									style={ {
										marginBottom: 12,
										paddingBottom: 12,
										borderBottom: '1px solid #ddd',
										display: 'flex',
										flexDirection: 'column',
										gap: 8,
									} }
								>
									<div
										style={ {
											display: 'flex',
											gap: 8,
											alignItems: 'center',
										} }
									>
										<TextControl
											label={ __(
												'Value',
												'mk-builder'
											) }
											value={ opt?.value ?? '' }
											onChange={ ( v ) =>
												updateSelectOption(
													i,
													'value',
													v
												)
											}
											style={ { flex: 1 } }
										/>

										<Button
											isDestructive
											isSmall
											onClick={ () =>
												removeSelectOption( i )
											}
											disabled={ options.length <= 1 }
											icon="no-alt"
											label={ __(
												'Remove option',
												'mk-builder'
											) }
										/>
									</div>
									<TextControl
										label={ __( 'Label', 'mk-builder' ) }
										value={ opt?.label ?? '' }
										onChange={ ( v ) =>
											updateSelectOption( i, 'label', v )
										}
									/>
								</div>
							) ) }
							<Button
								isSecondary
								isSmall
								onClick={ addSelectOption }
								style={ { marginTop: 8 } }
							>
								{ __( 'Add option', 'mk-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<TextControl
							label={ __(
								'Select name attribute',
								'mk-builder'
							) }
							value={ selectName }
							onChange={ ( v ) =>
								setAttributes( { selectName: v } )
							}
						/>

						<TextControl
							label={ __( 'Select aria-label', 'mk-builder' ) }
							value={ selectAriaLabel }
							onChange={ ( v ) =>
								setAttributes( { selectAriaLabel: v } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Card title color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: bookingTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											bookingTitleColor: val,
										} ),
									label: __(
										'Booking card title',
										'mk-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Section background',
								'mk-builder'
							) }
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

						<RangeControl
							label={ __( 'Padding top (px)', 'mk-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
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
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
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
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'mk-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Gap between columns (px)',
								'mk-builder'
							) }
							value={ gridGap }
							onChange={ ( v ) =>
								setAttributes( { gridGap: v } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Card & highlight', 'mk-builder' ) }
							colorSettings={ [
								{
									value: highlightColor,
									onChange: ( val ) =>
										setAttributes( {
											highlightColor: val,
										} ),
									label: __(
										'Highlight word color',
										'mk-builder'
									),
								},
								{
									value: cardBgColor,
									onChange: ( val ) =>
										setAttributes( { cardBgColor: val } ),
									label: __(
										'Card background',
										'mk-builder'
									),
								},
								{
									value: cardBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBorderColor: val,
										} ),
									label: __( 'Card border', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Card padding (px)', 'mk-builder' ) }
							value={ cardPadding }
							onChange={ ( v ) =>
								setAttributes( { cardPadding: v } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					<div className="help-content-grid" style={ gridStyle }>
						<div
							className="help-text-content"
							style={ leftColumnStyle }
						>
							<RichText
								tagName="p"
								className="meta-title"
								value={ metaTitle }
								onChange={ ( v ) =>
									setAttributes( { metaTitle: v } )
								}
								placeholder={ __(
									'Meta title…',
									'mk-builder'
								) }
							/>

							<h2
								style={ {
									marginTop: 0,
									marginBottom: 25,
									fontSize: '3.5rem',
									fontWeight: 300,
									lineHeight: 1.1,
								} }
							>
								<RichText
									tagName="span"
									value={ mainTitleLine1 }
									onChange={ ( v ) =>
										setAttributes( { mainTitleLine1: v } )
									}
									placeholder={ __(
										'Line 1',
										'mk-builder'
									) }
								/>
								<br />
								<RichText
									tagName="span"
									className="highlight-red"
									value={ mainTitleHighlight }
									onChange={ ( v ) =>
										setAttributes( {
											mainTitleHighlight: v,
										} )
									}
									placeholder={ __(
										'Highlight',
										'mk-builder'
									) }
									style={ {
										color: highlightColor,
										fontWeight: 900,
									} }
								/>{ ' ' }
								<RichText
									tagName="span"
									value={ mainTitleLine2 }
									onChange={ ( v ) =>
										setAttributes( { mainTitleLine2: v } )
									}
									placeholder={ __(
										'Line 2',
										'mk-builder'
									) }
								/>
							</h2>
							<RichText
								tagName="p"
								value={ mainDescription }
								onChange={ ( v ) =>
									setAttributes( { mainDescription: v } )
								}
								placeholder={ __(
									'Main description…',
									'mk-builder'
								) }
							/>

							<p style={ { fontSize: '0.9rem', marginTop: 10 } }>
								<i
									className={ iconClass }
									style={ { color: highlightColor } }
									aria-hidden
								/>{ ' ' }
								<RichText
									tagName="span"
									value={ subText }
									onChange={ ( v ) =>
										setAttributes( { subText: v } )
									}
									placeholder={ __(
										'Sub text…',
										'mk-builder'
									) }
								/>
							</p>
						</div>

						<div
							className="help-booking-card"
							style={ { ...cardStyle, ...rightColumnStyle } }
						>
							<RichText
								tagName="p"
								className="meta-title"
								value={ bookingMetaTitle }
								onChange={ ( v ) =>
									setAttributes( { bookingMetaTitle: v } )
								}
								placeholder={ __(
									'Card meta title…',
									'mk-builder'
								) }
							/>

							<RichText
								tagName="h3"
								value={ bookingTitle }
								onChange={ ( v ) =>
									setAttributes( { bookingTitle: v } )
								}
								placeholder={ __(
									'Book an Appointment',
									'mk-builder'
								) }
								style={ {
									color: bookingTitleColor,
									marginTop: 0,
									marginBottom: 15,
								} }
							/>

							<RichText
								tagName="p"
								value={ bookingDescription }
								onChange={ ( v ) =>
									setAttributes( { bookingDescription: v } )
								}
								placeholder={ __(
									'Card description…',
									'mk-builder'
								) }
								style={ { marginBottom: 30 } }
							/>

							<div className="custom-select-wrapper">
								<select
									name={ selectName }
									aria-label={ selectAriaLabel }
									disabled
									style={ {
										width: '100%',
										padding: '15px 20px',
										borderRadius: 30,
									} }
								>
									{ ( options || [] ).map( ( opt, i ) => (
										<option
											key={ i }
											value={ opt?.value ?? '' }
										>
											{ opt?.label ?? '' }
										</option>
									) ) }
								</select>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
