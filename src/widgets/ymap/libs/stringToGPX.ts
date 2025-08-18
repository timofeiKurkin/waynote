import { parseGPX } from '@we-gold/gpxjs';
import { fromEvent, map, Observable, take } from 'rxjs';

export const stringToGPX = (xml: string) => {
  const [parsed, error] = parseGPX(xml);

  if (error) {
    throw error;
  }

  return parsed;
};

export const readGPXFile = (file: File): Observable<string> => {
  const reader = new FileReader();
  reader.readAsText(file);

  return fromEvent(reader, 'load').pipe(
    take(1),
    map(() => reader.result as string)
  );
};
