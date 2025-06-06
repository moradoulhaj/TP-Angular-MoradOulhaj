import { Component } from '@angular/core';
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { FeaturedCarouselComponent } from "./featured-carousel/featured-carousel.component";
import { BestDealsComponent } from "./best-deals/best-deals.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, CategoriesNavComponent, FeaturedCarouselComponent, BestDealsComponent, NewArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
