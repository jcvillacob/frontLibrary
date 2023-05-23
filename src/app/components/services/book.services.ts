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


  // ... otros métodos según sea necesario (p.ej., para crear, actualizar, eliminar libros) ...
}
