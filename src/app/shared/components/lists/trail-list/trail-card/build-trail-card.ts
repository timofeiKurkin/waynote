import { DocumentData } from 'firebase/firestore';
import { buildGpxObjectFromDocument } from '../../../../../../entities/route/libs/build-gpx-object-from-document';
import { ITrailCard } from '../trail-card-interface';

export const buildTrailCard = (data: DocumentData, id: string): ITrailCard => {
  return {
    id,
    gpx: buildGpxObjectFromDocument(data),
    title: data['title'],
    description: data['description'],
    city: data['city'],
    createdAt: data['createdAt'].toDate(),
    year: data['year'],
  };
};
