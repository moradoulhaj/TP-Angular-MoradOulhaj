
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/v1/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      token: `Bearer ${token}`,
    });
  }


    /** Get all users (admin only) */
    getAllUsers(): Observable<User[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<User[]>(`${this.apiUrl}/`, { headers });
    }

  /** Update user information */
  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData, { headers });
  }

  /** Delete a user */
  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      headers,
      responseType: 'text', // Let Angular know it's not JSON
    });
  }
  
}