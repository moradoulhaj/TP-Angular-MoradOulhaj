import { Component } from '@angular/core';
import { User } from '../../../models/User';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLinkActive,RouterLink],
})
export class SidebarComponent {
  user: User | null = null;

  constructor() {
    this.getUserFromLocalStorage();
  }

  /** Retrieve user information from local storage */
  private getUserFromLocalStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData) as User;
        console.log('User retrieved:', this.user);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        this.user = null;
      }
    } else {
      console.warn('No user data found in local storage.');
      this.user = null;
    }
  }
}