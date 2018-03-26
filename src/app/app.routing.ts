import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,  {enableTracing: true}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
