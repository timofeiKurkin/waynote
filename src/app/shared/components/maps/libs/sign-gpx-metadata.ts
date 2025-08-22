import { MetaData } from '@we-gold/gpxjs';

export const signGpxMetadata = (metadata: MetaData, title: string, description: string, time: string): MetaData => {
  return {
    author: {
      link: { href: '', text: '', type: '' },
      name: metadata.author.name,
      email: metadata.author.email,
    },
    description: description,
    name: title,
    time: time,
    link: {
      href: '',
      text: title,
      type: '',
    },
  };
};
