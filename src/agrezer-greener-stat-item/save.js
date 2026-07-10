import { useBlockProps, RichText } from '@wordpress/block-editor';
import { GreenerStatIcon } from './icons';

const mediaIconStyle = { objectFit: 'contain', display: 'block' };

export default function save( { attributes } ) {
	const { iconVariant, mediaType, mediaUrl, title, description } = attributes;
	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );
	const blockProps = useBlockProps.save( { className: 'mk-greener-stat' } );

	return (
		<article { ...blockProps }>
			{ mediaType === 'media' && mediaUrl ? (
				isVideo ? (
					<video src={ mediaUrl } autoPlay loop muted playsInline className="mk-greener-stat__icon" style={ mediaIconStyle } />
				) : (
					<img src={ mediaUrl } alt="" className="mk-greener-stat__icon" style={ mediaIconStyle } />
				)
			) : (
				<GreenerStatIcon variant={ iconVariant } />
			) }
			<RichText.Content tagName="h3" className="mk-greener-stat__title" value={ title } />
			<RichText.Content tagName="p" className="mk-greener-stat__text" value={ description } />
		</article>
	);
}
