import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildTrailCardFromSnapshot } from '../../../../entities/route/libs/build-trail-card-from-snapshot';
import { ErrorService } from '../../../shared/components/loader/error-service/error-service';
import { AuthStateService } from '../../../auth/auth-state/auth-state-service';
import { UserTrailsService } from './user-trails-service/user-trails-service';
import { TrailList } from '../../../shared/components/lists/trail-list/trail-list';
import { ITrailCard } from '../../../shared/components/lists/trail-list/trail-card-interface';

@Component({
  selector: 'app-user-trails',
  imports: [CommonModule, TrailList],
  templateUrl: './user-trails.html',
  styleUrl: './user-trails.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTrails implements OnInit {
  trails = signal<ITrailCard[] | null>(null);

  constructor(
    private userTrailsService: UserTrailsService,
    private authStateService: AuthStateService,
    private errorService: ErrorService
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    const userID = this.authStateService.user.uid;
    this.userTrailsService
      .getUserTrails(userID)
      .then(buildTrailCardFromSnapshot)
      .then(routes => {
        this.trails.set(routes);
      })
      .catch(error => {
        this.errorService.handleError(error);
      });
  }
}
