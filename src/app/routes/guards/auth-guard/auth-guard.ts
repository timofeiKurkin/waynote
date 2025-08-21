import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../../auth/auth-state/auth-state-service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStateService = inject(AuthStateService);

  if (!authStateService.isAuth) {
    router.navigate(['/login']).then();
    return false;
  }

  return true;
};
