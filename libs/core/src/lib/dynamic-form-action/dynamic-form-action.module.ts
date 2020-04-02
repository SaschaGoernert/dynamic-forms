import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormActionHandler, DYNAMIC_FORM_ACTION_HANDLERS } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionService } from './dynamic-form-action.service';

@NgModule({
  providers: [
    DynamicFormActionService
  ]
})
export class DynamicFormActionModule {
  static withHandler<Field extends DynamicFormField = DynamicFormField>(
    handler: DynamicFormActionHandler<Field>
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLERS,
          useValue: handler,
          multi: true
        }
      ]
    };
  }

  static withHandlers<Field extends DynamicFormField = DynamicFormField>(
    handlers: DynamicFormActionHandler<Field>[]
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLERS,
          useValue: handlers,
          multi: true
        }
      ]
    };
  }

  static withHandlerFactory<Field extends DynamicFormField = DynamicFormField>(
    handlerFactory: (deps?: any) => DynamicFormActionHandler<Field>, deps?: any[]
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLERS,
          useFactory: handlerFactory,
          deps: deps,
          multi: true
        }
      ]
    };
  }
}
