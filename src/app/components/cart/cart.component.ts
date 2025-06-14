import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cart: Cart[] = []; // Initialize cart as an empty array
  cartTotal: number = 0; // Holds the total cost of the cart
  ngOnInit() {
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
