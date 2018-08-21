// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private setActive = false;
  private loggedIn = false;
  private userType: string; // bijv. admin, age category, o.i.d. // (enum)

  constructor(private http: HttpClient) { }

  loginUser(userType: string) {
    this.loggedIn = true;
    this.userType = userType;
  }

  logoutUser() {
      this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    if (this.setActive === true) {
      return this.loggedIn;
    }
  }


  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setActive = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

}
