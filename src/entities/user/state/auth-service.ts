import { Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<User | null>(null);
  private isAuthSignal = signal<boolean | null>(null);

  get user() {
    return this.userSignal();
  }

  get isAuth() {
    return this.isAuthSignal();
  }

  setIsAuth(status: boolean) {
    this.isAuthSignal.set(status);
  }

  setUser(user: User) {
    this.userSignal.set(user);
  }
}
