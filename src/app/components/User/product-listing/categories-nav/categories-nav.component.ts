import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.css'],
  imports:[CommonModule]
})
export class CategoriesNavComponent {
  @Input() categories: string[] = [];
  @Output() categoryChange = new EventEmitter<string>();
  selectedCategory: string = '';

  // Call this when a category is clicked
  selectCategory(category: string) {

    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }
}
