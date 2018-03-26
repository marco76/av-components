import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule,
   MatIconModule, MatInputModule, MatOptionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import {AvAutocomplete} from './av-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule, MatAutocompleteModule,
     MatIconModule, MatOptionModule, CommonModule
  , MatInputModule, BrowserModule
    , BrowserAnimationsModule],
  exports: [
    AvAutocomplete
  ]
  ,
  declarations: [
    AvAutocomplete,
  ]
})
export class AvAutocompleteModule { }
