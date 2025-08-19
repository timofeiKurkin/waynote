import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiFieldErrorPipe,
  TuiFile,
  TuiFileLike,
  TuiFileRejectedPipe,
  TuiFilesComponent,
  TuiInputFiles,
  TuiInputFilesDirective,
} from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { TuiError } from '@taiga-ui/core';
import { formValidationErrors } from '../../../shared/libs/formValidationErrors';

@Component({
  selector: 'app-drop-zone',
  imports: [
    CommonModule,
    TuiInputFilesDirective,
    TuiFilesComponent,
    TuiFile,
    TuiFileRejectedPipe,
    TuiInputFiles,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
  ],
  templateUrl: './drop-zone.html',
  styleUrl: './drop-zone.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrors],
})
export class DropZone {
  loadGPX = output<TuiFileLike>();

  readonly dropZoneControl = new FormControl<TuiFileLike | null>(
    null,
    Validators.required
  );
  protected readonly failedFile$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFile$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFile$ = this.dropZoneControl.valueChanges.pipe(
    switchMap(file => {
      return this.processFile(file);
    }),
    map(file => {
      this.loadGPX.emit(file);
      return file;
    })
  );

  protected removeFile(): void {
    this.dropZoneControl.setValue(null);
  }

  protected processFile(
    file: TuiFileLike | null
  ): Observable<TuiFileLike | null> {
    this.failedFile$.next(null);

    if (this.dropZoneControl.invalid || !file) {
      return EMPTY;
    }

    this.loadingFile$.next(file);

    return of(file).pipe(
      map(file => {
        if (!file.name.endsWith('.gpx')) {
          this.failedFile$.next(file);
          return;
        }

        return file;
      }),
      catchError(() => {
        this.failedFile$.next(file);
        return EMPTY;
      }),
      finalize(() => this.loadingFile$.next(null))
    );
  }
}
