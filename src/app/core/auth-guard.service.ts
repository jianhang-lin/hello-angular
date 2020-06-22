import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 取得用记访问的URL
    const url: string = state.url;
    return this.checkLogin(url);
  }


  private checkLogin(url: string): boolean {
    // 如果用户已经登录就发行
    if (localStorage.getItem('userId') != null) {
      return true;
    }
    // 否则，存储要访问的URL到本地
    localStorage.setItem('redirectUrl', url);
    // 然后导航到登录页面
    this.router.navigate(['/login']);
    // 返回false, 取消导航
    return false;
  }
}
