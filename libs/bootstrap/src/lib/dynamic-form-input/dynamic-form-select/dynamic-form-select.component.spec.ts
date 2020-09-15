import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormLibraryService, DynamicFormSelect, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';
import { BsDynamicFormSelectModule } from './dynamic-form-select.module';

describe('BsDynamicFormSelectComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormSelectComponent>;
  let component: BsDynamicFormSelectComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormSelect>;
  let formControl: DynamicFormControl<DynamicFormSelect>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormSelectModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormSelectComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
      key: 'key',
      template: {
        input: {
          placeholder: 'placeholder',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
            {
              label: 'group1',
              items: [
                { value: 'value3', label: 'label3' },
                { value: 'value4', label: 'label4' }
              ]
            },
            {
              label: 'group2',
              items: [
                { value: 'value5', label: 'label5' }
              ]
            }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormSelect>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('creates component template', () => {
    const selectDebugElement = fixture.debugElement.query(By.css('select.custom-select'));
    const optionDebugElements = selectDebugElement.queryAll(By.css('option'));
    const optionGroupDebugElements = selectDebugElement.queryAll(By.css('optgroup'));

    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;
    const optionElements = <HTMLOptionElement[]>optionDebugElements.map(elem => elem.nativeElement);
    const optionGroups = optionGroupDebugElements.map(elem => {
      return {
        groupElement: <HTMLOptGroupElement>elem.nativeElement,
        optionElements: <HTMLOptionElement[]>elem.queryAll(By.css('option')).map(e => e.nativeElement)
      };
    });

    expect(selectElement).toBeDefined();
    expect(selectElement.id).toBe(component.inputId);
    expect(optionElements.length).toBe(6);
    expect(optionElements[0].hidden).toBe(true);
    expect(optionElements[0].innerText).toBe('placeholder');
    expect(optionElements[1].value).toBe('value1');
    expect(optionElements[1].innerText).toBe('label1');
    expect(optionElements[2].value).toBe('value2');
    expect(optionElements[2].innerText).toBe('label2');

    expect(optionGroups.length).toBe(2);
    expect(optionGroups[0].groupElement.label).toBe('group1');
    expect(optionGroups[0].optionElements.length).toBe(2);
    expect(optionGroups[0].optionElements[0]).toBe(optionElements[3]);
    expect(optionGroups[0].optionElements[0].value).toBe('value3');
    expect(optionGroups[0].optionElements[0].innerText).toBe('label3');
    expect(optionGroups[0].optionElements[1]).toBe(optionElements[4]);
    expect(optionGroups[0].optionElements[1].value).toBe('value4');
    expect(optionGroups[0].optionElements[1].innerText).toBe('label4');
    expect(optionGroups[1].groupElement.label).toBe('group2');
    expect(optionGroups[1].optionElements.length).toBe(1);
    expect(optionGroups[1].optionElements[0]).toBe(optionElements[5]);
    expect(optionGroups[1].optionElements[0].value).toBe('value5');
    expect(optionGroups[1].optionElements[0].innerText).toBe('label5');
  });
});
