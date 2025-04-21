import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];
