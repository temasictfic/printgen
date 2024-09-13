import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const redirectHomeIfLoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is trying to access login or register routes

  if (authService.isAuthenticated) {
    router.navigateByUrl('');
    return false;
  }

  return true;
};
