import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListingComponent } from './components/User/product-listing/product-listing.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { CommandesStatusComponent } from './components/User/commandes-status/commandes-status.component';
import { ProductDetailsModalComponent } from './components/User/product-details-modal/product-details-modal.component';
import { CartComponent } from './components/User/cart/cart.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [UnauthGuard] },
  { path: 'products', component: ProductListingComponent },
  { path: '', component: LandingPageComponent },
  {
    path: 'commandes',
    component: CommandesStatusComponent,
    canActivate: [AuthGuard],
  },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsModalComponent },
];
