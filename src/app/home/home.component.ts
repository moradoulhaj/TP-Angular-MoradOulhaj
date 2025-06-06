import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { FeaturedCarouselComponent } from "./featured-carousel/featured-carousel.component";
import { BestDealsComponent } from "./best-deals/best-deals.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";
import { ProductService, Product } from '../services/product.service';  // Adjust path accordingly

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, CategoriesNavComponent, FeaturedCarouselComponent, BestDealsComponent, NewArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
      }
    });
  }
}
