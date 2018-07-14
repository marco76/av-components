import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AvTable} from '../av-table/AvTable';
import {AvTableState} from '../av-table/AvTableState';
import {AVTableTransaction} from '../av-table/transaction/AVTableTransaction';
import {AvTableComponent} from '../av-table/av-table.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'av-table-detail-table',
  templateUrl: './av-table-detail-table.html',
  styleUrls: ['./av-table-detail-table.css']
})
export class AvTableDetailTableComponent implements OnChanges {

  @Input() entry: any;
  @Input() configuration: AvTable;

  defaultTableStatus = new AvTableState();

  public constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
