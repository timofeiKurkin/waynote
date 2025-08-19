import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZone } from '../../features/load-input/ui/drop-zone';
import { ParsedGPX } from '@we-gold/gpxjs';
import { Ymap } from '../../widgets/ymap/ui/ymap';
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButtonLoading,
  TuiFieldErrorPipe,
  TuiFileLike,
  TuiInputYear,
  TuiStep,
  TuiStepperComponent,
  TuiTextarea,
  TuiTextareaLimit,
} from '@taiga-ui/kit';
import { RouteService } from '../../entities/route/api/route-service';
import { IRoute } from '../../entities/route/models/interface';
import { AuthService } from '../../entities/user/state/auth-service';
import { map, take } from 'rxjs';
import { readGPXFile, stringToGPX } from '../../widgets/ymap/libs/stringToGPX';

@Component({
  selector: 'app-create-route-page',
  imports: [
    CommonModule,
    DropZone,
    Ymap,
    TuiButton,
    TuiHeader,
    TuiTitle,
    ReactiveFormsModule,
    TuiTextfieldComponent,
    TuiError,
    TuiTextfieldDirective,
    TuiLabel,
    TuiFieldErrorPipe,
    TuiTextarea,
    TuiTextareaLimit,
    TuiInputYear,
    TuiTextfieldDropdownDirective,
    TuiAppearance,
    TuiCardLarge,
    TuiStepperComponent,
    TuiStep,
    RouterLink,
    TuiForm,
    TuiButtonLoading,
  ],
  templateUrl: './create-route-page.html',
  styleUrl: './create-route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoutePage {
  @ViewChild(DropZone) dropZoneComponent: DropZone;

  formIsSending = signal<boolean>(false);
  paredGPX = signal<ParsedGPX | null>(null);

  protected index = signal(0);
  protected describeRouteForm = new FormGroup({
    gpxFile: new FormControl<TuiFileLike | null>(null, {
      validators: [Validators.required],
    }),
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
        map(xml => {
          const GPX = stringToGPX(xml);

          if (GPX) {
            this.paredGPX.set(GPX);
          }
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

    if (title && description) {
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
    this.index.update(index => index - 1);
  }

  protected next(): void {
    // if (!this.GPX()) {
    //   this.dropZoneComponent.dropZoneControl.markAllAsTouched();
    //   return;
    // }

    this.index.update(index => index + 1);
  }
}
