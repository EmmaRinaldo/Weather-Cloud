import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};


