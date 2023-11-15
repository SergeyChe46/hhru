import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  let jwtService = inject(JwtHelperService);
  let router = inject(Router);
  let token = localStorage.getItem('token');

  if (token && !jwtService.isTokenExpired(token)) {
    return true;
  }
  router.navigate(['login']);

  return true;
};
