import { Injectable, signal } from '@angular/core';

import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  isError = signal(false);
  errorMessage = signal('');

  handleError(error: unknown, defaultMsg = 'Произошла ошибка!'): void {
    Sentry.captureException(error);

    this.isError.set(true);
    this.errorMessage.set(error instanceof Error ? error.message : defaultMsg);
  }

  resetError(): void {
    this.isError.set(false);
    this.errorMessage.set('');
  }
}
