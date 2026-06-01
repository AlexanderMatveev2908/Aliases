import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { _UseSideEffectsMngSvc } from './sub_builder';
import { LibApiArgs } from '../lib/api/args_api';
import { ObsOnOkT, ResApiT } from '@/common/types/api';
import { Optional } from '@/common/types/general';

@Injectable({
  providedIn: 'root',
})
export class UseApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly sideEffectsMng: _UseSideEffectsMngSvc = inject(_UseSideEffectsMngSvc);

  public get<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOrNone() as Optional<HttpParams>,
      }),
      args,
    );
  }

  public post<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args,
    );
  }

  public put<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args,
    );
  }

  public patch<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args,
    );
  }

  public delete<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOrNone() as Optional<HttpParams>,
      }),
      args,
    );
  }
}
