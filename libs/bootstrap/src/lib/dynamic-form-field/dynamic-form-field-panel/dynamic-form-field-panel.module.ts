import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormFieldPanelComponent } from './dynamic-form-field-panel.component';

export const bsDynamicFormFieldPanelType: DynamicFormFieldWrapperType = {
  type: 'panel',
  component: BsDynamicFormFieldPanelComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withFieldWrapper(bsDynamicFormFieldPanelType)
  ],
  declarations: [
    BsDynamicFormFieldPanelComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormFieldPanelComponent
  ],
  entryComponents: [
    BsDynamicFormFieldPanelComponent
  ]
})
export class BsDynamicFormFieldPanelModule {}
