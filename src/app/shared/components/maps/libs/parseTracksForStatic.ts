import { Point } from '@we-gold/gpxjs';
import { Simplify } from 'simplify-ts';
import { calculateBounds, calculateCenter } from './math';

export const parseTracksForStatic = (GPXPoints: Point[]) => {
  let minLat = 10 ** 10,
    maxLat = -(10 ** 10);
  let minLon = 10 ** 10,
    maxLon = -(10 ** 10);

  const simplifyPoints: { y: number; x: number }[] = [];

  for (const point of GPXPoints) {
    const { latitude, longitude } = point;

    minLat = Math.min(minLat, latitude);
    maxLat = Math.max(maxLat, latitude);

    minLon = Math.min(minLon, longitude);
    maxLon = Math.max(maxLon, longitude);

    simplifyPoints.push({ y: latitude, x: longitude });
  }

  // Из-за того, что точек очень много, не каждый API может отрисовать карту, поэтому кол-во точек нужно сократить.
  // Для этого можно использовать алгоритм "Ramer-Gouglas-Peucker" - он убирает лишние точки, которые находятся на одной прямой, из-за чего линия даже не изменяется.
  // https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
  // https://mourner.github.io/simplify-js/
  // Примеры сокращения кол-ва точек: 4917 -> 418, 334 -> 113, 1163 -> 69
  const simplified = Simplify(simplifyPoints, 0.005, true);

  const value = simplified.map(point => ({
    lat: point['y'],
    lon: point['x'],
  }));

  const bounds = calculateBounds(minLat, maxLat, minLon, maxLon);
  const center = calculateCenter(bounds);

  return {
    value,
    bounds,
    center,
  };
};
