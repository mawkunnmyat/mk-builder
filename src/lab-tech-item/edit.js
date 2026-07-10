import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		tag,
		title,
		description,
		bullets = [],
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lab-tech-row lab-tech-item-editor fade-up',
		} ),
		[]
	);

	const updateBullet = ( index, value ) => {
		const next = [ ...bullets ];
		next[ index ] = value;
		setAttributes( { bullets: next } );
	};

	const addBullet = () => {
		setAttributes( { bullets: [ ...bullets, '' ] } );
	};

	const removeBullet = ( index ) => {
		const next = bullets.filter( ( _, i ) => i !== index );
		setAttributes( { bullets: next } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Technology Image', 'mk-builder' ) }
						initialOpen={ true }
					>
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
									title: __( 'Tech Image', 'mk-builder' ),
								} }
							/>
						) : (
							<div>
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: 8,
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove Image', 'mk-builder' ) }
								</Button>
							</div>
						) }

						{ imageUrl && (
							<TextControl
								label={ __( 'Alt Text', 'mk-builder' ) }
								value={ imageAlt }
								onChange={ ( val ) =>
									setAttributes( { imageAlt: val } )
								}
								help={ __(
									'Describe the image for accessibility and SEO.',
									'mk-builder'
								) }
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Tag / Category Label',
								'mk-builder'
							) }
							value={ tag }
							onChange={ ( val ) =>
								setAttributes( { tag: val } )
							}
							help={ __(
								'Short label such as Immunology, Hematology, etc.',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title', 'mk-builder' ) }
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
						/>

						<Divider />

						<p style={ { fontWeight: 600, marginBottom: 8 } }>
							{ __( 'Bullet Points', 'mk-builder' ) }
						</p>

						{ bullets &&
							bullets.length > 0 &&
							bullets.map( ( item, index ) => (
								<div
									key={ index }
									style={ {
										display: 'flex',
										gap: '6px',
										marginBottom: '6px',
										alignItems: 'center',
									} }
								>
									<TextControl
										value={ item }
										onChange={ ( val ) =>
											updateBullet( index, val )
										}
										placeholder={ __(
											'Bullet text…',
											'mk-builder'
										) }
									/>

									<Button
										isSmall
										isSecondary
										onClick={ () => removeBullet( index ) }
										icon="no-alt"
										label={ __(
											'Remove bullet',
											'mk-builder'
										) }
									/>
								</div>
							) ) }

						<Button
							variant="secondary"
							isSmall
							onClick={ addBullet }
						>
							{ __( 'Add Bullet', 'mk-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="lab-tech-image-col">
					{ imageUrl ? (
						<img
							src={ imageUrl }
							alt={ imageAlt || title || '' }
							className="lab-tech-img"
						/>
					) : (
						<div
							className="lab-tech-img lab-tech-img-placeholder"
							aria-hidden="true"
						/>
					) }
				</div>

				<div className="lab-tech-content">
					{ tag && <span className="lab-tech-tag">{ tag }</span> }

					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Technology title…',
							'mk-builder'
						) }
						className="lab-tech-title"
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Short description of the equipment…',
							'mk-builder'
						) }
						className="lab-tech-description"
					/>

					{ bullets && bullets.length > 0 && (
						<ul className="lab-check-list">
							{ bullets.map( ( item, index ) => (
								<li key={ index }>
									<i
										className="fas fa-check"
										aria-hidden="true"
									/>

									<RichText
										tagName="span"
										value={ item }
										onChange={ ( val ) =>
											updateBullet( index, val )
										}
										placeholder={ __(
											'Bullet text…',
											'mk-builder'
										) }
									/>
								</li>
							) ) }
						</ul>
					) }
				</div>
			</div>
		</>
	);
}
