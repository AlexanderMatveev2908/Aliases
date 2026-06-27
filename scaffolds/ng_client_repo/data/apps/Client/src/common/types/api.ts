import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Dict, Nullable } from './general';
import { Observable } from 'rxjs';

export interface OptToastApiT {
  toastOk: boolean;
  toastErr: boolean;
  okMsg: Nullable<string>;
}

export interface OptErrApiT {
  pushOnErr: boolean;
  pushOnStatus: number[];
}

export enum ApiStatusT {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  ENTITY_UNPROCESSABLE = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ConfApiT {
  url: Nullable<string>;
  method: HttpMethod;
  requestType: Nullable<string>;
  responseType: Nullable<string>;
  params: Nullable<Dict>;
  body: Nullable<Dict>;
  rateLimit: {
    limit: Nullable<string>;
    window: Nullable<string>;
    remaining: Nullable<string>;
    reset: Nullable<string>;
  };
}

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

interface BaseResT {
  msg?: string;
  status: number;
}

export type ResApiT<T> = T extends void ? BaseResT : BaseResT & { data: T };

export interface ErrApiT<T> extends HttpErrorResponse {
  error: ResApiT<T>;
}

export type ObsResT<T> = Observable<ResApiT<T> | never>;
