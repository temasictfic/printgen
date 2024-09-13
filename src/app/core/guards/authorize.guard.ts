import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_ERROR_REDIRECT_URL_TOKEN } from '../providers/auth.provider';

export const authorizeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authErrorRedirectUrl = inject(AUTH_ERROR_REDIRECT_URL_TOKEN);

  // Check if the user is trying to access login or register routes

  if (!authService.isAuthenticated) {
    router.navigateByUrl(authErrorRedirectUrl);
    return false;
  }

  const roles = route.data['roles'] as Array<string>;
  if (roles && !authService.isAuthorized(roles)) {
    router.navigateByUrl(authErrorRedirectUrl);
    // If user role is not allowed for this route, redirect to unauthorized page
    //router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
