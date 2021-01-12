import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from './dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from './dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG } from './dynamic-form-field/dynamic-form-field-type-config';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from './dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG } from './dynamic-form-input/dynamic-form-input-type-config';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library/dynamic-form-library.service';
import { DYNAMIC_FORM_VALIDATION_CONFIGS } from './dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormsModule } from './dynamic-forms.module';

describe('DynamicFormsModule', () => {
  describe('without DYNAMIC_FORM_LIBRARY provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormsModule
        ]
      });
    });

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.get(DynamicFormLibraryService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_ELEMENT_TYPES', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_TYPES', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_FIELD_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_INPUT_TYPE_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_INPUT_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPES', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormBuilder', () => {
      expect(() => TestBed.get(DynamicFormBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.get(DynamicFormEvaluationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.get(DynamicFormValidationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.get(DynamicFormValidationService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.get(DynamicFormComponentFactory)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with DYNAMIC_FORM_LIBRARY provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormsModule
        ],
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: dynamicFormLibrary
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(dynamicFormLibrary);
      })
    );

    it('provides DynamicFormLibraryService',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeTruthy();
        expect(service.library).toEqual(dynamicFormLibrary);
        expect(service.libraryNames).toEqual([ 'core' ]);
      })
    );

    it('does not provide DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_TYPE_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_FIELD_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_INPUT_TYPE_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_INPUT_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/StaticInjectorError/);
    });

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormBuilder',
      inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormEvaluationBuilder',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormComponentFactory',
      inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeTruthy();
      })
    );
  });
});
