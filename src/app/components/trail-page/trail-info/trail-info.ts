import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoader } from '../../../shared/components/loader/data-loader/data-loader';
import { ErrorService } from '../../../shared/components/loader/error-service/error-service';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, finalize, from, map, Observable, switchMap, take } from 'rxjs';
import { Ymap } from '../../../shared/components/maps/ymap/ymap';
import { TuiButton, TuiFormatDatePipe, TuiGroup, TuiTitle } from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { GPXToString } from '../../../shared/components/maps/libs/GPXToString';
import { WA_WINDOW } from '@ng-web-apis/common';
import { buildTrailInfo } from './build-trail-info';
import { ITrailInfo } from './trail-interface';
import { TrailService } from './trail-service/trail-service';

@Component({
  selector: 'app-trail-info',
  imports: [CommonModule, DataLoader, Ymap, TuiFormatDatePipe, TuiTitle, TuiButton, TuiGroup, TuiButtonLoading],
  templateUrl: './trail-info.html',
  styleUrl: './trail-info.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailInfo implements OnInit {
  routeItem$: Observable<ITrailInfo>;
  isDownloading = signal(false);

  private window = inject(WA_WINDOW);

  constructor(
    private errorService: ErrorService,
    private trailApiService: TrailService,
    private activatedRoute: ActivatedRoute
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    this.routeItem$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        const routeID = param['id'] as string;
        return from(this.trailApiService.getTrail(routeID));
      }),
      map(doc => {
        const data = doc.data();
        data['id'] = doc.id;

        return data;
      }),
      map((route): ITrailInfo => {
        return buildTrailInfo(route);
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
          URL.revokeObjectURL(url);
        }),
        take(1),
        finalize(() => this.isDownloading.set(false))
      )
      .subscribe();
  }
}
