import { useStableBlockProps } from '@mk-builder/editor-utils';
import {

  useInnerBlocksProps,
  InnerBlocks } from
'@wordpress/block-editor';

const ALLOWED_BLOCKS = ['mk/image-card'];
const TEMPLATE = [
[
'mk/image-card',
{
  variant: 'simple',
  image: '',
  alt: 'Tractor in field'
}],


[
'mk/image-card',
{
  variant: 'overlay',
  image: '',
  alt: 'Farmer in corn field',
  overlayText:
  'Agriculture nurtures life through organic growth, sustainable farming.',
  overlayButtonText: 'About Us',
  overlayButtonUrl: '#'
}]];



export default function Edit() {
  const blockProps = useStableBlockProps(() => ({
    className:
    'mk-about__images-grid mk-about-images-grid-editor'
  }), []);
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: TEMPLATE,
    templateLock: false,
    renderAppender: InnerBlocks.ButtonBlockAppender
  });

  return <div {...innerBlocksProps} />;
}