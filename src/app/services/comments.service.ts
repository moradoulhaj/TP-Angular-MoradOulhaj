import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'http://localhost:8000/api/v1/comments';

  constructor(private http: HttpClient) { }

  // Fetch comments for a specific product
  getProductComments(productId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/?idProduct=${productId}`;
    return this.http.get<any>(url);
  }
}