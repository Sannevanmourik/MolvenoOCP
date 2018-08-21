// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MenuService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class MenuService {


  menuUrl = 'http://localhost:8080/api/menuItems';
  menuxUrl = 'http://localhost:8080/api/menuItems/delete';


  constructor(private http: HttpClient) {

   }

  public getAll() {
    return this.http.get(this.menuUrl);
  }

  getMenu (id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.menuUrl}/${id}`);
  }

  addMenu (menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.menuUrl, menu, httpOptions);
  }

  deleteMenu (id: number): Observable<{}> {
    const url = `${this.menuxUrl}/${id}`;
    return this.http.delete(url);
  }

  updateMenu (menu: Menu, id: number): Observable<Menu> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.menuUrl}/${id}`;

    return this.http.put<Menu>(
      url, menu, httpOptions);
  }

}
