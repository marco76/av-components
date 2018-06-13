import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {TableComponent} from './components/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  },
  {
    path: 'table',
    component: TableComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,  {enableTracing: true}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
