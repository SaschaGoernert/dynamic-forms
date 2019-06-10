import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints/dynamic-form-control-hints.component';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label/dynamic-form-control-label.component';
import { BsDynamicFormPanelComponent } from './dynamic-form-panel/dynamic-form-panel.component';

export const bsDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'label', component: BsDynamicFormControlLabelComponent },
    { type: 'hints', component: BsDynamicFormControlHintsComponent },
    { type: 'panel', component: BsDynamicFormPanelComponent }
  ]
};
