import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Ymap } from '../../../shared/components/maps/ymap/ymap';
import { ParsedGPX } from '@we-gold/gpxjs';
import { readGPXFile, stringToGPX } from '../../../shared/components/maps/libs/stringToGPX';
import { catchError, EMPTY, map, take } from 'rxjs';
import { DescriptionFormControls, ITrail } from './trail-interface';
import { formValidationErrorsMap } from '../../../shared/components/form/formValidationErrorsMap';
import { Timestamp } from 'firebase/firestore';
import { DropZone } from '../../../shared/components/form/drop-zone/drop-zone';
import { AuthStateService } from '../../../core/auth/auth-state/auth-state-service';
import { CreateTrailService } from './create-trail-service/create-trail-service';
import * as Sentry from '@sentry/angular';
import { signGpxMetadata } from '../../../shared/components/maps/libs/sign-gpx-metadata';

@Component({
  selector: 'app-create-trail-form',
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
    TuiForm,
  ],
  templateUrl: './create-trail-form.html',
  styleUrl: './create-trail-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrorsMap],
})
export class CreateTrailForm {
  @ViewChild(DropZone) dropZoneComponent: DropZone;
  formIsSending = signal<boolean>(false);
  paredGPX = signal<ParsedGPX | null>(null);
  protected descriptionMaxLength = 300;
  protected formStepIndex = signal(0);

  protected describeRouteForm = new FormGroup<DescriptionFormControls>({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.maxLength(40), Validators.minLength(2)],
    }),
    description: new FormControl(null, {
      validators: [Validators.maxLength(this.descriptionMaxLength)],
    }),
    city: new FormControl(null, {
      validators: [Validators.required, Validators.maxLength(35), Validators.minLength(2)],
    }),
    year: new FormControl(null, { validators: [Validators.required] }),
  });

  constructor(
    private createTrailService: CreateTrailService,
    private authStateService: AuthStateService,
    private router: Router,
    private alerts: TuiAlertService
  ) {}

  loadFile(file: TuiFileLike) {
    readGPXFile(file as File)
      .pipe(
        map(stringToGPX),
        map(GPX => {
          this.paredGPX.set(GPX);
        }),
        catchError(err => {
          this.alerts
            .open('Ошибка при обработке GPX файла', {
              label: 'Ошибка!',
              appearance: 'negative',
            })
            .pipe(take(1))
            .subscribe();

          Sentry.captureException(err);

          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
  }

  createRoute() {
    if (!this.describeRouteForm.valid) {
      this.describeRouteForm.markAllAsTouched();
      return;
    }

    this.formIsSending.set(true);

    const { title, description, city, year } = this.describeRouteForm.value;

    if (title && city && year) {
      const { routes, tracks, metadata, waypoints } = this.paredGPX();
      const createdAt = Timestamp.now();

      const routeData: ITrail = {
        title,
        city,
        year,
        description,
        ownerId: this.authStateService.user.uid,
        createdAt,
        updatedAt: createdAt,

        routes,
        tracks,
        metadata: signGpxMetadata(metadata, title, description, createdAt.toDate().toISOString()),
        waypoints,
      };

      this.createTrailService.createTrail(routeData).then(() => {
        this.router.navigate(['/my-trails']).then();
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
    if (!this.paredGPX()) {
      this.dropZoneComponent.dropZoneControl.markAllAsTouched();
      return;
    }

    this.formStepIndex.update(index => index + 1);
  }
}
