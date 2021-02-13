import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormElement, DynamicFormLibraryService, DynamicFormModal,
  DynamicFormModalDefinition } from '@dynamic-forms/core';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';
import { BsDynamicFormModalModule } from './dynamic-form-modal.module';

describe('BsDynamicFormModalComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormModalComponent>;
  let component: BsDynamicFormModalComponent;
  let modal: DynamicFormModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormModalModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    modal = new DynamicFormModal({ template: {} } as DynamicForm, {} as DynamicFormElement, {
      template: {
        title: 'Title',
        minWidth: '600px',
        maxWidth: '100%'
      }
    } as DynamicFormModalDefinition);

    fixture = TestBed.createComponent(BsDynamicFormModalComponent);
    component = fixture.componentInstance;
    component.element = modal;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
  });

  it('renders component template', () => {
    const modalDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-modal'));

    expect(component).toBeTruthy();
    expect(modalDebugElement).toBeNull();
  });

  it('opens modal', async(() => {
    modal.open();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const modalDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-modal'));
      const modalDialogDebugElement = modalDebugElement.query(By.css('div.modal-dialog'));
      const modalHeaderDebugElement = modalDialogDebugElement.query(By.css('div.modal-header'));
      const modalBodyDebugElement = modalDialogDebugElement.query(By.css('div.modal-body'));
      const modalElement = modalDebugElement.nativeElement as HTMLDivElement;
      const modalDialogElement = modalDialogDebugElement.nativeElement as HTMLDivElement;
      const modalHeaderElement = modalHeaderDebugElement.nativeElement as HTMLDivElement;
      const modalBodyElement = modalBodyDebugElement.nativeElement as HTMLDivElement;

      expect(component.isOpen).toBeTrue();
      expect(modalElement).toBeTruthy();
      expect(modalDialogElement).toBeTruthy();
      expect(modalDialogElement.style.minWidth).toBe('600px');
      expect(modalDialogElement.style.maxWidth).toBe('100%');
      expect(modalHeaderElement).toBeTruthy();
      expect(modalHeaderElement.innerText).toBe('Title');
      expect(modalBodyElement).toBeTruthy();
    });
  }));

  it('closes modal', async(() => {
    modal.open();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.isOpen).toBeTrue();

      modal.close();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const modalDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-modal'));

        expect(component.isOpen).toBeFalse();
        expect(modalDebugElement).toBeNull();
      });
    });
  }));

  it('toggles modal', async(() => {
    modal.toggle();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.isOpen).toBeTrue();

      modal.toggle();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(component.isOpen).toBeFalse();
      });
    });
  }));
});
