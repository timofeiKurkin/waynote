import { MetaData, ParsedGPX, Route, Track, Waypoint } from '@we-gold/gpxjs';
import { Timestamp } from 'firebase/firestore';

export interface IRoute {
  ownerId: string;
  title: string;
  city: string;
  year: number;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

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

  gpx: ParsedGPX;
}

export interface RouteInfoType extends RoutePreview {
  ownerId: string;
  updatedAt: Date;
}
