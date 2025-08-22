import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTrailForm } from './create-trail-form/create-trail-form';
import { AuthStateService } from '../../core/auth/auth-state/auth-state-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trail-route-page',
  imports: [CommonModule, ReactiveFormsModule, CreateTrailForm],
  templateUrl: './create-trail-page.html',
  styleUrl: './create-trail-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTrailPage {
  constructor(private authStateService: AuthStateService, private router: Router) {
    effect(() => {
      if (!this.authStateService.isAuth) {
        this.router.navigate(['/trails']).then();
      }
    });
  }
}
