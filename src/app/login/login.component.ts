import { Component, Inject, OnInit } from '@angular/core';

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
  constructor(@Inject('auth') private service) { }

  ngOnInit(): void {
  }

  onSubmit(formValue) {
    console.log('auth result is:' + this.service.loginWithCredentials(formValue.login.username, formValue.login.paramMap));
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
