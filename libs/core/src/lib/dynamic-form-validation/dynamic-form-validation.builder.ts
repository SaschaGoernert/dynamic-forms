import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorConfig, DynamicFormControlValidatorType,
  DYNAMIC_FORM_CONTROL_VALIDATOR_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';

@Injectable()
export class DynamicFormValidationBuilder {
  readonly controlValidatorTypes: DynamicFormControlValidatorType[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL_VALIDATOR_CONFIG)
    private _controlValidatorTypes: DynamicFormControlValidatorConfig,
  ) {
    this.controlValidatorTypes = this.libraryService.filterTypes(this._controlValidatorTypes);
  }

  getControlValidatorType(type: string): DynamicFormControlValidatorType {
    return this.controlValidatorTypes.find(f => f.type === type);
  }

  createControlValidators(template: DynamicFormControlTemplate): DynamicFormControlValidator[] {
    return template.validation ? Object.keys(template.validation).map(key => {
      return this.createControlValidator(template, key);
    }).filter(validator => !!validator) : [];
  }

  createControlValidator(template: DynamicFormControlTemplate, key: string): DynamicFormControlValidator {
    if (!(template && typeof template.validation[key] === 'boolean')) {
      return undefined;
    }

    const validatorType = this.getControlValidatorType(key);
    return validatorType ? new DynamicFormControlValidator(key, template, validatorType.factory) : undefined;
  }
}
