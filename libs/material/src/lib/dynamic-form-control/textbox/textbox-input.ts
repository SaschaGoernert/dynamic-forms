import { DynamicFormControlInput } from '@dynamic-forms/core';

export interface TextboxInput extends DynamicFormControlInput {
  type: 'textbox';
  inputType: 'text' | 'search' | 'email' | 'password';
}
