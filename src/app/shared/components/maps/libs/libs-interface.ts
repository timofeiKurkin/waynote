import { LngLat, LngLatBounds } from 'ymaps3';

export interface TrailPoints {
  yPoints: LngLat[];
  bounds: LngLatBounds;
  center: LngLat;
}

export interface MetersCoords {
  x: number;
  y: number;
}

export interface Degrees {
  lat: number;
  lon: number;
}
