import { Component, Query } from '@angular/core';
import { User } from '../../../models/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLinkActive, RouterLink],
})
export class SidebarComponent {
  user: User | null = null;

  constructor(private router: Router,private authService: AuthService) {
    this.getUserFromLocalStorage();

  }

  /** Retrieve user information from local storage */
  private getUserFromLocalStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData) as User;
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        this.user = null;
      }
    } else {
      console.warn('No user data found in local storage.');
      this.user = null;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth'], { queryParams: { mode: 'signin' } });
  }    
}
