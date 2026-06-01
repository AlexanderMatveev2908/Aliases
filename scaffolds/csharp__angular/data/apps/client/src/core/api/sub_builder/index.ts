import { Injectable } from '@angular/core';
import { _UseSideEffectsMngNoticeHk } from './3.notice';
import { LibApiArgs } from '@/core/lib/api/args_api';
import { ObsOnOkT, ObsResT } from '@/common/types/api';

@Injectable({
  providedIn: 'root',
})
export class _UseSideEffectsMngSvc extends _UseSideEffectsMngNoticeHk {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
