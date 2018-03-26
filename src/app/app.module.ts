
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AvAutocompleteModule } from '../av-autocomplete/av-autocomplete.module';
import { AvChipModule} from '../av-chip/av-chip.module';
import {AppRoutingModule} from './app.routing';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import {AvAutocompleteChipModule} from './av-autocomplete-chip/av-autocomplete-chip.module';


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent

  ],
  imports: [
    AppRoutingModule,
     AvAutocompleteModule, MatAutocompleteModule, MatIconModule, MatInputModule, FormsModule,
    HighlightJsModule, AvChipModule,
    CommonModule, AvAutocompleteChipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
