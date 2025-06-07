import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service'; // or wherever you fetch products from
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
  imports:[CommonModule]
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,private router: Router, 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(prod => {
        this.product = prod;
      });
    }
  }

  close(): void {
    // Navigate back to the previous page or default route
    this.router.navigate(['/']); 
  }

  
}
