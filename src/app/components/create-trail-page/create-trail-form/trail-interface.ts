import { MetaData, Route, Track, Waypoint } from '@we-gold/gpxjs';
import { Timestamp } from 'firebase/firestore';

export interface ITrail {
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
