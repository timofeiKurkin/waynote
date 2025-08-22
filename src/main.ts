import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import * as Sentry from '@sentry/angular';

Sentry.init({
  dsn: 'https://11dd10e27bc13beb580cf8324283624d@o4509885427023872.ingest.de.sentry.io/4509885510058064',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // Enable sending logs to Sentry
  enableLogs: true,
});

bootstrapApplication(App, appConfig).catch(err => console.error(err));
