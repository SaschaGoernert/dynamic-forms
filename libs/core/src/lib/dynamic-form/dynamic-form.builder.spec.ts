import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionFactory } from '../dynamic-form-action/dynamic-form-action-factory';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { dynamicFormArrayFactory } from '../dynamic-form-array/dynamic-form-array-factory';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { dynamicFormControlFactory } from '../dynamic-form-control/dynamic-form-control-factory';
import { DynamicFormDictionaryDefinition } from '../dynamic-form-dictionary/dynamic-form-dictionary-definition';
import { dynamicFormDictionaryFactory } from '../dynamic-form-dictionary/dynamic-form-dictionary-factory';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementFactory } from '../dynamic-form-element/dynamic-form-element-factory';
import { DynamicFormElementTypeConfig, DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldTypeConfig, DYNAMIC_FORM_FIELD_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { dynamicFormGroupFactory } from '../dynamic-form-group/dynamic-form-group-factory';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DYNAMIC_FORM_ID_BUILDER } from './dynamic-form-id.builder';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const elementFactory: DynamicFormElementFactory =
    (builder, root, parent, definition) => builder.createFormElement(root, parent, definition);

  const elementTypes: DynamicFormElementTypeConfig = [
    { libraryName: 'test', type: 'element', factory: null, component: null },
    { libraryName: 'test', type: 'element1', factory: elementFactory, component: null }
  ];

  const fieldTypes: DynamicFormFieldTypeConfig = [
    { libraryName: 'test', type: 'field', factory: null, component: null },
    { libraryName: 'test', type: 'group', factory: dynamicFormGroupFactory, component: null },
    { libraryName: 'test', type: 'control', factory: dynamicFormControlFactory, component: null },
    { libraryName: 'test', type: 'array', factory: dynamicFormArrayFactory, component: null },
    { libraryName: 'test', type: 'dictionary', factory: dynamicFormDictionaryFactory, component: null },
  ];

  const actionFactory: DynamicFormActionFactory =
    (builder, root, parent, definition) => builder.createFormAction(root, parent, definition);

  const actionTypes: DynamicFormActionTypeConfig = [
    { libraryName: 'test', type: 'action', factory: null, component: null },
    { libraryName: 'test', type: 'action1', factory: actionFactory, component: null },
  ];

  const getForm = (model: any, references?: { [key: string]: DynamicFormElementDefinition }) => {
    const definition = <DynamicFormDefinition>{ elements: [], references };
    return new DynamicForm(definition, model);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        {
          provide: DYNAMIC_FORM_ELEMENT_TYPE_CONFIG,
          useValue: elementTypes
        },
        {
          provide: DYNAMIC_FORM_FIELD_TYPE_CONFIG,
          useValue: fieldTypes
        },
        {
          provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
          useValue: actionTypes
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: () => 'dynamic-form-id'
        },
        DynamicFormConfigService,
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormEvaluationBuilder,
        DynamicFormValidationBuilder
      ]
    });
  });

  it('throws error creating DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ elements: [ {} ] };

      expect(() => builder.createForm(definition, {})).toThrowError();
    })
  );

  it('creates DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
      const model = {};
      const form = builder.createForm(definition, model);

      expect(form.root).toBe(form);
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.template).toBe(definition.template);

      expect(form.elements).toEqual([]);
      expect(form.fields).toEqual([]);

      expect(form.headerActions).toEqual([]);
      expect(form.footerActions).toEqual([]);

      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.control.validator).toBeNull();
    })
  );

  it('creates DynamicForm including validator',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const definition = <DynamicFormDefinition>{
        template: {
          validation: {
            required: true
          }
        },
        elements: []
      };
      const form = builder.createForm(definition, model);

      expect(form.control).toBeDefined();
      expect(form.control.validator).toBeDefined();
    })
  );

  it('initializes DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = <DynamicForm>{ check: () => {} };

      spyOn(form, 'check').and.callThrough();
      spyOn(builder, 'createForm').and.returnValue(form);

      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
      const model = {};
      const formCreated = builder.initForm(definition, model);

      expect(form).toEqual(formCreated);
      expect(form.check).toHaveBeenCalledTimes(1);
      expect(builder.createForm).toHaveBeenCalledWith(definition, model);
    })
  );

  it('creates DynamicForm including DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormElementDefinition>{ type: 'element', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(0);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({});
    })
  );

  it('creates DynamicForm including DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormControlDefinition>{ key: 'key', type: 'control', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({ key: null });
    })
  );

  it('creates DynamicForm including DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormGroupDefinition>{ key: 'key', type: 'group', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicForm including DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({ key: [] });
    })
  );

  it('creates DynamicForm including DynamicFormDictionary',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormDictionaryDefinition>{ key: 'key', type: 'dictionary', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicForm including DynamicFormAction in elements',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormActionDefinition>{ type: 'action', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(0);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({});
    })
  );

  it('creates DynamicForm including DynamicFormAction in header actions',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        headerActions: [
          <DynamicFormActionDefinition>{ type: 'action', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(0);
      expect(form.fields.length).toBe(0);
      expect(form.headerActions.length).toBe(1);
      expect(form.footerActions.length).toBe(0);
      expect(form.model).toEqual({});
    })
  );

  it('creates DynamicForm including DynamicFormAction in footer actions',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        footerActions: [
          <DynamicFormActionDefinition>{ type: 'action', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(0);
      expect(form.fields.length).toBe(0);
      expect(form.headerActions.length).toBe(0);
      expect(form.footerActions.length).toBe(1);
      expect(form.model).toEqual({});
    })
  );

  it('throws error creating DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormElementDefinition>{ template: {} };

      expect(() => builder.createFormElement(form, form, definition)).toThrowError('Element type undefined is not defined');
    })
  );

  it('creates DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
      const formElement = builder.createFormElement(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('throws error creating DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormControlDefinition>{ template: {} };

      expect(() => builder.createFormControl(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{ key: 'key', type: 'control', template: { input: {} } };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.root).toBe(form);
      expect(formControl.parent).toBe(form);
      expect(formControl.definition).toBe(definition);
      expect(formControl.template).toBe(definition.template);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeNull();
    })
  );

  it('creates DynamicFormControl including validation',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{
        key: 'key',
        type: 'control',
        template: {
          input: {
            type: 'email'
          },
          validation: {
            required: true,
            email: false,
            get pattern(): boolean { return false; },
            minLength: null,
            maxLength: undefined
          }
        }
      };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeDefined();
    })
  );

  it('throws error creating DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormGroupDefinition>{ template: {} };

      expect(() => builder.createFormGroup(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormGroupDefinition>{ key: 'key', type: 'group', template: {}, elements: [] };
      const formGroup = builder.createFormGroup(form, form, definition);

      expect(formGroup.root).toBe(form);
      expect(formGroup.parent).toBe(form);
      expect(formGroup.definition).toBe(definition);
      expect(formGroup.template).toBe(definition.template);

      expect(formGroup.control).toBeDefined();
      expect(formGroup.control.validator).toBeNull();

      expect(formGroup.fields).toBeDefined();
    })
  );

  it('creates DynamicFormGroup including validator',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormGroupDefinition>{
        key: 'key',
        type: 'group',
        template: {
          validation: {
            required: true
          }
        }
      };
      const formGroup = builder.createFormGroup(form, form, definition);

      expect(formGroup.control).toBeDefined();
      expect(formGroup.control.validator).toBeDefined();
    })
  );

  it('throws error creating DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormArrayDefinition>{ template: {} };

      expect(() => builder.createFormArray(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = { key: [ {}, {} ] };
      const form = getForm(model);
      const definitionTemplate = <DynamicFormFieldDefinition>{ type: 'control' };
      const definition = <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {}, definitionTemplate };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.template).toBe(definition.template);

      expect(formArray.control).toBeDefined();
      expect(formArray.control.validator).toBeNull();

      expect(formArray.elements).toBeDefined();
      expect(formArray.fields.length).toBe(2);
      expect(formArray.fields[0].key).toBe('0');
      expect(formArray.fields[0].index).toBe(0);
      expect(formArray.fields[0].componentType).toBe('control');
      expect(formArray.fields[1].key).toBe('1');
      expect(formArray.fields[1].index).toBe(1);
      expect(formArray.fields[1].componentType).toBe('control');
    })
  );

    it('creates DynamicFormArray with definition template reference',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = { key: [ {}, {} ] };
      const form = getForm(model, { 'array-control': <DynamicFormFieldDefinition>{ type: 'control' } });
      const definitionTemplate = <DynamicFormFieldDefinition>{ reference: 'array-control' };
      const definition = <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {}, definitionTemplate };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.template).toBe(definition.template);

      expect(formArray.control).toBeDefined();
      expect(formArray.control.validator).toBeNull();

      expect(formArray.elements).toBeDefined();
      expect(formArray.fields.length).toBe(2);
      expect(formArray.fields[0].key).toBe('0');
      expect(formArray.fields[0].index).toBe(0);
      expect(formArray.fields[0].componentType).toBe('control');
      expect(formArray.fields[1].key).toBe('1');
      expect(formArray.fields[1].index).toBe(1);
      expect(formArray.fields[1].componentType).toBe('control');
    })
  );


  it('creates DynamicFormArray including validator',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormArrayDefinition>{
        key: 'key',
        type: 'array',
        template: {
          validation: {
            minLength: true,
            maxLength: false
          }
        }
      };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.control).toBeDefined();
      expect(formArray.control.validator).toBeDefined();
    })
  );

  it('throws error creating DynamicFormDictionary',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormDictionaryDefinition>{ template: {} };

      expect(() => builder.createFormDictionary(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormDictionary',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = { key: { value1: undefined, value2: undefined } };
      const form = getForm(model);
      const definitionTemplate = <DynamicFormFieldDefinition>{ type: 'control' };
      const definition = <DynamicFormDictionaryDefinition>{ key: 'key', type: 'dictionary', template: {}, definitionTemplate };
      const formDictionary = builder.createFormDictionary(form, form, definition);

      expect(formDictionary.root).toBe(form);
      expect(formDictionary.parent).toBe(form);
      expect(formDictionary.definition).toBe(definition);
      expect(formDictionary.template).toBe(definition.template);

      expect(formDictionary.control).toBeDefined();
      expect(formDictionary.control.validator).toBeNull();

      expect(formDictionary.elements).toBeDefined();
      expect(formDictionary.fields.length).toBe(2);
      expect(formDictionary.fields[0].key).toBe('value1');
      expect(formDictionary.fields[0].index).toBeUndefined();
      expect(formDictionary.fields[0].componentType).toBe('control');
      expect(formDictionary.fields[1].key).toBe('value2');
      expect(formDictionary.fields[1].index).toBeUndefined();
      expect(formDictionary.fields[1].componentType).toBe('control');
    })
  );

  it('creates DynamicFormDictionary with definition template reference',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = { key: { value1: undefined, value2: undefined } };
      const form = getForm(model, { 'dictionary-control': <DynamicFormFieldDefinition>{ type: 'control' } });
      const definitionTemplate = <DynamicFormFieldDefinition>{ reference: 'dictionary-control' };
      const definition = <DynamicFormDictionaryDefinition>{ key: 'key', type: 'dictionary', template: {}, definitionTemplate };
      const formDictionary = builder.createFormDictionary(form, form, definition);

      expect(formDictionary.root).toBe(form);
      expect(formDictionary.parent).toBe(form);
      expect(formDictionary.definition).toBe(definition);
      expect(formDictionary.template).toBe(definition.template);

      expect(formDictionary.control).toBeDefined();
      expect(formDictionary.control.validator).toBeNull();

      expect(formDictionary.elements).toBeDefined();
      expect(formDictionary.fields.length).toBe(2);
      expect(formDictionary.fields[0].key).toBe('value1');
      expect(formDictionary.fields[0].index).toBeUndefined();
      expect(formDictionary.fields[0].componentType).toBe('control');
      expect(formDictionary.fields[1].key).toBe('value2');
      expect(formDictionary.fields[1].index).toBeUndefined();
      expect(formDictionary.fields[1].componentType).toBe('control');
    })
  );

  it('creates DynamicFormDictionary including validator',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormDictionaryDefinition>{
        key: 'key',
        type: 'dictionary',
        template: {
          validation: {
            minLength: true,
            maxLength: false
          }
        }
      };
      const formDictionary = builder.createFormDictionary(form, form, definition);

      expect(formDictionary.control).toBeDefined();
      expect(formDictionary.control.validator).toBeDefined();
    })
  );

  it('throws error creating DynamicFormAction',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormActionDefinition>{ template: {} };

      expect(() => builder.createFormAction(form, form, definition)).toThrowError('Action type undefined is not defined');
    })
  );

  it('creates DynamicFormAction',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action', template: {} };
      const formAction = builder.createFormAction(form, form, definition);

      expect(formAction.definition).toBe(definition);
      expect(formAction.template).toBe(definition.template);
      expect(formAction.dialog).toBeUndefined();
    })
  );

  it('creates DynamicFormAction including dialog form',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const dialogDefinition = <DynamicFormDefinition>{ template: {} };
      const definition = <DynamicFormActionDefinition>{ type: 'action', template: {}, dialogDefinition };
      const formAction = builder.createFormAction(form, form, definition);

      expect(formAction.definition).toBe(definition);
      expect(formAction.template).toBe(definition.template);
      expect(formAction.dialog).toBeTruthy();
      expect(formAction.dialog.definition).toBe(dialogDefinition);
      expect(formAction.dialog.template).toBe(dialogDefinition.template);
    })
  );

  it('creates DynamicFormElement using default factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      spyOn(builder, 'createFormElement').and.callThrough();

      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
      const formElement = builder.createFormElementForFactory(form, form, definition);

      expect(builder.createFormElement).toHaveBeenCalledWith(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormElement using factory of provided element type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element1', template: {} };
      const formElement = builder.createFormElementForFactory(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('throws error creating DynamicFormField if field type is not provided',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormFieldDefinition>{ template: {} };

      expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('throws error creating DynamicFormField if field type does not provide factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormFieldDefinition>{ type: 'field', template: {} };

      expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Creating field of type field is not supported');
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'array', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'control', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'group', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormAction using default factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      spyOn(builder, 'createFormAction').and.callThrough();

      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action', template: {} };
      const formElement = builder.createFormActionForFactory(form, form, definition);

      expect(builder.createFormAction).toHaveBeenCalledWith(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormAction using factory of provided element type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action1', template: {} };
      const formElement = builder.createFormActionForFactory(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('getDefinition returns definition',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormElementDefinition>{};
      const result = builder.getDefinition(definition, null);

      expect(result).toBe(definition);
    })
  );

  it('getDefinition returns merged definition from references',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormElementDefinition>{ reference: 'ref', template: { className: 'className' }, expressions: { readonly: 'parent.readonly' } };
      const definitionRef = <DynamicFormElementDefinition>{ type: 'type', template: { classNameWrapper: 'classNameWrapper' } };
      const definitionRoot = <DynamicFormDefinition>{ references: { ref: definitionRef }, elements: [] };
      const root = <DynamicForm>{ definition: definitionRoot };
      const result = builder.getDefinition(definition, root);

      expect(result).toEqual({
        reference: 'ref',
        type: 'type',
        template: {
          className: 'className',
          classNameWrapper: 'classNameWrapper'
        },
        expressions: {
          readonly: 'parent.readonly'
        }
      });
    })
  );

  it('getDefinition throws if definition reference is not defined',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormElementDefinition>{ reference: 'ref' };
      const definitionRoot = <DynamicFormDefinition>{ references: {}, elements: [] };
      const root = <DynamicForm>{ definition: definitionRoot };

      expect(() => builder.getDefinition(definition, root)).toThrowError('Definition reference ref is not defined');
    })
  );

  it('getFieldId returns id from id builder',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const field = <DynamicFormField>{ settings: { autoGeneratedId: true } };
      const id = builder.getFieldId(field);

      expect(id).toBe('dynamic-form-id');
    })
  );

  it('getFieldId returns id from field',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const field = <DynamicFormField>{ id: 'dynamic-form-field-id', settings: { autoGeneratedId: true } };
      const id = builder.getFieldId(field);

      expect(id).toBe('dynamic-form-field-id');
    })
  );

  it('getActionId returns id from id builder',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const action = <DynamicFormAction>{ parent: {}, template: { action: 'action' } };
      const id = builder.getActionId(action);

      expect(id).toBe('dynamic-form-id-action');
    })
  );

  it('getActionId returns id from parent',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const action = <DynamicFormAction>{ parent: { id: 'parent-id' }, template: { action: 'action' } };
      const id = builder.getActionId(action);

      expect(id).toBe('parent-id-action');
    })
  );

  it('getActionId returns id from action',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const action = <DynamicFormAction>{ id: 'dynamic-form-action-id' };
      const id = builder.getActionId(action);

      expect(id).toBe('dynamic-form-action-id');
    })
  );
});
