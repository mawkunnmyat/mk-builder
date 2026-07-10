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
} from '@wordpress/components';

const ICON_PRESETS = [
	{ value: 'fas fa-brain', label: 'Brain / Neuro (fas fa-brain)' },
	{
		value: 'fas fa-microscope',
		label: 'Microscope / Lab (fas fa-microscope)',
	},
	{ value: 'fas fa-bone', label: 'Spine / Bone (fas fa-bone)' },
	{ value: 'fas fa-wave-square', label: 'EEG / EMG (fas fa-wave-square)' },
	{ value: 'fas fa-user-md', label: 'Doctor (fas fa-user-md)' },
	{
		value: 'fas fa-heartbeat',
		label: 'Emergency / Critical care (fas fa-heartbeat)',
	},
];

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const {
		iconType = 'icon',
		icon = 'fas fa-brain',
		imageUrl,
		imageId,
		title = '',
		text = '',
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'treatment-card stagger-card mk-neuro-treatment-item-editor',
		} ),
		[]
	);

	const useImage = iconType === 'image';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Treatment Card', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Use image instead of icon',
								'mk-builder'
							) }
							checked={ useImage }
							onChange={ ( val ) =>
								setAttributes( {
									iconType: val ? 'image' : 'icon',
								} )
							}
							help={ __(
								'Toggle between a Font Awesome icon or a custom image.',
								'mk-builder'
							) }
						/>

						{ ! useImage && (
							<>
								<SelectControl
									label={ __(
										'Icon preset',
										'mk-builder'
									) }
									value={ icon }
									options={ [
										{
											value: '',
											label: __(
												'Custom / None',
												'mk-builder'
											),
										},
										...ICON_PRESETS.map( ( p ) => ( {
											value: p.value,
											label: __(
												p.label,
												'mk-builder'
											),
										} ) ),
									] }
									onChange={ ( val ) =>
										setAttributes( { icon: val } )
									}
								/>

								<TextControl
									label={ __(
										'Custom icon class',
										'mk-builder'
									) }
									value={ icon }
									onChange={ ( val ) =>
										setAttributes( { icon: val } )
									}
									help={ __(
										'e.g. fas fa-brain',
										'mk-builder'
									) }
								/>
							</>
						) }
						{ useImage && (
							<div className="treatment-image-control">
								{ imageUrl ? (
									<>
										<img
											src={ imageUrl }
											alt=""
											style={ {
												width: '100%',
												borderRadius: 8,
												marginBottom: 8,
											} }
										/>

										<button
											type="button"
											className="components-button is-secondary is-small"
											onClick={ () =>
												setAttributes( {
													imageUrl: '',
													imageId: null,
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
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												imageUrl: media.url,
												imageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Treatment image',
												'mk-builder'
											),
										} }
									/>
								) }
							</div>
						) }
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ ! useImage && <i className={ icon } /> }
				{ useImage && imageUrl && (
					<img src={ imageUrl } alt="" className="treatment-media" />
				) }
				{ useImage && ! imageUrl && (
					<span className="treatment-media-placeholder">
						{ __( 'Add image in sidebar', 'mk-builder' ) }
					</span>
				) }
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Treatment title…', 'mk-builder' ) }
				/>

				<RichText
					tagName="p"
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __( 'Description…', 'mk-builder' ) }
				/>
			</div>
		</>
	);
}
