import {AvTableColumnConfig} from './AvTableColumnConfig';
import {AVTableActions} from './AVTableActions';

export class AvTableConfig {

  columnDefinition: Array<AvTableColumnConfig>;
  tableActions: AVTableActions = new AVTableActions();

  constructor(columnDefinition: Array<AvTableColumnConfig>, public properties?: Properties) {
    this.columnDefinition = columnDefinition;
    if (!properties) {
      this.properties = new Properties();
    } else {
      this.properties = properties;
      if (properties.isReadonly) {
        this.setReadOnly(properties);
      }
    }
  }

  private setReadOnly(properties: Properties): void {
    properties.isReadonly = true;
    properties.addRecords = false;
    properties.editRecords = false;
    properties.deleteRecords = false;
  }

}

export class Properties {
  isReadonly ? = false;
  addRecords ? = true;
  editRecords ? = true;
  deleteRecords ? = true;
  recordsToShow ? = 10;
}
