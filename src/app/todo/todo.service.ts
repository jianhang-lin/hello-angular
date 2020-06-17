import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  constructor() { }

  addTodo(todoItem: string): Todo[] {
    const todo = {
      id: v4(),
      desc: todoItem,
      completed: false
    };
    this.todos.push(todo);
    return this.todos;
  }
}
