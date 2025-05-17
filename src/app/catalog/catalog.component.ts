import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.categories = [...new Set(data.map((p) => p.productCategory))];
    });
  }

  filteredProducts(): Product[] {
    return this.products.filter(
      (product) =>
        !this.selectedCategory || product.productCategory === this.selectedCategory
    );
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
