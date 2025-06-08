import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[CommonModule]
})
export class HeaderComponent {
  isLoggedIn = false;
  user: any = null;

  constructor(private router: Router , private http:HttpClient ,private authService :AuthService) {}


  goToLandingPage(){
    this.router.navigate(["/"]);
  }
 // In your HeaderComponent or wherever needed
ngOnInit() {
  this.authService.isLoggedIn$.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
    // update UI accordingly
  });
}

  logout() {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    this.http.post('/api/v1/users/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/auth']);
      },
      error: () => {
        // Still clear the session even if backend fails
        localStorage.clear();
        this.router.navigate(['/auth']);
      }
    });
  }
  
}
