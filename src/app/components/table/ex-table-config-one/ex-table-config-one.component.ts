import {Component, OnInit} from '@angular/core';
import {AvTableColumnConfig} from '../../../../av-table/av-table/AvTableColumnConfig';
import {AvColumnType} from '../../../../av-table/av-table/AvColumnType';
import {AvTableConfig} from '../../../../av-table/av-table/AvTableConfig';
import {TableConfigExampleOne} from './TableConfigExampleOne';
import {AvTable} from '../../../../av-table/av-table/AvTable';
import {AvTableState} from '../../../../av-table/av-table/AvTableState';

@Component({
  selector: 'app-ex-table-config-one',
  templateUrl: './ex-table-config-one.component.html',
  styleUrls: ['./ex-table-config-one.component.css']
})
export class ExTableConfigOneComponent implements OnInit {

  arrayData = [
    {
      'uid': '123434', 'name': 'Marco Molteni', 'role': 'developer', 'nationality': 'Swiss',
      'updated': new Date(),
      'available': true,
      'experience': [
        {'yearBegin': 2018, 'yearEnd': 2019, 'company': 'ZKB', 'technologies': 'Java / Angular', 'status': 'contractor'},
        {'yearBegin': 2016, 'yearEnd': 2018, 'company': 'SBB', 'technologies': 'Java / Angular', 'status': 'contractor'},
        {'yearBegin': 2015, 'yearEnd': 2016, 'company': 'HPE',  'technologies': 'Java', 'status': 'contractor'}
      ]
    },
    {'uid': '23434234', 'name': 'Bugs Bunny', 'role': 'actor', detail: [],  'available': true,},
    {'uid': '3234234', 'name': 'Tony Stark', 'role': 'Iron Man',  'available': false}];

  arrayView: Array<any>;
  tableConfiguration: AvTableConfig;
  tableExampleCV: AvTable;
  tableStatus: AvTableState;

  columnConfig: Array<AvTableColumnConfig> = [
    {label: 'ID', fieldName: 'uid', width: 0.2, showInDetail: true, hide: true},
    {label: 'Name', fieldName: 'name', width: 2, type: AvColumnType.STRING},
    {label: 'What he does?', fieldName: 'role', width: 1, type: AvColumnType.STRING},
  ];

  columnConfigDetail: Array<AvTableColumnConfig> = [
    {label: 'Begin', fieldName: 'yearBegin'},
    {label: 'End', fieldName: 'yearEnd'},
    {label: 'Company', fieldName: 'company'}
  ];


  constructor() {
  }

  ngOnInit(): void {
    this.arrayView = this.basicClone(this.arrayData);
    this.tableConfiguration = new AvTableConfig(true);
    this.tableExampleCV = TableConfigExampleOne.getTable();
    this.tableStatus = new AvTableState();
    this.tableStatus.editable = true;
  }

  getJSON(object: any): string {
    return JSON.stringify(object);
  }

  updateSimpleArray(text: string) {
    this.arrayData = JSON.parse(text);
  }

  private basicClone<T>(any: T): T {
    return JSON.parse(JSON.stringify(any));
  }
}
