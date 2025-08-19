import { Degrees, MetersCoords } from '../models/libs';
import { LngLat, LngLatBounds } from 'ymaps3';

const BASE_WORLD_SIZE = 256;
const EARTH_RADIUS = 6378137;
const MIN_SIZE_METERS = 100;
const ADDITIONAL_INDEX = 0.001;

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
  const topLon = bounds[0][0];
  const bottomLon = bounds[1][0];
  const bottomLat = bounds[1][1];
  const topLat = bounds[0][1];

  const deltaLon = Math.abs(bottomLon - topLon);
  const zoomX = Math.log2(((mapSizePx / deltaLon) * 360) / BASE_WORLD_SIZE);

  const topMercator = Math.log(
    Math.tan(Math.PI / 4 + (bottomLat * Math.PI) / 180 / 2)
  );
  const bottomMercator = Math.log(
    Math.tan(Math.PI / 4 + (topLat * Math.PI) / 180 / 2)
  );
  const deltaMercator = Math.abs(topMercator - bottomMercator);
  const zoomY = Math.log2(
    ((mapSizePx / deltaMercator) * (2 * Math.PI)) / BASE_WORLD_SIZE
  );

  return Math.min(zoomX, zoomY);
};

export const calculateBounds = (
  minLat: number,
  maxLat: number,
  minLon: number,
  maxLon: number
): LngLatBounds => {
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

  return [
    [topLon - topLon * ADDITIONAL_INDEX, topLat - topLon * ADDITIONAL_INDEX],
    [
      bottomLon + bottomLon * ADDITIONAL_INDEX,
      bottomLat + bottomLat * ADDITIONAL_INDEX,
    ],
  ];
};

export const calculateCenter = (bounds: LngLatBounds): LngLat => {
  return [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];
};
