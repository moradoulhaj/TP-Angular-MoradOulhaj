import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/v1/products';

  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.products$.next(products))
    );
  }

  fetchProductsByCategory(category: string, page: number = 1, size: number = 10): Observable<Product[]> {
    let params = new HttpParams()
      .set('category', category)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      tap(products => this.products$.next(products))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getCategories(): string[] {
    const products = this.products$.value;
    const categories = products.map(p => p.category);
    return Array.from(new Set(categories));
  }

  // getFeaturedProducts(): Product[] {
  //   const products = this.products$.value;
  //   return products.filter(p => p.isFeatured);
  // }
}
