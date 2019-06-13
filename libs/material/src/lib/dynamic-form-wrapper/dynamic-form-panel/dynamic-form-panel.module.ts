import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDynamicFormPanelComponent } from './dynamic-form-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [
    MatDynamicFormPanelComponent
  ],
  entryComponents: [
    MatDynamicFormPanelComponent
  ]
})
export class MatDynamicFormPanelModule {}
