import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';
// import { firebaseAuth } from '../shared/api/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../entities/user/state/auth-service';

const config: YConfig = {
  apikey: 'YMAP_API_KEY',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      onAuthStateChanged(getAuth(), user => {
        if (user) {
          authService.setUser(user);
          authService.setIsAuth(true);
        }
      });
    }),
    provideYConfig(config),
    provideEventPlugins(),
  ],
};
