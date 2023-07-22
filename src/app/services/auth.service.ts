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
  userSubject: BehaviorSubject<User | null> = new BehaviorSubject(this.getAuthenticatedUser());
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject.subscribe(user => this.user = user);
  }

  login(email: string, password: string){
    return this.http
    .post<AuthResponse>('http://localhost:8080/api/v1/auth/login', {email: email, password: password})
    .pipe(
      tap(
        {
          next: authResponse => {
            this.addTokenToLocalStorage(authResponse.token);
            this.userSubject.next(this.getAuthenticatedUser());
          }
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
          next: authResponse => {
            this.addTokenToLocalStorage(authResponse.token);
            this.userSubject.next(this.getAuthenticatedUser());
          }
        }
      )
    )
  }

  logout() {
    this.unAuthenticate();
    this.router.navigate(['/login']);
  }

  getStoredToken(): string | null {
    return localStorage.getItem('jwt');
  }

  addTokenToLocalStorage(token: string): void {
    localStorage.setItem('jwt', token);
  }

  unAuthenticate(): void {
    localStorage.removeItem('jwt');
    this.userSubject.next(null);
  }

  getAuthenticatedUser() : User | null{
    const storedToken = this.getStoredToken();
    if(storedToken == null) {
      return null;
    }
    const user: User = jwtDecode(storedToken);
    if((user.exp * 1000) < Date.now()) { // get exp in milliSecond first
      return null;
    }
    return user;
  }

  isAuthenticated() : boolean {
    return this.user != null;
  }
}
