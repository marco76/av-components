import {Component, Input} from '@angular/core';
import {AvTable} from '../av-table/AvTable';

@Component({
  selector: 'app-av-table-properties-panel',
  templateUrl: './av-table-properties-panel.component.html',
  styleUrls: ['./av-table-properties-panel.component.css']
})
export class AvTablePropertiesPanelComponent {

  @Input() table: AvTable;

  constructor() { }
}
