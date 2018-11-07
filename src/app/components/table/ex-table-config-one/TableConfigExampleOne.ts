import {AvTable} from '../../../../av-table/av-table/AvTable';
import {AvTableFactory} from '../../../../av-table/av-table/AvTableFactory';
import {AvTableConfig} from '../../../../av-table/av-table/AvTableConfig';
import {AvTableColumnConfig} from '../../../../av-table/av-table/AvTableColumnConfig';
import {AvColumnType} from '../../../../av-table/av-table/AvColumnType';

export class TableConfigExampleOne {

  static getTable() {

    // build the table that contains the the details
    const _detailTable: AvTable = AvTableFactory.buildTable(_detailColumns, new AvTableConfig(false, {}));

    const columnsConfig: Array<AvTableColumnConfig> = [
      {fieldName: 'uid', label: 'id', hide: true, showInDetail: true, width: 2, editable: false},
      {fieldName: 'name', label: 'Name', hide: false},
      {fieldName: 'nationality', label: 'Nationality', hide: true, showInDetail: true},
      // {fieldName: 'typ', label: 'typ', hide: false, type: AvColumnType.SELECT, allowedValues:['NEWSLETTER', 'VERTRAGLICHE_BESTIMMUNG']},
      {fieldName: 'role', label: 'Job', hide: false, width: 2},
      {fieldName: 'experience', label: 'Experience', hide: false, type: AvColumnType.TABLE, width: 0.3, detailTable: _detailTable},
      // {fieldName: 'validFor', label: 'valid for', hide: true, showInDetail: true, type: AvColumnType.ARRAY},
      {fieldName: 'available', label: 'Available', hide: false, type: AvColumnType.BOOLEAN},
      {fieldName: 'updated', label: 'Updated', hide: true, type: AvColumnType.DATE, showInDetail: true},
    ];
    return AvTableFactory.buildTable(columnsConfig, new AvTableConfig(true));
  }
}

// data of the detail
const _detailColumns: Array<AvTableColumnConfig> = [
  {fieldName: 'company', label: 'Company'},
  {fieldName: 'technologies', label: 'Technologies'},
  {fieldName: 'yearBegin', label: 'From'},
  {fieldName: 'yearEnd', label: 'Until'}
];
