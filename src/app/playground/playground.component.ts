import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  animations: [
    trigger('signal', [
      state('void', style({
        transform: 'translateY(-100%)'
      })),
      state('go', style({
        'background-color': 'green',
        height: '100px'
      })),
      state('stop', style({
        'background-color': 'red',
        height: '50px'
      })),
      transition('void => *', animate(500))
    ])
  ]
})
export class PlaygroundComponent implements OnInit {

  birthday = new Date();
  pi = 3.141592627;
  signal: string;
  constructor() { }

  ngOnInit(): void {
  }

  onGo() {
    this.signal = 'go';
  }

  onStop() {
    this.signal = 'stop';
  }
}
