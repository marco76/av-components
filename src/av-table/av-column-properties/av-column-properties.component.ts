import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";
import { MatSelect, MatTableDataSource} from "@angular/material";
import { MatDialogRef} from "@angular/material/dialog"

@Component({
  selector: 'app-av-column-properties',
  templateUrl: './av-column-properties.component.html',
  styleUrls: ['./av-column-properties.component.css']
})
export class AvColumnPropertiesComponent implements OnInit, OnChanges {

  selectedProperty : string;
  propertyDefinition: Array<string> = ['label', 'editable', 'required', 'hide'];
  displayedColumns = ['fieldName','label'];
  dataSource : MatTableDataSource<AvTableColumnConfig>;

  @Input() columnsDefinition : Array<AvTableColumnConfig>;
  @Output() updatedColumnsDefinition = new EventEmitter<Array<AvTableColumnConfig>>();

  updatedColumnsDef : Array<AvTableColumnConfig>;

  constructor(public dialogRef: MatDialogRef<AvColumnPropertiesComponent>) {}

  ngOnInit() {}

  getColumnsDefinition(){
    return this.columnsDefinition;
  }

  onSave(){
    this.updatedColumnsDefinition.emit(this.columnsDefinition);
    this.dialogRef.close(this.columnsDefinition);
  }

  onExit(){
    this.dialogRef.close(null);
  }

  onSelectionChange($event : MatSelect) {
    this.displayedColumns= ['fieldName', $event.value];
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.updatedColumnsDef = JSON.parse(JSON.stringify(this.columnsDefinition));
        this.dataSource = new MatTableDataSource(this.updatedColumnsDef);
  }

}
