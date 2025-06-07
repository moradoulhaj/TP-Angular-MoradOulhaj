import { Component, Input, input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-best-deals',
  imports: [CommonModule],
  templateUrl: './best-deals.component.html',
  styleUrl: './best-deals.component.css'
})
export class BestDealsComponent {
  @Input() products :Product[] = [];

}
