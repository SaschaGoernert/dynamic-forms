import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormControlHintsModule } from './dynamic-form-control-hints/dynamic-form-control-hints.module';
import { BsDynamicFormControlLabelModule } from './dynamic-form-control-label/dynamic-form-control-label.module';
import { BsDynamicFormPanelModule } from './dynamic-form-panel/dynamic-form-panel.module';

@NgModule({
  imports: [
    CommonModule,
    BsDynamicFormControlHintsModule,
    BsDynamicFormControlLabelModule,
    BsDynamicFormPanelModule
  ]
})
export class BsDynamicFormWrapperModule {}
