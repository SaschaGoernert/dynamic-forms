import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDynamicFormPanelModule } from './dynamic-form-panel/dynamic-form-panel.module';

@NgModule({
  imports: [
    CommonModule,
    MatDynamicFormPanelModule
  ]
})
export class MatDynamicFormWrapperModule {}
