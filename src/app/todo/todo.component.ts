import { Component, OnInit } from '@angular/core';
import {Todo} from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  desc = '';
  constructor() { }

  ngOnInit(): void {
  }

  addTodo() {
    this.todos.push({id: 1, desc: this.desc, completed: false});
    this.desc = '';
  }
}
