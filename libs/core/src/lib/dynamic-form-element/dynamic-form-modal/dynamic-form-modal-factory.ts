import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

export function dynamicFormModalFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormField, definition: DynamicFormModalDefinition
): DynamicFormModal {
  const element = new DynamicFormModal(root, definition);
  element.initExpressions(builder.createElementExpressions(element));
  element.initElements(builder.createFormElements(root, parent, element.definition.elements));
  element.initTrigger(builder.createFormAction(root, element, element.definition.trigger));
  element.initHeaderActions(builder.createFormActions(root, element, element.definition.headerActions));
  element.initFooterActions(builder.createFormActions(root, element, element.definition.footerActions));
  return element;
}
