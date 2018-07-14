import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: []
})
export class TableComponent implements OnInit {
   simpleArray = [{'uid' : '123434','name': 'Marco Molteni', 'role': 'developer'}, {
     'uid' : '23434234','name': 'Bugs Bunny', 'role': 'actor'},
     {'uid' : '3234234','name': 'Tony Stark', 'role': 'Iron Man'}]
   simpleArrayView: Array<any>;

  constructor( ) {}

  ngOnInit(): void {
    this.simpleArrayView = this.basicClone(this.simpleArray);
  }

  getJSON(object: any): string {
    return JSON.stringify(object);
  }

  updateSimpleArray(text: string) {
      this.simpleArray = JSON.parse(text);;
      console.log('new array', this.simpleArray);
  }

  private basicClone<T>(any: T): T {
    return JSON.parse(JSON.stringify(any));
  }
}
