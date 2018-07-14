import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AvTableColumnForm } from '../av-form-element/AvTableColumnForm';

@Injectable()
export class AvEditorService {
  constructor() { }

  toFormGroup(elements: AvTableColumnForm[]) {
    const group: any = {};

    elements.forEach( element => {element.htmlType = AvTableColumnForm.setMapType(element); });

    elements.forEach(element => {

      const options : any = {};
      options['value'] = element.value;
      if (element.editable === false) {
        options['disabled'] = true;
      }

      group[element.fieldName] = element.required ? new FormControl(options)
        : new FormControl(options);

    });

    return new FormGroup(group);
  }
}
