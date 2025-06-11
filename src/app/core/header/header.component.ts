import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart[] = []; // Initialize cart as an empty array
  isLoggedIn = false;
  private subscription?: Subscription;
  cartTotal: number = 0; // Holds the total cost of the cart

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    if (this.isLoggedIn) {

      this.cartService.getCart().subscribe({
        next: (cart) => {
          this.cart = cart; // Update the cart service with the fetched cart
          this.cartTotal = this.cart.reduce((total, item) => {
            return total + item.priceProduct * item.count;
          }, 0);          
        },
        error: (error) => {
          console.error('Error fetching cart:', error);
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  goTo(destination: string): void {
    switch (destination) {
      case 'login':
        this.router.navigate(['/auth'], { queryParams: { mode: 'signin' } });
        break;
      case 'signup':
        this.router.navigate(['/auth'], { queryParams: { mode: 'signup' } });
        break;
      case 'landingpage':
        this.router.navigate(['/']);
        break;
      default:
        console.warn('Unknown destination:', destination);
        break;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']); // navigate immediately
  }
}
