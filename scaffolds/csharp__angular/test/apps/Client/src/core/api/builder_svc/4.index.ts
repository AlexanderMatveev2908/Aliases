import { ObsResT } from '@/common/types/api';
import { Injectable } from '@angular/core';
import { UseSideEffectsMngNoticeHk } from './3.notice';
import { LibApiArgs } from '@/core/lib/api/args';

@Injectable({
  providedIn: 'root',
})
export class UseSideEffectsMngSvc extends UseSideEffectsMngNoticeHk {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsResT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
