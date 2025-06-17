import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
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
    return this.http
      .post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn.next(true); // notify subscribers that user is logged in
        })
      );
  }

  /** Register user */
  register(
    fullname: string,
    email: string,
    password: string,
    phone: string
  ): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, {
      fullname,
      email,
      password,
      phone,
    });
  }

  /** Get all users (admin only) */
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/`, { headers });
  }

  /** Refresh JWT token */
  refreshToken(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/refresh`,
      {},
      { withCredentials: true }
    );
  }

  logout(): void {
    const headers = this.getAuthHeaders();
    this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe({
      next: () => {
        this.clearSession();
        this.loggedIn.next(false);
      },
      error: () => {
        // Even if API fails, still log the user out

        this.clearSession();
        this.loggedIn.next(false);
      },
    });
  }

  /** Synchronous check if user is logged in (token exists) */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /** Helper to get headers with Bearer token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      token: `Bearer ${token}`,
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

  /** Helper to know if user is admin */
  public isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.admin === '1';
  }
}
