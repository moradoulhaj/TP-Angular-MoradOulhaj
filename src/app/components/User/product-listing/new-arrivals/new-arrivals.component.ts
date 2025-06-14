import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css',
  imports: [CommonModule],
})
export class NewArrivalsComponent {
  @Input() products: Product[] = [];
  constructor(private router: Router) {}

  openDetails(id: Number) {
    this.router.navigate(['/product-details', id]);
  }
  @Output() productChange = new EventEmitter<Product>();
  selectProduct(product: Product) {
    this.productChange.emit(product);
  }
}
