import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  birthday = new Date();
  pi = 3.141592627;
  constructor() { }

  ngOnInit(): void {
  }

}
