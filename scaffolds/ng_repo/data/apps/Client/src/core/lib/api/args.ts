import { OptErrApiT, OptToastApiT } from '@/common/types/api';
import { Dict, Nullable, OrNone } from '@/common/types/general';
import { HttpParams } from '@angular/common/http';
import { ErrApp } from '../errApp';
import { LibFormParser } from '../data_structure/form_parser';

export class LibApiArgs<T> {
  private readonly _url: string = '';
  private _params: Nullable<HttpParams> = null;
  private _optToast: Nullable<Partial<OptToastApiT>> = null;
  private _optErr: Nullable<Partial<OptErrApiT>> = null;
  private _body: Nullable<T | FormData> = null;

  constructor(url: string) {
    this._url = url;
  }

  public static withURL<K>(url: string): LibApiArgs<K> {
    return new LibApiArgs(url);
  }

  private parseQuery<Q>(query: Q): HttpParams {
    if (!query) throw new ErrApp('invalid arg parseQuery');
    return new HttpParams({ fromString: LibFormParser.genParamsURL(query) });
  }

  private ifOptToastEmpty(): void {
    if (!this._optToast) this._optToast = {};
  }
  private ifOptErrEmpty(): void {
    if (!this._optErr) this._optErr = {};
  }

  public query<Q>(query: Q): LibApiArgs<T> {
    this._params = this.parseQuery(query);
    return this;
  }

  public body(body: T | FormData): LibApiArgs<T> {
    this._body = body;
    return this;
  }

  public toastOnOk(): LibApiArgs<T> {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = true;
    return this;
  }

  public toastOnErr(): LibApiArgs<T> {
    this.ifOptToastEmpty();
    this._optToast!.toastErr = true;
    return this;
  }

  public toastOkMsg(msg: string): LibApiArgs<T> {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = true;
    this._optToast!.okMsg = msg;
    return this;
  }

  public toastOnFulfilled(): LibApiArgs<T> {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = true;
    this._optToast!.toastErr = true;
    return this;
  }

  public noToast(): LibApiArgs<T> {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = false;
    this._optToast!.toastErr = false;

    return this;
  }

  public pushOnErr(): LibApiArgs<T> {
    this.ifOptErrEmpty();
    this._optErr!.pushOnErr = true;
    return this;
  }

  public pushOnStatus(codes: number[]): LibApiArgs<T> {
    this.ifOptErrEmpty();
    this._optErr!.pushOnStatus = codes;
    return this;
  }

  public getUrl(): string {
    return this._url;
  }

  public getParamsOrNone(): OrNone<HttpParams> {
    return !this._params ? undefined : this._params;
  }

  public getBody(): Nullable<T | FormData> {
    return this._body;
  }

  public getOptToast(): Nullable<Partial<OptToastApiT>> {
    return this._optToast;
  }

  public getOptErr(): Nullable<Partial<OptErrApiT>> {
    return this._optErr;
  }

  public httpOptions(): Dict {
    const options: Dict =
      !this._body || this._body instanceof FormData
        ? {}
        : { headers: { 'Content-Type': 'application/json' } };

    return options;
  }
}
