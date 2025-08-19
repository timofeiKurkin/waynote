import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { RouteInfoType, RoutePreview } from '../models/interface';
import { ParsedGPX } from '@we-gold/gpxjs';

export const parseRouteSnapshot = (snapshot: QuerySnapshot) => {
  const routes: RoutePreview[] = [];

  snapshot.forEach(route => {
    const data = route.data();
    const transformedRoute = buildPreviewRoute(data, route.id);
    routes.push(transformedRoute);
  });

  return routes;
};

export const buildGPXObject = (data: DocumentData): ParsedGPX => {
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

export const buildPreviewRoute = (
  data: DocumentData,
  id: string
): RoutePreview => {
  return {
    id,
    gpx: buildGPXObject(data),
    title: data['title'],
    description: data['description'],
    city: data['city'],
    createdAt: data['createdAt'].toDate(),
    year: data['year'],
  };
};

export const buildRouteInfo = <T extends object>(data: T): RouteInfoType => {
  return {
    ownerId: data['ownerId'],
    updatedAt: data['updatedAt'].toDate(),
    ...buildPreviewRoute(data, data['id']),
  };
};
