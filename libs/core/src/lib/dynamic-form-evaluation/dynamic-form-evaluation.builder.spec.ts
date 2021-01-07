import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { dynamicFormControlEvaluatorTypes } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';

describe('DynamicFormEvaluationBuilder', () => {
  describe('with DynamicFormLibraryService', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary)
          },
          {
            provide: DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
            useValue: dynamicFormControlEvaluatorTypes
          },
          DynamicFormEvaluationBuilder
        ]
      });
    }));

    it('returns control validators being empty',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const control = <DynamicFormControl>{ definition: {} };
        const evaluators = service.createControlEvaluators(control);

        expect(evaluators).toEqual([]);
      })
    );

    it('returns control validators being empty if input type does not fit evaluator type',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const template = { input: { type: 'textbox' } };
        const evaluations = [ { key: 'select' }];
        const control = <DynamicFormControl>{ definition: { template, evaluations } };
        const evaluators = service.createControlEvaluators(control);

        expect(evaluators).toEqual([]);
      })
    );

    it('returns control validators being predefined',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const template = { input: { type: 'select' } };
        const evaluations = [ { key: 'select' }];
        const control = <DynamicFormControl>{ definition: { template, evaluations } };
        const evaluators = service.createControlEvaluators(control);

        expect(evaluators.length).toBe(1);
        expect(evaluators[0]).toBeTruthy();
      })
    );

    it('returns control validators from definition',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const template = { input: { type: 'select' } };
        const evaluations = [ { func: _field => {} }];
        const control = <DynamicFormControl>{ definition: { template, evaluations } };
        const evaluators = service.createControlEvaluators(control);

        expect(evaluators.length).toBe(1);
        expect(evaluators[0]).toBeTruthy();
      })
    );
  });
});
