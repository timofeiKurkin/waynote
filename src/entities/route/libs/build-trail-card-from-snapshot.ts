import { QuerySnapshot } from 'firebase/firestore';
import { ITrailCard } from '../../../app/shared/components/lists/trail-list/trail-card-interface';
import { buildTrailCard } from '../../../app/shared/components/lists/trail-list/trail-card/build-trail-card';

export const buildTrailCardFromSnapshot = (snapshot: QuerySnapshot) => {
  const routes: ITrailCard[] = [];

  snapshot.forEach(route => {
    const data = route.data();
    const transformedRoute = buildTrailCard(data, route.id);
    routes.push(transformedRoute);
  });

  return routes;
};
