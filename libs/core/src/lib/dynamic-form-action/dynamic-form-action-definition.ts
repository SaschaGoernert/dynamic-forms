import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormActionExpressionFunc } from '../dynamic-form-expression/dynamic-form-action-expression';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export interface DynamicFormActionDefinition<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate
> extends DynamicFormElementDefinition<Template> {
  expressions?: { [key: string]: string | DynamicFormActionExpressionFunc };
  dialogDefinition?: DynamicFormDefinition;
}
