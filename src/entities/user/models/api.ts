import { UserCredential } from 'firebase/auth';

export abstract class UserServiceBase {
  abstract register(email: string, password: string): Promise<UserCredential>;

  abstract login(email: string, password: string): Promise<UserCredential>;

  abstract logout(): void;
}
