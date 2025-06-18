import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';
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

  returnUrl: string = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Récupère l'URL de redirection initiale
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||'/admin';
  }

  ngOnInit(): void {
    // Surveille les changements de paramètres pour le mode (signin/signup)
    this.route.queryParams.subscribe((params) => {
      this.isSignUp = params['mode'] === 'signup';
      
      // Met à jour le returnUrl si il change dans les queryParams
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';

    // Met à jour l'URL avec le nouveau mode tout en conservant le returnUrl
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        mode: this.isSignUp ? 'signup' : 'signin',
        returnUrl: this.returnUrl !== '/' ? this.returnUrl : null
      },
      queryParamsHandling: 'merge',
    });
  }

  signIn() {
    this.errorMessage = '';
    this.auth.login(this.signInData.email, this.signInData.password).subscribe({
      next: (user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirection vers l'URL de retour ou la page d'accueil
        this.router.navigateByUrl(this.returnUrl).then(() => {
          // Réinitialise le returnUrl après la redirection
          this.returnUrl = '/';
        });
      },
      error: (error) => {
        this.errorMessage = error.message || 'Something went wrong during login.';
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
          // Après inscription réussie, bascule vers le mode connexion
          this.toggleMode();
          
          // Réinitialise les données du formulaire d'inscription
          this.signUpData = { fullname: '', email: '', password: '', phone: '' };
        },
        error: (error) => {
          this.errorMessage = error.message || 'Something went wrong during registration.';
        },
      });
  }
}