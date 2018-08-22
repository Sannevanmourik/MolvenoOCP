import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  
  menuUrl = 'http://localhost:8080/api/menu';


  constructor(private http: HttpClient) {

   }

  public getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl);
  }

  getMenu (id: number): Observable<Menu>{
    return this.http.get<Menu>(`${this.menuUrl}/${id}`);
  }


}
