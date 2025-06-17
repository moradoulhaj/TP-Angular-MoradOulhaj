import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListingComponent } from './components/User/product-listing/product-listing.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { CommandesStatusComponent } from './components/User/commandes-status/commandes-status.component';
import { ProductDetailsModalComponent } from './components/User/product-details-modal/product-details-modal.component';
import { CartComponent } from './components/User/cart/cart.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { ProductsComponent } from './components/Admin/products/products.component';
import { UsersComponent } from './components/Admin/users/users.component';
import { ListComponent } from './components/Admin/products/list/list.component';
import { FormComponent } from './components/Admin/products/form/form.component';
import { OrdersComponent } from './components/Admin/orders/orders.component';
import { LayoutComponent } from './components/Admin/layout/layout.component';

export const routes: Routes = [
  // Public routes
  { path: 'auth', component: AuthComponent, canActivate: [UnauthGuard] },
  { path: 'products', component: ProductListingComponent },
  { path: '', component: LandingPageComponent },
  { path: 'product/:id', component: ProductDetailsModalComponent },
  
  // User routes (require auth)
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component: CommandesStatusComponent, canActivate: [AuthGuard] },
  
  // Admin routes
  { 
    path: 'admin', 
    canActivate: [AuthGuard, AdminGuard], 
    component:LayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { 
        path: 'products', 
        component: ProductsComponent,
        children: [
          { path: '', component: ListComponent },
          { path: 'new', component: FormComponent },
          { path: ':id/edit', component: FormComponent }
        ]
      },
      { path: 'commandes', component: OrdersComponent }
    ]
  }
];
