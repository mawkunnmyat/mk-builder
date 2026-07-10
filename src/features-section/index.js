import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType( 'mk/features-section', {
	edit: Edit,
	save,
} );
