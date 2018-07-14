import {AvTable} from './AvTable';
import {AvTableColumnConfig} from './AvTableColumnConfig';
import {AvTableConfig} from './AvTableConfig';

export class AvTableFactory {


  static buildTable(columnsConfig: Array<AvTableColumnConfig> | undefined, avTableOptions?: AvTableConfig): AvTable {

    if (!avTableOptions) {
      avTableOptions = new AvTableConfig(false);
    }

    return new AvTable(columnsConfig, avTableOptions);
  }
}
