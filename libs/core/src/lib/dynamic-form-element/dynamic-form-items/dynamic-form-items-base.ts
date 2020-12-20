import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export abstract class DynamicFormItemsBase<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>,
  Items extends DynamicFormItems<Template, Definition> = DynamicFormItems<Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Items> {

  constructor() {
    super();
  }

  get items(): DynamicFormItem[] { return this.element.items; }

  get selectedIndex(): number { return this.element.selectedIndex; }
  get selectedItem(): DynamicFormItem { return this.element.selectedItem; }

  selectItem(index: number): void {
    this.element.selectItem(index);
  }
}
