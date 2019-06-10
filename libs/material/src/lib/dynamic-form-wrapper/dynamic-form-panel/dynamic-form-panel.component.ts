import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-panel',
  templateUrl: './dynamic-form-panel.component.html',
  styleUrls: ['./dynamic-form-panel.component.scss']
})
export class MatDynamicFormPanelComponent extends DynamicFormWrapper {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}
