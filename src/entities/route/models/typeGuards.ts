import { IRoute } from './interface';

export const isRoute = (doc: unknown): doc is IRoute => {
  return (
    typeof doc === 'object' &&
    'city' in doc &&
    'title' in doc &&
    'tracks' in doc &&
    'ownerId' in doc
  );
};
