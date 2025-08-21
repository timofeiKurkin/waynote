import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  isError = signal(false);
  errorMessage = signal('');

  handleError(error: unknown, defaultMsg = 'Произошла ошибка!'): void {
    this.isError.set(true);
    this.errorMessage.set(error instanceof Error ? error.message : defaultMsg);
    console.error(error);
  }

  resetError(): void {
    this.isError.set(false);
    this.errorMessage.set('');
  }
}
