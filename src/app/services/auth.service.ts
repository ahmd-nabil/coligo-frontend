import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) {
    window.onstorage = () => {
      const user = this.getAuthenticatedUser();
      this.userSubject.next(user);
      user == null ? this.router.navigateByUrl("/login") : this.router.navigateByUrl("/");
    }
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
    localStorage.removeItem('jwt');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getStoredToken(): string | null {
    return localStorage.getItem('jwt');
  }

  addTokenToLocalStorage(token: string): void {
    localStorage.setItem('jwt', token);
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
}
