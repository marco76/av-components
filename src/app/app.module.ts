
import { NgModule } from '@angular/core';
import {MatAutocompleteModule, MatExpansionModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AvAutocompleteModule } from '../av-autocomplete/av-autocomplete.module';
import { AvChipModule} from '../av-chip/av-chip.module';
import { AppRoutingModule} from './app.routing';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { AvAutocompleteChipModule} from './av-autocomplete-chip/av-autocomplete-chip.module';
import { AvTwitterCardModule} from '../av-twitter-card/av-twitter-card.module';
import { AvTableModule } from '../av-table/av-table.module';
import { TableComponent } from './components/table/table.component';
import { ExTableConfigOneComponent } from './components/table/ex-table-config-one/ex-table-config-one.component';


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    TableComponent,
    ExTableConfigOneComponent
  ],
  imports: [
    AppRoutingModule,
    AvAutocompleteModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    HighlightJsModule, AvChipModule,
    CommonModule, AvAutocompleteChipModule,
    AvTwitterCardModule,
    AvTableModule,
    MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
