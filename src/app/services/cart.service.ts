import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/v1/carts'; // Base API URL for cart

  constructor(private http: HttpClient) {}

  // Add product to cart
  addToCart(idProduct:Number, productCount: Number): Observable<any> {
    const url = `${this.apiUrl}?idProduct=${idProduct}&productCount=${productCount}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.post<any>(url, {}, { headers }); // Send a POST request with headers
  }

  // Get cart details
  getCart(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get<any>(this.apiUrl, { headers }); // Send a GET request with headers
  }

  // Helper method to get the token
  private getToken(): string {
    // Replace this with your actual logic to retrieve the token (e.g., from localStorage or a service)
    return localStorage.getItem('token') || '';
  }
}