
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { FeaturedCarouselComponent } from "./featured-carousel/featured-carousel.component";
import { BestDealsComponent } from "./best-deals/best-deals.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";


@Component({
  selector: 'app-product-listing',
  imports: [
    CategoriesNavComponent,
    FeaturedCarouselComponent,
    BestDealsComponent,
    NewArrivalsComponent,
],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  featuredProducts: Product[] = [];
  bestDealsProducts: Product[] = [];
  newArrivalProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchAllProducts().subscribe({
      next: (products) => {
        this.categories = this.getUniqueCategories(products);
        this.selectedCategory =
          this.categories.length > 0 ? this.categories[0] : '';

        if (this.selectedCategory) {
          this.loadFeaturedProducts(this.selectedCategory);
        }

        this.loadBestDeals(products);
        this.loadNewArrivals(products);
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
      },
    });
  }

  getUniqueCategories(products: Product[]): string[] {
    const cats = products.map((p) => p.category);
    return Array.from(new Set(cats));
  }

  loadFeaturedProducts(category: string): void {
    this.productService.fetchProductsByCategory(category, 1, 10).subscribe({
      next: (products) => {
        this.featuredProducts = products;
      },
      error: (err) => {
        console.error(`Failed to fetch products for category ${category}`, err);
      },
    });
  }

  loadBestDeals(products: Product[]): void {
    // Sort products by discountPercentage and take top 10
    this.bestDealsProducts = products
      .filter((p) => p.promotionPercent != null)
      .sort((a, b) => b.promotionPercent! - a.promotionPercent!)
      .slice(0, 6);
    console.log('dd', this.bestDealsProducts);
  }

  loadNewArrivals(products: Product[]): void {
    this.newArrivalProducts = products
      .filter((p) => p.createdAt) // ensure createdAt exists
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
      .slice(0, 8); // latest 3 products
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadFeaturedProducts(category);
  }
}
