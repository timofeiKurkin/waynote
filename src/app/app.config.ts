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
import { provideYConfig } from 'angular-yandex-maps-v3';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './core/api/firebase/firebase';
import { environment } from '../environment/environment';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthStateService } from './core/auth/auth-state/auth-state-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
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

      // Авторизация через редирект в google, а потом обратно в приложение.
      // getRedirectResult(firebaseAuth)
      //   .then(res => {
      //     console.log(res);
      //     if (res) {
      //       authService.setUser(res.user);
      //       authService.setIsAuth(!!res.user);
      //     }
      //   })
      //   .catch(error => {
      //     console.log('Ошибка при авторизации через Google', error);
      //   });
    }),
    provideYConfig(environment.YConfig),
    provideHttpClient(),
    provideEventPlugins(),
  ],
};
