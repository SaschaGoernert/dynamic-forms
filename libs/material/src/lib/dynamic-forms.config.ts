import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { matDynamicFormFieldWrapperConfig } from './dynamic-form-field-wrapper/dynamic-form-field-wrapper.config';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  library: 'material',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: matDynamicFormInputConfig,
  wrapperConfig: matDynamicFormFieldWrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
