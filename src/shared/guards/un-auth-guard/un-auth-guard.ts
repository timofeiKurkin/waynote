import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../entities/user/state/auth-service';

export const unAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return !authService.isAuth;
};
