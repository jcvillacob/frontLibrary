import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book, Category, Editorial } from '../models/book.model';
import { API_CONFIG } from 'src/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = API_CONFIG.baseUrl + "/books";


  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(post: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, post);
  }

  updateBook(id: string ,book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
