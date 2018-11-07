import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {TableComponent} from './components/table/table.component';
import {ChipsComponent} from './components/chips/chips.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,  {enableTracing: true}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
