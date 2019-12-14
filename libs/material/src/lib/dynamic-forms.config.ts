import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';
import { matDynamicFormWrapperConfig } from './dynamic-form-wrapper/dynamic-form-wrapper.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  library: 'material',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: matDynamicFormInputConfig,
  wrapperConfig: matDynamicFormWrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
