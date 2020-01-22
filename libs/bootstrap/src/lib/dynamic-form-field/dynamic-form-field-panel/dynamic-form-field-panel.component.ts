import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-field-panel',
  templateUrl: './dynamic-form-field-panel.component.html'
})
export class BsDynamicFormFieldPanelComponent extends DynamicFormFieldWrapperBase {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}
