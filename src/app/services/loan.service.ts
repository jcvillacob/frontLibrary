import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/api.config';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl  = `${API_CONFIG.baseUrl}/loans`;

  constructor(private http: HttpClient) { }

  getSelfLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/me`);
  }
}
