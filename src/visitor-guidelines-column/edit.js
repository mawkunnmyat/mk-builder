import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const DOS_COLOR = '#27ae60';
const DONTS_COLOR = '#c0392b';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		columnType,
		title,
		titleIcon,
		itemIcon,
		listItems,
		titleColor,
		iconColor,
		titleFontSize,
		titleFontWeight,
		listItemFontSize,
		listItemColor,
		backgroundColor,
		borderColor,
		columnPadding,
		columnPaddingMobile,
	} = attributes;

	const effectiveTitleColor =
		titleColor || ( columnType === 'dos' ? DOS_COLOR : DONTS_COLOR );
	const effectiveIconColor =
		iconColor || ( columnType === 'dos' ? DOS_COLOR : DONTS_COLOR );
	const effectiveBg =
		backgroundColor || ( columnType === 'dos' ? '#e8f8f5' : '#fdedec' );
	const effectiveBorder =
		borderColor || ( columnType === 'dos' ? '#d1f2eb' : '#fadbd8' );

	const blockProps = useStableBlockProps(
		() => ( {
			className: `mk-visitor-guidelines-column-editor guide-col col-${ columnType } fade-up`,
			style: {
				padding: `${ columnPadding }px`,
				backgroundColor: effectiveBg,
				border: `1px solid ${ effectiveBorder }`,
				borderTop: `4px solid ${ effectiveTitleColor }`,
				borderRadius: '12px',
				'--col-accent': effectiveTitleColor,
				'--col-icon-color': effectiveIconColor,
				'--column-padding-mobile': `${ columnPaddingMobile }px`,
			},
		} ),
		[
			columnPadding,
			columnType,
			effectiveBg,
			effectiveBorder,
			effectiveTitleColor,
			effectiveIconColor,
			columnPaddingMobile,
		]
	);

	const addListItem = () => {
		const newItem = {
			id: listItems.length
				? Math.max( ...listItems.map( ( i ) => i.id ) ) + 1
				: 1,
			text: __( 'New guideline item', 'mk-builder' ),
		};
		setAttributes( { listItems: [ ...listItems, newItem ] } );
	};

	const updateListItem = ( id, text ) => {
		const updated = listItems.map( ( item ) =>
			item.id === id ? { ...item, text } : item
		);
		setAttributes( { listItems: updated } );
	};

	const removeListItem = ( id ) => {
		setAttributes( {
			listItems: listItems.filter( ( item ) => item.id !== id ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Column Type', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column Type', 'mk-builder' ) }
							value={ columnType }
							options={ [
								{
									label: __( "Do's", 'mk-builder' ),
									value: 'dos',
								},
								{
									label: __( "Don'ts", 'mk-builder' ),
									value: 'donts',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { columnType: val } )
							}
						/>

						<TextControl
							label={ __( 'Column Title', 'mk-builder' ) }
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							help={ __(
								"e.g. Do's or Don'ts",
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title Icon Class', 'mk-builder' ) }
							value={ titleIcon }
							onChange={ ( val ) =>
								setAttributes( { titleIcon: val } )
							}
							help={ __(
								'Font Awesome: fas fa-check-circle, fas fa-times-circle',
								'mk-builder'
							) }
						/>

						<TextControl
							label={ __(
								'List Item Icon Class',
								'mk-builder'
							) }
							value={ itemIcon }
							onChange={ ( val ) =>
								setAttributes( { itemIcon: val } )
							}
							help={ __(
								'Font Awesome: fas fa-check, fas fa-times',
								'mk-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Title & Icon Color',
								'mk-builder'
							) }
							colorSettings={ [
								{
									value:
										titleColor ||
										( columnType === 'dos'
											? DOS_COLOR
											: DONTS_COLOR ),
									onChange: ( val ) =>
										setAttributes( {
											titleColor: val || '',
										} ),
									label: __( 'Title Color', 'mk-builder' ),
								},
								{
									value:
										iconColor ||
										( columnType === 'dos'
											? DOS_COLOR
											: DONTS_COLOR ),
									onChange: ( val ) =>
										setAttributes( {
											iconColor: val || '',
										} ),
									label: __( 'Icon Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'mk-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'mk-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'List Items', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Guideline Items', 'mk-builder' ) }
						>
							{ listItems.map( ( item ) => (
								<div
									key={ item.id }
									style={ {
										marginBottom: '10px',
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
									} }
								>
									<TextControl
										value={ item.text }
										onChange={ ( val ) =>
											updateListItem( item.id, val )
										}
										style={ { flex: 1 } }
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeListItem( item.id )
										}
									>
										{ __( 'Remove', 'mk-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addListItem }>
								{ __( 'Add Item', 'mk-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'List Text Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: listItemColor || '#212121',
									onChange: ( val ) =>
										setAttributes( {
											listItemColor: val || '',
										} ),
									label: __( 'Text Color', 'mk-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'List Font Size (rem)',
								'mk-builder'
							) }
							value={ listItemFontSize }
							onChange={ ( val ) =>
								setAttributes( { listItemFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Column Styling', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Background & Border',
								'mk-builder'
							) }
							colorSettings={ [
								{
									value:
										backgroundColor ||
										( columnType === 'dos'
											? '#e8f8f5'
											: '#fdedec' ),
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val || '',
										} ),
									label: __( 'Background', 'mk-builder' ),
								},
								{
									value:
										borderColor ||
										( columnType === 'dos'
											? '#d1f2eb'
											: '#fadbd8' ),
									onChange: ( val ) =>
										setAttributes( {
											borderColor: val || '',
										} ),
									label: __(
										'Border Color',
										'mk-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Padding Desktop (px)',
								'mk-builder'
							) }
							value={ columnPadding }
							onChange={ ( val ) =>
								setAttributes( { columnPadding: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Padding Mobile (px)',
								'mk-builder'
							) }
							value={ columnPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { columnPaddingMobile: val } )
							}
							min={ 16 }
							max={ 40 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="guide-title"
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: effectiveTitleColor,
					} }
				>
					{ titleIcon && (
						<span className="guide-title-icon" aria-hidden="true">
							<i
								className={ titleIcon }
								style={ { color: effectiveIconColor } }
							/>
						</span>
					) }
					<RichText
						tagName="span"
						className="guide-title-text"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Column title...', 'mk-builder' ) }
					/>
				</div>

				{ listItems.length > 0 && (
					<ul className="guide-list">
						{ listItems.map( ( item ) => (
							<li key={ item.id }>
								{ itemIcon && (
									<span
										className="guide-list-icon"
										aria-hidden="true"
									>
										<i
											className={ itemIcon }
											style={ {
												color: effectiveIconColor,
											} }
										/>
									</span>
								) }
								<span
									className="guide-list-text"
									style={ {
										fontSize: `${ listItemFontSize }rem`,
										color: listItemColor || undefined,
									} }
								>
									{ item.text }
								</span>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
