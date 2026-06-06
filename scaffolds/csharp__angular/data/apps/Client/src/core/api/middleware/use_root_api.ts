import { EnvVars } from '@/environments/environment';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const useRootApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const baseURL: string = EnvVars.currBackURL();

  const clone = req.clone({
    url: `${baseURL}${req.url}`,
    withCredentials: true,
  });

  return next(clone);
};
