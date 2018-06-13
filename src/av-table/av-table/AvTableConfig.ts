import {AvTableColumnConfig} from "./AvTableColumnConfig";
import {AVTableActions} from "./AVTableActions";
import {AvTableProperties} from './AvTableProperties';

export class AvTableConfig {

  columnDefinition : Array<AvTableColumnConfig>;
  tableActions: AVTableActions = new AVTableActions();

  constructor(columnDefinition: Array<AvTableColumnConfig>, public properties? : AvTableProperties) {
    this.columnDefinition = columnDefinition;
    if (!properties) {
      this.properties = new AvTableProperties();
    } else {
      this.properties = properties;
      if (properties.isReadonly) {
        this.setReadOnly(properties);
      }
    }
  }

  private setReadOnly(properties : AvTableProperties) : void {
    properties.isReadonly = true;
    properties.addRecords = false;
    properties.editRecords = false;
    properties.deleteRecords = false;
  }

}
