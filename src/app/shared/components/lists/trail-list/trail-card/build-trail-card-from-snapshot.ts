import { QuerySnapshot } from 'firebase/firestore';
import { ITrailCard } from '../trail-card-interface';
import { buildTrailCardFromDocument } from './build-trail-card-from-document';

export const buildTrailCardFromSnapshot = (snapshot: QuerySnapshot) => {
  const routes: ITrailCard[] = [];

  snapshot.forEach(route => {
    const data = route.data();
    const transformedRoute = buildTrailCardFromDocument(data, route.id);
    routes.push(transformedRoute);
  });

  return routes;
};
