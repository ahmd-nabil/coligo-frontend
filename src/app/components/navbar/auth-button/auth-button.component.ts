import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent {
  authenticated: boolean = false;
  userClaims: undefined | {name:string};

  logout(){}
}
