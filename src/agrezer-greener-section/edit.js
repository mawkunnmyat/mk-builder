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
  Button,
  __experimentalDivider as Divider } from
'@wordpress/components';

const ALLOWED_BLOCKS = ['mk/stats-row', 'mk/cards-row'];

const TEMPLATE = [
[
'mk/stats-row',
{},
[
[
'mk/stat-item',
{
  iconVariant: 'growth',
  title: '80% Pure Growth',
  description:
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}],

[
'mk/stat-item',
{
  iconVariant: 'organic',
  title: '95% Organic Roots',
  description:
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}]]],



[
'mk/cards-row',
{},
[
[
'mk/image-link-card',
{
  title: 'Organic Farm Solutions',
  linkText: 'Read More',
  linkUrl: '#',
  image: '',
  alt: 'Organic farm solutions'
}],

[
'mk/image-link-card',
{
  title: 'The Eco-Friendly Farming',
  linkText: 'Read More',
  linkUrl: '#',
  image: '',
  alt: 'Eco-friendly farming'
}],

[
'mk/image-link-card',
{
  title: 'Organic Produce Supply',
  linkText: 'Read More',
  linkUrl: '#',
  image: '',
  alt: 'Organic produce supply'
}]]]];





export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerGutter,
    mainColumnGap,
    mainImage,
    mainImageAlt,
    taglineIcon,
    taglineText,
    sectionTitle,
    taglineColor,
    taglineIconColor,
    titleColor,
    titleFontSize,
    titleFontWeight
  } = attributes;

  const blockProps = useStableBlockProps(() => ({
    className: 'mk-greener mk-greener-section-editor',
    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      '--mk-greener-gap': `${mainColumnGap}px`
    }
  }), [backgroundColor, mainColumnGap, paddingBottom, paddingTop]);

  const containerStyle = {
    width: `min(100% - ${containerGutter * 2}px, ${containerMaxWidth}px)`,
    marginInline: 'auto',
    gap: `${mainColumnGap}px`
  };

  const innerBlocksProps = useInnerBlocksProps(
    { className: 'mk-greener__inner-content' },
    { allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE, templateLock: 'all' }
  );

  return (
    <>
			{isSelected &&
      <InspectorControls>
					<PanelBody title={__('Left image', 'mk-builder')} initialOpen={true}>
						<TextControl label={__('Alt text', 'mk-builder')} value={mainImageAlt} onChange={(val) => setAttributes({ mainImageAlt: val })} />
					</PanelBody>
					<PanelBody title={__('Header', 'mk-builder')} initialOpen={true}>
						<TextControl label={__('Tagline icon (emoji)', 'mk-builder')} value={taglineIcon} onChange={(val) => setAttributes({ taglineIcon: val })} />
						<PanelColorSettings
            title={__('Tagline', 'mk-builder')}
            colorSettings={[
            { value: taglineColor, onChange: (val) => setAttributes({ taglineColor: val }), label: __('Text', 'mk-builder') },
            { value: taglineIconColor, onChange: (val) => setAttributes({ taglineIconColor: val }), label: __('Icon', 'mk-builder') }]
            } />

						<Divider />
						<PanelColorSettings
            title={__('Title', 'mk-builder')}
            colorSettings={[{ value: titleColor, onChange: (val) => setAttributes({ titleColor: val }), label: __('Color', 'mk-builder') }]} />

						<RangeControl label={__('Title size (rem)', 'mk-builder')} value={titleFontSize} onChange={(val) => setAttributes({ titleFontSize: val })} min={1.5} max={4} step={0.05} />
						<RangeControl label={__('Title weight', 'mk-builder')} value={titleFontWeight} onChange={(val) => setAttributes({ titleFontWeight: val })} min={400} max={900} step={100} />
					</PanelBody>
					<PanelBody title={__('Layout', 'mk-builder')} initialOpen={false}>
						<PanelColorSettings
            title={__('Background', 'mk-builder')}
            colorSettings={[{ value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background', 'mk-builder') }]} />

						<RangeControl label={__('Column gap (px)', 'mk-builder')} value={mainColumnGap} onChange={(val) => setAttributes({ mainColumnGap: val })} min={24} max={96} step={4} />
						<RangeControl label={__('Max width (px)', 'mk-builder')} value={containerMaxWidth} onChange={(val) => setAttributes({ containerMaxWidth: val })} min={960} max={1440} step={10} />
						<RangeControl label={__('Side gutter (px)', 'mk-builder')} value={containerGutter} onChange={(val) => setAttributes({ containerGutter: val })} min={12} max={48} step={2} />
						<RangeControl label={__('Padding top (px)', 'mk-builder')} value={paddingTop} onChange={(val) => setAttributes({ paddingTop: val })} min={0} max={160} step={4} />
						<RangeControl label={__('Padding bottom (px)', 'mk-builder')} value={paddingBottom} onChange={(val) => setAttributes({ paddingBottom: val })} min={0} max={160} step={4} />
					</PanelBody>
				</InspectorControls>
      }

			<section {...blockProps} aria-labelledby="mk-greener-title">
				<div className="mk-greener__container" style={containerStyle}>
					<div className="mk-greener__left">
						{!mainImage ?
            <MediaPlaceholder onSelect={(media) => setAttributes({ mainImage: media.url, mainImageId: media.id })} allowedTypes={['image']} multiple={false} labels={{ title: __('Main image (farmer)', 'mk-builder') }} /> :

            <div className="mk-greener__left-inner">
								<img src={mainImage} className="mk-greener__main-img" alt="" />
								<Button isSecondary isSmall onClick={() => setAttributes({ mainImage: '', mainImageId: null })}>
									{__('Replace image', 'mk-builder')}
								</Button>
							</div>
            }
					</div>

					<div className="mk-greener__right">
						<header className="mk-greener__header">
							<p className="mk-greener__tagline" style={{ color: taglineColor }}>
								<span className="mk-greener__tagline-icon" style={{ color: taglineIconColor }} aria-hidden="true">{taglineIcon}</span>
								<RichText tagName="span" value={taglineText} onChange={(val) => setAttributes({ taglineText: val })} placeholder={__('Agro Excellence', 'mk-builder')} allowedFormats={[]} />
							</p>
							<RichText tagName="h2" id="mk-greener-title" className="mk-greener__title" value={sectionTitle} onChange={(val) => setAttributes({ sectionTitle: val })} placeholder={__('Title…', 'mk-builder')} style={{ color: titleColor, fontSize: `${titleFontSize}rem`, fontWeight: titleFontWeight }} />
						</header>
						<div {...innerBlocksProps} />
					</div>
				</div>
			</section>
		</>);

}