import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { firebaseAuth } from '../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  logout() {
    return signOut(firebaseAuth);
  }
}
