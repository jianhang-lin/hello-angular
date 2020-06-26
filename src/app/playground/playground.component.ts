import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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
      transition('void => *', animate(5000, keyframes([
        style({transform: 'scale(0)', padding: '0px'}),
        style({transform: 'scale(0.1)', padding: '50px'}),
        style({transform: 'scale(0.5)', padding: '100px'}),
        style({transform: 'scale(0.9)', padding: '120px'}),
        style({transform: 'scale(0.95)', padding: '135px'}),
        style({transform: 'scale(1)', padding: '140px'})
      ]))),
      transition('* => *', animate('0.5s 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
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
