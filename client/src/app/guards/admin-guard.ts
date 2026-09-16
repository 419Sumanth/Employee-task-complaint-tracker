import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = authService.getUser();

  if (user?.role === 'admin') {
    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};