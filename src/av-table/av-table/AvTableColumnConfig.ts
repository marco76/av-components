import {AvColumnType} from './AvColumnType';
import {AvTable} from './AvTable';

export interface AvTableColumnConfig {
  fieldName: string;
  label?: string;
  editable?: boolean;
  status?: string;
  required?: boolean;
  hide?: boolean;
  width?: number;
  order?: number;
  type?: AvColumnType;
  showInDetail?: boolean;
  default?: any;
  detailTable?: AvTable;
  allowedValues?: any[];
}
