import { Injectable } from '@angular/core';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  logout() {
    return signOut(firebaseAuth);
  }
}
