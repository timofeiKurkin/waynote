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
  TuiTitle,
} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiTextarea,
  TuiTextareaLimit,
  TuiTooltip,
} from '@taiga-ui/kit';

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
    TuiTooltip,
    TuiTextfieldDirective,
    TuiLabel,
    TuiFieldErrorPipe,
    TuiTextarea,
    TuiTextareaLimit,
  ],
  templateUrl: './create-route-page.html',
  styleUrl: './create-route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoutePage {
  GPX = signal<ParsedGPX | null>(null);

  routeForm = new FormGroup({
    routeTitle: new FormControl(null),
    routeDescription: new FormControl(null),
  });

  loadFile(file: ParsedGPX) {
    if (file) {
      this.GPX.set(file);
    }
  }

  createRoute() {
    if (!this.routeForm.valid) {
      this.routeForm.markAllAsDirty();
    }

    const { routeTitle, routeDescription } = this.routeForm.value;

    if (routeTitle && routeDescription) {
    }
  }
}
