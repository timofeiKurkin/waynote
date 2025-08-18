import { CanActivateFn } from '@angular/router';
import { getAuth } from 'firebase/auth';

export const authGuard: CanActivateFn = () => {
  return Boolean(getAuth());
};
