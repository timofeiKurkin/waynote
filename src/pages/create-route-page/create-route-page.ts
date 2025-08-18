import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZone } from '../../features/load-input/ui/drop-zone';
import { ParsedGPX } from '@we-gold/gpxjs';
import { Ymap } from '../../widgets/ymap/ui/ymap';
import {
  TuiButton,
  TuiError,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiInputYear,
  TuiTextarea,
  TuiTextareaLimit,
} from '@taiga-ui/kit';
import { RouteService } from '../../entities/route/api/route-service';
import { IRoute } from '../../entities/route/models/interface';
import { AuthService } from '../../entities/user/state/auth-service';

@Component({
  selector: 'app-create-route-page',
  imports: [
    CommonModule,
    DropZone,
    Ymap,
    TuiButton,
    RouterLink,
    TuiHeader,
    TuiTitle,
    TuiForm,
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
  ],
  templateUrl: './create-route-page.html',
  styleUrl: './create-route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoutePage {
  GPX = signal<ParsedGPX | null>(null);
  routeForm = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    city: new FormControl(null),
    year: new FormControl(null),
  });

  constructor(
    private routeService: RouteService,
    private authService: AuthService,
    private router: Router
  ) {}

  loadFile(file: ParsedGPX) {
    if (file) {
      this.GPX.set(file);
    }
  }

  createRoute() {
    if (!this.routeForm.valid) {
      this.routeForm.markAllAsDirty();
    }

    const { title, description, city, year } = this.routeForm.value;

    if (title && description) {
      const { routes, tracks, metadata, waypoints } = this.GPX();

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
      });
    }
  }
}
