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
import { provideYConfig } from 'angular-yandex-maps-v3';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../entities/user/state/auth-service';
import { firebaseAuth } from '../shared/api/firebase/firebase';
import { environment } from '../environment/environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(async () => {
      const authService = inject(AuthService);

      onAuthStateChanged(firebaseAuth, user => {
        if (user) {
          authService.setUser(user);
          authService.setIsAuth(true);
        }
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
