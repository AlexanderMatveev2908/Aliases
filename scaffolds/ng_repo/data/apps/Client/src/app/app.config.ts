import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { rootReducer } from '@/core/store';
import { useRootApiMdw } from '@/core/api/middleware/use_root_api';
import { useConfApiMdw } from '@/core/api/middleware/use_conf_api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideStore(rootReducer),
    provideHttpClient(withFetch(), withInterceptors([useRootApiMdw, useConfApiMdw])),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
