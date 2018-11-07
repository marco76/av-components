import {Component, Inject, OnInit} from '@angular/core';
import {DateAdapter} from '@angular/material';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {AvEditorService} from './av-editor.service';
import {AvTableColumnConfig} from '../../av-table/av-table/AvTableColumnConfig';
import {EditType} from './edit-types';

@Component({
  selector: 'app-av-editor',
  templateUrl: './av-editor.component.html',
  styleUrls: ['./av-editor.component.css'],
  providers: [AvEditorService]
})
export class AvEditorComponent implements OnInit {

  dataColumns: Array<AvTableColumnConfig>;
  debug: string = '';
  editedObject: any;
  form: FormGroup;
  editType: EditType;

  constructor(public dialogRef: MatDialogRef<AvEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private avEditorService: AvEditorService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-CH');
  }

  ngOnInit() {
    this.editedObject = {};
    if (this.data !== {}) {
      this.editType = EditType.UPDATE;
    } else {
      this.editType = EditType.CREATE;
    }

    this.dataColumns = this.data.dataColumns;
    if (this.data.edited) {
      this.editedObject = this.data.edited;
    }

    this.form = this.avEditorService.toFormGroup(this.dataColumns);
  }

  onSave() {
    if (EditType.CREATE === this.editType) {
      this.dialogRef.close({newRecord: this.editedObject});
    } else {
      this.copyFormDataIntoRecord(this.editedObject, this.form);
      this.dialogRef.close({editedRecord: this.editedObject});
    }
  }

  onExit() {
    this.dialogRef.close(null);
  }

  public copyFormDataIntoRecord(obectToMerge: any,
                                form: FormGroup) {

    const fieldsInTheForm = Object.keys(form.value);
    fieldsInTheForm.forEach((fieldName) => {
      // undefined if the field didn't change
      if (!(typeof form.value[fieldName] === 'object' && typeof form.value[fieldName].value === 'undefined')) {
        obectToMerge[fieldName] = form.value[fieldName];
      }
    });
  }
}
