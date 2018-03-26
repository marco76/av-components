import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AvAutocompleteItem} from './AvAutocompleteItem';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';
import {AvAutocompleteProperties} from './AvAutocompleteProperties';

@Component({
  selector: 'av-autocomplete',
  templateUrl: './av-autocomplete.component.html'
})
export class AvAutocomplete implements OnInit {

  @Input() selectableObjects: ArrayObservable<AvAutocompleteItem>;
  @Input() properties?: AvAutocompleteProperties;
  @Output() changeText: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectItem: EventEmitter<AvAutocompleteItem> = new EventEmitter<AvAutocompleteItem>();

  inputText: string;
  selectedObject: AvAutocompleteItem;
  isOptionSelected = false;
  isObservable = false;

  constructor() {
  }

  autoProperties: AvAutocompleteProperties = {placeholder : 'Set your placeholder', cancelIcon: 'clear'};

  ngOnInit(): void {
    if (this.properties) {
      Object.assign(this.autoProperties, this.properties);
    }
  }


  onClearContent() {
    delete this.inputText;
  }

  onItemSelected(event: any) {
    this.selectedObject = event.option.value as AvAutocompleteItem;

    this.inputText = this.selectedObject.label;
    this.isOptionSelected = true;
    this.selectItem.emit(this.selectedObject);
  }

  onChange() {
    this.changeText.emit(this.inputText);
  }
}
