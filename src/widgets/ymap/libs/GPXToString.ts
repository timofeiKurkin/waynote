import { ParsedGPX, stringifyGPX } from '@we-gold/gpxjs';

export const GPXToString = (gpx: ParsedGPX) => {
  return stringifyGPX(gpx);
};
