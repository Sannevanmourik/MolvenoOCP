import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/Menu';
import { MenuItem } from '../models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {


  menuUrl = 'http://localhost:8080/api/menu';
  vegetarianUrl = 'http://localhost:8080/api/filter/vegetarian';

  constructor(private http: HttpClient) {

   }

  public getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl);
  }

  getMenu (id: number): Observable<Menu>{
    return this.http.get<Menu>(`${this.menuUrl}/${id}`);
  }

  getVegetarianMenu(): Observable<MenuItem>{
    return this.http.get<MenuItem>(this.vegetarianUrl);
  }


}
