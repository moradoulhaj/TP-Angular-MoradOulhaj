import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css'],
  imports:[CommonModule]
})
export class FeaturedCarouselComponent {
  @Input() featuredProducts: Product[] = [];
  
}
