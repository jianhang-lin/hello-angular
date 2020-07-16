import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { Auth, Todo } from '../domain/entities';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly BASE_CONFIG = 'http://localhost:8080';
  private readonly API_URL = 'api/todos';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  userId;
  private todosSubject: BehaviorSubject<Todo[]>;
  private dataStore: {
    todos: Todo[]
  };
  constructor(private http: HttpClient, @Inject('auth') private authService) {
    this.authService.getAuth()
      .pipe(filter((auth: Auth) => auth.user != null))
      .subscribe(auth => this.userId = auth.user.id);
    this.dataStore = { todos: []};
    this.todosSubject = new BehaviorSubject<Todo[]>([]);
  }

  get todos() {
    return this.todosSubject.asObservable();
  }

  addTodo(desc: string) {
    // const userId: number = +localStorage.getItem('userId');
    const todoToAdd: Todo = {
      id: v4(),
      desc,
      completed: false,
      userId: this.userId
    };
    const uri = `${this.BASE_CONFIG}/${this.API_URL}`;
    this.http.post<Todo>(uri, JSON.stringify(todoToAdd), {headers: this.headers})
      .subscribe((todo: Todo) => {
        this.dataStore.todos = [...this.dataStore.todos, todo];
        this.todosSubject.next(Object.assign({}, this.dataStore).todos);
      });
  }

  toggleTodo(todo: Todo) {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    const updateTodo = Object.assign({}, todo, {completed: !todo.completed});
    this.http.patch<Todo>(url, JSON.stringify(updateTodo), {headers: this.headers})
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          updateTodo,
          ...this.dataStore.todos.slice(i + 1)
        ];
        this.todosSubject.next(Object.assign({}, this.dataStore).todos);
      });
  }

  deleteTodo(todo: Todo) {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    this.http.delete<void>(url, {headers: this.headers})
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          ...this.dataStore.todos.slice(i + 1)
        ];
        this.todosSubject.next(Object.assign({}, this.dataStore).todos);
      });
  }

  getTodos() {
    // const userId: number = +localStorage.getItem('userId');
    this.http.get<Todo[]>(`${this.BASE_CONFIG}/${this.API_URL}?userId=${this.userId}`)
      .pipe(tap(t => console.log(t)))
      .subscribe(todos => this.updateStoreAndSubject(todos));
  }

  filterTodos(filter: string) {
    // const userId: number = +localStorage.getItem('userId');
    switch (filter) {
      case 'ACTIVE':
        this.http.get<Todo[]>(`${this.BASE_CONFIG}/${this.API_URL}?completed=false&userId=${this.userId}`)
          .subscribe(todos => this.updateStoreAndSubject(todos));
        break;
      case 'COMPLETED':
        this.http.get<Todo[]>(`${this.BASE_CONFIG}/${this.API_URL}?completed=true&userId=${this.userId}`)
          .subscribe(todos => this.updateStoreAndSubject(todos));
        break;
      default:
        this.getTodos();
    }
  }

  toggleAll() {
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
  }

  clearCompleted() {
    this.dataStore.todos
      .filter(todo => todo.completed)
      .forEach(todo => this.deleteTodo(todo));
  }

  private updateStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this.todosSubject.next(Object.assign({}, this.dataStore).todos);
  }
}

