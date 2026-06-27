import { OrNone } from '@/common/types/general';
import { UseStorageSvc } from '@/core/services/use_storage';
import { EnvVars } from '@/environments/environment';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

export const useRootApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const useStorage: UseStorageSvc = inject(UseStorageSvc);

  const accessToken: OrNone<string> = useStorage.getItem('accessToken');

  const baseURL: string = EnvVars.currBackURL();

  const clone = req.clone({
    url: `${baseURL}${req.url}`,
    withCredentials: true,
    setHeaders: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  });

  return next(clone);
};
