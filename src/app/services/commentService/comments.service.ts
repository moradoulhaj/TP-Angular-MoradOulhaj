import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, newComment } from '../../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'http://localhost:8000/api/v1/comments';

  constructor(private http: HttpClient) {}

  // Fetch comments for a specific product
  getProductComments(productId: Number): Observable<Comment[]> {
    const url = `${this.apiUrl}/?idProduct=${productId}`;
    return this.http.get<any>(url);
  }
  createComment(comment: newComment): Observable<Comment> {
    const url = `${this.apiUrl}`;
    // Set the token in the headers
    const headers = new HttpHeaders({
      token: `Bearer ${this.getToken()}`,
    });
    return this.http.post<Comment>(url, comment, { headers });
  }

  // Helper method to get the token
  private getToken(): string {
    // Replace this with your actual logic to retrieve the token (e.g., from localStorage or a service)
    return localStorage.getItem('token') || '';
  }
}
