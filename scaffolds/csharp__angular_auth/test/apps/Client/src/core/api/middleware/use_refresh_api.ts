import { OrNone } from '@/common/types/general';
import { UseStorageSvc } from '@/core/services/use_storage';
import { UseAuthApiSvc } from '@/features/auth/api';
import { AuthSlice } from '@/features/auth/slice';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export const useRefreshApi: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authApi = inject(UseAuthApiSvc);
  const authSlice = inject(AuthSlice);
  const useStorage = inject(UseStorageSvc);

  const authReq = req.clone();

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const isRefreshIssue = req.url.includes('/auth/refresh');
      const isJwtIssue = ['JWT_NOT_PROVIDED', 'JWT_INVALID', 'JWT_EXPIRED'].some(
        (txt) => txt === err.error?.['msg'],
      );
      const isStatusUnAuth = err.status === 401;

      if (isRefreshIssue || !isJwtIssue || !isStatusUnAuth) return throwError(() => err);

      return authApi.refreshToken().pipe(
        switchMap((res) => {
          const accessToken = res.data.accessToken;

          useStorage.setItem('accessToken', accessToken);

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });

          return next(retryReq);
        }),

        catchError((err: HttpErrorResponse) => {
          authSlice.setLogged(false);
          useStorage.removeItem('accessToken');

          return throwError(() => err);
        }),
      );
    }),
  );
};
