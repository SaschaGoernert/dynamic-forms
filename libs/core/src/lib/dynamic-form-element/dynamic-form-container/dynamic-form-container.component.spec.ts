import { async, TestBed } from '@angular/core/testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementComponent } from '../dynamic-form-element.component';
import { DynamicFormContainerDefinition } from './dynamic-form-container-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

describe('DynamicFormContainerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormElementComponent,
        DynamicFormContainerComponent
      ]
    });
  }));

  it('creates component', () => {
    const template = <DynamicFormContainerTemplate>{};
    const definition = <DynamicFormContainerDefinition>{ type: 'element', template };
    const element = new DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>(definition);
    const fixture = TestBed.createComponent(DynamicFormContainerComponent);
    const component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();

    expect(component.element).toBe(element);
  });
});
