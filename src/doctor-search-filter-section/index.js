import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import '@mk-builder/shared/doctor-filter-editor.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
