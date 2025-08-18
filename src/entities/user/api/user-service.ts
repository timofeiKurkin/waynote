import { Injectable } from '@angular/core';
import { UserServiceBase } from '../models/api';
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
export class UserService implements UserServiceBase {
  async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  async logout() {
    await signOut(firebaseAuth);
  }
}
