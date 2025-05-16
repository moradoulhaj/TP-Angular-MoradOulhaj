import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  styleUrls :['./signin.component.css'],
  templateUrl: './signin.component.html',
})

export class SigninComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:3000/api/signin', credentials)
      .subscribe({
        next: (response) => {
          // Optionnel : Stocker les infos utilisateur
          localStorage.setItem('user', JSON.stringify(response));
          // Redirection
          this.router.navigate(['/catalogue']);
        },
        error: () => {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      });
  }
  
}
