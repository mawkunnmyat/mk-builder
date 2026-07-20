import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
  RichText,
  MediaPlaceholder,
  InspectorControls,
  MediaUpload } from

'@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  SelectControl,
  Button } from
'@wordpress/components';

const ALIGN_OPTIONS = [
{ label: __('Left (default layout)', 'mk-builder'), value: 'left' },
{ label: __('Center (raised)', 'mk-builder'), value: 'center' },
{ label: __('Right', 'mk-builder'), value: 'right' }];


export default function Edit({ attributes, setAttributes, isSelected }) {
  const { image, imageId, imageAlt, stat, label, cardAlign } = attributes;

  const blockProps = useStableBlockProps(() => ({
    className: `mk-third-section__card mk-third-section__card--${cardAlign}`
  }), [cardAlign]);

  return (
    <>
			{isSelected &&
      <InspectorControls>
					<PanelBody
          title={__('Card layout', 'mk-builder')}
          initialOpen={true}>

						<SelectControl
            label={__('Column style', 'mk-builder')}
            value={cardAlign}
            options={ALIGN_OPTIONS}
            onChange={(val) =>
            setAttributes({ cardAlign: val })
            }
            help={__(
              'Center card is visually offset upward on large screens.',
              'mk-builder'
            )} />

					</PanelBody>
					<PanelBody
          title={__('Image', 'mk-builder')}
          initialOpen={false}>

						<TextControl
            label={__('Image alt text', 'mk-builder')}
            value={imageAlt}
            onChange={(val) =>
            setAttributes({ imageAlt: val })
            } />


						{image &&
          <Button
            isSecondary
            isSmall
            onClick={() =>
            setAttributes({
              image: '',
              imageId: null
            })
            }>

								{__('Remove image', 'mk-builder')}
							</Button>
          }
					</PanelBody>
				</InspectorControls>
      }

			<article {...blockProps}>
				{!image ?
        <MediaPlaceholder
          icon="format-image"
          onSelect={(media) =>
          setAttributes({
            image: media.url,
            imageId: media.id,
            imageAlt: media.alt || imageAlt
          })
          }
          allowedTypes={['image']}
          multiple={false}
          labels={{
            title: __(
              'Card background image',
              'mk-builder'
            )
          }} /> :


        <MediaUpload
          onSelect={(media) =>
          setAttributes({
            image: media.url,
            imageId: media.id,
            imageAlt: media.alt || imageAlt
          })
          }
          allowedTypes={['image']}
          value={imageId}
          render={({ open }) =>
          <img
            src={image}
            alt={imageAlt || ''}
            className="mk-third-section__card-img"
            onClick={open}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (
              event.key === 'Enter' ||
              event.key === ' ')
              {
                event.preventDefault();
                open();
              }
            }} />

          } />

        }
				<div className="mk-third-section__card-content">
					<RichText
            tagName="h3"
            className="mk-third-section__stat"
            value={stat}
            onChange={(val) => setAttributes({ stat: val })}
            placeholder={__('80%', 'mk-builder')}
            allowedFormats={['core/bold']} />


					<RichText
            tagName="p"
            className="mk-third-section__label"
            value={label}
            onChange={(val) => setAttributes({ label: val })}
            placeholder={__('Label', 'mk-builder')}
            allowedFormats={[]} />

				</div>
			</article>
		</>);

}