import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
	BaseControl,
	__experimentalDivider as ExperimentalDivider,
	Divider as StableDivider,
} from '@wordpress/components';

const Divider = StableDivider || ExperimentalDivider;

const DEPARTMENT_OPTIONS = [
	{ label: __( 'Heart Centre', 'mk-builder' ), value: 'heart' },
	{ label: __( 'Neuro Centre', 'mk-builder' ), value: 'neuro' },
	{ label: __( 'Cancer Centre', 'mk-builder' ), value: 'cancer' },
	{ label: __( 'Paediatrics', 'mk-builder' ), value: 'peds' },
	{ label: __( 'General Medicine', 'mk-builder' ), value: 'general' },
	{ label: __( 'ENT', 'mk-builder' ), value: 'ent' },
	{ label: __( 'Dental', 'mk-builder' ), value: 'dental' },
];

const GENDER_OPTIONS = [
	{ label: __( 'Male', 'mk-builder' ), value: 'male' },
	{ label: __( 'Female', 'mk-builder' ), value: 'female' },
];

const getDepartmentLabel = ( slug ) => {
	const found = DEPARTMENT_OPTIONS.find( ( o ) => o.value === slug );
	return found ? found.label : slug;
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		doctorImage,
		doctorImageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showBadge,
		badgeText,
		departmentSlug,
		departmentLabel,
		doctorName,
		qualifications,
		gender,
		profileUrl,
		profileOpenInNewTab,
		bookUrl,
		bookOpenInNewTab,
		profileButtonText,
		bookButtonText,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-doctor-card-item-editor',
			style: {
				borderRadius: '10px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
			},
		} ),
		[]
	);

	const displayDeptLabel =
		departmentLabel || getDepartmentLabel( departmentSlug );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						{ ! doctorImage ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										doctorImage: media.url,
										doctorImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Doctor Photo',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ doctorImage }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: '10px',
										display: 'block',
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											doctorImage: '',
											doctorImageId: null,
										} )
									}
								>
									{ __( 'Remove Image', 'mk-builder' ) }
								</Button>
							</div>
						) }
						<Divider />
						<BaseControl
							label={ __( 'Image Height (px)', 'mk-builder' ) }
						>
							<input
								type="number"
								min={ 200 }
								max={ 400 }
								step={ 10 }
								value={ imageHeight }
								onChange={ ( e ) =>
									setAttributes( {
										imageHeight:
											parseInt( e.target.value, 10 ) ||
											260,
									} )
								}
								className="components-text-control__input"
							/>
						</BaseControl>
						<SelectControl
							label={ __( 'Object Fit', 'mk-builder' ) }
							value={ imageObjectFit }
							options={ [
								{
									label: __( 'Cover', 'mk-builder' ),
									value: 'cover',
								},
								{
									label: __( 'Contain', 'mk-builder' ),
									value: 'contain',
								},
								{
									label: __( 'Fill', 'mk-builder' ),
									value: 'fill',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imageObjectFit: val } )
							}
						/>

						<SelectControl
							label={ __( 'Object Position', 'mk-builder' ) }
							value={ imageObjectPosition }
							options={ [
								{
									label: __( 'Top Center', 'mk-builder' ),
									value: 'top center',
								},
								{
									label: __( 'Center', 'mk-builder' ),
									value: 'center',
								},
								{
									label: __( 'Top', 'mk-builder' ),
									value: 'top',
								},
								{
									label: __( 'Bottom', 'mk-builder' ),
									value: 'bottom',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { imageObjectPosition: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Availability Badge', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Badge', 'mk-builder' ) }
							checked={ showBadge }
							onChange={ ( val ) =>
								setAttributes( { showBadge: val } )
							}
						/>

						{ showBadge && (
							<TextControl
								label={ __( 'Badge Text', 'mk-builder' ) }
								value={ badgeText }
								onChange={ ( val ) =>
									setAttributes( { badgeText: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Department & Gender (for filtering)',
							'mk-builder'
						) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Department (slug)', 'mk-builder' ) }
							value={ departmentSlug }
							options={ DEPARTMENT_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( {
									departmentSlug: val,
									departmentLabel: getDepartmentLabel( val ),
								} )
							}
							help={ __(
								'Used for filter; also sets label if not custom.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Department Label (display)',
								'mk-builder'
							) }
							value={ departmentLabel }
							onChange={ ( val ) =>
								setAttributes( { departmentLabel: val } )
							}
							help={ __(
								'Override display text, e.g. "Heart Centre".',
								'mk-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Gender', 'mk-builder' ) }
							value={ gender }
							options={ GENDER_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { gender: val } )
							}
							help={ __( 'Used for filter.', 'mk-builder' ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Doctor Info', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Doctor Name', 'mk-builder' ) }
							value={ doctorName }
							onChange={ ( val ) =>
								setAttributes( { doctorName: val } )
							}
							help={ __(
								'Used for search filter and card title.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Qualifications', 'mk-builder' ) }
							value={ qualifications }
							onChange={ ( val ) =>
								setAttributes( { qualifications: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Links', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Profile URL', 'mk-builder' ) }
							value={ profileUrl }
							onChange={ ( val ) =>
								setAttributes( { profileUrl: val } )
							}
							type="url"
						/>

						<ToggleControl
							label={ __(
								'Profile: Open in new tab',
								'mk-builder'
							) }
							checked={ profileOpenInNewTab }
							onChange={ ( val ) =>
								setAttributes( { profileOpenInNewTab: val } )
							}
						/>

						<TextControl
							label={ __(
								'Profile Button Text',
								'mk-builder'
							) }
							value={ profileButtonText }
							onChange={ ( val ) =>
								setAttributes( { profileButtonText: val } )
							}
						/>

						<Divider />
						<TextControl
							label={ __( 'Book URL', 'mk-builder' ) }
							value={ bookUrl }
							onChange={ ( val ) =>
								setAttributes( { bookUrl: val } )
							}
							type="url"
						/>

						<ToggleControl
							label={ __(
								'Book: Open in new tab',
								'mk-builder'
							) }
							checked={ bookOpenInNewTab }
							onChange={ ( val ) =>
								setAttributes( { bookOpenInNewTab: val } )
							}
						/>

						<TextControl
							label={ __( 'Book Button Text', 'mk-builder' ) }
							value={ bookButtonText }
							onChange={ ( val ) =>
								setAttributes( { bookButtonText: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ doctorImage ? (
					<div
						className="doc-img-wrapper"
						style={ {
							position: 'relative',
							height: `${ imageHeight }px`,
							overflow: 'hidden',
							background: '#f0f0f0',
						} }
					>
						<img
							src={ doctorImage }
							alt={ doctorName }
							style={ {
								width: '100%',
								height: '100%',
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
							} }
						/>

						{ showBadge && badgeText && (
							<span
								className="doc-badge"
								style={ {
									position: 'absolute',
									top: 15,
									right: 15,
									background: 'rgba(255,255,255,0.9)',
									padding: '5px 10px',
									borderRadius: 20,
									fontSize: '0.7rem',
									fontWeight: 700,
									color: 'var(--primary-orange, #f48b2a)',
								} }
							>
								{ badgeText }
							</span>
						) }
					</div>
				) : (
					<div
						className="doc-img-wrapper"
						style={ {
							height: `${ imageHeight }px`,
							background: '#eee',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#999',
							fontSize: '14px',
						} }
					>
						{ __( 'Doctor photo', 'mk-builder' ) }
					</div>
				) }

				<div
					className="doc-content"
					style={ { padding: 20, textAlign: 'center' } }
				>
					<span
						className="doc-dept"
						style={ {
							color: 'var(--primary-orange, #f48b2a)',
							fontSize: '0.75rem',
							textTransform: 'uppercase',
							fontWeight: 700,
							display: 'block',
							marginBottom: 5,
						} }
					>
						{ displayDeptLabel }
					</span>
					<RichText
						tagName="h4"
						value={ doctorName }
						onChange={ ( val ) =>
							setAttributes( { doctorName: val } )
						}
						placeholder={ __( 'Doctor name…', 'mk-builder' ) }
						className="doc-name"
						style={ {
							fontSize: '1.1rem',
							fontWeight: 700,
							margin: '0 0 5px',
							color: '#212121',
						} }
					/>

					<RichText
						tagName="p"
						value={ qualifications }
						onChange={ ( val ) =>
							setAttributes( { qualifications: val } )
						}
						placeholder={ __( 'Qualifications…', 'mk-builder' ) }
						className="doc-qual"
						style={ {
							fontSize: '0.8rem',
							color: '#666',
							marginBottom: 15,
						} }
					/>

					<div
						className="doc-actions"
						style={ {
							marginTop: 'auto',
							display: 'flex',
							gap: 10,
							justifyContent: 'center',
							paddingTop: 15,
							borderTop: '1px dashed #eee',
						} }
					>
						<a
							href={ profileUrl || '#' }
							className="jivaka-btn btn-outline"
							style={ {
								flex: 1,
								fontSize: '0.7rem',
								padding: 10,
								pointerEvents: 'none',
							} }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ profileButtonText }
						</a>
						<a
							href={ bookUrl || '#' }
							className="jivaka-btn btn-primary"
							style={ {
								flex: 1,
								fontSize: '0.7rem',
								padding: 10,
								pointerEvents: 'none',
							} }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ bookButtonText }
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
