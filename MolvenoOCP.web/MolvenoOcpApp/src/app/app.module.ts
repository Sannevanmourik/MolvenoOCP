import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientService } from '../app/services/ingredient-service.service';
import { IngredientListComponent } from '../app/components/ingredient-list/ingredient-list.component';
import { IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './services/alert.service';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
=======
import { ReactiveFormsModule } from '@angular/forms';

>>>>>>> develop

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
<<<<<<< HEAD
    PlaceOrderComponent,
    NavComponent,
    ModalComponent,
    LoginComponent,
    AdminComponent,
=======
    IngredientEditorComponent,


>>>>>>> develop
  ],
  imports: [
    NgbModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
=======
    ReactiveFormsModule
>>>>>>> develop
  ],
  providers: [IngredientService, AlertService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
<<<<<<< HEAD
=======

// it works, because of the herbs
>>>>>>> develop
