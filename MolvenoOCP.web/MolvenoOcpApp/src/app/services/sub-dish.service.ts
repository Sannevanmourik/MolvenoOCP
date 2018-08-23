import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subdish } from '../models/subdish';

@Injectable({
  providedIn: 'root'
})
export class SubDishService {

  subdishUrl = 'http://localhost:8080/api/subDishes';
  subdishDeleteUrl = 'http://localhost:8080/api/subDishes/delete';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(this.subdishUrl);
  }

  getSubdish (id: number): Observable<Subdish> {
    return this.http.get<Subdish>(`${this.subdishUrl}/${id}`);
  }

  addSubdish (subdish: Subdish): Observable<Subdish> {
    return this.http.post<Subdish>(this.subdishUrl, subdish); // , httpOptions)
  }

  deleteSubdish (id: number): Observable<{}> {
    const url = `${this.subdishDeleteUrl}/${id}`;
    return this.http.delete(url);
  }

  updateSubdish (subdish: Subdish, id: number): Observable<Subdish> {
    // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.subdishUrl}/${id}`;

    return this.http.put<Subdish>(
      url, subdish); // , httpOptions)
  }
}
