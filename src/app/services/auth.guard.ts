import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const isAuthenticated = (inject(AuthService).userSubject.getValue() != null);
  console.log("auth guard isAuth : " + isAuthenticated);
  if(isAuthenticated) return true;
  inject(Router).navigate(["/login"]);
  return false;
};
