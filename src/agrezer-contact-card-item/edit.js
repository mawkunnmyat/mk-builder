import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
  RichText,
  MediaPlaceholder,
  InspectorControls } from

'@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  BaseControl,
  Button } from
'@wordpress/components';

export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    iconUrl,
    iconId,
    iconAlt,
    title,
    subtitle,
    contentType,
    linkUrl,
    linkText,
    plainText,
    cardBgColor
  } = attributes;

  const blockProps = useStableBlockProps(() => ({
    className: 'mk-contact-card',
    style: {
      backgroundColor: cardBgColor
    }
  }), [cardBgColor]);

  return (
    <>
			{isSelected &&
      <InspectorControls>
					<PanelBody
          title={__('Card', 'mk-builder')}
          initialOpen>

						{iconUrl &&
          <Button
            isDestructive
            variant="secondary"
            onClick={() =>
            setAttributes({
              iconUrl: '',
              iconId: 0
            })
            }>

								{__('Remove icon', 'mk-builder')}
							</Button>
          }
						<SelectControl
            label={__('Bottom content', 'mk-builder')}
            value={contentType}
            options={[
            {
              label: __(
                'Clickable link (tel, mail, URL)',
                'mk-builder'
              ),
              value: 'link'
            },
            {
              label: __(
                'Plain text (e.g. address)',
                'mk-builder'
              ),
              value: 'text'
            }]
            }
            onChange={(v) =>
            setAttributes({ contentType: v })
            } />


						{contentType === 'link' &&
          <>
								<TextControl
              label={__('Link URL', 'mk-builder')}
              value={linkUrl}
              onChange={(v) =>
              setAttributes({ linkUrl: v })
              }
              help={__(
                'Use tel:, mailto:, or https://',
                'mk-builder'
              )} />


								<TextControl
              label={__(
                'Link label',
                'mk-builder'
              )}
              value={linkText}
              onChange={(v) =>
              setAttributes({ linkText: v })
              } />

							</>
          }
						{contentType === 'text' &&
          <TextControl
            label={__(
              'Address / text',
              'mk-builder'
            )}
            value={plainText}
            onChange={(v) =>
            setAttributes({ plainText: v })
            } />

          }
						<BaseControl
            label={__('Card background', 'mk-builder')}>

							<input
              type="color"
              value={cardBgColor}
              onChange={(e) =>
              setAttributes({
                cardBgColor: e.target.value
              })
              } />

						</BaseControl>
						<TextControl
            label={__('Icon alt text', 'mk-builder')}
            value={iconAlt}
            onChange={(v) =>
            setAttributes({ iconAlt: v })
            } />

					</PanelBody>
				</InspectorControls>
      }

			<article {...blockProps}>
				{iconUrl ?
        <div className="mk-contact-card__icon-wrap">
						<img
            src={iconUrl}
            alt={iconAlt || ''}
            className="mk-contact-card__icon"
            width={24}
            height={24} />

					</div> :

        <div className="mk-contact-card__icon-placeholder">
						<MediaPlaceholder
            labels={{
              title: __('Icon image', 'mk-builder')
            }}
            onSelect={(media) => {
              setAttributes({
                iconUrl: media.url,
                iconId: media.id,
                iconAlt: media.alt || iconAlt
              });
            }}
            allowedTypes={['image']}
            multiple={false}
            icons={false} />

					</div>
        }
				<RichText
          tagName="h3"
          className="mk-contact-card__title"
          value={title}
          onChange={(v) => setAttributes({ title: v })}
          placeholder={__('Title', 'mk-builder')}
          allowedFormats={[]} />


				<RichText
          tagName="p"
          className="mk-contact-card__subtitle"
          value={subtitle}
          onChange={(v) => setAttributes({ subtitle: v })}
          placeholder={__('Subtitle', 'mk-builder')}
          allowedFormats={[]} />


				{contentType === 'link' ?
        <p className="mk-contact-card__link-wrap">
						<span className="mk-contact-card__link mk-contact-card__link--preview">
							{linkText ||
            linkUrl ||
            __('Link', 'mk-builder')}
						</span>
					</p> :

        <RichText
          tagName="p"
          className="mk-contact-card__text"
          value={plainText}
          onChange={(v) => setAttributes({ plainText: v })}
          placeholder={__('Plain text', 'mk-builder')}
          allowedFormats={[]} />

        }
			</article>
		</>);

}