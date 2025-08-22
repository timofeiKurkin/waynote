import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { provideYConfig } from 'angular-yandex-maps-v3';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './core/api/firebase/firebase';
import { environment } from '../environment/environment';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthStateService } from './core/auth/auth-state/auth-state-service';
import { filter } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
      const authStateService = inject(AuthStateService);
      const router = inject(Router);

      return new Promise<void>(resolve => {
        onAuthStateChanged(firebaseAuth, user => {
          console.log('user: ', user);
          if (user) {
            authStateService.setUser(user);
            authStateService.setIsAuth(true);
          } else {
            router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
              if (
                event.urlAfterRedirects.startsWith('/my-trails') ||
                event.urlAfterRedirects.startsWith('/create-trail')
              ) {
                router.navigate(['/trails']).then();
              }
            });
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
