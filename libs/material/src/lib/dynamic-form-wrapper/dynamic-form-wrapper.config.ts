import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { MatDynamicFormPanelComponent } from './dynamic-form-panel/dynamic-form-panel.component';

export const matDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'panel', component: MatDynamicFormPanelComponent }
  ]
};
