import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { Nullable } from '@/common/types/general';
import { UseSideEffectsMngInitHk } from './0.init';
import { EnvVars } from '@/environments/environment';
import { LibLog } from '@/core/lib/log';
import { ConfApiT, ErrApiT, ObsResT, ResApiT } from '@/common/types/api';

@Injectable()
export abstract class UseSideEffectsMngLogHk extends UseSideEffectsMngInitHk {
  private log<T>(res: ResApiT<T> | ErrApiT<T>, emoji: string): void {
    const conf: Nullable<ConfApiT> = this.confApi.getCurr();
    const result: ResApiT<T> = res instanceof HttpErrorResponse ? res.error : res;

    const title: string = (conf?.url ?? 'Unknown url')
      .replace(EnvVars.currBackURL(), '')
      .split('?')[0];

    LibLog.main(`${emoji} ${title}`, conf, result);
  }

  protected withLog<T>(cb: ObsResT<T>): ObsResT<T> {
    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => this.log(res, '✅'),
        error: (err: ErrApiT<T>) => this.log(err, '❌'),
      }),
    );
  }
}
