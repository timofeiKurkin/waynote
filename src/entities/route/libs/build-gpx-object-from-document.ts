import { DocumentData } from 'firebase/firestore';
import { ParsedGPX } from '@we-gold/gpxjs';

export const buildGpxObjectFromDocument = (data: DocumentData): ParsedGPX => {
  return new ParsedGPX(
    {
      xml: document.implementation.createDocument(null, 'gpx'),
      routes: data['routes'],
      tracks: data['tracks'],
      waypoints: data['waypoints'],
      metadata: data['metadata'],
    },
    {
      removeEmptyFields: true,
      avgSpeedThreshold: 215e-6,
    }
  );
};
