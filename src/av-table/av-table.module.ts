import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatCheckboxModule, MatDialogModule,
  MatIconModule, MatInputModule, MatListModule, MatOptionModule, MatPaginatorModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AvTableComponent } from './av-table/av-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AvEditorComponent} from './av-editor/av-editor.component';
import {AvRowDetailDirective} from './av-table/av-row-detail.directive';
import {AvTableDetailPanelComponent} from './av-table-detail-panel/av-table-detail-panel.component';
import {AvTableDetailTableComponent} from './av-table-detail-table/av-table-detail-table.component';
import {AvFormElementComponent} from './av-form-element/av-form-element.component';

@NgModule({
  imports: [
    FormsModule, MatAutocompleteModule,
     MatIconModule, MatOptionModule, CommonModule
  , MatInputModule, BrowserModule
    , BrowserAnimationsModule, MatToolbarModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
    ReactiveFormsModule,
  MatListModule,
  MatDialogModule],
  exports: [
    AvTableComponent,
    AvEditorComponent,
    AvRowDetailDirective,
    AvTableDetailPanelComponent,
    AvTableDetailTableComponent,
    AvFormElementComponent
  ]
  ,
  declarations: [
    AvTableComponent,
    AvEditorComponent,
    AvRowDetailDirective,
    AvTableDetailPanelComponent,
    AvTableDetailTableComponent,
    AvFormElementComponent

  ]
})
export class AvTableModule { }
