import {Component, Input, OnInit} from '@angular/core';
import {AvChipProperties} from './AvChipProperties';

@Component(
  {
    selector: 'av-chip',
    templateUrl: './av-chip.component.html',
    styleUrls: ['./av-chip.component.css']
  }
)
export class AvChip implements OnInit {

  @Input() label: string;
  @Input() color: string;
  @Input() properties?: AvChipProperties;

  ngOnInit() {

    if (!this.color) {
      this.color = '#777777';
    }
    if (!this.label) {
      this.label = 'LABEL';
    }

  }

  getTooltip() {
    if (this.properties && this.properties.tooltip) {
      return this.properties.tooltip;
    }
  }

}
