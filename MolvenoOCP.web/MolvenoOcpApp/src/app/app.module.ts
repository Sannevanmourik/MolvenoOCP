import { MenuServiceService } from './services/menu-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientService } from '../app/services/ingredient-service.service';
import { IngredientListComponent } from '../app/components/ingredient-list/ingredient-list.component';
import { IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';
import { AppComponent } from './app.component';


import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './services/alert.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AdminComponent } from './components/admin/admin.component';
import { FakeBackendInterceptor, JwtInterceptor } from './components/helpers';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { ShowMenuComponent } from './components/show-menu/show-menu.component';
import { LowerCasePipe } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import { EnumSelectPipe } from './pipes/enum-select.pipe';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import {MatListModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/admin/menuItems/menu.component';
import { IngredientsComponent } from './components/admin/ingredients/ingredients.component';
import { SubdishListComponent } from './components/subdish-list/subdish-list.component';
import { SubdishEditorComponent } from './components/subdish-editor/subdish-editor.component';
import { SubdishesComponent } from './components/admin/subdishes/subdishes.component';
import { HomeComponent } from './components/home/home.component';
import { MenuModalComponent } from './menu-modal/menu-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    PlaceOrderComponent,
    NavComponent,
    ModalComponent,
    LoginComponent,
    AdminComponent,
    IngredientEditorComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    ShowMenuComponent,
    EnumSelectPipe,
    DeleteModalComponent,
    MenuComponent,
    IngredientsComponent,
    SubdishListComponent,
    SubdishEditorComponent,
    SubdishesComponent,
    HomeComponent,
    MenuModalComponent,


  ],
  imports: [
    NgbModule,
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    AngularFontAwesomeModule,
    MatCheckboxModule
  ],
  providers: [IngredientService, MenuServiceService, AlertService, NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
{
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }


