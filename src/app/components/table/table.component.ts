import {Component, OnInit} from '@angular/core';
import {AvAutocompleteItem} from '../../../av-autocomplete/AvAutocompleteItem';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { AvSnackBar } from '../../../av-snackbar/av-snack-bar.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: []
})
export class TableComponent implements OnInit {
  const dataset = [{'name': 'Marco'}, {'name': 'Stephan'}];

  constructor( ) {}

  ngOnInit(): void {}

}
