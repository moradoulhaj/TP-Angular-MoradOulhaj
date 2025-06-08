import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/v1/users';

  // BehaviorSubject to hold current login state, initialized based on token presence
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Observable for components to subscribe to login state changes
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  /** Login user and store token, update loggedIn status */
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.next(true);  // notify subscribers that user is logged in
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

  /** Logout user and clear session, update loggedIn status */
  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearSession();
        this.loggedIn.next(false);  // notify subscribers that user is logged out
      })
    );
  }

  /** Synchronous check if user is logged in (token exists) */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /** Helper to get headers with Bearer token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /** Remove token and user info from localStorage */
  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /** Helper to check token existence */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
