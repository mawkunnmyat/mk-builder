import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		paddingTop,
		paddingBottom,
		showSidebar,
		showOverview,
		showTreatments,
		showSpecialists,
		showFaq,
		showCta,
		showNearbyAccommodation,
		nearbyAccommodationTitle,
		overviewTitle,
		overviewLead,
		overviewBody,
		overviewImageUrl,
		overviewImageId,
		treatmentsTitle,
		treatmentsIntro,
		specialistsTitle,
		specialistsViewAllText,
		specialistsViewAllUrl,
		doctor1Name,
		doctor1Role,
		doctor1ImageUrl,
		doctor1ProfileUrl,
		doctor2Name,
		doctor2Role,
		doctor2ImageUrl,
		doctor2ProfileUrl,
		doctor3Name,
		doctor3Role,
		doctor3ImageUrl,
		doctor3ProfileUrl,
		faqTitle,
		ctaTitle,
		ctaText,
		ctaButtonText,
		ctaButtonUrl,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-neuro-centre-section',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const renderImageControl = () => (
		<MediaPlaceholder
			onSelect={ ( media ) =>
				setAttributes( {
					overviewImageUrl: media.url,
					overviewImageId: media.id,
				} )
			}
			allowedTypes={ [ 'image' ] }
			multiple={ false }
			labels={ { title: __( 'Overview Image', 'mk-builder' ) } }
		/>
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Spacing', 'mk-builder' ) }
						initialOpen={ true }
					>
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
						title={ __( 'Section Visibility', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Sidebar (Clinical Centres + Emergency)',
								'mk-builder'
							) }
							checked={ showSidebar !== false }
							onChange={ ( val ) =>
								setAttributes( { showSidebar: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show Overview', 'mk-builder' ) }
							checked={ showOverview !== false }
							onChange={ ( val ) =>
								setAttributes( { showOverview: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Show Treatments & Services',
								'mk-builder'
							) }
							checked={ showTreatments !== false }
							onChange={ ( val ) =>
								setAttributes( { showTreatments: val } )
							}
							help={ __(
								'Treatment cards can be added, removed, or reordered using the + button below the grid and the block toolbar (⋮) on each card.',
								'mk-builder'
							) }
						/>

						<ToggleControl
							label={ __(
								'Show Specialists strip',
								'mk-builder'
							) }
							checked={ showSpecialists !== false }
							onChange={ ( val ) =>
								setAttributes( { showSpecialists: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show FAQs', 'mk-builder' ) }
							checked={ showFaq !== false }
							onChange={ ( val ) =>
								setAttributes( { showFaq: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show CTA banner', 'mk-builder' ) }
							checked={ showCta !== false }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Show Nearby Accommodation',
								'mk-builder'
							) }
							checked={ showNearbyAccommodation === true }
							onChange={ ( val ) =>
								setAttributes( {
									showNearbyAccommodation: val,
								} )
							}
							help={ __(
								'Add hotel/accommodation cards below CTA. Use "+" to add Mk Nearby Accommodation Item blocks.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Nearby Accommodation', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Section title', 'mk-builder' ) }
							value={ nearbyAccommodationTitle || '' }
							onChange={ ( val ) =>
								setAttributes( {
									nearbyAccommodationTitle: val,
								} )
							}
							help={ __(
								'Heading shown above the accommodation cards.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Specialists Header', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'View All Label', 'mk-builder' ) }
							value={ specialistsViewAllText }
							onChange={ ( val ) =>
								setAttributes( { specialistsViewAllText: val } )
							}
						/>

						<TextControl
							label={ __( 'View All URL', 'mk-builder' ) }
							value={ specialistsViewAllUrl }
							onChange={ ( val ) =>
								setAttributes( { specialistsViewAllUrl: val } )
							}
							help={ __(
								'Use absolute or relative URL.',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'CTA Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button Text', 'mk-builder' ) }
							value={ ctaButtonText }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonText: val } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ ctaButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonUrl: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-container layout-grid">
					{ showSidebar !== false && (
						<aside className="sidebar-wrapper sidebar-wrapper--placeholder">
							<div className="sidebar sidebar--editor-note">
								<div className="sidebar-header">
									{ __(
										'Clinical Centres Sidebar',
										'mk-builder'
									) }
								</div>
								<p className="sidebar-note">
									{ __(
										'This is a visual placeholder. On the real site, the clinical centres sidebar / emergency card will typically come from another block or theme template.',
										'mk-builder'
									) }
								</p>
							</div>
						</aside>
					) }

					<div className="main-content">
						{ showOverview !== false && (
							<div className="content-section">
								<RichText
									tagName="h2"
									value={ overviewTitle }
									onChange={ ( val ) =>
										setAttributes( { overviewTitle: val } )
									}
									placeholder={ __(
										'Overview title…',
										'mk-builder'
									) }
								/>

								<RichText
									tagName="p"
									className="lead-text"
									value={ overviewLead }
									onChange={ ( val ) =>
										setAttributes( { overviewLead: val } )
									}
									placeholder={ __(
										'Lead text…',
										'mk-builder'
									) }
								/>

								<RichText
									tagName="p"
									className="body-text"
									value={ overviewBody }
									onChange={ ( val ) =>
										setAttributes( { overviewBody: val } )
									}
									placeholder={ __(
										'Body text…',
										'mk-builder'
									) }
								/>

								<div className="overview-image">
									{ overviewImageUrl ? (
										<>
											<img
												src={ overviewImageUrl }
												alt={ __(
													'Overview',
													'mk-builder'
												) }
											/>

											<button
												type="button"
												className="components-button is-secondary is-small"
												onClick={ () =>
													setAttributes( {
														overviewImageUrl: '',
														overviewImageId: null,
													} )
												}
											>
												{ __(
													'Remove image',
													'mk-builder'
												) }
											</button>
										</>
									) : (
										renderImageControl()
									) }
								</div>
							</div>
						) }

						{ showTreatments !== false && (
							<div className="content-section fade-up neuro-treatments-section">
								<RichText
									tagName="h2"
									value={ treatmentsTitle }
									onChange={ ( val ) =>
										setAttributes( {
											treatmentsTitle: val,
										} )
									}
									placeholder={ __(
										'Treatments & Services',
										'mk-builder'
									) }
								/>

								<RichText
									tagName="p"
									className="body-text"
									value={ treatmentsIntro }
									onChange={ ( val ) =>
										setAttributes( {
											treatmentsIntro: val,
										} )
									}
									placeholder={ __(
										'Intro text for treatments…',
										'mk-builder'
									) }
								/>

								<div className="treatment-grid">
									<InnerBlocks
										__experimentalCaptureId="neuro-treatments"
										allowedBlocks={ [
											'mk/neuro-treatment-item',
										] }
										template={ [
											[
												'mk/neuro-treatment-item',
												{
													title: 'Stroke Management',
													text: 'Rapid response "Golden Hour" treatment for ischemic and hemorrhagic strokes.',
													icon: 'fas fa-brain',
												},
											],

											[
												'mk/neuro-treatment-item',
												{
													title: 'Brain Tumor Surgery',
													text: 'Precision removal of tumors using neuro-navigation systems to protect healthy tissue.',
													icon: 'fas fa-microscope',
												},
											],

											[
												'mk/neuro-treatment-item',
												{
													title: 'Spinal Surgery',
													text: 'Treatments for slipped discs, spinal stenosis, and trauma with minimally invasive techniques.',
													icon: 'fas fa-bone',
												},
											],

											[
												'mk/neuro-treatment-item',
												{
													title: 'EEG & EMG Services',
													text: 'Diagnostic testing for epilepsy, nerve damage, and muscle disorders.',
													icon: 'fas fa-wave-square',
												},
											],
										] }
										templateLock={ false }
										renderAppender={
											InnerBlocks.ButtonBlockAppender
										}
										placeholder={ __(
											'Add treatment card — use the + button to add, remove, or reorder.',
											'mk-builder'
										) }
									/>
								</div>
							</div>
						) }

						{ showSpecialists !== false && (
							<div className="content-section">
								<div className="section-header--inline">
									<RichText
										tagName="h2"
										value={ specialistsTitle }
										onChange={ ( val ) =>
											setAttributes( {
												specialistsTitle: val,
											} )
										}
										placeholder={ __(
											'Our Neuro Specialists',
											'mk-builder'
										) }
									/>

									<a
										href={ specialistsViewAllUrl }
										className="view-all-link"
									>
										{ specialistsViewAllText }
									</a>
								</div>

								<div className="dept-doctors">
									<div className="doctor-card-mini">
										<div className="doc-img-wrap">
											{ doctor1ImageUrl && (
												<img
													src={ doctor1ImageUrl }
													alt={ doctor1Name }
												/>
											) }
										</div>
										<div className="doc-info">
											<RichText
												tagName="h4"
												value={ doctor1Name }
												onChange={ ( val ) =>
													setAttributes( {
														doctor1Name: val,
													} )
												}
												placeholder={ __(
													'Doctor name…',
													'mk-builder'
												) }
											/>

											<RichText
												tagName="span"
												value={ doctor1Role }
												onChange={ ( val ) =>
													setAttributes( {
														doctor1Role: val,
													} )
												}
												placeholder={ __(
													'Role…',
													'mk-builder'
												) }
											/>

											<br />
											<a
												href={ doctor1ProfileUrl }
												className="btn-outline-dark"
											>
												{ __(
													'View Profile',
													'mk-builder'
												) }
											</a>
										</div>
									</div>

									<div className="doctor-card-mini">
										<div className="doc-img-wrap">
											{ doctor2ImageUrl && (
												<img
													src={ doctor2ImageUrl }
													alt={ doctor2Name }
												/>
											) }
										</div>
										<div className="doc-info">
											<RichText
												tagName="h4"
												value={ doctor2Name }
												onChange={ ( val ) =>
													setAttributes( {
														doctor2Name: val,
													} )
												}
											/>

											<RichText
												tagName="span"
												value={ doctor2Role }
												onChange={ ( val ) =>
													setAttributes( {
														doctor2Role: val,
													} )
												}
											/>

											<br />
											<a
												href={ doctor2ProfileUrl }
												className="btn-outline-dark"
											>
												{ __(
													'View Profile',
													'mk-builder'
												) }
											</a>
										</div>
									</div>

									<div className="doctor-card-mini">
										<div className="doc-img-wrap">
											{ doctor3ImageUrl && (
												<img
													src={ doctor3ImageUrl }
													alt={ doctor3Name }
												/>
											) }
										</div>
										<div className="doc-info">
											<RichText
												tagName="h4"
												value={ doctor3Name }
												onChange={ ( val ) =>
													setAttributes( {
														doctor3Name: val,
													} )
												}
											/>

											<RichText
												tagName="span"
												value={ doctor3Role }
												onChange={ ( val ) =>
													setAttributes( {
														doctor3Role: val,
													} )
												}
											/>

											<br />
											<a
												href={ doctor3ProfileUrl }
												className="btn-outline-dark"
											>
												{ __(
													'View Profile',
													'mk-builder'
												) }
											</a>
										</div>
									</div>
								</div>
							</div>
						) }

						{ showFaq !== false && (
							<div className="content-section neuro-faq-section">
								<RichText
									tagName="h2"
									value={ faqTitle }
									onChange={ ( val ) =>
										setAttributes( { faqTitle: val } )
									}
									placeholder={ __(
										'Common Questions',
										'mk-builder'
									) }
								/>

								<div className="neuro-faq-list">
									<InnerBlocks
										__experimentalCaptureId="neuro-faq"
										allowedBlocks={ [
											'mk/neuro-faq-item',
										] }
										template={ [
											[
												'mk/neuro-faq-item',
												{
													question:
														'What are the signs of a Stroke (FAST)?',
													answer: '<strong>F</strong>ace drooping, <strong>A</strong>rm weakness, <strong>S</strong>peech difficulty, <strong>T</strong>ime to call 09-789 101 101 immediately. Immediate treatment is crucial.',
												},
											],

											[
												'mk/neuro-faq-item',
												{
													question:
														'When should I see a doctor for a headache?',
													answer: 'You should seek medical attention if headaches are sudden and severe ("worst headache of your life"), accompanied by fever, stiff neck, confusion, vision loss, or after a head injury.',
												},
											],
										] }
										templateLock={ false }
										renderAppender={
											InnerBlocks.ButtonBlockAppender
										}
										placeholder={ __(
											'Add FAQ item — use the + button to add, remove, or reorder questions.',
											'mk-builder'
										) }
									/>
								</div>
							</div>
						) }

						{ showCta !== false && (
							<div className="neuro-cta">
								<RichText
									tagName="h3"
									value={ ctaTitle }
									onChange={ ( val ) =>
										setAttributes( { ctaTitle: val } )
									}
									placeholder={ __(
										'Expert Neurological Care',
										'mk-builder'
									) }
								/>

								<RichText
									tagName="p"
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
									placeholder={ __(
										'CTA description…',
										'mk-builder'
									) }
								/>

								<a
									href={ ctaButtonUrl }
									className="jivaka-btn btn-primary"
								>
									{ ctaButtonText }
								</a>
							</div>
						) }

						{ showNearbyAccommodation === true && (
							<div className="content-section nearby-accommodation-in-section">
								<RichText
									tagName="h2"
									className="section-title"
									value={ nearbyAccommodationTitle || '' }
									onChange={ ( val ) =>
										setAttributes( {
											nearbyAccommodationTitle: val,
										} )
									}
									placeholder={ __(
										'Nearby Accommodation',
										'mk-builder'
									) }
								/>

								<div
									className="hotel-grid"
									style={ {
										display: 'grid',
										gridTemplateColumns:
											'repeat(auto-fill, minmax(250px, 1fr))',
										gap: '20px',
										marginTop: '20px',
									} }
								>
									<InnerBlocks
										allowedBlocks={ [
											'mk/nearby-accommodation-item',
										] }
										template={ [
											[
												'mk/nearby-accommodation-item',
												{},
											],
										] }
										templateLock={ false }
										renderAppender={
											InnerBlocks.ButtonBlockAppender
										}
										placeholder={ __(
											'Add Nearby Accommodation Item — use the + button to add more hotel/accommodation cards.',
											'mk-builder'
										) }
									/>
								</div>
							</div>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
