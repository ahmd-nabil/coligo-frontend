import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, audit, partition, tap } from 'rxjs';
import { AuthResponse } from '../model/auth-response.model';
import { SignupRequest } from '../model/signup-request.model';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) { 
  }

  login(email: string, password: string){
    return this.http
    .post<AuthResponse>('http://localhost:8080/api/v1/auth/login', {email: email, password: password})
    .pipe(
      tap(
        {
          next: authResponse => this.setToken(authResponse.token),
          error: () => this.removeToken()
        }
      )
    );
  }

  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return this.http
    .post<AuthResponse>('http://localhost:8080/api/v1/auth/register', signupRequest)
    .pipe(
      tap(
        {
          next: AuthResponse => this.setToken(AuthResponse.token),
          error: () => this.removeToken()
        }
      )
    )
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  removeToken(): void {
    localStorage.removeItem('jwt');
  }

  isAuthenticated() {
    return this.getToken() != null;  // todo create isValid() to validate the token
  }

  getClaims() : User | undefined {
    if(this.getToken() != null) {
      return jwtDecode(this.getToken()!);
    }
    return undefined;
  }
}
