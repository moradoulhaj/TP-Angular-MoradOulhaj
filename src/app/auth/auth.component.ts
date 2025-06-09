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

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSignUp = params['mode'] === 'signup';
    });
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = ''; // clear errors

    // Update the URL query parameter without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: this.isSignUp ? 'signup' : 'signin' },
      queryParamsHandling: 'merge', // preserve other params
    });
  }

  signIn() {
    this.errorMessage = '';
    this.auth.login(this.signInData.email, this.signInData.password).subscribe({
      next: (user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
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
          this.toggleMode(); // after successful signup, switch to sign-in form & update URL param
        },
        error: () => {
          this.errorMessage = 'Something went wrong during registration.';
        },
      });
  }
}
