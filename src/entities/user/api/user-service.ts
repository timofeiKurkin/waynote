import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { firebaseAuth } from '../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name,
    }).then();
    return userCredential;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  logout() {
    return signOut(firebaseAuth);
  }
}
