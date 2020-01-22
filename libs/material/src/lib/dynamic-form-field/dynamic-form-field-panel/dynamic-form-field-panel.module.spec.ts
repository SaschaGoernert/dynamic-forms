import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { matDynamicFormFieldPanelType, MatDynamicFormFieldPanelModule } from './dynamic-form-field-panel.module';

describe('MatDynamicFormFieldPanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormFieldPanelModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPES',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPES], (types: DynamicFormFieldWrapperTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormFieldPanelType);
      expect(types[0].libraryName).toEqual(matDynamicFormLibrary.name);
    })
  );
});
