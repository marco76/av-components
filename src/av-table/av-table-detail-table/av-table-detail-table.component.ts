import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AvTableConfig} from '../av-table/AvTableConfig';
import {AvTableStatus} from '../av-table/AvTableStatus';

@Component({
  selector: 'av-table-detail-table',
  templateUrl: './av-table-detail-table.html',
  styleUrls: ['./av-table-detail-table.css']
})
export class AvTableDetailTableComponent implements OnChanges {

  @Input() entry: any;
  @Input() configuration: AvTableConfig;

  defaultTableStatus = new AvTableStatus();

  public constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('building the detail grid', changes);
  }

}
