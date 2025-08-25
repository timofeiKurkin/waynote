import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsedGPX, ParsedGPXInputs } from '@we-gold/gpxjs';
import { catchError, EMPTY, map, take } from 'rxjs';
import { ErrorService } from '../../../../core/error-service/error-service';
import { DataLoader } from '../../data-loader/data-loader';
import { parseTracksForStatic } from '../libs/parseTracksForStatic';
import { getMaxZoomForBounds } from '../libs/math';
import { StaticMapService } from './static-map-service/static-map-service';

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

  constructor(private staticMapService: StaticMapService, private errorService: ErrorService) {}

  get isError() {
    return this.errorService.isError();
  }

  ngOnInit() {
    const { bounds, center, value } = parseTracksForStatic(this.GPX().tracks[0].points);

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
          linewidth: 3,
          linestyle: 'solid',
          value,
        },
      ],
    };

    this.staticMapService
      .getStaticMap(mapParams)
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
