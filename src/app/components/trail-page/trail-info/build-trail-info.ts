import { ITrailInfo } from './trail-interface';
import { buildTrailCardFromDocument } from '../../../shared/components/lists/trail-list/trail-card/build-trail-card-from-document';

export const buildTrailInfo = <T extends object>(data: T): ITrailInfo => {
  return {
    ownerId: data['ownerId'],
    updatedAt: data['updatedAt'].toDate(),
    ...buildTrailCardFromDocument(data, data['id']),
  };
};
