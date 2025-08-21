import { ITrail } from '../../create-trail-page/create-trail-form/trail-interface';

export const isValidTrail = (doc: unknown): doc is ITrail => {
  return typeof doc === 'object' && 'city' in doc && 'title' in doc && 'tracks' in doc && 'ownerId' in doc;
};
