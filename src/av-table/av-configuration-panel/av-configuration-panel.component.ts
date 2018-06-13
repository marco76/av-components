import {Component, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";
import {AvColumnPropertiesComponent} from "../av-column-properties/av-column-properties.component";
import {AvTableConfig} from "../av-table/AvTableConfig";
import {AvTablePropertiesPanelComponent} from "../av-table-properties-panel/av-table-properties-panel.component";

@Component({
  selector: 'app-av-configuration-panel',
  templateUrl: './av-configuration-panel.component.html',
  styleUrls: ['./av-configuration-panel.component.css']
})
export class AvConfigurationPanelComponent implements OnInit {

  @ViewChild(AvColumnPropertiesComponent)
  private avColumnPropertiesComponent : AvColumnPropertiesComponent;
  @ViewChild(AvTablePropertiesPanelComponent)
  private avTablePropertiesPanelComponent : AvTablePropertiesPanelComponent;

  @Output()
  public tableConfiguration : AvTableConfig;

  columnsDefinition : Array<AvTableColumnConfig>;
  originalConfiguration : AvTableConfig;
  originalColumnsDefinition : Array<AvTableColumnConfig>;

  constructor(public dialogRef: MatDialogRef<AvConfigurationPanelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.originalConfiguration = JSON.parse(JSON.stringify(this.data.tableConfiguration));
    this.originalColumnsDefinition = JSON.parse(JSON.stringify(this.data.columnsDefinition));
    this.columnsDefinition = this.data.columnsDefinition;
    this.tableConfiguration = this.data.tableConfiguration;
  }

  onSave(){
    this.dialogRef.close(new AvTableConfig(this.avColumnPropertiesComponent.updatedColumnsDef, this.avTablePropertiesPanelComponent.tableConfig.properties));
  }

  updateConfiguration(tableConfiguration : AvTableConfig){
    console.log('tableConfiguration');
    this.tableConfiguration = tableConfiguration;
  }

  onExit(){
    this.dialogRef.close(new AvTableConfig(this.originalColumnsDefinition, this.originalConfiguration.properties));
  }
}
