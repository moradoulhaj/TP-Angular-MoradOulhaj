import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service'; // or wherever you fetch products from
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../models/comment';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  comments: Comment[] = []; // Placeholder for comments, if needed

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private commentService: CommentsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe((prod) => {
        this.product = prod;
      });
      this.commentService.getProductComments(Number(id)).subscribe();
    }
  }

  close(): void {
    // Navigate back to the previous page or default route
    this.router.navigate(['/']);
  }
}
