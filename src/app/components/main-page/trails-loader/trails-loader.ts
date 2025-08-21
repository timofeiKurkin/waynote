import { ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ErrorService } from '../../../shared/components/loader/error-service/error-service';
import { buildTrailCardFromSnapshot } from '../../../../entities/route/libs/build-trail-card-from-snapshot';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiFilterByInputPipe } from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';
import { map, of, switchMap } from 'rxjs';
import { TrailsService } from './trails-service/trails-service';
import { TrailList } from '../../../shared/components/lists/trail-list/trail-list';
import { ITrailCard } from '../../../shared/components/lists/trail-list/trail-card-interface';

@Component({
  selector: 'app-trails-loader',
  imports: [
    ReactiveFormsModule,
    TuiChevron,
    TuiTextfield,
    TuiDataListWrapper,
    TuiComboBox,
    TuiFilterByInputPipe,
    TrailList,
  ],
  templateUrl: './trails-loader.html',
  styleUrl: './trails-loader.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailsLoader implements OnInit {
  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  cities: string[] = [];
  years: number[] = [];

  filterForm = new FormGroup({
    cityFiltering: new FormControl<string>(''),
    yearFiltering: new FormControl<string>(''),
  });

  routes = signal<ITrailCard[] | null>(null);
  filteredRoutes = signal<ITrailCard[] | null>(null);

  constructor(private trailsService: TrailsService, private errorService: ErrorService) {}

  get isError() {
    return this.errorService.isError();
  }

  setCities(cities: string[]) {
    this.cities = cities;
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
            routes = routes.filter(route => route.city.toLowerCase().includes(cityFiltering.toLowerCase()));
          }

          if (yearFiltering) {
            routes = routes.filter(route => route.year === Number(yearFiltering));
          }

          return of(routes);
        }),
        map(routes => this.filteredRoutes.set(routes))
      )
      .subscribe();

    this.trailsService
      .getTrails()
      .then(buildTrailCardFromSnapshot)
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
