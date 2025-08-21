import { ParsedGPX } from '@we-gold/gpxjs';

export interface ITrailInfo {
  id: string;
  title: string;
  city: string;
  year: number;
  description: string;
  createdAt: Date;

  gpx: ParsedGPX;

  ownerId: string;
  updatedAt: Date;
}
