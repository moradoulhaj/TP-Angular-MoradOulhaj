import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css'],
  imports: [CommonModule],
})
export class FeaturedCarouselComponent {
  constructor(private router: Router) {}
  @Output() categoryChange = new EventEmitter<string>();

  @Input() featuredProducts: Product[] = [];
  @Input() categories: string[] = [];
  selectedCategory: string = '';

  // // Call this when a category is clicked
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }
  selectedProduct?: Product;
  goToProductDetails(id: Number) {
    this.router.navigate(['/product-details', id]);
  }
}
