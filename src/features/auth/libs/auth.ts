import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../../../shared/api/firebase/firebase';

export function googleAuthHandler() {
  const auth = getAuth();
  auth.useDeviceLanguage();

  signInWithPopup(auth, googleAuthProvider)
    .then(user => {
      this.authService.setUser(user.user);
      this.authService.setIsAuth(true);
      this.router.navigate(['/']).then();
    })
    .catch(error => {
      console.error(error);
    });
}
