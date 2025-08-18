import { CanActivateFn } from '@angular/router';
import { getAuth } from 'firebase/auth';

export const unAuthGuard: CanActivateFn = () => {
  return !getAuth();
};
