import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {
  authenticated: boolean = false;
  user : User | undefined;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated();
      this.user = this.authService.getClaims();
  }

  logout() {
    this.authService.logout();
  }
}
