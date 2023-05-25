import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { API_CONFIG } from 'src/api.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${API_CONFIG.baseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }

  createMeGusta(bookId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/likes/${bookId}`);
  }

  deleteMeGusta(bookId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/likes/${bookId}`);
  }
}