import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientListComponent} from '../app/components/ingredient-list/ingredient-list.component';
import {IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredientEditor', component: IngredientEditorComponent },

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {



}
