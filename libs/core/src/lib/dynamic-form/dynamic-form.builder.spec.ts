import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayTemplate } from '../dynamic-form-array/dynamic-form-array-template';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormGroupTemplate } from '../dynamic-form-group/dynamic-form-group-template';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const getForm = (model) => {
    const template = <DynamicFormTemplate>{ fields: [] };
    return new DynamicForm(template, model);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder
      ]
    }).compileComponents();
  }));

  it('creates DynamicForm', inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const template = <DynamicFormTemplate>{ fields: [] };
      const model = {};
      const form = builder.createForm(template, model);

      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.template).toBe(template);
      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.fields).toBeDefined();
  }));

  it('creates DynamicFormGroup', inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
    const model = {};
    const form = getForm(model);
    const template = <DynamicFormGroupTemplate>{ key: 'group', fields: [] };
    const formGroup = builder.createFormGroup(form, form, template);

    expect(formGroup.root).toBe(form);
    expect(formGroup.parent).toBe(form);
    expect(formGroup.template).toBe(template);
    expect(formGroup.control).toBeDefined();
    expect(formGroup.fields).toBeDefined();
  }));

  it('creates DynamicFormArray', inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
    const model = {};
    const form = getForm(model);
    const template = <DynamicFormArrayTemplate>{ fields: [] };
    const formArray = builder.createFormArray(form, form, template);

    expect(formArray.root).toBe(form);
    expect(formArray.parent).toBe(form);
    expect(formArray.template).toBe(template);
    expect(formArray.control).toBeDefined();
    expect(formArray.fields).toBeDefined();
  }));

  it('creates DynamicFormControl', inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
    const model = {};
    const form = getForm(model);
    const template = <DynamicFormControlTemplate>{ };
    const formControl = builder.createFormControl(form, form, template);

    expect(formControl.root).toBe(form);
    expect(formControl.parent).toBe(form);
    expect(formControl.template).toBe(template);
    expect(formControl.control).toBeDefined();
  }));
});
