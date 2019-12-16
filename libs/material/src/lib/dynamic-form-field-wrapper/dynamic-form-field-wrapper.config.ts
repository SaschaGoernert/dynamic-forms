import { DynamicFormFieldWrapperConfig } from '@dynamic-forms/core';
import { MatDynamicFormFieldPanelComponent } from './dynamic-form-field-panel/dynamic-form-field-panel.component';

export const matDynamicFormFieldWrapperConfig: DynamicFormFieldWrapperConfig = {
  types: [
    { type: 'panel', component: MatDynamicFormFieldPanelComponent }
  ]
};
