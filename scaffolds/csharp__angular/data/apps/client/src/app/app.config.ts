import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { rootReducer } from '@/core/store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
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
