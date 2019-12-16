import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDynamicFormFieldPanelComponent } from './dynamic-form-field-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [
    MatDynamicFormFieldPanelComponent
  ],
  entryComponents: [
    MatDynamicFormFieldPanelComponent
  ]
})
export class MatDynamicFormFieldPanelModule {}
