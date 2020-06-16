import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject('auth') private service) { }

  ngOnInit(): void {
  }

  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password));
  }
}
