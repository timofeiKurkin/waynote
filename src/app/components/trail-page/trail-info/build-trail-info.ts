import { ITrailInfo } from './trail-interface';
import { buildTrailCard } from '../../../shared/components/lists/trail-list/trail-card/build-trail-card';

export const buildTrailInfo = <T extends object>(data: T): ITrailInfo => {
  return {
    ownerId: data['ownerId'],
    updatedAt: data['updatedAt'].toDate(),
    ...buildTrailCard(data, data['id']),
  };
};
