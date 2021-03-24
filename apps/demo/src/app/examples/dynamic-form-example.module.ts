import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormDefinitionResolver } from './dynamic-form-definition.resolver';
import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';
import { DynamicFormExampleResolver } from './dynamic-form-example.resolver';
import { DynamicFormModelResolver } from './dynamic-form-model.resolver';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [
    DynamicFormDialogComponent
  ],
  entryComponents: [
    DynamicFormDialogComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    DynamicFormExampleResolver,
    DynamicFormDefinitionResolver,
    DynamicFormModelResolver
  ]
})
export class DynamicFormExampleModule {}
