import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css'],
  imports: [CommonModule],
})
export class FeaturedCarouselComponent {
  constructor(private router: Router) {}
  @Output() categoryChange = new EventEmitter<string>();
  @Output() productChange = new EventEmitter<Product>();

  @Input() featuredProducts: Product[] = [];
  @Input() categories: string[] = [];
  selectedCategory: string = '';

  // // Call this when a category is clicked
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }
  goToProductDetails(id: Number) {
    this.router.navigate(['/product-details', id]);
  }
  selectProduct(product: Product) {
    this.productChange.emit(product);
  }
}
