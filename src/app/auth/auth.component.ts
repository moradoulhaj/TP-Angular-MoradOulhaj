import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [CommonModule, FormsModule],
})
export class AuthComponent implements OnInit {
  isSignUp = false;

  signInData = { email: '', password: '' };
  signUpData = { fullname: '', email: '', password: '', phone: '' };

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSignUp = params['mode'] === 'signup';
    });
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
  }

  signIn() {
    this.auth
      .login(this.signInData.email, this.signInData.password)
      .subscribe(user => {
        console.log('Signed in', user);
      });
  }

  signUp() {
    this.auth
      .register(
        this.signUpData.fullname,
        this.signUpData.email,
        this.signUpData.password,
        this.signUpData.phone
      )
      .subscribe(user => {
        console.log('Signed up', user);
        this.toggleMode(); 
      });
  }
}
