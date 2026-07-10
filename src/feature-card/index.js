import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType( 'mk/feature-card', {
	edit: Edit,
	save,
} );
