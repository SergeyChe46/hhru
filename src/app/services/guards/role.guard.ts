import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let userInfo = JSON.parse(localStorage.getItem('userInfo')!);

  if (userInfo['gender'] === 'male') {
    return true;
  }
  router.navigate(['applicants-list']);
  return false;
};
