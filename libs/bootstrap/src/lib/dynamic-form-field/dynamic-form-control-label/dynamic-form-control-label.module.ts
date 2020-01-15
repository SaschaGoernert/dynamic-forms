import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormControlLabelType: DynamicFormFieldWrapperType = {
  library: 'bootstrap',
  type: 'label',
  component: BsDynamicFormControlLabelComponent
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlLabelType)
  ],
  declarations: [
    BsDynamicFormControlLabelComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormControlLabelComponent
  ],
  entryComponents: [
    BsDynamicFormControlLabelComponent
  ]
})
export class BsDynamicFormControlLabelModule {}
