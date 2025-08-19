import {
  MetaData,
  ParsedGPXInputs,
  Route,
  Track,
  Waypoint,
} from '@we-gold/gpxjs';

export interface IRoute {
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

export interface WithID {
  id: string;
}

export interface RoutePreview extends WithID {
  title: string;
  city: string;
  year: number;
  description: string;
  createdAt: Date;

  gpx: ParsedGPXInputs;
}
