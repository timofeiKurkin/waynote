import { Injectable } from '@angular/core';
import { AuthService } from '../../state/auth-service';
import { signInWithPopup } from 'firebase/auth';
import {
  firebaseAuth,
  googleAuthProvider,
} from '../../../../shared/api/firebase/firebase';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alerts: TuiAlertService
  ) {}

  async googleAuth() {
    // await signInWithRedirect(firebaseAuth, googleAuthProvider);

    signInWithPopup(firebaseAuth, googleAuthProvider).then(res => {
      const user = res.user;

      this.authService.setIsAuth(!!user);
      this.authService.setUser(user);

      this.router.navigate(['/']).then(() => {
        this.alerts
          .open('Вы успешно авторизовались в Noteway!', {
            label: 'Только вперед!',
            appearance: 'positive',
          })
          .pipe(take(1))
          .subscribe();
      });
    });
  }
}
