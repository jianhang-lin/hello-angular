import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Auth, User } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth = {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private http: HttpClient, @Inject('user') private userSerivce) { }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }

  unAuth(): void {
    this.auth = Object.assign(
      {},
      this.auth,
      {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'},
      this.subject.next(this.auth));
  }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    // return username === 'Grant';
    return this.userSerivce.findUser(username).pipe(map((user: User) => {
      const auth = new Auth();
      // localStorage.removeItem('userId');
      // const redirectUrl = (localStorage.getItem('redirectUrl') == null) ? '/' : localStorage.getItem('redirectUrl');
      // auth.redirectUrl = redirectUrl;
      if (null === user) {
        auth.user = null;
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (password === user.password) {
        auth.user = user;
        // Object.assign({}, user);
        auth.hasError = false;
        auth.errMsg = null;
        // localStorage.setItem('userId', String(user.id));
      } else {
        auth.user = null;
        auth.hasError = true;
        auth.errMsg = 'password not match';
      }
      this.auth = Object.assign({}, auth);
      this.subject.next(this.auth);
      return this.auth;
    }));
  }

  register(username: string, password: string): Observable<Auth> {
    const toAddUser = {
      username,
      password
    };
    return this.userSerivce.findUser(username).pipe(
      filter(user => user === null),
      switchMap(user => {
        return this.userSerivce.addUser(toAddUser).pipe(
          map((u: User) => {
            this.auth = Object.assign({}, {user: u, hasError: false, errMsg: null, redirectUrl: null});
            this.subject.next(this.auth);
            return this.auth;
          })
        );
      }));
  }
}
