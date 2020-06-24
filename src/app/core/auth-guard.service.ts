import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Auth } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, @Inject('auth') private authService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // 取得用记访问的URL
    const url: string = state.url;
    // return this.checkLogin(url);
    return this.authService.getAuth().pipe(map((auth: Auth) => !auth.hasError));
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.authService.getAuth().pipe(map((auth: Auth) => !auth.hasError));
  }
}
