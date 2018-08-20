import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientService } from '../app/services/ingredient-service.service';
import { IngredientListComponent } from '../app/components/ingredient-list/ingredient-list.component';
import { AppComponent } from './app.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    PlaceOrderComponent
=======
    IngredientListComponent,


>>>>>>> develop
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//it works, because of the herbs