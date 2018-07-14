import { Component, OnInit } from '@angular/core';
import {AvTableColumnConfig} from '../../../../av-table/av-table/AvTableColumnConfig';
import {AvColumnType} from '../../../../av-table/av-table/AvColumnType';
import {AvTableConfig} from '../../../../av-table/av-table/AvTableConfig';

@Component({
  selector: 'app-ex-table-config-one',
  templateUrl: './ex-table-config-one.component.html',
  styleUrls: ['./ex-table-config-one.component.css']
})
export class ExTableConfigOneComponent implements OnInit {

  arrayData = [{'uid' : '123434','name': 'Marco Molteni', 'role': 'developer'}, {
    'uid' : '23434234','name': 'Bugs Bunny', 'role': 'actor'},
    {'uid' : '3234234','name': 'Tony Stark', 'role': 'Iron Man'}];
  arrayView: Array < any >;

  tableConfiguration: AvTableConfig;

  columnConfig: Array<AvTableColumnConfig> = [
    {label : 'ID', fieldName:'uid', width: 0.2, showInDetail: true, hide: true},
    {label : 'Name', fieldName: 'name', width: 2, type: AvColumnType.STRING},
    {label : 'What he does?', fieldName: 'role', width: 1, type: AvColumnType.STRING},
  ]


  constructor() { }

  ngOnInit(): void {
      this.arrayView = this.basicClone(this.arrayData);
      this.tableConfiguration = new AvTableConfig(this.columnConfig);
  }

    getJSON(object: any): string {
      return JSON.stringify(object);
    }

    updateSimpleArray(text: string) {
      this.arrayData = JSON.parse(text);;
    }

  private basicClone<T>(any: T): T {
      return JSON.parse(JSON.stringify(any));
    }
  }
