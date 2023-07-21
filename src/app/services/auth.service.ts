import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, audit, partition, tap } from 'rxjs';
import { AuthResponse } from '../model/auth-response.model';
import { SignupRequest } from '../model/signup-request.model';

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
