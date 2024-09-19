import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import e from 'express';

export const redirectHomeIfLoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is trying to access login or register routes

  authService.isAuthenticated.subscribe((isAuthenticated) => {
    if (isAuthenticated) {
      router.navigate(['/']);
      return false;
    }else {
      return true;
    }
  });
  return true;
};
