import { async, TestBed } from '@angular/core/testing';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';
import { BsDynamicFormControlLabelModule } from './dynamic-form-control-label.module';

describe('BsDynamicFormControlLabelComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelModule
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(BsDynamicFormControlLabelComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
