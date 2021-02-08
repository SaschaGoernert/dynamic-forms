import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export interface DynamicFormArrayDefinition<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate
> extends DynamicFormFieldDefinition<Template> {
  definitionTemplate: DynamicFormFieldDefinition;
  defaultLength?: number;
  defaultValue?: any;
  children?: undefined;
  footerActions?: DynamicFormActionDefinition[];
}
