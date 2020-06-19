import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() isChecked = false;
  @Input() todoDesc = '';
  @Output() doToggleTriggered = new EventEmitter<boolean>();
  @Output() doRemoveTriggered = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.doToggleTriggered.emit(true);
  }

  remove() {
    this.doRemoveTriggered.emit(true);
  }
}
