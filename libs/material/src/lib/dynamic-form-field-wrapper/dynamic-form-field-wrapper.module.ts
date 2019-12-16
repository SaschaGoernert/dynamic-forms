import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDynamicFormFieldPanelModule } from './dynamic-form-field-panel/dynamic-form-field-panel.module';

@NgModule({
  imports: [
    CommonModule,
    MatDynamicFormFieldPanelModule
  ]
})
export class MatDynamicFormFieldWrapperModule {}
