import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, partition, tap } from 'rxjs';
import { AuthResponse } from '../model/auth-response.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { 
    this.getToken();
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

  logout() {
    this.removeToken();
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
}
