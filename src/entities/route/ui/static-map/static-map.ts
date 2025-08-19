import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsedGPX, ParsedGPXInputs } from '@we-gold/gpxjs';
import { RouteService } from '../../api/route-service';
import {
  getMaxZoomForBounds,
  parseTracksForStatic,
} from '../../../../widgets/ymap/libs/GPXHandlers';
import { catchError, EMPTY, map, take } from 'rxjs';
import { ErrorService } from '../../../../shared/libs/error-service/error-service';
import { DataLoader } from '../../../../shared/ui/data-loader/data-loader';

@Component({
  selector: 'app-static-map',
  imports: [CommonModule, DataLoader],
  templateUrl: './static-map.html',
  styleUrl: './static-map.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticMap implements OnInit {
  mapSize = input.required<number>();
  GPX = input<ParsedGPX | ParsedGPXInputs | null>();

  readonly staticMap = signal<string>('');

  constructor(
    private routeService: RouteService,
    private errorService: ErrorService
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    const { bounds, center, value } = parseTracksForStatic(
      this.GPX().tracks[0].points
    );

    const zoom = getMaxZoomForBounds(bounds, this.mapSize());

    const mapParams = {
      center: {
        lat: center[1],
        lon: center[0],
      },
      zoom,
      width: this.mapSize(),
      height: this.mapSize(),
      style: 'osm-bright',
      geometries: [
        {
          type: 'polyline',
          linecolor: '#000000',
          lineopacity: 1,
          linewidth: 4,
          linestyle: 'solid',
          value,
        },
      ],
    };

    this.routeService
      .getStaticMapOfRoute(mapParams)
      .pipe(
        map(data => {
          const url = URL.createObjectURL(data);
          this.staticMap.set(url);
        }),
        catchError(err => {
          this.errorService.handleError(err);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
  }
}
