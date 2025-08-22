import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrails } from './user-trails/user-trails';
import { AuthStateService } from '../../core/auth/auth-state/auth-state-service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-my-trails-page',
  imports: [CommonModule, UserTrails],
  templateUrl: './my-trails-page.html',
  styleUrl: './my-trails-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTrailsPage {
  constructor(private authStateService: AuthStateService, private router: Router) {
    effect(() => {
      if (!this.authStateService.isAuth) {
        this.router.navigate(['/trails']).then();
      }
    });
  }
}
