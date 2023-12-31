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
  user : User | null = null;

  constructor(private authService: AuthService) {
    authService.userSubject.subscribe(user => this.user = user);
  }
  
  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
