import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // User is already logged in, redirect to home or dashboard
      this.router.navigate(['/']);
      return false;
    }
    return true; // Allow access to login/signup
  }
}
