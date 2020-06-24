import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, User } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('user') private userSerivce) { }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    // return username === 'Grant';
    return this.userSerivce.findUser(username).pipe(map((user: User) => {
      const auth = new Auth();
      localStorage.removeItem('userId');
      const redirectUrl = (localStorage.getItem('redirectUrl') == null) ? '/' : localStorage.getItem('redirectUrl');
      auth.redirectUrl = redirectUrl;
      if (null === user) {
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (password === user.password) {
        auth.user = Object.assign({}, user);
        auth.hasError = false;
        localStorage.setItem('userId', String(user.id));
      } else {
        auth.hasError = true;
        auth.errMsg = 'password not match';
      }
      return auth;
    }));
  }
}
