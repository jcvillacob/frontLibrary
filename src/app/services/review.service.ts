import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { API_CONFIG } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl  = `${API_CONFIG.baseUrl}/reviews`;

  constructor(private http: HttpClient) { }

  getReviews(bookName: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}?book=${bookName}`);
  }

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  updateReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: string): Observable<Review> {
    return this.http.delete<Review>(`${this.apiUrl}/${id}`);
  }
}