import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const bsDynamicFormRadioType: DynamicFormInputType = {
  library: 'bootstrap',
  type: 'radio',
  component: BsDynamicFormRadioComponent,
  wrappers: [ 'label', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormRadioType)
  ],
  declarations: [
    BsDynamicFormRadioComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormRadioComponent
  ],
  entryComponents: [
    BsDynamicFormRadioComponent
  ]
})
export class BsDynamicFormRadioModule {}
