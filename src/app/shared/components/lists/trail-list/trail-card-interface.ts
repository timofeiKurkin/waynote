import { ParsedGPX } from '@we-gold/gpxjs';

export interface ITrailCard {
  id: string;
  title: string;
  city: string;
  year: number;
  description: string;
  createdAt: Date;

  gpx: ParsedGPX;
}
