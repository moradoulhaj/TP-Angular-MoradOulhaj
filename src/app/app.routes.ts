import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './components/common/product-details-modal/product-details-modal.component';

export const routes: Routes = [
  { path: 'authenticate', component: AuthComponent },
  { path: '', component: HomeComponent },

  { path: 'product/:id', component: ProductDetailsComponent },

];
