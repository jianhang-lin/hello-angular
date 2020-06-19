import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  inputValue = '';
  @Input() placeholder = 'What needs to be done?';
  @Input() delay = 300;
  @Output() textChanges = new EventEmitter<string>();
  @Output() doEnterUp = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef) {
    const event$ = fromEvent(elementRef.nativeElement, 'keyup')
        .pipe(map(() => this.inputValue), debounceTime(this.delay));
    event$.subscribe(input => {
      this.textChanges.emit(input);
    });
  }

  ngOnInit(): void {
  }

  enterUp() {
    this.doEnterUp.emit(true);
    this.inputValue = '';
  }
}
