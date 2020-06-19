import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly BASE_CONFIG = 'http://localhost:8080';
  private readonly API_URL = 'api/todos';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  addTodo(desc: string): Observable<Todo> {
    const todo: Todo = {
      id: v4(),
      desc,
      completed: false
    };
    const uri = `${this.BASE_CONFIG}/${this.API_URL}`;
    return this.http.post<Todo>(uri, JSON.stringify(todo), {headers: this.headers});
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/${todo.id}`;
    const updateTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http.put<Todo>(url, JSON.stringify(updateTodo), {headers: this.headers});
  }

  deleteTodoById(id: string): Observable<void> {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/${id}`;
    return this.http.delete<void>(url, {headers: this.headers});
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.BASE_CONFIG}/${this.API_URL}`);
  }
}