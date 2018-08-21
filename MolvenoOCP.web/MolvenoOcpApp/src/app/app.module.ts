import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientService } from '../app/services/ingredient-service.service';
import { IngredientListComponent } from '../app/components/ingredient-list/ingredient-list.component';
import { IngredientEditorComponent} from '../app/components/ingredient-editor/ingredient-editor.component';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    IngredientEditorComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// it works, because of the herbs
