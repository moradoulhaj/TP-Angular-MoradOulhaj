import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { FeaturedCarouselComponent } from "./featured-carousel/featured-carousel.component";
import { BestDealsComponent } from "./best-deals/best-deals.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, CategoriesNavComponent, FeaturedCarouselComponent, BestDealsComponent, NewArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // 1. Fetch all products to get categories
    this.productService.fetchAllProducts().subscribe({
      next: products => {
        this.categories = this.getUniqueCategories(products);
        // Pick first category or "All"
        this.selectedCategory = this.categories.length > 0 ? this.categories[0] : '';
        if (this.selectedCategory) {
          this.loadFeaturedProducts(this.selectedCategory);
        }
      },
      error: err => {
        console.error('Failed to fetch products', err);
      }
    });
  }

  getUniqueCategories(products: Product[]): string[] {
    const cats = products.map(p => p.category);
    return Array.from(new Set(cats));
  }

  loadFeaturedProducts(category: string): void {
    // You can set page and size as needed
    this.productService.fetchProductsByCategory(category, 1, 10).subscribe({
      next: products => {
        this.featuredProducts = products;
        console.log(this.featuredProducts);
        
      },
      error: err => {
        console.error(`Failed to fetch products for category ${category}`, err);
      }
    });
  }

  // This will be called when category changes from CategoriesNavComponent (you'll bind it)
  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadFeaturedProducts(category);
  }
}
