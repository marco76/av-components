import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AvTableColumnForm } from './AvTableColumnForm';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-av-form-element',
  templateUrl: './av-form-element.component.html',
  styleUrls: ['./av-form-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvFormElementComponent {

  @Input() element: AvTableColumnForm;
  @Input() form: FormGroup;
  @Input() record: any;

  itemArrayRemovable: true;

  constructor(private cdRef: ChangeDetectorRef) {}

  removeItemFromArray(itemList: Array<any>, itemToRemove: any) {
     itemList.splice(itemList.indexOf(itemToRemove), 1);
  }

  openDetail(record: any){
  }
}
