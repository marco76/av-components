import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvTwitterCard } from './av-twitter-card.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule, MatCardModule, HttpClientModule],
  exports: [
    AvTwitterCard
  ]
  ,
  declarations: [
    AvTwitterCard,
  ]
})
export class AvTwitterCardModule { }
