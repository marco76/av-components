import {AvTableColumnConfig} from '../../av-table/av-table/AvTableColumnConfig';
import {AvColumnType} from '../../av-table/av-table/AvColumnType';


export class AvTableColumnForm implements AvTableColumnConfig {

  editable?: boolean;
  fieldName: string;
  label?: string;
  required?: boolean = false;
  status?: string;
  value?: string;
  htmlType?: string;

  constructor(fieldName: string, type: string, editable?: boolean, label?: string, required?: boolean, status?: string, value?: string) {
    this.editable = editable;
    this.fieldName = fieldName;
    this.label = label;
    this.required = required;
    this.status = status;
    this.value = value;
  }

  public static setMapType(column: AvTableColumnConfig): string {
    switch (column.type) {
      case AvColumnType.DATE : {
        return 'date';
      }
      case AvColumnType.ARRAY : {
        return 'ARRAY';
      }
      case AvColumnType.TABLE : {
        return AvColumnType.TABLE;
      }
      default: {
        return 'textbox';
      }
    }
  }
}
