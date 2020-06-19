import { Component, Inject, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  desc = '';
  constructor(@Inject('todoService') private service,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const filter = params.filter;
      this.filterTodos(filter);
    });
  }

  addTodo() {
    this.service
      .addTodo(this.desc)
      .subscribe(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .subscribe(t => {
        this.todos = [...this.todos.slice(0, i), t, ...this.todos.slice(i + 1)];
      });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .subscribe(() => {
        this.todos = [...this.todos.slice(0, i), ...this.todos.slice(i + 1)];
      });
  }

  getTodos(): void {
    this.service
      .getTodos()
      .subscribe(todos => {
        this.todos = [...todos];
      });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  filterTodos(filter: string): void {
    this.service
      .filterTodos(filter)
      .subscribe(todos => {
        this.todos = [...todos];
      });
  }
}
