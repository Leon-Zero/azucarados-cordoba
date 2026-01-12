import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './routes/routing/app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(  withFetch(), 
    withInterceptors([
      errorInterceptor,
      jwtInterceptor
    ])),
  ],
};
