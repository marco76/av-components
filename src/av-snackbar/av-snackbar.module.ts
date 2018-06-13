import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvSnackBar } from './av-snack-bar.component';
import { MatSnackBarModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, OverlayModule],
  exports: [
    AvSnackBar
  ]
  ,
  declarations: [
    AvSnackBar,
  ]
})
export class AvSnackBarModule { }
