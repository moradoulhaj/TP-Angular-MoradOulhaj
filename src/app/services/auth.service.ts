import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/v1/users';

  constructor(private http: HttpClient) {}

  /** Login user and store token */
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  /** Register user */
  register(fullname: string, email: string, password: string, phone: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, {
      fullname, email, password, phone
    });
  }

  /** Get all users (admin only) */
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/`, { headers });
  }

  /** Refresh JWT token */
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true });
  }

  /** Logout */
  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /** Helper to get headers with Bearer token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /** Clear local storage on logout */
  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
