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
import { useDoctorCardFilterOptions } from '@mk-builder/shared/use-doctor-card-filter-options';
import {
	getDepartmentLabelFromList,
	toSelectOptions,
} from '@mk-builder/shared/doctor-filter-data';

const Divider = StableDivider || ExperimentalDivider;

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	context,
	clientId,
} ) {
	const {
		doctorImage,
		doctorImageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showImage = true,
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
		showButtons = true,
		showProfileButton = true,
		showBookButton = true,
	} = attributes;

	const { departments, genders } = useDoctorCardFilterOptions(
		clientId,
		context
	);
	const departmentOptions = toSelectOptions( departments );
	const genderOptions = toSelectOptions( genders );

	const showProfile = showButtons && showProfileButton;
	const showBook = showButtons && showBookButton;
	const hasActions = showProfile || showBook;
	const isSingleAction = hasActions && showProfile !== showBook;

	const cardClassName = [
		'mk-doctor-card-item-editor',
		'doctor-card',
		showImage ? '' : 'doctor-card--no-image',
	]
		.filter( Boolean )
		.join( ' ' );

	const actionsClassName = [
		'doc-actions',
		isSingleAction ? 'doc-actions--single' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useStableBlockProps(
		() => ( {
			className: cardClassName,
		} ),
		[ cardClassName ]
	);

	const displayDeptLabel =
		departmentLabel ||
		getDepartmentLabelFromList( departmentSlug, departments );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor Image', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Image', 'mk-builder' ) }
							checked={ showImage }
							onChange={ ( val ) =>
								setAttributes( { showImage: val } )
							}
						/>

						{ showImage && (
							<>
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
												borderRadius: '6px',
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
											{ __(
												'Remove Image',
												'mk-builder'
											) }
										</Button>
									</div>
								) }
								<Divider />
								<BaseControl
									label={ __(
										'Image Height (px)',
										'mk-builder'
									) }
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
													parseInt(
														e.target.value,
														10
													) || 260,
											} )
										}
										className="components-text-control__input"
									/>
								</BaseControl>
								<SelectControl
									label={ __(
										'Object Fit',
										'mk-builder'
									) }
									value={ imageObjectFit }
									options={ [
										{
											label: __(
												'Cover',
												'mk-builder'
											),
											value: 'cover',
										},
										{
											label: __(
												'Contain',
												'mk-builder'
											),
											value: 'contain',
										},
										{
											label: __(
												'Fill',
												'mk-builder'
											),
											value: 'fill',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { imageObjectFit: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Object Position',
										'mk-builder'
									) }
									value={ imageObjectPosition }
									options={ [
										{
											label: __(
												'Top Center',
												'mk-builder'
											),
											value: 'top center',
										},
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Top',
												'mk-builder'
											),
											value: 'top',
										},
										{
											label: __(
												'Bottom',
												'mk-builder'
											),
											value: 'bottom',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											imageObjectPosition: val,
										} )
									}
								/>
							</>
						) }
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
							options={ departmentOptions }
							onChange={ ( val ) =>
								setAttributes( {
									departmentSlug: val,
									departmentLabel: getDepartmentLabelFromList(
										val,
										departments
									),
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
							options={ genderOptions }
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
						title={ __( 'Action Buttons', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Action Buttons',
								'mk-builder'
							) }
							checked={ showButtons }
							onChange={ ( val ) =>
								setAttributes( { showButtons: val } )
							}
							help={ __(
								'Turn off to hide all buttons on this card.',
								'mk-builder'
							) }
						/>

						{ showButtons && (
							<>
								<ToggleControl
									label={ __(
										'Show Profile Button',
										'mk-builder'
									) }
									checked={ showProfileButton }
									onChange={ ( val ) =>
										setAttributes( {
											showProfileButton: val,
										} )
									}
								/>

								<ToggleControl
									label={ __(
										'Show Book Button',
										'mk-builder'
									) }
									checked={ showBookButton }
									onChange={ ( val ) =>
										setAttributes( {
											showBookButton: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Links', 'mk-builder' ) }
						initialOpen={ false }
					>
						{ showButtons && showProfileButton && (
							<>
								<TextControl
									label={ __(
										'Profile URL',
										'mk-builder'
									) }
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
										setAttributes( {
											profileOpenInNewTab: val,
										} )
									}
								/>

								<TextControl
									label={ __(
										'Profile Button Text',
										'mk-builder'
									) }
									value={ profileButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											profileButtonText: val,
										} )
									}
								/>

								<Divider />
							</>
						) }

						{ showButtons && showBookButton && (
							<>
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
										setAttributes( {
											bookOpenInNewTab: val,
										} )
									}
								/>

								<TextControl
									label={ __(
										'Book Button Text',
										'mk-builder'
									) }
									value={ bookButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											bookButtonText: val,
										} )
									}
								/>
							</>
						) }

						{ ! showButtons && (
							<p style={ { margin: 0, color: '#757575' } }>
								{ __(
									'Enable action buttons to edit link settings.',
									'mk-builder'
								) }
							</p>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showImage && (
					<div
						className="doc-img-wrapper"
						style={ {
							position: 'relative',
							height: `${ imageHeight }px`,
							overflow: 'hidden',
						} }
					>
						{ doctorImage ? (
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
						) : (
							<div
								style={ {
									width: '100%',
									height: '100%',
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

						{ showBadge && badgeText && (
							<span className="doc-badge">{ badgeText }</span>
						) }
					</div>
				) }

				<div className="doc-content">
					<span className="doc-dept">{ displayDeptLabel }</span>
					<RichText
						tagName="h4"
						value={ doctorName }
						onChange={ ( val ) =>
							setAttributes( { doctorName: val } )
						}
						placeholder={ __( 'Doctor name…', 'mk-builder' ) }
						className="doc-name"
					/>

					<RichText
						tagName="p"
						value={ qualifications }
						onChange={ ( val ) =>
							setAttributes( { qualifications: val } )
						}
						placeholder={ __( 'Qualifications…', 'mk-builder' ) }
						className="doc-qual"
					/>

					{ hasActions && (
						<div className={ actionsClassName }>
							{ showProfile && (
								<a
									href={ profileUrl || '#' }
									className="jivaka-btn btn-outline"
									style={ { pointerEvents: 'none' } }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ profileButtonText }
								</a>
							) }
							{ showBook && (
								<a
									href={ bookUrl || '#' }
									className="jivaka-btn btn-primary"
									style={ { pointerEvents: 'none' } }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ bookButtonText }
								</a>
							) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
