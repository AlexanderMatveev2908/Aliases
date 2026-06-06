import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { NoticeStateT } from './reducer';
import { getNoticeState } from './reducer/selector';
import { NoticeActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class NoticeSlice extends UseKitSliceSvc {
  public get noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  public setNotice(arg: NoticeStateT): void {
    this.store.dispatch(
      NoticeActT.SET_NOTICE({
        cb: arg.cb,
        tmpt: arg.tmpt,
        eventT: arg.eventT,
        msg: arg.msg,
        status: arg.status,
      }),
    );

    const { cb, ...rst } = arg;

    this.useStorage.setItem('notice', rst);
  }
}
