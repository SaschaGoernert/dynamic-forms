import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArrayBuilder } from './form-array/form-array.builder';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormControlBuilder } from './form-control/form-control.builder';
import { FormControlComponent } from './form-control/form-control.component';
import { FormControlFactory } from './form-control/form-control.factory';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormFieldFactory } from './form-field/form-field.factory';
import { FormGroupBuilder } from './form-group/form-group.builder';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormValidationBuilder } from './form-validation/form-validation.builder';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormConfig, FORM_CONFIG } from './form/form-config';
import { FormConfigService } from './form/form-config.service';
import { FormBuilder } from './form/form.builder';
import { FormComponent } from './form/form.component';

const defaultFormConfig: FormConfig = {
  module: 'core',
  fieldConfig: {
    types: [
      { type: 'group', component: FormGroupComponent },
      { type: 'array', component: FormArrayComponent },
      { type: 'control', component: FormControlComponent }
    ]
  },
  controlConfig: {
    defaultType: null,
    types: []
  },
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormValidationComponent
  ],
  exports: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormValidationComponent
  ],
  providers: [
    FormBuilder,
    FormGroupBuilder,
    FormArrayBuilder,
    FormControlBuilder,
    FormValidationBuilder
  ],
  entryComponents: [
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent
  ]
})
export class DynamicFormsModule {
  static forRoot(formConfig: FormConfig = defaultFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        {
          provide: FORM_CONFIG,
          useValue: formConfig,
          multi: true
        },
        FormConfigService,
        FormFieldFactory,
        FormControlFactory
      ],
    };
  }
}
