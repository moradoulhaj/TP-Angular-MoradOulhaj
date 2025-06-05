import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  imports: [FormsModule, RouterModule],
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.email || !this.password) return;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        // You can redirect or save token here
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed');
      },
    });
  }
}
