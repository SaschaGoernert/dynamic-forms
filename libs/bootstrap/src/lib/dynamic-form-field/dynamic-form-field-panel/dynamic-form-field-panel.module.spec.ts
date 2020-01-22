import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { bsDynamicFormFieldPanelType, BsDynamicFormFieldPanelModule } from './dynamic-form-field-panel.module';

describe('BsDynamicFormFieldPanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormFieldPanelModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPES',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPES], (types: DynamicFormFieldWrapperTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormFieldPanelType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
