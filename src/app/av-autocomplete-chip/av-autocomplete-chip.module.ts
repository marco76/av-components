import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule,
   MatIconModule, MatInputModule, MatOptionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { AvAutocompleteModule } from '../../av-autocomplete/av-autocomplete.module';
import {AvAutocompleteChip} from './av-autocomplete-chip';

@NgModule({
  imports: [
    FormsModule, MatAutocompleteModule,
     MatIconModule, MatOptionModule, CommonModule,
    MatInputModule, BrowserModule,
    AvAutocompleteModule,
    BrowserAnimationsModule],
  exports: [
    AvAutocompleteChip
  ]
  ,
  declarations: [
    AvAutocompleteChip
  ]
})
export class AvAutocompleteChipModule { }
