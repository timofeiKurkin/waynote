import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  async registration(name: string, email: string, password: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    updateProfile(userCredential.user, {
      displayName: name,
    }).then();

    return userCredential;
  }
}
