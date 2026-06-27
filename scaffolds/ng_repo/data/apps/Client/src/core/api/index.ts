import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UseSideEffectsMngSvc } from './builder_svc/4.index';
import { LibApiArgs } from '../lib/api/args';
import { ObsResT, ResApiT } from '@/common/types/api';
import { Optional } from '@/common/types/general';

@Injectable({
  providedIn: 'root',
})
export class UseApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly sideEffectsMng: UseSideEffectsMngSvc = inject(UseSideEffectsMngSvc);

  public get<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.sideEffectsMng.main(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOrNone() as Optional<HttpParams>,
      }),
      args,
    );
  }

  public post<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.sideEffectsMng.main(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args,
    );
  }

  public put<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.sideEffectsMng.main(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args,
    );
  }

  public patch<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.sideEffectsMng.main(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args,
    );
  }

  public delete<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.sideEffectsMng.main(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOrNone() as Optional<HttpParams>,
      }),
      args,
    );
  }
}
