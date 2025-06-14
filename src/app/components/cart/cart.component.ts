import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cartService/cart.service';
import { Cart } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../../services/CommandeService/commande.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule
  ] ,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService,private commandeService : CommandeService) {}
  cart: Cart[] = []; // Initialize cart as an empty array
  cartTotal: number = 0; // Holds the total cost of the cart
  address: string = ''; // Holds the address for checkout
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

  removeFromCart(cartid: number): void {
    this.cart = this.cart.filter((item) => item.id !== cartid); // Update the cart array
    this.cartTotal = this.cart.reduce((total, item) => {
      return total + item.priceProduct * item.count; // Recalculate the cart total
    }, 0);
    console.log('Item removed from cart:', cartid);
  }

  checkout(): void {
    // Retrieve user information from local storage
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    const idUser :number= userInfo.id || '';
    const phone = userInfo.phone || '';
    const fullname = userInfo.fullname || '';

    // Use the adresse input value
    const address = this.address; // Ensure 'address' is bound to the input field using [(ngModel)]

    // Calculate the total price
    const total = this.cart.reduce((sum, item) => sum + item.priceProduct * item.count, 0);

    // Prepare the data object
    const historyData = {
      idUser,
      phone,
      address,
      fullname,
      total,
      cart: this.cart
    };

    // Call the service to create history
    this.commandeService.createHistory(historyData).subscribe(
      (response) => {
        console.log('Checkout successful:', response);
        // Optionally clear the cart or show a success message
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
}
