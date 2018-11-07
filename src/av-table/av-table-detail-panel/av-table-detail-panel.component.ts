import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AvTableColumnConfig} from '../av-table/AvTableColumnConfig';

@Component({
  selector: 'av-table-detail-panel',
  templateUrl: './av-table-detail-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvTableDetailPanelComponent implements OnChanges {

  @Input() data: Array<AvTableColumnConfig>;
  @Input() item: any;

  fieldsToShow: Array<AvTableColumnConfig> = [];

  public constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fieldsToShow = this.data.filter(item => item.showInDetail);
    }
  }
}
