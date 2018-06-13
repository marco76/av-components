import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";

@Component({
  selector: 'av-table-detail-panel',
  templateUrl: './av-table-detail-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvTableDetailPanelComponent implements OnInit, OnChanges {

  @Input() data : Array<AvTableColumnConfig>;
  @Input() item: any;

  fieldsToShow: Array<AvTableColumnConfig> = [];

  public constructor(){}

  public ngOnInit(){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
    if(changes['data']) {
      this.fieldsToShow = this.data.filter(item => item.showInDetail);
    }
  }

}
