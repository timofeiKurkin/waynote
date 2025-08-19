import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { YMapFeatureProps, YMapProps } from 'ymaps3';
import { ParsedGPX, ParsedGPXInputs } from '@we-gold/gpxjs';
import { parseTrackPoints } from '../libs/parseTrackPoints';
import {
  YMapComponent,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultSchemeLayerDirective,
  YMapFeatureDirective,
} from 'angular-yandex-maps-v3';
import { getMaxZoomForBounds } from '../libs/math';

@Component({
  selector: 'app-ymap',
  imports: [
    CommonModule,
    YMapComponent,
    YMapDefaultSchemeLayerDirective,
    YMapFeatureDirective,
    YMapDefaultFeaturesLayerDirective,
  ],
  templateUrl: './ymap.html',
  styleUrl: './ymap.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ymap implements OnChanges {
  mapSize = input.required<number>();
  GPX = input<ParsedGPX | ParsedGPXInputs | null>();

  mapProps = signal<YMapProps | null>(null);
  featureProps = signal<YMapFeatureProps | null>(null);
  protected readonly screen = screen;

  ngOnChanges() {
    const GPX = this.GPX();

    if (!GPX) {
      return;
    }

    const { yPoints, bounds, center } = parseTrackPoints(GPX.tracks[0].points);
    const minZoom = getMaxZoomForBounds(bounds, this.mapSize());

    this.mapProps.set({
      theme: 'light',
      location: {
        bounds: bounds,
        center: center,
      },
      restrictMapArea: bounds,
      zoomRange: { min: minZoom, max: 21 },
      zoomStrategy: 'zoomToCenter',
      // margin: [40, 40, 40, 40],
    });
    this.featureProps.set({
      id: 'track',
      geometry: {
        type: 'LineString',
        coordinates: yPoints,
      },
      style: {
        stroke: [{ color: 'black', width: 4 }],
      },
    });
  }
}
