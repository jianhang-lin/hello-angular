import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(@Inject('auth') private service) { }

  ngOnInit(): void {
  }

  onSubmit(formValue) {
    console.log('auth result is:' + this.service.loginWithCredentials(formValue.login.username, formValue.login.paramMap));
  }
}
