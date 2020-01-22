import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormFieldPanelComponent } from './dynamic-form-field-panel.component';

export const matDynamicFormFieldPanelType: DynamicFormFieldWrapperType = {
  type: 'panel',
  component: MatDynamicFormFieldPanelComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    DynamicFormConfigModule.withFieldWrapper(matDynamicFormFieldPanelType)
  ],
  declarations: [
    MatDynamicFormFieldPanelComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormFieldPanelComponent
  ],
  entryComponents: [
    MatDynamicFormFieldPanelComponent
  ]
})
export class MatDynamicFormFieldPanelModule {}
