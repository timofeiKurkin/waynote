import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouteService } from '../../entities/route/api/route-service';
import { RoutePreview } from '../../entities/route/models/interface';
import { ErrorService } from '../../shared/libs/error-service/error-service';
import { parseRouteSnapshot } from '../../entities/route/libs/parseRouteSnapshot';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouteList } from '../../entities/route/ui/route-list/route-list';
import {
  TuiChevron,
  TuiComboBox,
  TuiDataListWrapper,
  TuiFilterByInputPipe,
} from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-route-list-loader',
  imports: [
    RouteList,
    ReactiveFormsModule,
    TuiChevron,
    TuiTextfield,
    TuiDataListWrapper,
    TuiComboBox,
    TuiFilterByInputPipe,
  ],
  templateUrl: './route-list-loader.html',
  styleUrl: './route-list-loader.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteListLoader implements OnInit {
  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  cities: string[] = [];
  years: number[] = [];

  filterForm = new FormGroup({
    cityFiltering: new FormControl<string>(''),
    yearFiltering: new FormControl<string>(''),
  });

  routes = signal<RoutePreview[] | null>(null);
  filteredRoutes = signal<RoutePreview[] | null>(null);

  constructor(
    private routeService: RouteService,
    private errorService: ErrorService
  ) {}

  get isError() {
    return this.errorService.isError();
  }

  setCities(cities: string[]) {
    this.cities = cities;
  }

  selectCity(city: string): void {
    this.filteredRoutes.set(
      this.routes().filter(route =>
        route.city.toLowerCase().includes(city.toLowerCase())
      )
    );
  }

  selectYear(year: string): void {
    this.filteredRoutes.set(
      this.routes().filter(route => route.year === Number(year))
    );
  }

  setYears(years: number[]) {
    this.years = years;
  }

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(
        switchMap(({ cityFiltering, yearFiltering }) => {
          let routes = this.routes();

          if (cityFiltering) {
            routes = routes.filter(route =>
              route.city.toLowerCase().includes(cityFiltering.toLowerCase())
            );
          }

          if (yearFiltering) {
            routes = routes.filter(
              route => route.year === Number(yearFiltering)
            );
          }

          return of(routes);
        }),
        map(routes => this.filteredRoutes.set(routes))
      )
      .subscribe();

    this.routeService
      .getRoutes()
      .then(parseRouteSnapshot)
      .then(routes => {
        this.routes.set(routes);
        this.filteredRoutes.set(routes);
        return routes;
      })
      .then(routes => {
        const cities: string[] = [];
        const years: number[] = [];

        for (const route of routes) {
          cities.push(route.city);
          years.push(route.year);
        }

        this.setCities(cities);
        this.setYears(years);
      })
      .catch(error => {
        this.errorService.handleError(error);
      });
  }
}
