import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css',
  imports :[CommonModule]
})
export class NewArrivalsComponent {
  @Input() products: Product[] = [];

}
