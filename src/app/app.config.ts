import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideYConfig } from 'angular-yandex-maps-v3';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './core/api/firebase/firebase';
import { environment } from '../environment/environment';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthStateService } from './core/auth/auth-state/auth-state-service';
import * as Sentry from '@sentry/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
      inject(Sentry.TraceService);
      const authStateService = inject(AuthStateService);

      return new Promise<void>(resolve => {
        onAuthStateChanged(firebaseAuth, user => {
          if (user) {
            authStateService.setUser(user);
            authStateService.setIsAuth(true);
          }
          resolve();
        });
      });
    }),
    provideYConfig(environment.YConfig),
    provideHttpClient(),
    provideEventPlugins(),
  ],
};
