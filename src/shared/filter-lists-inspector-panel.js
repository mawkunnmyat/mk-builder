import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import InspectorOptionTable from '@mk-builder/shared/inspector-option-table';

export default function FilterListsInspectorPanel( {
	departments,
	genders,
	updateDepartment,
	removeDepartment,
	addDepartment,
	updateGender,
	removeGender,
	addGender,
	introText,
} ) {
	return (
		<PanelBody
			title={ __( 'Filter Dropdown Lists', 'mk-builder' ) }
			initialOpen={ true }
		>
			<p className="mk-filter-option-table__intro">
				{ introText ||
					__(
						'Shared with Doctor Search Filter and Doctor Card department/gender fields.',
						'mk-builder'
					) }
			</p>

			<h4 className="mk-filter-option-table__section-title">
				{ __( 'Departments', 'mk-builder' ) }
			</h4>
			<InspectorOptionTable
				items={ departments }
				onUpdate={ updateDepartment }
				onRemove={ removeDepartment }
				onAdd={ addDepartment }
				addLabel={ __( '+ Add', 'mk-builder' ) }
				slugHint={ __(
					'Slug must match doctor card data-dept.',
					'mk-builder'
				) }
			/>

			<h4 className="mk-filter-option-table__section-title">
				{ __( 'Genders', 'mk-builder' ) }
			</h4>
			<InspectorOptionTable
				items={ genders }
				onUpdate={ updateGender }
				onRemove={ removeGender }
				onAdd={ addGender }
				addLabel={ __( '+ Add', 'mk-builder' ) }
				slugHint={ __(
					'Slug must match doctor card data-gender.',
					'mk-builder'
				) }
			/>
		</PanelBody>
	);
}
