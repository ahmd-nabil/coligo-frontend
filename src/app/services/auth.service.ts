import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, partition, tap } from 'rxjs';
import { AuthResponse } from '../model/auth-response.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authToken : string | null = null;
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

  getToken(): string | null {
    this.authToken = localStorage.getItem('Authorization');
    return this.authToken ;
  }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('Authorization', token);
  }

  removeToken(): void {
    this.authToken = null;
    localStorage.removeItem('Authorization');
  }
}
