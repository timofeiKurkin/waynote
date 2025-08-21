import { LngLat } from 'ymaps3';
import { TrailPoints } from './libs-interface';
import { Point } from '@we-gold/gpxjs';
import { calculateBounds, calculateCenter } from './math';

export const parseTrackPoints = (points: Point[]): TrailPoints => {
  let minLat = 10 ** 10,
    maxLat = -(10 ** 10);
  let minLon = 10 ** 10,
    maxLon = -(10 ** 10);

  const yPoints: LngLat[] = [];

  for (const point of points) {
    const { latitude, longitude } = point;

    minLat = Math.min(minLat, latitude);
    maxLat = Math.max(maxLat, latitude);

    minLon = Math.min(minLon, longitude);
    maxLon = Math.max(maxLon, longitude);

    yPoints.push([longitude, latitude]);
  }

  const bounds = calculateBounds(minLat, maxLat, minLon, maxLon);
  const center = calculateCenter(bounds);

  return {
    yPoints,
    bounds,
    center,
  };
};
