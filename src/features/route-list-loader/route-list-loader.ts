import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../entities/route/api/route-service';
import { RoutePreview } from '../../entities/route/models/interface';
import { ErrorService } from '../../shared/libs/error-service/error-service';
import { RouteList } from '../../entities/route/ui/route-list/route-list';
import { parseRouteSnapshot } from '../../entities/route/libs/parseRouteSnapshot';

@Component({
  selector: 'app-route-list-loader',
  imports: [CommonModule, RouteList],
  templateUrl: './route-list-loader.html',
  styleUrl: './route-list-loader.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteListLoader implements OnInit {
  routes = signal<RoutePreview[] | null>(null);

  constructor(
    private routeService: RouteService,
    private errorService: ErrorService
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    this.routeService
      .getRoutes()
      .then(parseRouteSnapshot)
      .then(routes => {
        this.routes.set(routes);
      })
      .catch(error => {
        this.errorService.handleError(error);
      });
  }
}
