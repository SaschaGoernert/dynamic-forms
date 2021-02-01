import { DynamicFormSelect } from '../dynamic-form-input/dynamic-form-select/dynamic-form-select';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { dynamicFormSelectEvaluatorFn } from './dynamic-form-control-evaluator-type';

describe('DynamicFormControlEvaluatorType', () => {
  it('evaluates control value of select', () => {
    const definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
      key: 'key',
      template: {
        input: {
          type: 'select',
          options: [
            { value: 'option1', label: 'Option1' },
            { value: 'option2', label: 'Option2' },
            {
              label: 'Option Group',
              items: [
                { value: 'option3', label: 'Option3' },
                { value: 'option4', label: 'Option4' }
              ]
            }
          ]
        }
      }
    };
    const form = new DynamicForm(<DynamicFormDefinition>{ children: [] } , {
      'key': 'option1'
    });
    const formControl = new DynamicFormControl<DynamicFormSelect>(form, form, definition);
    formControl.template.input.options = [
      { value: 'option1', label: 'Option1' },
      { value: 'option2', label: 'Option2' }
    ];

    dynamicFormSelectEvaluatorFn(formControl);

    expect(formControl.control.value).toBe('option1');

    formControl.template.input.options = <any[]>[
      { value: 'option2', label: 'Option2' },
      { value: 'option3', label: 'Option3' }
    ];

    dynamicFormSelectEvaluatorFn(formControl);

    expect(formControl.control.value).toBeNull();
  });
});
