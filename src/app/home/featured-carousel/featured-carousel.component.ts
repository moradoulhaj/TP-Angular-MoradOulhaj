import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css'],
  imports: [CommonModule]
})
export class FeaturedCarouselComponent {
  constructor(private router: Router) {}

  @Input() featuredProducts: Product[] = [];

  selectedProduct?: Product;


  
  openDetails(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
  

closeDetails() {
  this.selectedProduct = undefined;
}

  
}
