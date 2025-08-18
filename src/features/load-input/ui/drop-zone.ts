import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
import {
  readGPXFile,
  stringToGPX,
} from '../../../widgets/ymap/libs/stringToGPX';
import { ParsedGPX } from '@we-gold/gpxjs';

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
  ],
  templateUrl: './drop-zone.html',
  styleUrl: './drop-zone.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropZone {
  loadGPX = output<ParsedGPX>();

  protected readonly dropZoneControl = new FormControl<TuiFileLike | null>(
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
      return this.dropZoneControl.value;
    })
  );

  protected removeFile(): void {
    this.dropZoneControl.setValue(null);
  }

  protected processFile(
    file: TuiFileLike | null
  ): Observable<ParsedGPX | null> {
    this.failedFile$.next(null);

    if (this.dropZoneControl.invalid || !file) {
      return EMPTY;
    }

    this.loadingFile$.next(file);

    return of(file).pipe(
      switchMap(file => {
        if (!file.name.endsWith('.gpx')) {
          this.failedFile$.next(file);
          return;
        }

        return readGPXFile(file as File);
      }),
      map(stringToGPX),
      catchError(() => {
        this.failedFile$.next(file);
        return EMPTY;
      }),
      finalize(() => this.loadingFile$.next(null))
    );
  }
}
