import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todosTemp: Todo[] = [];
  @Input()
  set todos(todos: Todo[]) {
    this.todosTemp = [...todos];
  }

  get todos() {
    return this.todosTemp;
  }

  @Output() doRemoveTodo = new EventEmitter<Todo>();
  @Output() doToggleTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  doRemoveTriggered(todo: Todo) {
    this.doRemoveTodo.emit(todo);
  }

  doToggleTriggered(todo: Todo) {
    this.doToggleTodo.emit(todo);
  }

}
