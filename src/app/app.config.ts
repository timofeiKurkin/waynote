import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';

const config: YConfig = {
  apikey: 'YMAP_API_KEY',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideYConfig(config),
    provideEventPlugins(),
  ],
};
