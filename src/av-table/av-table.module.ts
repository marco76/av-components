import {NgModule} from '@angular/core';
import {AvConfigurationPanelComponent} from './av-configuration-panel/av-configuration-panel.component';
import {AvTableDetailPanelComponent} from './av-table-detail-panel/av-table-detail-panel.component';
import {AvTablePropertiesPanelComponent} from './av-table-properties-panel/av-table-properties-panel.component';
import {AvTableComponent} from './av-table/av-table.component';
import {AvColumnPropertiesComponent} from './av-column-properties/av-column-properties.component';
import {AvTableDetailTableComponent} from './av-table-detail-table/av-table-detail-table.component';
import {AvRowDetailDirective} from './av-table/av-row-detail.directive';
import {AvConfirmDialogComponent} from './av-confirm-dialog/av-confirm-dialog.component';
import {MaterialModule} from '../modules/material.module';
import {AvEditorComponent} from '../av-form/av-editor/av-editor.component';
import {AvFormElementComponent} from '../av-form/av-form-element/av-form-element.component';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports:
    [
      AvTableComponent,
      AvEditorComponent,
      AvFormElementComponent,
      AvColumnPropertiesComponent,
      AvConfigurationPanelComponent,
      AvTablePropertiesPanelComponent,
      AvTableDetailPanelComponent,
      AvRowDetailDirective,
      AvTableDetailTableComponent,
      AvConfirmDialogComponent
    ],
  declarations: [
    AvTableComponent,
    AvEditorComponent,
    AvFormElementComponent,
    AvColumnPropertiesComponent,
    AvConfigurationPanelComponent,
    AvTablePropertiesPanelComponent,
    AvTableDetailPanelComponent,
    AvRowDetailDirective,
    AvTableDetailTableComponent,
    AvConfirmDialogComponent
  ],
  entryComponents: [
    AvConfirmDialogComponent
  ]
})
export class AvTableModule {
}
