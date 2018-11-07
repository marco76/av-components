import {Component, Inject, ViewEncapsulation} from '@angular/core';
import { MatSnackBar } from '@angular/material';

/**
 * @title Snack-bar with a custom class
 */
@Component({
  selector: 'av-snack-bar',
  templateUrl: './av-snack-bar.component.html',
   styleUrls: ['./av-snack-bar.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class AvSnackBar {

  constructor(public matSnackBar: MatSnackBar) {}

  public openSnackBar(message: string, status: string) {
    this.matSnackBar.open(message, '', {
      panelClass: ['success-panel'],
      announcementMessage: 'aaaaa'

    });
  }
}
