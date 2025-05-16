import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {  SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  { path: 'catalogue', component: CatalogComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', component: SigninComponent },

];
