import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mockProducts } from '../data/mock-products';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit{

  products:Product[] = [];
   constructor(private productService : ProductService , private router :Router ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
      console.log(data)
    })
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
