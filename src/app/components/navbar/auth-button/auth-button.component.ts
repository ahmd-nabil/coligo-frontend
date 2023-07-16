import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {
  authenticated: boolean = false;
  userClaims: undefined | {name:string};

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // TODO add authGuard to do that everywhere
  }
}
