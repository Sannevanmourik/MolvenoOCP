import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientListComponent} from '../app/components/ingredient-list/ingredient-list.component';
import {IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ShowMenuComponent } from './components/show-menu/show-menu.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredientEditor', component: IngredientEditorComponent },
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: 'menu', component: ShowMenuComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
