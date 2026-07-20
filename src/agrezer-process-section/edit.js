import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {

  useInnerBlocksProps,
  InspectorControls,
  RichText,
  PanelColorSettings,
  MediaPlaceholder } from
'@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  TextControl,
  BaseControl,
  Button,
  __experimentalDivider as Divider } from
'@wordpress/components';

const ALLOWED_BLOCKS = [
'mk/process-step',
'mk/process-center'];


const TEMPLATE = [
[
'mk/process-step',
{
  position: 'left',
  badgeNum: '01',
  stepTitle: 'Data-Driven Agricultural',
  stepText:
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  showCta: true,
  ctaText: 'More Details',
  ctaUrl: '#'
}],

[
'mk/process-center',
{
  alt: 'Process Wheel'
}],

[
'mk/process-step',
{
  position: 'right',
  badgeNum: '02',
  stepTitle: 'Planting Material',
  stepText:
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  showCta: false
}]];



export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerGutter,
    gridGap,
    taglineIcon,
    taglineText,
    sectionTitle,
    taglineColor,
    taglineIconColor,
    titleColor,
    titleFontSize,
    titleFontWeight,
    wreathDecorationUrl
  } = attributes;

  const wreathVar = wreathDecorationUrl ?
  `url("${String(wreathDecorationUrl).
  replace(/\\/g, '\\\\').
  replace(/"/g, '\\"')}")` :
  undefined;

  const blockProps = useStableBlockProps(() => ({
    className: `mk-process mk-process-section-editor ${
    wreathDecorationUrl ? 'has-process-wreath' : ''}`,

    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      '--mk-process-grid-gap': `${gridGap}px`,
      ...(wreathVar ? { '--mk-process-wreath': wreathVar } : {})
    }
  }), [backgroundColor, gridGap, paddingBottom, paddingTop, wreathDecorationUrl, wreathVar]);

  const containerStyle = {
    width: `min(100% - ${containerGutter * 2}px, ${containerMaxWidth}px)`,
    marginInline: 'auto',
    gap: `${gridGap}px`
  };

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: 'mk-process__container mk-process__container-editor',
      style: containerStyle
    },
    {
      allowedBlocks: ALLOWED_BLOCKS,
      template: TEMPLATE,
      templateLock: 'all'
    }
  );

  return (
    <>
			{isSelected &&
      <InspectorControls>
					<PanelBody
          title={__('Header', 'mk-builder')}
          initialOpen={true}>

						<TextControl
            label={__(
              'Tagline icon (emoji)',
              'mk-builder'
            )}
            value={taglineIcon}
            onChange={(val) =>
            setAttributes({ taglineIcon: val })
            } />


						<PanelColorSettings
            title={__('Tagline', 'mk-builder')}
            colorSettings={[
            {
              value: taglineColor,
              onChange: (val) =>
              setAttributes({ taglineColor: val }),
              label: __('Text', 'mk-builder')
            },
            {
              value: taglineIconColor,
              onChange: (val) =>
              setAttributes({
                taglineIconColor: val
              }),
              label: __('Icon', 'mk-builder')
            }]
            } />


						<Divider />
						<PanelColorSettings
            title={__('Title', 'mk-builder')}
            colorSettings={[
            {
              value: titleColor,
              onChange: (val) =>
              setAttributes({ titleColor: val }),
              label: __('Color', 'mk-builder')
            }]
            } />


						<RangeControl
            label={__('Title size (rem)', 'mk-builder')}
            value={titleFontSize}
            onChange={(val) =>
            setAttributes({ titleFontSize: val })
            }
            min={1.5}
            max={4}
            step={0.05} />


						<RangeControl
            label={__('Title weight', 'mk-builder')}
            value={titleFontWeight}
            onChange={(val) =>
            setAttributes({ titleFontWeight: val })
            }
            min={400}
            max={900}
            step={100} />

					</PanelBody>

					<PanelBody
          title={__('Badge wreath', 'mk-builder')}
          initialOpen={false}>

						<BaseControl
            label={__(
              'Wreath image (optional)',
              'mk-builder'
            )}
            help={__(
              'Upload wreath.png-style graphic behind step numbers.',
              'mk-builder'
            )}>

							{!wreathDecorationUrl ?
            <MediaPlaceholder
              onSelect={(media) =>
              setAttributes({
                wreathDecorationUrl: media.url,
                wreathDecorationId: media.id
              })
              }
              allowedTypes={['image']}
              multiple={false}
              labels={{
                title: __(
                  'Wreath decoration',
                  'mk-builder'
                )
              }} /> :


            <div>
									<img
                src={wreathDecorationUrl}
                alt=""
                style={{
                  maxWidth: '100%',
                  maxHeight: 100,
                  objectFit: 'contain'
                }} />


									<Button
                isSecondary
                isSmall
                onClick={() =>
                setAttributes({
                  wreathDecorationUrl: '',
                  wreathDecorationId: null
                })
                }>

										{__('Remove', 'mk-builder')}
									</Button>
								</div>
            }
						</BaseControl>
					</PanelBody>

					<PanelBody
          title={__('Layout', 'mk-builder')}
          initialOpen={false}>

						<PanelColorSettings
            title={__('Background', 'mk-builder')}
            colorSettings={[
            {
              value: backgroundColor,
              onChange: (val) =>
              setAttributes({
                backgroundColor: val
              }),
              label: __(
                'Section background',
                'mk-builder'
              )
            }]
            } />


						<RangeControl
            label={__('Grid gap (px)', 'mk-builder')}
            value={gridGap}
            onChange={(val) =>
            setAttributes({ gridGap: val })
            }
            min={16}
            max={48}
            step={2} />


						<RangeControl
            label={__('Max width (px)', 'mk-builder')}
            value={containerMaxWidth}
            onChange={(val) =>
            setAttributes({ containerMaxWidth: val })
            }
            min={960}
            max={1440}
            step={10} />


						<RangeControl
            label={__('Side gutter (px)', 'mk-builder')}
            value={containerGutter}
            onChange={(val) =>
            setAttributes({ containerGutter: val })
            }
            min={12}
            max={48}
            step={2} />


						<RangeControl
            label={__('Padding top (px)', 'mk-builder')}
            value={paddingTop}
            onChange={(val) =>
            setAttributes({ paddingTop: val })
            }
            min={0}
            max={160}
            step={4} />


						<RangeControl
            label={__(
              'Padding bottom (px)',
              'mk-builder'
            )}
            value={paddingBottom}
            onChange={(val) =>
            setAttributes({ paddingBottom: val })
            }
            min={0}
            max={160}
            step={4} />

					</PanelBody>
				</InspectorControls>
      }

			<section {...blockProps} aria-labelledby="mk-process-title">
				<div className="mk-process__header">
					<p
            className="mk-process__tagline"
            style={{ color: taglineColor }}>

						<span
              className="mk-process__tagline-icon"
              style={{ color: taglineIconColor }}
              aria-hidden="true">

							{taglineIcon}
						</span>
						<RichText
              tagName="span"
              value={taglineText}
              onChange={(val) =>
              setAttributes({ taglineText: val })
              }
              placeholder={__(
                'Agri Intelligence',
                'mk-builder'
              )}
              allowedFormats={[]} />

					</p>
					<RichText
            tagName="h2"
            id="mk-process-title"
            className="mk-process__title"
            value={sectionTitle}
            onChange={(val) =>
            setAttributes({ sectionTitle: val })
            }
            placeholder={__('Section title…', 'mk-builder')}
            style={{
              color: titleColor,
              fontSize: `${titleFontSize}rem`,
              fontWeight: titleFontWeight
            }} />

				</div>

				<div {...innerBlocksProps} />
			</section>
		</>);

}