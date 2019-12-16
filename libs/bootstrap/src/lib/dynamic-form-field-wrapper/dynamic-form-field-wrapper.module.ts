import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors/dynamic-form-control-errors.module';
import { BsDynamicFormControlHintsModule } from './dynamic-form-control-hints/dynamic-form-control-hints.module';
import { BsDynamicFormControlLabelModule } from './dynamic-form-control-label/dynamic-form-control-label.module';
import { BsDynamicFormFieldPanelModule } from './dynamic-form-field-panel/dynamic-form-field-panel.module';

@NgModule({
  imports: [
    CommonModule,
    BsDynamicFormControlErrorsModule,
    BsDynamicFormControlLabelModule,
    BsDynamicFormControlHintsModule,
    BsDynamicFormFieldPanelModule
  ]
})
export class BsDynamicFormFieldWrapperModule {}
