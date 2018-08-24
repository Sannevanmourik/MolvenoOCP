import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientListComponent} from '../app/components/ingredient-list/ingredient-list.component';
import {IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ShowMenuComponent } from './components/show-menu/show-menu.component';
import { SubdishListComponent } from './components/subdish-list/subdish-list.component';
import { SubdishEditorComponent } from './components/subdish-editor/subdish-editor.component';
import { SubdishesComponent } from './components/admin/subdishes/subdishes.component';
import { IngredientsComponent } from './components/admin/ingredients/ingredients.component';
import { MenuComponent } from './components/admin/menuItems/menu.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredientEditor', component: IngredientEditorComponent },
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: 'menu', component: ShowMenuComponent},
  { path: 'subdish', component: SubdishListComponent},
  { path: 'editSubdish', component: SubdishEditorComponent},
  { path: 'subdishes', component: SubdishesComponent},
  { path: 'ingredients', component: IngredientsComponent},
  { path: 'menu1', component: MenuComponent},
  { path: 'home', component: HomeComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
