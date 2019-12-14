import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormValidationService, DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-panel',
  templateUrl: './dynamic-form-panel.component.html'
})
export class BsDynamicFormPanelComponent extends DynamicFormWrapper {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}
