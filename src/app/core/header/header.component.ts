import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private subscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  goTo(destination: string): void {
    switch (destination) {
      case 'login':
        this.router.navigate(['/auth'], { queryParams: { mode: 'signin' } });
        break;
      case 'signup':
        this.router.navigate(['/auth'], { queryParams: { mode: 'signup' } });
        break;
      case 'landingpage':
        this.router.navigate(['/']);
        break;
      default:
        console.warn('Unknown destination:', destination);
        break;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']); // navigate immediately
  }
}
