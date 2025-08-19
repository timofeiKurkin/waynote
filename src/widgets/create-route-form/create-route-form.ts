import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZone } from '../../features/load-input/ui/drop-zone';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiCalendarYear,
  TuiError,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiFieldErrorPipe,
  TuiFileLike,
  TuiInputYearDirective,
  TuiStep,
  TuiStepperComponent,
  TuiTextarea,
  TuiTextareaLimit,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { Ymap } from '../ymap/ui/ymap';
import { ParsedGPX } from '@we-gold/gpxjs';
import { RouteService } from '../../entities/route/api/route-service';
import { AuthService } from '../../entities/user/state/auth-service';
import { readGPXFile, stringToGPX } from '../ymap/libs/stringToGPX';
import { catchError, EMPTY, map, take } from 'rxjs';
import { IRoute } from '../../entities/route/models/interface';
import { formValidationErrors } from '../../shared/libs/formValidationErrors';

@Component({
  selector: 'app-create-route-form',
  imports: [
    CommonModule,
    DropZone,
    ReactiveFormsModule,
    RouterLink,
    TuiAppearance,
    TuiButton,
    TuiButtonLoading,
    TuiCalendarYear,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiInputYearDirective,
    TuiLabel,
    TuiStep,
    TuiStepperComponent,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiTitle,
    Ymap,
    TuiTextfieldDropdownDirective,
  ],
  templateUrl: './create-route-form.html',
  styleUrl: './create-route-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrors],
})
export class CreateRouteForm {
  @ViewChild(DropZone) dropZoneComponent: DropZone;

  formIsSending = signal<boolean>(false);
  paredGPX = signal<ParsedGPX | null>(null);
  protected formStepIndex = signal(0);

  protected describeRouteForm = new FormGroup({
    title: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ],
    }),
    description: new FormControl(null, {
      validators: [Validators.maxLength(150)],
    }),
    city: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
      ],
    }),
    year: new FormControl(null, { validators: [Validators.required] }),
  });

  constructor(
    private routeService: RouteService,
    private authService: AuthService,
    private router: Router,
    private alerts: TuiAlertService
  ) {}

  loadFile(file: TuiFileLike) {
    readGPXFile(file as File)
      .pipe(
        map(stringToGPX),
        map(GPX => {
          if (GPX) {
            this.paredGPX.set(GPX);
          }
        }),
        catchError(err => {
          this.alerts
            .open('Ошибка при обработке GPX файла', {
              label: 'Ошибка!',
              appearance: 'negative',
            })
            .pipe(take(1))
            .subscribe();
          console.error('Ошибка при обработке GPX файла', err);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
  }

  createRoute() {
    this.formIsSending.set(true);

    if (this.describeRouteForm.valid) {
      this.describeRouteForm.markAllAsTouched();
      return;
    }

    const { title, description, city, year } = this.describeRouteForm.value;

    if (title && city && year) {
      const { routes, tracks, metadata, waypoints } = this.paredGPX();

      const routeData: IRoute = {
        title,
        city,
        year,
        description,
        ownerId: this.authService.user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),

        routes,
        tracks,
        metadata,
        waypoints,
      };

      this.routeService.createRoute(routeData).then(() => {
        this.router.navigate(['/my-routes']).then();
        this.alerts
          .open('Ваш маршрут успешно добавлен!', {
            label: 'Только вперед!',
            appearance: 'positive',
          })
          .pipe(take(1))
          .subscribe();
      });
    }
  }

  protected previous(): void {
    this.formStepIndex.update(index => index - 1);
  }

  protected next(): void {
    // if (!this.GPX()) {
    //   this.dropZoneComponent.dropZoneControl.markAllAsTouched();
    //   return;
    // }

    this.formStepIndex.update(index => index + 1);
  }
}
