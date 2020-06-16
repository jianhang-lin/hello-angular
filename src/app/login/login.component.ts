import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  text = 'Hello LoginComponent';
  constructor() { }

  ngOnInit(): void {
  }

  onClick(username, password) {
    console.log('username:' + username + '\n\r' + 'password:' + password);
  }
}
