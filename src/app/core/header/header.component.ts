import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/AuthService/auth.service';
import { CartService } from '../../services/CartService/cart.service';
import { Cart } from '../../models/cart';
import { User } from '../../models/User';

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
  user: User | null = null; // Holds the current user information, initialized to null
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
      this.user = JSON.parse(localStorage.getItem('user') || 'null'); // Retrieve user info from localStorage
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
      case 'products':
        this.router.navigate(['/products']);
        break;
      case 'home':
        this.router.navigate(['/']);
        break;
      case 'commandes':
        this.router.navigate(['/commandes']);
        break;
      case 'cart':
        this.router.navigate(['/cart']);
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
