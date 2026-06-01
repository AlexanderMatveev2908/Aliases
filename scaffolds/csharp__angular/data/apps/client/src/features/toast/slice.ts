import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { ToastStateT } from './reducer';
import { getToastState } from './reducer/selector';
import { ToastActT } from './reducer/actions';
import { AppPayloadEventT } from '@/common/types/general';

@Injectable({
  providedIn: 'root',
})
export class ToastSlice extends UseKitSliceSvc {
  public get toastState(): Signal<ToastStateT> {
    return this.store.selectSignal(getToastState);
  }

  public setID(id: string): void {
    this.store.dispatch(ToastActT.SET_ID({ id }));
  }

  public openToast(arg: AppPayloadEventT): void {
    this.store.dispatch(
      ToastActT.OPEN_TOAST({ msg: arg.msg, status: arg.status, eventT: arg.eventT }),
    );
  }

  public closeToast(): void {
    this.store.dispatch(ToastActT.CLOSE_TOAST());
  }

  public ifNotPresent(arg: AppPayloadEventT): void {
    if (this.toastState().isToast) return;

    this.openToast(arg);
  }
}
