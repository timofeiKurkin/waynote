import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouteService } from '../../entities/route/api/route-service';
import { RoutePreview, WithID } from '../../entities/route/models/interface';
import { ParsedGPXInputs } from '@we-gold/gpxjs';
import { Ymap } from '../../widgets/ymap/ui/ymap';
import { DataLoader } from '../../shared/ui/data-loader/data-loader';
import { ErrorService } from '../../shared/libs/error-service/error-service';
import { RouterLink } from '@angular/router';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';

@Component({
  selector: 'app-routes-list',
  imports: [
    CommonModule,
    Ymap,
    DataLoader,
    RouterLink,
    TuiBlockStatusComponent,
    NgOptimizedImage,
  ],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesList implements OnInit {
  routes = signal<(RoutePreview & WithID)[] | null>(null);

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
      .then(snapshot => {
        const routes: (RoutePreview & WithID)[] = [];

        snapshot.forEach(route => {
          const data = route.data();

          const gpx: ParsedGPXInputs = {
            xml: new Document(),
            routes: data['routes'],
            tracks: data['tracks'],
            waypoints: data['waypoints'],
            metadata: data['metadata'],
          };

          routes.push({
            id: route.id,
            gpx,
            title: data['title'],
            description: data['description'],
            city: data['city'],
            createdAt: data['createdAt'],
            year: data['year'],
          });
        });

        this.routes.set(routes);
      })
      .catch(error => {
        this.errorService.handleError(error);
      });
  }
}
