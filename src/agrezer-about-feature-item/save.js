import { useBlockProps, RichText } from '@wordpress/block-editor';
import { AboutFeatureIcon } from './icons';

const mediaIconStyle = {
	width: '50px',
	height: '50px',
	objectFit: 'contain',
};

export default function save( { attributes } ) {
	const {
		title,
		description,
		iconVariant,
		iconType,
		mediaUrl,
		mediaType,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mk-about-feature',
	} );

	const renderIcon = () => {
		if ( iconType === 'media' && mediaUrl ) {
			if ( mediaType === 'video' ) {
				return (
					<video
						className="mk-about-feature__icon"
						src={ mediaUrl }
						autoPlay
						loop
						muted
						playsInline
						style={ mediaIconStyle }
					/>
				);
			}
			return (
				<img
					className="mk-about-feature__icon"
					src={ mediaUrl }
					alt=""
					style={ mediaIconStyle }
				/>
			);
		}
		return <AboutFeatureIcon variant={ iconVariant } />;
	};

	return (
		<article { ...blockProps }>
			<div className="mk-about-feature__icon-wrap">{ renderIcon() }</div>
			<RichText.Content
				tagName="h3"
				className="mk-about-feature__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="mk-about-feature__desc"
				value={ description }
			/>
		</article>
	);
}
