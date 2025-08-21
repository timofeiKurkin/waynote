import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../auth/auth-state/auth-state-service';

export const unAuthGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);
  return !authStateService.isAuth;
};
