import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useMemo, useCallback } from '@wordpress/element';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

const DEFAULT_LIST_ITEMS = [
	{
		id: '1',
		iconClass: 'fas fa-compress-arrows-alt',
		title: 'Micro Incisions',
		subtitle: 'Tiny cuts (0.5cm - 1cm) leading to better cosmetic results.',
	},
	{
		id: '2',
		iconClass: 'fas fa-running',
		title: 'Rapid Recovery',
		subtitle: 'Return to normal activities within days, not weeks.',
	},
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionClass,
		label,
		title,
		description,
		listItems = DEFAULT_LIST_ITEMS,
		buttonText,
		buttonUrl,
		buttonTarget,
		imageUrl,
		imageId,
		imageAlt,
		badgeIcon,
		badgeTitle,
		badgeSubtitle,
		containerMaxWidth,
		containerPadding,
		gridGap,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-split-section-editor',
		} ),
		[]
	);

	const containerStyle = useMemo(
		() => ( {
			maxWidth: `${ containerMaxWidth }px`,
			margin: '0 auto',
			padding: `0 ${ containerPadding }px`,
		} ),
		[ containerMaxWidth, containerPadding ]
	);

	const gridStyle = useMemo(
		() => ( {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			alignItems: 'center',
			gap: `${ gridGap }px`,
		} ),
		[ gridGap ]
	);

	const addListItem = useCallback( () => {
		const items = Array.isArray( listItems ) ? [ ...listItems ] : [];
		items.push( {
			id: String( Date.now() ),
			iconClass: 'fas fa-check',
			title: __( 'New item', 'mk-builder' ),
			subtitle: __( 'Description.', 'mk-builder' ),
		} );
		setAttributes( { listItems: items } );
	}, [ listItems, setAttributes ] );

	const removeListItem = useCallback(
		( id ) => {
			const items = (
				Array.isArray( listItems ) ? listItems : []
			).filter( ( item ) => item.id !== id );
			setAttributes( { listItems: items } );
		},
		[ listItems, setAttributes ]
	);

	const updateListItem = useCallback(
		( id, field, value ) => {
			const items = ( Array.isArray( listItems ) ? listItems : [] ).map(
				( item ) =>
					item.id === id ? { ...item, [ field ]: value } : item
			);
			setAttributes( { listItems: items } );
		},
		[ listItems, setAttributes ]
	);

	const didInitDefaultList = useRef( false );
	useEffect( () => {
		if ( didInitDefaultList.current ) {
			return;
		}
		if ( Array.isArray( listItems ) && listItems.length === 0 ) {
			didInitDefaultList.current = true;
			setAttributes( { listItems: DEFAULT_LIST_ITEMS } );
		}
	}, [ listItems, setAttributes ] );

	const items =
		Array.isArray( listItems ) && listItems.length > 0
			? listItems
			: DEFAULT_LIST_ITEMS;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'mk-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Section class', 'mk-builder' ) }
							value={ sectionClass }
							onChange={ ( v ) =>
								setAttributes( {
									sectionClass:
										v || 'section-padding split-section',
								} )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Button', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( v ) =>
								setAttributes( { buttonText: v } )
							}
						/>
						<TextControl
							label={ __( 'Button URL', 'mk-builder' ) }
							value={ buttonUrl }
							onChange={ ( v ) =>
								setAttributes( { buttonUrl: v || '#' } )
							}
						/>
						<ToggleControl
							label={ __( 'Open in new tab', 'mk-builder' ) }
							checked={ !! buttonTarget }
							onChange={ ( v ) =>
								setAttributes( { buttonTarget: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Floating badge', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Badge icon class', 'mk-builder' ) }
							value={ badgeIcon }
							onChange={ ( v ) =>
								setAttributes( {
									badgeIcon: v || 'fas fa-star',
								} )
							}
						/>
						<TextControl
							label={ __( 'Badge title', 'mk-builder' ) }
							value={ badgeTitle }
							onChange={ ( v ) =>
								setAttributes( { badgeTitle: v } )
							}
						/>
						<TextControl
							label={ __( 'Badge subtitle', 'mk-builder' ) }
							value={ badgeSubtitle }
							onChange={ ( v ) =>
								setAttributes( { badgeSubtitle: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'mk-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Grid gap (px)', 'mk-builder' ) }
							value={ gridGap }
							onChange={ ( v ) =>
								setAttributes( { gridGap: v } )
							}
							min={ 24 }
							max={ 80 }
							step={ 4 }
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
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } className={ sectionClass }>
				<div
					className="editor-label"
					style={ {
						textAlign: 'center',
						padding: '10px',
						background: '#2271b1',
						color: '#fff',
						fontWeight: '600',
						fontSize: '12px',
						textTransform: 'uppercase',
						marginBottom: '20px',
						borderRadius: '4px',
					} }
				>
					{ __( 'Split Section (Editor View)', 'mk-builder' ) }
				</div>
				<div className="container" style={ containerStyle }>
					<div className="split-grid" style={ gridStyle }>
						<div className="fade-up split-section-text">
							<RichText
								tagName="span"
								value={ label }
								onChange={ ( v ) =>
									setAttributes( { label: v } )
								}
								placeholder={ __(
									'Minimally Invasive',
									'mk-builder'
								) }
								style={ {
									color: '#80D0C7',
									fontWeight: 700,
									textTransform: 'uppercase',
									display: 'block',
								} }
							/>
							<RichText
								tagName="h2"
								value={ title }
								onChange={ ( v ) =>
									setAttributes( { title: v } )
								}
								placeholder={ __(
									'Laparoscopic Surgery',
									'mk-builder'
								) }
								style={ {
									color: 'white',
									fontSize: '2.5rem',
									marginTop: 10,
									marginBottom: 12,
								} }
							/>
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( v ) =>
									setAttributes( { description: v } )
								}
								placeholder={ __(
									'Also known as Keyhole Surgery…',
									'mk-builder'
								) }
								style={ { color: '#cbd5e1', marginBottom: 30 } }
							/>
							<ul className="lap-list">
								{ items.map( ( item ) => (
									<li key={ item.id }>
										<i
											className={
												item.iconClass || 'fas fa-check'
											}
											aria-hidden="true"
										/>
										<div>
											<input
												type="text"
												value={ item.title || '' }
												onChange={ ( e ) =>
													updateListItem(
														item.id,
														'title',
														e.target.value
													)
												}
												placeholder={ __(
													'Title',
													'mk-builder'
												) }
												style={ {
													display: 'block',
													width: '100%',
													marginBottom: 5,
													color: 'white',
													background:
														'rgba(255,255,255,0.1)',
													border: '1px solid rgba(255,255,255,0.2)',
													padding: '6px 10px',
													borderRadius: 4,
												} }
											/>
											<input
												type="text"
												value={ item.subtitle || '' }
												onChange={ ( e ) =>
													updateListItem(
														item.id,
														'subtitle',
														e.target.value
													)
												}
												placeholder={ __(
													'Subtitle',
													'mk-builder'
												) }
												style={ {
													display: 'block',
													width: '100%',
													color: '#94a3b8',
													fontSize: '0.9rem',
													background: 'transparent',
													border: 'none',
													borderBottom:
														'1px solid rgba(255,255,255,0.2)',
													padding: '4px 0',
												} }
											/>
										</div>
										<Button
											variant="secondary"
											size="small"
											isDestructive
											onClick={ () =>
												removeListItem( item.id )
											}
										>
											{ __( 'Remove', 'mk-builder' ) }
										</Button>
									</li>
								) ) }
							</ul>
							<Button
								variant="secondary"
								size="small"
								onClick={ addListItem }
								style={ { marginBottom: 20 } }
							>
								{ __( 'Add list item', 'mk-builder' ) }
							</Button>
							<a
								href={ buttonUrl || '#' }
								className="btn btn-primary"
								style={ {
									background: 'white',
									color: 'var(--secondary)',
									pointerEvents: 'none',
								} }
							>
								{ buttonText || 'Learn about Keyhole' }
							</a>
						</div>
						<div className="lap-img-container fade-up">
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt: media.alt || '',
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Right column image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div style={ { position: 'relative' } }>
									<img
										src={ imageUrl }
										alt={ imageAlt }
										style={ {
											width: '100%',
											height: 'auto',
											display: 'block',
										} }
									/>
									<div
										className="floating-badge"
										style={ {
											position: 'absolute',
											bottom: 30,
											left: -20,
											background: '#fff',
											padding: 20,
											borderRadius: 8,
											boxShadow:
												'0 10px 40px rgba(0,0,0,0.15)',
											display: 'flex',
											alignItems: 'center',
											gap: 15,
											maxWidth: 250,
										} }
									>
										<i
											className={
												badgeIcon || 'fas fa-star'
											}
											style={ {
												fontSize: '2rem',
												color: '#FF8C00',
											} }
											aria-hidden="true"
										/>
										<div>
											<strong
												style={ {
													display: 'block',
													color: 'var(--secondary)',
												} }
											>
												{ badgeTitle }
											</strong>
											<span
												style={ {
													fontSize: '0.8rem',
													color: '#64748b',
												} }
											>
												{ badgeSubtitle }
											</span>
										</div>
									</div>
									<Button
										variant="secondary"
										size="small"
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: undefined,
												imageAlt: '',
											} )
										}
										style={ { marginTop: 10 } }
									>
										{ __(
											'Remove image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
