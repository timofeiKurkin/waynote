import { Injectable } from '@angular/core';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleAuthProvider } from '../../../shared/api/firebase/firebase';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { take } from 'rxjs';
import { AuthStateService } from '../../auth-state/auth-state-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(private authStateService: AuthStateService, private router: Router, private alerts: TuiAlertService) {}

  async googleAuth() {
    signInWithPopup(firebaseAuth, googleAuthProvider).then(res => {
      const user = res.user;

      this.authStateService.setIsAuth(!!user);
      this.authStateService.setUser(user);

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
