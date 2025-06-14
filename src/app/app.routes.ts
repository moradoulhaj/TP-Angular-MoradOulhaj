import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListingComponent } from './components/User/product-listing/product-listing.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { CommandesStatusComponent } from './components/User/commandes-status/commandes-status.component';
import { ProductDetailsModalComponent } from './components/User/product-details-modal/product-details-modal.component';
import { CartComponent } from './components/User/cart/cart.component';

export const routes: Routes = [
  { path: 'authenticate', component: AuthComponent },
  { path: 'products', component: ProductListingComponent }, // Assuming HomeComponent is imported and defined elsewhere
  { path: '', component: LandingPageComponent },
  { path: 'commandes', component: CommandesStatusComponent },

  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailsModalComponent },
];
