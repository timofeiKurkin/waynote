import { QuerySnapshot } from 'firebase/firestore';
import { RoutePreview } from '../models/interface';
import { ParsedGPXInputs } from '@we-gold/gpxjs';

export const parseRouteSnapshot = (snapshot: QuerySnapshot) => {
  const routes: RoutePreview[] = [];

  snapshot.forEach(route => {
    const data = route.data();

    const gpx: ParsedGPXInputs = {
      xml: new Document(),
      routes: data['routes'],
      tracks: data['tracks'],
      waypoints: data['waypoints'],
      metadata: data['metadata'],
    };

    routes.push({
      id: route.id,
      gpx,
      title: data['title'],
      description: data['description'],
      city: data['city'],
      createdAt: data['createdAt'],
      year: data['year'],
    });
  });

  return routes;
};
