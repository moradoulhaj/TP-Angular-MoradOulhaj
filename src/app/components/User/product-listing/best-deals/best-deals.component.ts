import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-best-deals',
  imports: [CommonModule],
  templateUrl: './best-deals.component.html',
  styleUrl: './best-deals.component.css',
})
export class BestDealsComponent {
  @Input() products: Product[] = [];
  constructor(private router: Router) {}

  openDetails(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
  goToProductDetails(id: Number) {
    this.router.navigate(['/product-details', id]);
  }
  @Output() productChange = new EventEmitter<Product>();
  selectProduct(product: Product) {
    this.productChange.emit(product);
  }
}
