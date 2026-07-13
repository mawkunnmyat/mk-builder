import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	RangeControl,
} from '@wordpress/components';
import {
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { cloneLinkList, createFooterLink } from './footer-data';
import {
	DraggableInspectorCard,
	reorderArray,
	resolveOrder,
	DEFAULT_SECTION_ORDER,
	DEFAULT_COLUMN_ORDER,
} from './footer-dnd';

const SECTION_LABELS = {
	cta: __( 'Emergency CTA', 'mk-builder' ),
	main: __( 'Main Columns', 'mk-builder' ),
	bottom: __( 'Bottom Bar', 'mk-builder' ),
};

const COLUMN_LABELS = {
	brand: __( 'Brand Column', 'mk-builder' ),
	quickLinks: __( 'Quick Links Column', 'mk-builder' ),
	departments: __( 'Departments Column', 'mk-builder' ),
	contact: __( 'Contact Column', 'mk-builder' ),
};

function rowStyle() {
	return {
		display: 'flex',
		gap: '8px',
		flexWrap: 'wrap',
		marginTop: '8px',
	};
}

function LinkListInspector( {
	title,
	items,
	onChange,
	addLabel,
	dragType,
} ) {
	const links = cloneLinkList( items );

	function updateLink( index, patch ) {
		const next = cloneLinkList( links );
		next[ index ] = { ...next[ index ], ...patch };
		onChange( next );
	}

	function addLink() {
		onChange( [ ...links, createFooterLink() ] );
	}

	function removeLink( index ) {
		onChange( links.filter( ( _, itemIndex ) => itemIndex !== index ) );
	}

	function reorderLinks( fromIndex, toIndex ) {
		onChange( reorderArray( links, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ title }</strong>
			<p style={ { margin: '8px 0', color: '#666', fontSize: '12px' } }>
				{ __( 'Drag items to reorder.', 'mk-builder' ) }
			</p>
			{ links.map( ( link, index ) => (
				<DraggableInspectorCard
					key={ `footer-link-${ index }` }
					dragType={ dragType || 'footer-inspector-link' }
					index={ index }
					onReorder={ reorderLinks }
					label={ __( 'Drag link item', 'mk-builder' ) }
				>
					<ToggleControl
						label={ __( 'Show Item', 'mk-builder' ) }
						checked={ link.enabled !== false }
						onChange={ ( value ) =>
							updateLink( index, { enabled: value } )
						}
					/>
					{ link.enabled !== false ? (
						<>
							<TextControl
								label={ __( 'Link Label', 'mk-builder' ) }
								value={ link.label || '' }
								onChange={ ( value ) =>
									updateLink( index, { label: value } )
								}
							/>
							<TextControl
								label={ __( 'Link URL', 'mk-builder' ) }
								value={ link.url || '' }
								onChange={ ( value ) =>
									updateLink( index, { url: value } )
								}
							/>
						</>
					) : null }
					<Button
						variant="secondary"
						isDestructive
						onClick={ () => removeLink( index ) }
					>
						{ __( 'Remove Link', 'mk-builder' ) }
					</Button>
				</DraggableInspectorCard>
			) ) }
			<Button variant="secondary" onClick={ addLink }>
				{ addLabel || __( 'Add Link', 'mk-builder' ) }
			</Button>
		</div>
	);
}

function SocialLinksInspector( { items, onChange } ) {
	const links = cloneLinkList( items );

	function updateLink( index, patch ) {
		const next = links.map( ( item ) => ( { ...item } ) );
		next[ index ] = { ...next[ index ], ...patch };
		onChange( next );
	}

	function reorderLinks( fromIndex, toIndex ) {
		onChange( reorderArray( links, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<p style={ { margin: '0 0 8px', color: '#666', fontSize: '12px' } }>
				{ __( 'Drag social platforms to reorder.', 'mk-builder' ) }
			</p>
			{ links.map( ( link, index ) => (
				<DraggableInspectorCard
					key={ `social-link-${ index }` }
					dragType="footer-inspector-social"
					index={ index }
					onReorder={ reorderLinks }
					label={ __( 'Drag social item', 'mk-builder' ) }
				>
					<ToggleControl
						label={
							link.ariaLabel ||
							link.platform ||
							__( 'Social Link', 'mk-builder' )
						}
						checked={ link.enabled !== false }
						onChange={ ( value ) =>
							updateLink( index, { enabled: value } )
						}
					/>
					{ link.enabled !== false ? (
						<>
							<TextControl
								label={ __( 'Platform URL', 'mk-builder' ) }
								value={ link.url || '' }
								onChange={ ( value ) =>
									updateLink( index, { url: value } )
								}
							/>
							<TextControl
								label={ __( 'Aria Label', 'mk-builder' ) }
								value={ link.ariaLabel || '' }
								onChange={ ( value ) =>
									updateLink( index, { ariaLabel: value } )
								}
							/>
							<TextControl
								label={ __( 'Icon Class', 'mk-builder' ) }
								value={ link.iconClass || '' }
								onChange={ ( value ) =>
									updateLink( index, { iconClass: value } )
								}
								help={ __(
									'Font Awesome icon class, e.g. fab fa-facebook-f',
									'mk-builder'
								) }
							/>
						</>
					) : null }
				</DraggableInspectorCard>
			) ) }
		</div>
	);
}

function OrderListInspector( {
	title,
	help,
	order,
	defaultOrder,
	labels,
	onChange,
	dragType,
} ) {
	const resolvedOrder = resolveOrder( order, defaultOrder );

	function reorderItems( fromIndex, toIndex ) {
		onChange( reorderArray( resolvedOrder, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ title }</strong>
			{ help ? (
				<p style={ { margin: '8px 0', color: '#666', fontSize: '12px' } }>
					{ help }
				</p>
			) : null }
			{ resolvedOrder.map( ( id, index ) => (
				<DraggableInspectorCard
					key={ `${ dragType }-${ id }` }
					dragType={ dragType }
					index={ index }
					onReorder={ reorderItems }
					label={ labels[ id ] || id }
				>
					<strong style={ { fontSize: '13px' } }>
						{ labels[ id ] || id }
					</strong>
				</DraggableInspectorCard>
			) ) }
		</div>
	);
}

export default function FooterInspectorControls( {
	attributes,
	setAttributes,
} ) {
	const {
		showCtaSection,
		showCtaTitle,
		ctaTitle,
		showCtaDesc,
		ctaDesc,
		showCallButton,
		callButtonText,
		callButtonUrl,
		showAppointmentButton,
		appointmentButtonText,
		appointmentButtonUrl,
		showBrandColumn,
		showLogo,
		logoUrl,
		logoImage,
		logoImageId,
		logoAlt,
		showBrandText,
		brandText,
		showSocialLinks,
		socialLinks,
		showQuickLinksColumn,
		quickLinksHeading,
		quickLinks,
		showDepartmentsColumn,
		departmentsHeading,
		departmentLinks,
		showContactColumn,
		contactHeading,
		showAddress,
		addressLabel,
		addressValue,
		showEmergencyPhone,
		emergencyLabel,
		emergencyPhone,
		showEmail,
		emailLabel,
		emailValue,
		showBottomBar,
		showCopyright,
		copyrightText,
		legalLinks,
		containerMaxWidth,
		footerMarginTop,
		footerPaddingTop,
		sectionOrder,
		columnOrder,
		contactItemOrder,
		ctaButtonOrder,
		brandBlockOrder,
		bottomBarOrder,
	} = attributes;

	function onSelectLogo( media ) {
		if ( ! media || ! media.url ) {
			return;
		}

		setAttributes( {
			logoImage: media.url,
			logoImageId: media.id,
			logoAlt: media.alt || logoAlt,
		} );
	}

	function onRemoveLogo() {
		setAttributes( {
			logoImage: '',
			logoImageId: undefined,
		} );
	}

	return (
		<>
			<PanelBody
				title={ __( 'Drag & Drop Order', 'mk-builder' ) }
				initialOpen={ true }
			>
				<p style={ { marginTop: 0, color: '#666', fontSize: '12px' } }>
					{ __(
						'Drag sections and columns here, or use the grip handles directly in the footer preview.',
						'mk-builder'
					) }
				</p>
				<OrderListInspector
					title={ __( 'Footer Sections', 'mk-builder' ) }
					order={ sectionOrder }
					defaultOrder={ DEFAULT_SECTION_ORDER }
					labels={ SECTION_LABELS }
					onChange={ ( value ) => setAttributes( { sectionOrder: value } ) }
					dragType="footer-inspector-section"
				/>
				<OrderListInspector
					title={ __( 'Main Columns', 'mk-builder' ) }
					order={ columnOrder }
					defaultOrder={ DEFAULT_COLUMN_ORDER }
					labels={ COLUMN_LABELS }
					onChange={ ( value ) => setAttributes( { columnOrder: value } ) }
					dragType="footer-inspector-column"
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Emergency CTA', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show CTA Section', 'mk-builder' ) }
					checked={ showCtaSection !== false }
					onChange={ ( value ) =>
						setAttributes( { showCtaSection: value } )
					}
				/>
				{ showCtaSection !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Title', 'mk-builder' ) }
							checked={ showCtaTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showCtaTitle: value } )
							}
						/>
						{ showCtaTitle !== false ? (
							<TextControl
								label={ __( 'CTA Title', 'mk-builder' ) }
								value={ ctaTitle }
								onChange={ ( value ) =>
									setAttributes( { ctaTitle: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Description', 'mk-builder' ) }
							checked={ showCtaDesc !== false }
							onChange={ ( value ) =>
								setAttributes( { showCtaDesc: value } )
							}
						/>
						{ showCtaDesc !== false ? (
							<TextControl
								label={ __( 'CTA Description', 'mk-builder' ) }
								value={ ctaDesc }
								onChange={ ( value ) =>
									setAttributes( { ctaDesc: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Call Button', 'mk-builder' ) }
							checked={ showCallButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showCallButton: value } )
							}
						/>
						{ showCallButton !== false ? (
							<>
								<TextControl
									label={ __( 'Call Button Text', 'mk-builder' ) }
									value={ callButtonText }
									onChange={ ( value ) =>
										setAttributes( { callButtonText: value } )
									}
								/>
								<TextControl
									label={ __( 'Call Button URL', 'mk-builder' ) }
									value={ callButtonUrl }
									onChange={ ( value ) =>
										setAttributes( { callButtonUrl: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Appointment Button', 'mk-builder' ) }
							checked={ showAppointmentButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showAppointmentButton: value } )
							}
						/>
						{ showAppointmentButton !== false ? (
							<>
								<TextControl
									label={ __(
										'Appointment Button Text',
										'mk-builder'
									) }
									value={ appointmentButtonText }
									onChange={ ( value ) =>
										setAttributes( {
											appointmentButtonText: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Appointment Button URL',
										'mk-builder'
									) }
									value={ appointmentButtonUrl }
									onChange={ ( value ) =>
										setAttributes( {
											appointmentButtonUrl: value,
										} )
									}
								/>
							</>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Brand Column', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Brand Column', 'mk-builder' ) }
					checked={ showBrandColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showBrandColumn: value } )
					}
				/>
				{ showBrandColumn !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Logo', 'mk-builder' ) }
							checked={ showLogo !== false }
							onChange={ ( value ) =>
								setAttributes( { showLogo: value } )
							}
						/>
						{ showLogo !== false ? (
							<>
								<TextControl
									label={ __( 'Logo Link URL', 'mk-builder' ) }
									value={ logoUrl }
									onChange={ ( value ) =>
										setAttributes( { logoUrl: value } )
									}
								/>
								<TextControl
									label={ __( 'Logo Alt Text', 'mk-builder' ) }
									value={ logoAlt }
									onChange={ ( value ) =>
										setAttributes( { logoAlt: value } )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ onSelectLogo }
										allowedTypes={ [ 'image' ] }
										value={ logoImageId }
										render={ ( { open } ) => (
											<div style={ { marginTop: '12px' } }>
												{ logoImage ? (
													<img
														src={ logoImage }
														alt={ logoAlt }
														style={ {
															maxWidth: '160px',
															marginBottom: '12px',
															display: 'block',
														} }
													/>
												) : null }
												<div style={ rowStyle() }>
													<Button
														variant="secondary"
														onClick={ open }
													>
														{ logoImage
															? __(
																	'Replace Logo',
																	'mk-builder'
															  )
															: __(
																	'Upload Logo',
																	'mk-builder'
															  ) }
													</Button>
													{ logoImage ? (
														<Button
															variant="link"
															isDestructive
															onClick={ onRemoveLogo }
														>
															{ __(
																'Remove Logo',
																'mk-builder'
															) }
														</Button>
													) : null }
												</div>
											</div>
										) }
									/>
								</MediaUploadCheck>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Brand Text', 'mk-builder' ) }
							checked={ showBrandText !== false }
							onChange={ ( value ) =>
								setAttributes( { showBrandText: value } )
							}
						/>
						{ showBrandText !== false ? (
							<TextControl
								label={ __( 'Brand Description', 'mk-builder' ) }
								value={ brandText }
								onChange={ ( value ) =>
									setAttributes( { brandText: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Social Links', 'mk-builder' ) }
							checked={ showSocialLinks !== false }
							onChange={ ( value ) =>
								setAttributes( { showSocialLinks: value } )
							}
						/>
						{ showSocialLinks !== false ? (
							<SocialLinksInspector
								items={ socialLinks }
								onChange={ ( value ) =>
									setAttributes( { socialLinks: value } )
								}
							/>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Quick Links', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Quick Links Column', 'mk-builder' ) }
					checked={ showQuickLinksColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showQuickLinksColumn: value } )
					}
				/>
				{ showQuickLinksColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'mk-builder' ) }
							value={ quickLinksHeading }
							onChange={ ( value ) =>
								setAttributes( { quickLinksHeading: value } )
							}
						/>
						<LinkListInspector
							title={ __( 'Quick Link Items', 'mk-builder' ) }
							items={ quickLinks }
							onChange={ ( value ) =>
								setAttributes( { quickLinks: value } )
							}
							dragType="footer-inspector-quick-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Departments', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Departments Column', 'mk-builder' ) }
					checked={ showDepartmentsColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showDepartmentsColumn: value } )
					}
				/>
				{ showDepartmentsColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'mk-builder' ) }
							value={ departmentsHeading }
							onChange={ ( value ) =>
								setAttributes( { departmentsHeading: value } )
							}
						/>
						<LinkListInspector
							title={ __( 'Department Link Items', 'mk-builder' ) }
							items={ departmentLinks }
							onChange={ ( value ) =>
								setAttributes( { departmentLinks: value } )
							}
							dragType="footer-inspector-department-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Contact Column', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Contact Column', 'mk-builder' ) }
					checked={ showContactColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showContactColumn: value } )
					}
				/>
				{ showContactColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'mk-builder' ) }
							value={ contactHeading }
							onChange={ ( value ) =>
								setAttributes( { contactHeading: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Address', 'mk-builder' ) }
							checked={ showAddress !== false }
							onChange={ ( value ) =>
								setAttributes( { showAddress: value } )
							}
						/>
						{ showAddress !== false ? (
							<>
								<TextControl
									label={ __( 'Address Label', 'mk-builder' ) }
									value={ addressLabel }
									onChange={ ( value ) =>
										setAttributes( { addressLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Address', 'mk-builder' ) }
									value={ addressValue }
									onChange={ ( value ) =>
										setAttributes( { addressValue: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Emergency Phone', 'mk-builder' ) }
							checked={ showEmergencyPhone !== false }
							onChange={ ( value ) =>
								setAttributes( { showEmergencyPhone: value } )
							}
						/>
						{ showEmergencyPhone !== false ? (
							<>
								<TextControl
									label={ __( 'Emergency Label', 'mk-builder' ) }
									value={ emergencyLabel }
									onChange={ ( value ) =>
										setAttributes( { emergencyLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Emergency Phone', 'mk-builder' ) }
									value={ emergencyPhone }
									onChange={ ( value ) =>
										setAttributes( { emergencyPhone: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Email', 'mk-builder' ) }
							checked={ showEmail !== false }
							onChange={ ( value ) =>
								setAttributes( { showEmail: value } )
							}
						/>
						{ showEmail !== false ? (
							<>
								<TextControl
									label={ __( 'Email Label', 'mk-builder' ) }
									value={ emailLabel }
									onChange={ ( value ) =>
										setAttributes( { emailLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Email Address', 'mk-builder' ) }
									value={ emailValue }
									onChange={ ( value ) =>
										setAttributes( { emailValue: value } )
									}
								/>
							</>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Bottom Bar', 'mk-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Bottom Bar', 'mk-builder' ) }
					checked={ showBottomBar !== false }
					onChange={ ( value ) =>
						setAttributes( { showBottomBar: value } )
					}
				/>
				{ showBottomBar !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Copyright', 'mk-builder' ) }
							checked={ showCopyright !== false }
							onChange={ ( value ) =>
								setAttributes( { showCopyright: value } )
							}
						/>
						{ showCopyright !== false ? (
							<TextControl
								label={ __( 'Copyright Text', 'mk-builder' ) }
								value={ copyrightText }
								onChange={ ( value ) =>
									setAttributes( { copyrightText: value } )
								}
							/>
						) : null }
						<LinkListInspector
							title={ __( 'Legal Links', 'mk-builder' ) }
							items={ legalLinks }
							onChange={ ( value ) =>
								setAttributes( { legalLinks: value } )
							}
							addLabel={ __( 'Add Legal Link', 'mk-builder' ) }
							dragType="footer-inspector-legal-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Layout', 'mk-builder' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Container Max Width (px)', 'mk-builder' ) }
					value={ containerMaxWidth }
					onChange={ ( value ) =>
						setAttributes( { containerMaxWidth: value } )
					}
					min={ 960 }
					max={ 1440 }
				/>
				<RangeControl
					label={ __( 'Footer Margin Top (px)', 'mk-builder' ) }
					value={ footerMarginTop }
					onChange={ ( value ) =>
						setAttributes( { footerMarginTop: value } )
					}
					min={ 0 }
					max={ 200 }
					help={ __(
						'Increase if floating CTA overlaps content above.',
						'mk-builder'
					) }
				/>
				<RangeControl
					label={ __( 'Footer Padding Top (px)', 'mk-builder' ) }
					value={ footerPaddingTop }
					onChange={ ( value ) =>
						setAttributes( { footerPaddingTop: value } )
					}
					min={ 0 }
					max={ 220 }
				/>
			</PanelBody>
		</>
	);
}
