import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../../core/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }
}
