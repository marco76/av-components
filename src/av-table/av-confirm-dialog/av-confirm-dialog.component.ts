import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AvConfirmDialogProperties} from './AvConfirmDialogProperties';
import {AvConfirmDialogResponseType} from './AvConfirmDialogResponseType';

const TITLE = 'Bestätigung';
const DELETE = 'Datensatz löschen?';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './av-confirm-dialog.component.html',
  styleUrls: ['./av-confirm-dialog.component.css']
})
export class AvConfirmDialogComponent {

  public properties: AvConfirmDialogProperties;

  constructor(
    public dialogRef: MatDialogRef<AvConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(AvConfirmDialogResponseType.CANCEL);
  }

  onSave(): void {
    this.dialogRef.close(AvConfirmDialogResponseType.OK);
  }

  getTitle(): string {
    console.log('getting the title');
    return TITLE;
  }

  getDescription(): string {
    return DELETE;
  }
}
