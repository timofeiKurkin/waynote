import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../entities/route/api/route-service';
import { AuthService } from '../../entities/user/state/auth-service';
import { RoutePreview } from '../../entities/route/models/interface';
import { parseRouteSnapshot } from '../../entities/route/libs/parseRouteSnapshot';
import { ErrorService } from '../../shared/libs/error-service/error-service';
import { RouteList } from '../../entities/route/ui/route-list/route-list';

@Component({
  selector: 'app-user-routes-loader',
  imports: [CommonModule, RouteList],
  templateUrl: './user-routes-loader.html',
  styleUrl: './user-routes-loader.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoutesLoader implements OnInit {
  routes = signal<RoutePreview[] | null>(null);

  constructor(
    private routeService: RouteService,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    const userID = this.authService.user.uid;
    this.routeService
      .getDocsByOwner(userID)
      .then(parseRouteSnapshot)
      .then(routes => {
        this.routes.set(routes);
      })
      .catch(error => {
        this.errorService.handleError(error);
      });
  }
}
