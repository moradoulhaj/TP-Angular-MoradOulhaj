import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductDetailsComponent } from './components/common/product-details-modal/product-details-modal.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { UnauthGuard } from './guards/unauth.guard';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent,canActivate:[UnauthGuard] },
  { path: '', component: LandingPageComponent },
  { path: 'products', component: ProductListingComponent },

  { path: 'product-details/:id', component: ProductDetailsComponent },

];
