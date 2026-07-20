import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
  RichText,
  MediaPlaceholder,
  InspectorControls,
  MediaUpload,
  PanelColorSettings } from

'@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
  Button,
  SelectControl } from
'@wordpress/components';

const ICONS = {
  'diagonal-arrow':
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false">

			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>,

  'arrow-right':
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false">

			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>,

  external:
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false">

			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>,

  plus:
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false">

			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>

};

export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    image,
    imageId,
    imageAlt,
    name,
    role,
    profileUrl,
    profileOpenInNewTab,
    actionAriaLabel,
    showActionIcon = true,
    actionIconType = 'diagonal-arrow',
    actionBgColor = '#94cf37',
    actionIconColor = '#ffffff'
  } = attributes;

  const urlTrim = String(profileUrl || '').trim();
  const isRealLink = urlTrim !== '';

  const blockProps = useStableBlockProps(() => ({
    className: 'mk-team-card'
  }), []);

  const actionIcon = ICONS[actionIconType] || ICONS['diagonal-arrow'];

  const actionStyles = {
    ...(actionBgColor && { '--tw-card-action-bg': actionBgColor }),
    ...(actionIconColor && { '--tw-card-action-color': actionIconColor })
  };

  return (
    <>
			{isSelected &&
      <InspectorControls>
					<PanelBody
          title={__('Profile link', 'mk-builder')}
          initialOpen={true}>

						<TextControl
            label={__('Profile URL', 'mk-builder')}
            value={profileUrl}
            onChange={(val) =>
            setAttributes({ profileUrl: val })
            }
            help={__(
              'Leave empty to show the arrow as non-clickable (decorative).',
              'mk-builder'
            )} />


						<ToggleControl
            label={__('Open in new tab', 'mk-builder')}
            checked={profileOpenInNewTab}
            onChange={(val) =>
            setAttributes({ profileOpenInNewTab: val })
            }
            disabled={!isRealLink} />


						<TextControl
            label={__(
              'Arrow button label (screen readers)',
              'mk-builder'
            )}
            value={actionAriaLabel}
            onChange={(val) =>
            setAttributes({ actionAriaLabel: val })
            } />

					</PanelBody>

					<PanelBody
          title={__('Card Action Icon', 'mk-builder')}
          initialOpen={true}>

						<ToggleControl
            label={__('Show action icon', 'mk-builder')}
            checked={showActionIcon}
            onChange={(val) =>
            setAttributes({ showActionIcon: val })
            } />


						<SelectControl
            label={__('Icon type', 'mk-builder')}
            value={actionIconType}
            options={[
            {
              label: __(
                'Diagonal arrow',
                'mk-builder'
              ),
              value: 'diagonal-arrow'
            },
            {
              label: __('Arrow right', 'mk-builder'),
              value: 'arrow-right'
            },
            {
              label: __(
                'External link',
                'mk-builder'
              ),
              value: 'external'
            },
            {
              label: __('Plus', 'mk-builder'),
              value: 'plus'
            }]
            }
            onChange={(val) =>
            setAttributes({ actionIconType: val })
            }
            disabled={!showActionIcon} />


						<PanelColorSettings
            title={__('Action colors', 'mk-builder')}
            colorSettings={[
            {
              value: actionBgColor,
              onChange: (val) =>
              setAttributes({
                actionBgColor: val
              }),
              label: __('Background', 'mk-builder'),
              disabled: !showActionIcon
            },
            {
              value: actionIconColor,
              onChange: (val) =>
              setAttributes({
                actionIconColor: val
              }),
              label: __('Icon', 'mk-builder'),
              disabled: !showActionIcon
            }]
            } />

					</PanelBody>

					<PanelBody
          title={__('Photo', 'mk-builder')}
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
        <div
          style={{
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>

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
            labels={{
              title: __(
                'Team member photo',
                'mk-builder'
              )
            }} />

					</div> :

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
            className="mk-team-card__img"
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

				{showActionIcon && (
        isRealLink ?
        <a
          href={urlTrim}
          className="mk-team-card__action"
          aria-label={actionAriaLabel || 'View profile'}
          onClick={(e) => e.preventDefault()}
          style={actionStyles}>

							{actionIcon}
						</a> :

        <span
          className="mk-team-card__action mk-team-card__action--static"
          aria-hidden="true"
          style={actionStyles}>

							{actionIcon}
						</span>)
        }

				<div className="mk-team-card__content">
					<RichText
            tagName="h3"
            className="mk-team-card__name"
            value={name}
            onChange={(val) => setAttributes({ name: val })}
            placeholder={__('Name', 'mk-builder')}
            allowedFormats={['core/bold', 'core/italic']} />


					<RichText
            tagName="p"
            className="mk-team-card__role"
            value={role}
            onChange={(val) => setAttributes({ role: val })}
            placeholder={__('Role', 'mk-builder')}
            allowedFormats={[]} />

				</div>
			</article>
		</>);

}