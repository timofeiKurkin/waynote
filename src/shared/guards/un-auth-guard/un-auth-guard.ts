import { CanActivateFn } from '@angular/router';

export const unAuthGuard: CanActivateFn = () => {
  return true;
};
