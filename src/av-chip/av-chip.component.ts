import {Component, OnInit} from '@angular/core';
import {selector} from 'rxjs/operator/publish';

@Component(
  {
    selector: 'av-chip',
    templateUrl: './av-chip.component.html',
    styleUrls: ['./av-chip.component.css']
  }
)
export class AvChip implements OnInit {

  ngOnInit() {

  }

  getColor(): string {
    return 'red';
  }

  getTooltip(){
    return 'tooltip to do';
  }

  getValueToShow(){
    return 'getValueToShow';
  }

}
