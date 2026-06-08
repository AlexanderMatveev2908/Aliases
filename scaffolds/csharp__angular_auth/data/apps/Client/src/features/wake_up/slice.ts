import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { WakeUpStateT } from './reducer';
import { getWakeUpState } from './reducer/selector';
import { WakeUpActT } from './reducer/actions';

@Injectable({ providedIn: 'root' })
export class WakeUpSlice extends UseKitSliceSvc {
  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public setLastCall(val: number): void {
    this.store.dispatch(WakeUpActT.SET_LAST_CALL({ val }));

    this.useStorage.setItem('lastCall', val);
  }
}
