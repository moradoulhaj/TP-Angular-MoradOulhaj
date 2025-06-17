import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/AuthService/auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log(this.authService.isAdmin());
    
    if (this.authService.isAdmin()) {

      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}