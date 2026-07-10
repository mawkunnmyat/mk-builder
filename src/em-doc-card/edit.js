import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	MediaPlaceholder,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		role,
		name,
		specialty,
		showSpecialty = true,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'em-doc-card mk-em-doc-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor image', 'mk-builder' ) }
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
									title: __(
										'Doctor image',
										'mk-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									style={ {
										width: '130px',
										height: '130px',
										borderRadius: '50%',
										objectFit: 'cover',
										display: 'block',
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
									{ __( 'Remove image', 'mk-builder' ) }
								</Button>
							</div>
						) }
						<TextControl
							label={ __( 'Alt text', 'mk-builder' ) }
							value={ imageAlt || '' }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show description', 'mk-builder' ) }
							checked={ showSpecialty }
							onChange={ ( val ) =>
								setAttributes( { showSpecialty: val } )
							}
							help={ __(
								'Toggle the doctor specialty/description text.',
								'mk-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ imageUrl && (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						className="em-doc-img"
					/>
				) }
				<RichText
					tagName="span"
					className="em-doc-role"
					value={ role }
					onChange={ ( val ) => setAttributes( { role: val } ) }
					placeholder={ __(
						'Role (e.g. Head of Emergency)',
						'mk-builder'
					) }
				/>

				<RichText
					tagName="h4"
					value={ name }
					onChange={ ( val ) => setAttributes( { name: val } ) }
					placeholder={ __( 'Doctor name', 'mk-builder' ) }
				/>

				{ showSpecialty && (
					<RichText
						tagName="p"
						value={ specialty }
						onChange={ ( val ) =>
							setAttributes( { specialty: val } )
						}
						placeholder={ __(
							'Specialty / description',
							'mk-builder'
						) }
					/>
				) }
			</div>
		</>
	);
}
