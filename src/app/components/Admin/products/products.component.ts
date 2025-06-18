import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/ProductService/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Initialize products as an empty array
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.fetchAllProducts().subscribe({
      next: (data) => {
        this.products = data; // Update the products array with fetched data
        console.log('Products retrieved:', this.products);
      },
      error: (error) => {
        console.error('Error retrieving products:', error);
      },
    });
  }

  viewProduct(product: Product): void {
    // Implement view functionality
    console.log('View product:', product);
  }

  editProduct(product: Product): void {
    // Implement edit functionality
    console.log('Edit product:', product);
  }

  deleteProduct(productId: number): void {
    // Implement delete functionality
    console.log('Delete product with ID:', productId);
  }
  createProduct(): void {
    // Implement create functionality
    console.log('Create new product');
  }
}
