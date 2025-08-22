import { MetaData, Route, Track, Waypoint } from '@we-gold/gpxjs';
import { Timestamp } from 'firebase/firestore';
import { FormControl } from '@angular/forms';

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

export interface DescriptionFormControls {
  title: FormControl<string | null>;
  description: FormControl<string> | null;
  city: FormControl<string | null>;
  year: FormControl<number | null>;
}
