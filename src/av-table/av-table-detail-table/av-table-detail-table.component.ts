import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AvTable} from '../av-table/AvTable';
import {AvTableState} from '../av-table/AvTableState';

@Component({
  selector: 'av-table-detail-table',
  templateUrl: './av-table-detail-table.html',
  styleUrls: ['./av-table-detail-table.css']
})
export class AvTableDetailTableComponent implements OnChanges {

  @Input() data: any;
  @Input() configuration: AvTable;

  defaultTableStatus = new AvTableState();

  public constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
