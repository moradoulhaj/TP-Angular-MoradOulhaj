import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './components/common/product-details-modal/product-details-modal.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: 'authenticate', component: AuthComponent },
  { path: '', component: HomeComponent },
  { path: '/cart', component: CartComponent },


  { path: 'product/:id', component: ProductDetailsComponent },

];
