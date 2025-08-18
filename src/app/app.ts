import { TuiRoot } from "@taiga-ui/core";
import {AfterViewInit, Component, ElementRef, signal, ViewChild, viewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LngLat, LngLatBounds, YMap, YMapFeatureProps, YMapProps} from "ymaps3";
import {
    YMapComponent, YMapDefaultFeaturesLayerDirective,
    YMapDefaultSchemeLayerDirective, YMapFeatureDirective, YReadyEvent,
} from "angular-yandex-maps-v3";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ParsedGPX, parseGPX, Point, Track} from "@we-gold/gpxjs";
import {catchError, EMPTY, fromEvent, map, of, switchMap, take} from "rxjs";

@Component({
    imports: [RouterModule, YMapComponent, YMapDefaultSchemeLayerDirective, YMapDefaultFeaturesLayerDirective, ReactiveFormsModule, YMapFeatureDirective, TuiRoot],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.less',
})
export class App implements AfterViewInit {
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    voronezh: LngLatBounds = [
        [38.9525, 51.5856],
        [39.4367, 51.7338]
    ]

    polygon_coordinates: LngLat[] = [
        this.voronezh[0],
        [this.voronezh[1][0], this.voronezh[0][1]],
        this.voronezh[1],
        [this.voronezh[0][0], this.voronezh[1][1]]
    ]

    fileControl = new FormControl<File | null>(null, {validators: [Validators.required]})

    mapProps = signal<YMapProps | null>(null)
    featureProps = signal<YMapFeatureProps | null>(null)
    isError = signal<{ message: string; isError: boolean } | null>(null)

    readGPXFile(file: File) {
        const reader = new FileReader();
        reader.readAsText(file)

        return fromEvent(reader, 'load').pipe(
            take(1),
            map(() => reader.result as string)
        );
    }

    onMapReady(event: YReadyEvent<YMap>): void {
        const { ymaps3, entity } = event;
    }

    parseTackPoints(points: Point[]) {
        let minLat = (10 ** 10), maxLat = -(10 ** 10);
        let minLon = (10 ** 10), maxLon = -(10 ** 10);

        const yPoints: LngLat[] = []
        const elevations: number[] = []

        for (const point of points) {
            const {latitude, longitude, elevation} = point

            minLat = Math.min(minLat, latitude)
            maxLat = Math.max(maxLat, latitude)

            minLon = Math.min(minLon, longitude)
            maxLon = Math.max(maxLon, longitude)

            yPoints.push([longitude, latitude])
            elevations.push(elevation)
        }

        const EARTH_RADIUS = 6378137; // Радиус Земли в метрах (WGS84)
        const MIN_SIZE_METERS = 100; // Минимальный размер квадрата (100 метров)

        // Шаг 2: Вычисляем центр
        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        // Шаг 3: Преобразуем углы в метрическую систему
        const toMeters = (lat: number, lon: number) => {
            const y = Math.log(Math.tan((lat * Math.PI / 180 + Math.PI / 2) / 2)) * EARTH_RADIUS;
            const x = lon * Math.PI / 180 * EARTH_RADIUS;
            return { x, y };
        };

        const sw = toMeters(minLat, minLon);
        const ne = toMeters(maxLat, maxLon);

        // Шаг 4: Вычисляем размеры в метрах
        let width = Math.abs(ne.x - sw.x);
        let height = Math.abs(ne.y - sw.y);

        // Обработка случая с одной точкой
        if (width === 0 && height === 0) {
            width = MIN_SIZE_METERS;
            height = MIN_SIZE_METERS;
        }

        // Шаг 5: Определяем максимальную сторону
        const maxSize = Math.max(width, height, MIN_SIZE_METERS);
        const halfSize = maxSize / 2;

        // Шаг 6: Вычисляем центр в метрах
        const centerMeters = toMeters(centerLat, centerLon);

        // Шаг 7: Преобразуем обратно в градусы
        const toDegrees = (x: number, y: number) => {
            const lon = (x / EARTH_RADIUS) * 180 / Math.PI;
            const lat = (2 * Math.atan(Math.exp(y / EARTH_RADIUS)) - Math.PI / 2) * 180 / Math.PI;
            return { lat, lon };
        };

        // Шаг 8: Рассчитываем новые границы
        const swNew = toDegrees(centerMeters.x - halfSize, centerMeters.y - halfSize);
        const neNew = toDegrees(centerMeters.x + halfSize, centerMeters.y + halfSize);

        // Шаг 9: Корректируем выход за пределы карты
        const bounds: LngLatBounds = [
            [Math.max(-180, swNew.lon), Math.max(-90, swNew.lat)],
            [Math.min(180, neNew.lon), Math.min(90, neNew.lat)]
        ]

        const center: LngLat = [
            (Math.min(180, neNew.lon) + Math.max(-180, swNew.lon)) / 2,
            (Math.min(90, neNew.lat) + Math.max(-90, swNew.lat)) / 2
        ]

        return {
            yPoints,
            elevations,
            bounds,
            center
        }

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
    }

    getMaxZoomForBounds(bounds: LngLatBounds, mapSizePx: number) {
        const WORLD_SIZE = 256;

        const right = bounds[0][0];
        const left = bounds[1][0];
        const top = bounds[1][1];
        const bottom = bounds[0][1];

        const deltaLon = Math.abs(left - right);
        const zoomX = Math.log2(mapSizePx / deltaLon * 360 / WORLD_SIZE);

        const topMercator = Math.log(Math.tan(Math.PI / 4 + (top * Math.PI / 180) / 2));
        const bottomMercator = Math.log(Math.tan(Math.PI / 4 + (bottom * Math.PI / 180) / 2));
        const deltaMercator = Math.abs(topMercator - bottomMercator);
        const zoomY = Math.log2(mapSizePx / deltaMercator * (2 * Math.PI) / WORLD_SIZE);

        return Math.min(zoomX, zoomY);
    }

    ngAfterViewInit() {
        fromEvent(this.fileInput.nativeElement, "change").pipe(
            switchMap((event) => {
                const input = event.target as HTMLInputElement
                console.log("INPUT:", input)

                if (!input.files?.length) {
                    throw new Error("Пустой файл")
                }

                const file = input.files[0];
                return this.readGPXFile(file)
            }),
            map((xml) => {
                const [parsed, error] = parseGPX(xml)

                if (error) {
                    throw error
                }

                console.log('Успешно спарсили:', parsed);
                return parsed
            }),
            map((parsed) => {
                const {yPoints, bounds, center} = this.parseTackPoints(parsed.tracks[0].points)

                const minZoom = this.getMaxZoomForBounds(bounds, 600)
                console.log(minZoom)

                return {
                    featureProps: {
                        id: "track",
                        geometry: {
                            type: "LineString",
                            coordinates: yPoints
                        },
                        style: {
                            stroke: [{color: "black", width: 4}]
                        }
                    },
                    mapProps: {
                        theme: "light",
                        location: {
                            bounds: bounds,
                            center: center,
                        },
                        restrictMapArea: bounds,
                        zoomRange: {min: minZoom, max: 21},
                        zoomStrategy: "zoomToCenter",
                        margin: [40, 40, 40, 40]
                    }
                } as { featureProps: YMapFeatureProps; mapProps: YMapProps }
            })
        ).subscribe({
            next: ({mapProps, featureProps}) => {
                this.mapProps.set(mapProps)
                this.featureProps.set(featureProps)
            },
            error: (error) => this.isError.set({isError: true, message: 'Ошибка парсинга GPX:' + error})
        })
    }
}
