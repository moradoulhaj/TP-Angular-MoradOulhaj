import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/productService/product.service';
import { CommentsService } from '../../../services/commentService/comments.service';
import { Product } from '../../../models/product';
import { Comment, newComment } from '../../../models/comment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/AuthService/auth.service';
import { CartService } from '../../../services/cartService/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductDetailsModalComponent implements OnInit {
  @Input() product!: Product; // Accept product ID as input
  comments: Comment[] = []; // Comments for the product
  @Input() selectProduct!: (product: Product | null) => void;
  isLoggedIn: boolean = false; // Track login status
  quantity: number = 1; // Dynamic quantity
  newComment: newComment = {
    idProduct: 0,
    idUser: 0,
    fullname: '',
    content: '',
    star1: '',
    star2: '',
    star3: '',
    star4: '',
    star5: '',
  };
  constructor(
    private commentsService: CommentsService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.product && this.product.id) {
      this.newComment.idProduct = this.product.id; // Set product ID for new comment
      this.fetchComments(); // Fetch comments when the component initializes
    } else {
      console.error('Product ID is not provided or invalid.');
    }
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    this.newComment.idUser = userInfo.id || '';
    this.newComment.fullname = userInfo.fullname || '';
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
  ////////////////////////////////////UTILS FUNCTION////////////////////////////////////
  // Create a new comment
  setRating(rating: number): void {
    // Reset all stars
    this.newComment.star1 = 'false';
    this.newComment.star2 = 'false';
    this.newComment.star3 = 'false';
    this.newComment.star4 = 'false';
    this.newComment.star5 = 'false';

    // Set stars up to the selected rating
    if (rating >= 1) this.newComment.star1 = 'true';
    if (rating >= 2) this.newComment.star2 = 'true';
    if (rating >= 3) this.newComment.star3 = 'true';
    if (rating >= 4) this.newComment.star4 = 'true';
    if (rating >= 5) this.newComment.star5 = 'true';
  }
  //This function is used check if there is rating or no
  hasRating(): boolean {
    return (
      this.newComment.star1 === 'true' ||
      this.newComment.star2 === 'true' ||
      this.newComment.star3 === 'true' ||
      this.newComment.star4 === 'true' ||
      this.newComment.star5 === 'true'
    );
  }

  // resetCommentForm(): void {
  //   this.newComment = {
  //     idProduct: this.product.id,
  //     idUser: this.currentUser?.id || 0,
  //     fullname: this.currentUser?.fullname || 'Anonymous',
  //     content: '',
  //     star1: 'false',
  //     star2: 'false',
  //     star3: 'false',
  //     star4: 'false',
  //     star5: 'false',
  //   };
  // }
  //UTILS FUNCTION//
  submitComment(): void {
    console.log('Submitting comment:', this.newComment);

    if (this.newComment.content && this.hasRating()) {
      console.log('Submitting comment:', this.newComment);

      this.commentsService.createComment(this.newComment).subscribe({
        next: (comment) => {
          this.comments.unshift(comment);
          // this.resetCommentForm();
          console.log('Comment submitted successfully:', comment);
        },
        error: (error) => {
          console.error('Error submitting comment:', error);
          // Handle error (show message to user)
        },
      });
    }
  }
}
