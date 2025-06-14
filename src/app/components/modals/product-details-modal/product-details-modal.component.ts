import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/productService/product.service';
import { CommentsService } from '../../../services/commentService/comments.service';
import { Product } from '../../../models/product';
import { Comment } from '../../../models/comment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/AuthService/auth.service';
import { CartService } from '../../../services/cartService/cart.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
  imports: [CommonModule], // Import CommonModule for ngIf, ngFor, etc.
})
export class ProductDetailsModalComponent implements OnInit {
  @Input() product!: Product; // Accept product ID as input
  comments: Comment[] = []; // Comments for the product
  @Input() selectProduct!: (product: Product | null) => void;
  isLoggedIn: boolean = false; // Track login status
  quantity: number = 1; // Dynamic quantity

  constructor(
    private productService: ProductService,
    private commentsService: CommentsService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.product && this.product.id) {
      this.fetchComments(); // Fetch comments when the component initializes
    } else {
      console.error('Product ID is not provided or invalid.');
    }
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // Fetch comments for the product
  fetchComments(): void {
    this.commentsService.getProductComments(this.product.id).subscribe(
      (comments) => {
        this.comments = comments; // Assign fetched comments to the array
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  addToCart(): void {
    if (this.isLoggedIn) {
      if (this.product && this.product.id) {
        this.cartService.addToCart(this.product.id, this.quantity).subscribe({
          next: (response) => {
            this.selectProduct(null); // Close the modal after adding to cart
            console.log('Product added to cart successfully:', response);
          },
          error: (error) => {
            console.error('Error adding product to cart:', error);
          },
        });
      } else {
        console.error('Product ID is not available.');
      }
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { mode: 'signin' },
      });
    }
  }
  // Increase quantity
  increaseQuantity(): void {
    this.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
