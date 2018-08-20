import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class IngredientService {


  ingredientUrl = 'http://localhost:8080/api/ingredients';


  constructor(private http: HttpClient) {

   }

  public getAll() {
    return this.http.get(this.ingredientUrl);
  }

  getIngredient (id: number): Observable<Ingredient>{
    return this.http.get<Ingredient>(`${this.ingredientUrl}/${id}`);
  }

  addIngredient (ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.ingredientUrl, ingredient); // , httpOptions)
  }

  deleteIngredient (id: number): Observable<{}> {
    const url = `${this.ingredientUrl}/${id}`;
    return this.http.delete(url);
  }

  updateIngredient (ingredient: Ingredient, id: number): Observable<Ingredient> {
    // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.ingredientUrl}/${id}`;

    return this.http.put<Ingredient>(
      url, ingredient); // , httpOptions)
  }

}
