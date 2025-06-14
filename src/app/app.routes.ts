import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsModalComponent } from './components/common/product-details-modal/product-details-modal.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

export const routes: Routes = [
  { path: 'authenticate', component: AuthComponent },
  { path: '', component: ProductListingComponent }, // Assuming HomeComponent is imported and defined elsewhere
  { path: 'cart', component: CartComponent },


  { path: 'product/:id', component: ProductDetailsModalComponent },

];
