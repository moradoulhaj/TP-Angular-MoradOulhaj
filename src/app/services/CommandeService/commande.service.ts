import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8000/api/v1/history'; // Base API URL for history

  constructor(private http: HttpClient) { }

  // Method to create history
  createHistory(historyData: {
    idUser: number;
    phone: number;
    address: string;
    fullname: string;
    total: number;
    cart: Array<{
      id: number;
      nameProduct: string;
      priceProduct: number;
      count: number;
      img: string;
    }>;
  }): Observable<any> {
    
    return this.http.post(this.apiUrl, historyData);
  }

  // Method to get history by user ID
  getHistoryByUserId(idUser: number): Observable<any> {
    const url = `${this.apiUrl}?idUser=${idUser}`;
    return this.http.get(url);
  }

  // Method to get all history
  getAllHistory(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}