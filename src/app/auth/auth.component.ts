import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AuthComponent {
  isSignUp = false;
  errorMessage: string = '';

  signInData = { email: '', password: '' };
  signUpData = { fullname: '', email: '', password: '', phone: '' };

  constructor(private auth: AuthService, private router: Router,private route:ActivatedRoute) {}

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = ''; // clear error on toggle
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSignUp = params['mode'] === 'signup';
    });
  }
  signIn() {
    this.errorMessage = '';
    this.auth.login(this.signInData.email, this.signInData.password).subscribe({
      next: (user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Something went wrong during login.';
      },
    });
  }

  signUp() {
    this.errorMessage = '';
    this.auth
      .register(
        this.signUpData.fullname,
        this.signUpData.email,
        this.signUpData.password,
        this.signUpData.phone
      )
      .subscribe({
        next: () => {
          this.toggleMode(); // redirect to login view
        },
        error: () => {
          this.errorMessage = 'Something went wrong during registration.';
        },
      });
  }
}




  