import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // replace with your real API endpoint

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((item) => {
          const product = new Product(item.productID);
          product.id = item.id;
          product.productTitle = item.title;
          product.productPrice = item.price;
          product.productQuantity = item.quantity;
          product.productPicture = item.picture;
          return product;
        })
      )
    );
  }
}
