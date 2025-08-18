import { LngLat, LngLatBounds } from 'ymaps3';
import { Degrees, MetersCoords, TrackPoints } from '../models/libs';
import { Point } from '@we-gold/gpxjs';

const BASE_WORLD_SIZE = 256;
const EARTH_RADIUS = 6378137;
const MIN_SIZE_METERS = 100;

const toMeters = (lat: number, lon: number): MetersCoords => {
  const y =
    Math.log(Math.tan(((lat * Math.PI) / 180 + Math.PI / 2) / 2)) *
    EARTH_RADIUS;
  const x = ((lon * Math.PI) / 180) * EARTH_RADIUS;
  return { x, y };
};

const toDegrees = (x: number, y: number): Degrees => {
  const lon = ((x / EARTH_RADIUS) * 180) / Math.PI;
  const lat =
    ((2 * Math.atan(Math.exp(y / EARTH_RADIUS)) - Math.PI / 2) * 180) / Math.PI;
  return { lat, lon };
};

export const getMaxZoomForBounds = (
  bounds: LngLatBounds,
  mapSizePx: number
) => {
  const right = bounds[0][0];
  const left = bounds[1][0];
  const top = bounds[1][1];
  const bottom = bounds[0][1];

  const deltaLon = Math.abs(left - right);
  const zoomX = Math.log2(((mapSizePx / deltaLon) * 360) / BASE_WORLD_SIZE);

  const topMercator = Math.log(
    Math.tan(Math.PI / 4 + (top * Math.PI) / 180 / 2)
  );
  const bottomMercator = Math.log(
    Math.tan(Math.PI / 4 + (bottom * Math.PI) / 180 / 2)
  );
  const deltaMercator = Math.abs(topMercator - bottomMercator);
  const zoomY = Math.log2(
    ((mapSizePx / deltaMercator) * (2 * Math.PI)) / BASE_WORLD_SIZE
  );

  return Math.min(zoomX, zoomY);
};

export const parseTrackPoints = (points: Point[]): TrackPoints => {
  let minLat = 10 ** 10,
    maxLat = -(10 ** 10);
  let minLon = 10 ** 10,
    maxLon = -(10 ** 10);

  const yPoints: LngLat[] = [];
  const elevations: number[] = [];

  for (const point of points) {
    const { latitude, longitude, elevation } = point;

    minLat = Math.min(minLat, latitude);
    maxLat = Math.max(maxLat, latitude);

    minLon = Math.min(minLon, longitude);
    maxLon = Math.max(maxLon, longitude);

    yPoints.push([longitude, latitude]);
    elevations.push(elevation);
  }

  const centerLat = (minLat + maxLat) / 2;
  const centerLon = (minLon + maxLon) / 2;

  const sw = toMeters(minLat, minLon);
  const ne = toMeters(maxLat, maxLon);

  let width = Math.abs(ne.x - sw.x);
  let height = Math.abs(ne.y - sw.y);

  if (width === 0 && height === 0) {
    width = MIN_SIZE_METERS;
    height = MIN_SIZE_METERS;
  }

  const maxSize = Math.max(width, height, MIN_SIZE_METERS);
  const halfSize = maxSize / 2;

  const centerMeters = toMeters(centerLat, centerLon);

  const swNew = toDegrees(centerMeters.x - halfSize, centerMeters.y - halfSize);
  const neNew = toDegrees(centerMeters.x + halfSize, centerMeters.y + halfSize);

  const topLon = Math.max(-180, swNew.lon);
  const bottomLon = Math.min(180, neNew.lon);
  const topLat = Math.max(-90, swNew.lat);
  const bottomLat = Math.min(90, neNew.lat);

  const bounds: LngLatBounds = [
    [topLon, topLat],
    [bottomLon, bottomLat],
  ];

  const center: LngLat = [(topLon + bottomLon) / 2, (topLat + bottomLat) / 2];

  return {
    yPoints,
    elevations,
    bounds,
    center,
  };

  // const bounds: LngLatBounds = [
  //     [minLon, minLat],
  //     [maxLon, maxLat],
  // ]
  // const center: LngLat = [
  //     (maxLon + minLon) / 2,
  //     (maxLat + minLat) / 2
  // ]
  // return {
  //     yPoints,
  //     elevations,
  //     bounds,
  //     center
  // }
};
