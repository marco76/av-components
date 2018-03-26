import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvChip } from './av-chip.component';
import {MatChipsModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatTooltipModule, MatChipsModule
  ],
  declarations: [
    AvChip
  ],
  exports: [
    AvChip
  ]
})
export class AvChipModule { }
