import { useStableBlockProps } from '@mk-builder/editor-utils';
import {

  useInnerBlocksProps,
  InnerBlocks } from
'@wordpress/block-editor';

const ALLOWED_BLOCKS = ['mk/feature-item'];
const TEMPLATE = [
[
'mk/feature-item',
{
  title: 'Farm Development',
  description:
  'Lorem Ipsum is simply dummy text of the printing industry.',
  iconVariant: 'growth'
}],


[
'mk/feature-item',
{
  title: 'Crop Management',
  description:
  'Lorem Ipsum is simply dummy text of the printing industry.',
  iconVariant: 'barn'
}],


[
'mk/feature-item',
{
  title: 'Soil Restoration',
  description:
  'Lorem Ipsum is simply dummy text of the printing industry.',
  iconVariant: 'soil'
}],


[
'mk/feature-item',
{
  title: 'Organic Cultivation',
  description:
  'Lorem Ipsum is simply dummy text of the printing industry.',
  iconVariant: 'organic'
}]];



export default function Edit() {
  const blockProps = useStableBlockProps(() => ({
    className:
    'mk-about__features-grid mk-about-features-grid-editor'
  }), []);
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: TEMPLATE,
    templateLock: false,
    renderAppender: InnerBlocks.ButtonBlockAppender
  });

  return <div {...innerBlocksProps} />;
}