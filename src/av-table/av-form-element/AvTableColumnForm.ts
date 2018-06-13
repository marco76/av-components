import {AvTableColumnConfig} from '../av-table/AvTableColumnConfig';

export class AvTableColumnForm implements AvTableColumnConfig {

   editable?: boolean;
   fieldName: string;
   label?: string;
   required = false;
   status?: string;
   value?: string;
   htmlType?: string;


  constructor(fieldName: string, type: string, editable?: boolean,  label?: string, required?: boolean, status?: string, value?: string) {
    this.editable = editable;
    this.fieldName = fieldName;
    this.label = label;
    if (required === true) {
      this.required = true;
    } else {
      this.required = false;
    }
    this.status = status;
    this.value = value;
    this.mapType();

  }

  private mapType(): void {
    this.htmlType = 'textbox';
}
}
