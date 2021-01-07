import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from './dynamic-form-element-type-config';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormElementModule } from './dynamic-form-element.module';

@Component({
  selector: 'dynamic-element-test',
  template: `<div class="dynamic-form-element"></div>`
})
class DynamicFormElementBaseComponent extends DynamicFormElementBase {}

@NgModule({
  imports: [
    DynamicFormElementModule
  ],
  declarations: [
    DynamicFormElementBaseComponent
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' })
    },
    {
      provide: DYNAMIC_FORM_ELEMENT_TYPE_CONFIG,
      useValue: [
        { libraryName: 'test', type: 'element', component: DynamicFormElementBaseComponent }
      ]
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ]
})
class DynamicFormElementComponentTestModule {}

describe('DynamicFormElementComponent', () => {
  let fixture: ComponentFixture<DynamicFormElementComponent>;
  let component: DynamicFormElementComponent;
  let element: DynamicFormElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormElementComponentTestModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormElementComponent);
    component = fixture.componentInstance;

    const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
    element = new DynamicFormElement(definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
  });

  it('renders component template', () => {
    const formElementDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-element'));
    const formElementElement = <HTMLElement>formElementDebugElement.nativeElement;

    expect(formElementElement).toBeDefined();
  });
});
