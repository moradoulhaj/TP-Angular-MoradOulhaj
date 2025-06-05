import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf,
    MatInputModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatSnackBarModule],
  styleUrls: ['./signin.component.css'],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/authenticate', credentials, { observe: 'response' })
      .subscribe({
        next: (res) => {
          const token = res.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res.body));
            this.router.navigate(['/catalogue']);
          }
        },
        error: () => {
          this.snackBar.open('Email ou mot de passe incorrect.', 'Fermer', {
            duration: 3000,
            panelClass: ['mat-warn']
          });
        }
      });
  }
}
