import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user : User | null = null;
  constructor(private authService: AuthService) {
    this.authService.userSubject.subscribe(user => this.user = user);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("interceptor is here");
    if(this.user != null) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.getStoredToken()}`)
      });
    }
    return next.handle(request);
  }
}
