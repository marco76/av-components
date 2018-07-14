import {AvTableColumnConfig} from './AvTableColumnConfig';
import {AVTableActions} from './AVTableActions';
import {AvTableConfig} from './AvTableConfig';

export class AvTable {

  private _columnDefinition: Array<AvTableColumnConfig>;
  private _tableActions: AVTableActions = new AVTableActions();
  private _tableConfig: AvTableConfig;

  constructor(columnDefinition?: Array<AvTableColumnConfig>, tableConfig?: AvTableConfig) {
    if (columnDefinition) {
      this._columnDefinition = columnDefinition;
    }
    if (tableConfig) {
      this._tableConfig = tableConfig;
    }
  }

  get columnDefinition(): Array<AvTableColumnConfig> {
    return this._columnDefinition;
  }

  set columnDefinition(value: Array<AvTableColumnConfig>) {
    this._columnDefinition = value;
  }

  get tableActions(): AVTableActions {
    return this._tableActions;
  }

  set tableActions(value: AVTableActions) {
    this._tableActions = value;
  }

  get tableConfig(): AvTableConfig {
    return this._tableConfig;
  }

  set tableConfig(value: AvTableConfig) {
    this._tableConfig = value;
  }
}
