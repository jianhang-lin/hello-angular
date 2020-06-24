import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '请输入用户名';
  password = '请输入密码';
  defaultUsernameColor = true;
  defaultPasswordColor = true;
  auth: Auth;
  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.loginWithCredentials(this.username, this.password).then(auth => {
      const redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
      if (!auth.hasError) {
        this.router.navigate([redirectUrl]);
        localStorage.removeItem('redirectUrl');
      } else {
        this.auth = Object.assign({}, auth);
      }
    });
  }

  clearUsername() {
    this.username = '';
    this.defaultUsernameColor = false;
  }

  clearPassword() {
    this.password = '';
    this.defaultPasswordColor = false;
  }
}
