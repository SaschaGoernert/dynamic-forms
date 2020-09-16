import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormFieldBase<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<Control, Template, Definition> = DynamicFormField<Control, Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Field> {

  constructor(protected validationService: DynamicFormValidationService) {
    super();
  }

  get key(): string { return this.element.key; }
  get index(): number { return this.element.index; }
  get path(): string { return this.element.path; }

  get field(): Field { return this.element; }
  set field(field: Field) { this.element = field; }

  get control(): Control { return this.field.control; }

  get errors(): DynamicFormValidationErrors {
    return this.control.errors;
  }

  get hasErrors(): boolean {
    return (this.errors || false) && true;
  }

  get showErrors(): boolean {
    return this.hasErrors && this.control.touched;
  }

  get errorMessage(): string {
    return this.validationService.getErrorMessage(this.errors);
  }
}
