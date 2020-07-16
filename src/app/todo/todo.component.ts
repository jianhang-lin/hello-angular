import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Todo } from '../domain/entities';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Observable<Todo[]>;
  // desc = '';
  constructor(@Inject('todoService') private service,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    /*this.route.params.forEach((params: Params) => {
      const filter = params.filter;
      this.filterTodos(filter);
    });*/
    this.route.params
      .pipe(pluck('filter'))
      .subscribe(filter => {
        this.service.filterTodos(filter);
        this.todos = this.service.todos;
      });
  }

  addTodo(desc: string) {
    this.service.addTodo(desc);
  }

  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }

  removeTodo(todo: Todo) {
    this.service.deleteTodo(todo);
  }

  getTodos(): void {
    this.service.getTodos();
  }

  filterTodos(filter: string): void {
    this.service.filterTodos(filter);
  }

  clearCompleted() {
    this.service.clearCompleted();
  }

  toggleAll() {
    this.service.toggleAll();
  }
}
