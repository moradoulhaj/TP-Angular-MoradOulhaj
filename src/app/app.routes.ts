import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './components/common/product-details-modal/product-details-modal.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },

  { path: 'product/:id', component: ProductDetailsComponent },

];
