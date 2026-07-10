import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType( 'mk/surgical-services-section', {
	edit: Edit,
	save,
} );
