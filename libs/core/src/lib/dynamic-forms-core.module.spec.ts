import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldExpressionsBuilder } from './dynamic-form-field/dynamic-form-field-expressions.builder';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { dynamicFormsCoreConfig } from './dynamic-forms-core.config';
import { DynamicFormsCoreModule } from './dynamic-forms-core.module';

describe('DynamicFormsCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormsCoreModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('provides DYNAMIC_FORM_CONFIG',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormsCoreConfig);
    })
  );

  it('provides DynamicFormConfigService',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      expect(service.config).toEqual(dynamicFormsCoreConfig);
    })
  );

  it('provides DynamicFormBuilder',
    inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
      expect(service).toBeDefined();
    })
  );

  it('provides DynamicFormFieldExpressionsBuilder',
    inject([DynamicFormFieldExpressionsBuilder], (service: DynamicFormFieldExpressionsBuilder) => {
      expect(service).toBeDefined();
    })
  );

  it('provides DynamicFormValidationBuilder',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      expect(service).toBeDefined();
    })
  );

  it('provides DynamicFormComponentFactory',
    inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
      expect(service).toBeDefined();
    })
  );
});
