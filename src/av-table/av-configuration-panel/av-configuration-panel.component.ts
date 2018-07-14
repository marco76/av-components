import {Component, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AvTableColumnConfig} from '../av-table/AvTableColumnConfig';
import {AvColumnPropertiesComponent} from '../av-column-properties/av-column-properties.component';
import {AvTable} from '../av-table/AvTable';
import {AvTablePropertiesPanelComponent} from '../av-table-properties-panel/av-table-properties-panel.component';
import {AvTableFactory} from '../av-table/AvTableFactory';

@Component({
  selector: 'app-av-configuration-panel',
  templateUrl: './av-configuration-panel.component.html',
  styleUrls: ['./av-configuration-panel.component.css']
})
export class AvConfigurationPanelComponent implements OnInit {

  @ViewChild(AvColumnPropertiesComponent)
  private avColumnPropertiesComponent: AvColumnPropertiesComponent;
  @ViewChild(AvTablePropertiesPanelComponent)
  private avTablePropertiesPanelComponent: AvTablePropertiesPanelComponent;

  @Output()
  public tableConfiguration: AvTable;

  columnsDefinition: Array<AvTableColumnConfig>;
  originalConfiguration: AvTable;
  originalColumnsDefinition: Array<AvTableColumnConfig>;

  constructor(public dialogRef: MatDialogRef<AvConfigurationPanelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.originalConfiguration = JSON.parse(JSON.stringify(this.data.tableConfiguration));
    this.originalColumnsDefinition = JSON.parse(JSON.stringify(this.data.columnsDefinition));
    this.columnsDefinition = this.data.columnsDefinition;
    this.tableConfiguration = this.data.tableConfiguration;
  }

  onSave() {
    this.dialogRef.close();
      return AvTableFactory.buildTable(this.avColumnPropertiesComponent.updatedColumnsDef, this.avTablePropertiesPanelComponent.table.tableConfig);
  }

  updateConfiguration(tableConfiguration: AvTable) {
    this.tableConfiguration = tableConfiguration;
  }

  onExit() {
    this.dialogRef.close(new AvTable(this.originalColumnsDefinition, this.originalConfiguration.tableConfig));
  }
}
