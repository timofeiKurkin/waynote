import { MetaData, Track, Waypoint } from '@we-gold/gpxjs';
import { Route } from '@angular/router';

export interface IRoutePreview {
  ownerId: string;
  title: string;
  city: string;
  year: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  metadata: MetaData;
  tracks: Track[];
  routes: Route[];
  waypoints: Waypoint[];
}
