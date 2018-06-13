import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";
import {AvTableConfig} from "../av-table/AvTableConfig";
import {AvTableStatus} from "../av-table/AvTableStatus";

@Component({
  selector: 'av-table-detail-table',
  templateUrl: './av-table-detail-table.html',
  styleUrls: ['./av-table-detail-table.css']
})
export class AvTableDetailTableComponent implements OnInit, OnChanges {

  @Input() entry : any;
  @Input() configuration: AvTableConfig;
  defaultTableStatus = new AvTableStatus();

  public constructor(){

  }

  public ngOnInit(){
    this.defaultTableStatus.editable = false;
    this.defaultTableStatus.statusReason = "Detail tables are not editable";
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('building the detail grid', changes);
  }



}
