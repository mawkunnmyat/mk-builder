import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		gap,
		iconWrapBgColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-contact-cards',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	const containerStyle = {
		'--mk-contact-cols': columns,
		'--mk-contact-cols-md': columnsTablet,
		'--mk-contact-gap': `${ gap }px`,
		'--mk-icon-wrap-bg': iconWrapBgColor,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="mk-contact-cards__container"
				style={ containerStyle }
			>
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
