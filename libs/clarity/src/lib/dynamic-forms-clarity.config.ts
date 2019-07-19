import { DynamicFormArrayComponent, DynamicFormConfig, DynamicFormConfigService, DynamicFormGroupComponent } from '@dynamic-forms/core';
import { ClrDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { clrDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const clrDynamicFormConfig: DynamicFormConfig = {
  module: 'clarity',
  wrapperConfig: {
    types: []
  },
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: ClrDynamicFormControlComponent }
    ]
  },
  inputConfig: clrDynamicFormInputConfig,
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

export function clrDynamicFormConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === clrDynamicFormConfig.module);
  return new DynamicFormConfigService(config);
}
