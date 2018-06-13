import {Component, OnInit} from '@angular/core';
import {AvAutocompleteItem} from '../../../av-autocomplete/AvAutocompleteItem';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { AvSnackBar } from '../../../av-snackbar/av-snack-bar.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [AvSnackBar]
})
export class AutocompleteComponent implements OnInit {

  selectableObjects: Observable<Array<AvAutocompleteItem>>;
  arrayOfObjects: Array<AvAutocompleteItem>;
  selectedItem: any;
  selectedItem1: any;

  constructor( public avSnackBar: AvSnackBar) {}

  ngOnInit(): void {
    const demoObjects = ([
      new AvAutocompleteItem('cool', 'value1', {name: 'object1'}),
      new AvAutocompleteItem('cool2', 'value2', {name: 'object2'})
    ]);
    this.selectableObjects = Observable.of(demoObjects);
    this.arrayOfObjects = demoObjects;
  }

  onSelected(item: AvAutocompleteItem) {
    this.selectedItem = item.object;
  }

  onSelected1(item: AvAutocompleteItem) {
    this.selectedItem1 = item.object;
  }

  getJSON(item: any) {
    if (item) {
      return JSON.stringify(item);
    }
    return '';
  }

  openSnackBar(message: string, status: string) {
   this.avSnackBar.openSnackBar(message, status);
  }

}
