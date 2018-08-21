import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientListComponent} from '../app/components/ingredient-list/ingredient-list.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientListComponent }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {



}
