import { inject, Injectable } from '@angular/core';
import { UseSideEffectsMngToastHk } from './2.toast';
import { NoticeSlice } from '@/features/notice/slice';
import { ApiStatusT, ErrApiT, ObsResT, OptErrApiT } from '@/common/types/api';
import { Nullable } from '@/common/types/general';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav';

@Injectable()
export abstract class UseSideEffectsMngNoticeHk extends UseSideEffectsMngToastHk {
  // ? svc
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? helper
  private readonly defOptErr: OptErrApiT = {
    pushOnErr: false,
    pushOnStatus: [
      ApiStatusT.FORBIDDEN,
      ApiStatusT.TOO_MANY_REQUESTS,
      ApiStatusT.INTERNAL_SERVER_ERROR,
    ],
  };

  private mergeArgs(opt: Nullable<Partial<OptErrApiT>>): OptErrApiT {
    const options: Partial<OptErrApiT> = {
      pushOnErr: !!opt?.pushOnErr,
      pushOnStatus: [...this.defOptErr.pushOnStatus, ...(opt?.pushOnStatus ?? [])],
    };
    return options as OptErrApiT;
  }

  private ignoreErr<T>(opt: OptErrApiT, err: ErrApiT<T>): boolean {
    const firstCheck: boolean =
      !opt.pushOnErr && !opt.pushOnStatus?.some((code: number) => code === err?.status);

    return firstCheck;
  }

  protected withNotice<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApiT>>): ObsResT<T> {
    const options: OptErrApiT = this.mergeArgs(opt);

    return cb.pipe(
      catchError((err: ErrApiT<T>) => {
        if (this.ignoreErr(options, err)) return throwError(() => err);

        this.noticeSlice.setNotice({
          eventT: 'ERR',
          msg: err?.error?.msg ?? this.DEF_CLIENT_ERR_MSG,
          status: err?.status ?? 0,
          tmpt: 'HOME',
          cb: null,
        });

        const navigation: Promise<boolean> = this.useNav.replace('/notice', { from: 'ERR' });

        return from(navigation).pipe(switchMap(() => EMPTY));
      }),
    );
  }
}
