import {AvColumnType} from './AvColumnType';
import {AvTableConfig} from './AvTableConfig';

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
  detailTable?: AvTableConfig;
}
