import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientService } from '../app/services/ingredient-service.service';
import { IngredientListComponent } from '../app/components/ingredient-list/ingredient-list.component';
import { AppComponent } from './app.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './services/alert.service';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    PlaceOrderComponent,
    NavComponent,
    ModalComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    NgbModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [IngredientService, AlertService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
