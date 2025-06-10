import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommentsService } from '../../../services/comments.service';
import { Product } from '../../../models/product';
import { Comment } from '../../../models/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
  imports: [CommonModule], // Import CommonModule for ngIf, ngFor, etc.
})
export class ProductDetailsModalComponent implements OnInit {
  @Input() product!: Product; // Accept product ID as input
  comments: Comment[] = []; // Comments for the product
  @Input() selectProduct!: Function;

  constructor(
    private productService: ProductService,
    private commentsService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this.productId) {
    //   this.fetchProductDetails();
    //   this.fetchComments();
    // }
  }

  // Fetch product details by ID
  // fetchProductDetails(): void {
  //   this.productService.getProductById(this.productId).subscribe(
  //     (product) => {
  //       this.product = product;
  //     },
  //     (error) => {
  //       console.error('Error fetching product details:', error);
  //     }
  //   );
  // }

  // Fetch comments for the product
  // fetchComments(): void {
  //   this.commentsService.getProductComments(this.productId).subscribe(
  //     (comments) => {
  //       this.comments = comments;
  //     },
  //     (error) => {
  //       console.error('Error fetching comments:', error);
  //     }
  //   );
  // }

  // Close the modal
  close(): void {
    this.router.navigate(['/']); // Navigate to the home page or previous route
  }
}
