import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoader } from '../../../../shared/ui/data-loader/data-loader';
import { ErrorService } from '../../../../shared/libs/error-service/error-service';
import { RouteService } from '../../api/route-service';
import { RouteInfoType } from '../../models/interface';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  finalize,
  from,
  map,
  Observable,
  switchMap,
  take,
} from 'rxjs';
import { isRoute } from '../../models/typeGuards';
import { Ymap } from '../../../../widgets/ymap/ui/ymap';
import { buildRouteInfo } from '../../libs/parseRouteSnapshot';
import {
  TuiButton,
  TuiFormatDatePipe,
  TuiGroup,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { GPXToString } from '../../../../widgets/ymap/libs/GPXToString';
import { WA_WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-route-info',
  imports: [
    CommonModule,
    DataLoader,
    Ymap,
    TuiFormatDatePipe,
    TuiTitle,
    TuiButton,
    TuiGroup,
    TuiButtonLoading,
  ],
  templateUrl: './route-info.html',
  styleUrl: './route-info.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteInfo implements OnInit {
  routeItem$: Observable<RouteInfoType>;
  isDownloading = signal(false);

  private window = inject(WA_WINDOW);

  constructor(
    private errorService: ErrorService,
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    this.routeItem$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        const routeID = param['id'] as string;
        return from(this.routeService.getRoute(routeID));
      }),
      map(doc => {
        const data = doc.data();
        data['id'] = doc.id;

        if (isRoute(data)) {
          return data;
        } else {
          throw new Error('Не валидный маршрут');
        }
      }),
      map((route): RouteInfoType => {
        return buildRouteInfo(route);
      }),
      catchError(err => {
        this.errorService.handleError(err);
        return EMPTY;
      })
    );
  }

  downloadGPX() {
    this.isDownloading.set(true);

    this.routeItem$
      .pipe(
        map(route => {
          const xml = GPXToString(route.gpx);
          const blob = new Blob([xml], { type: 'application/gpx+xml' });
          const url = URL.createObjectURL(blob);
          const a = this.window.document.createElement('a');
          a.href = url;
          a.download = route.title + '.gpx';
          a.click();
          window.URL.revokeObjectURL(url);
        }),
        take(1),
        finalize(() => this.isDownloading.set(false))
      )
      .subscribe();
  }
}
