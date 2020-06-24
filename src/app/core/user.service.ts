import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_CONFIG = 'http://localhost:8080';
  private readonly API_URL = 'users2';
  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<User> {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/${userId}`;
    return this.http.get<User>(url);
  }

  findUser(username: string): Observable<User> {
    const url = `${this.BASE_CONFIG}/${this.API_URL}/?username=${username}`;
    return this.http.get<User>(url);
  }
}
