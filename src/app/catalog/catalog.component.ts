import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mockProducts } from '../data/mock-products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products = mockProducts;

  constructor(private router: Router) {}

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
